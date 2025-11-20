<script setup>
import { ref, computed, onMounted, watch } from 'vue';

const user = ref('');
const senha = ref('');
const client = useFetch('https://api.leandrocesar.com/usersnw');

const dontUser = ref(false);
const userBlocked = ref(false);

const coachIdCookie = useCookie('coachId'); // Criação do cookie para armazenar o ID do coach

// --- PIN state ---
const usingPin = ref(false); // inicia mostrando PIN (você pode trocar)
const pinDigits = ref([]);
const maxPinLength = 6;
const isSubmittingPin = ref(false);
const pinError = ref('');
const shake = ref(false);

// armazenamento do PIN: salvamos { hash, userId } em localStorage/sessionStorage
const PIN_STORAGE_KEY = 'vault.pinObj';
const rememberDevice = ref(true); // quando true usa localStorage, senão sessionStorage

function getStorage() {
  return rememberDevice.value ? localStorage : sessionStorage;
}
function getStoredPinObj() {
  try {
    const raw = getStorage().getItem(PIN_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
function setStoredPinObj(obj) {
  try {
    if (!obj) getStorage().removeItem(PIN_STORAGE_KEY);
    else getStorage().setItem(PIN_STORAGE_KEY, JSON.stringify(obj));
  } catch {}
}

// helper SHA-256 -> hex
async function hashStringHex(input) {
  const enc = new TextEncoder();
  const data = enc.encode(input);
  const hash = await crypto.subtle.digest('SHA-256', data);
  const arr = Array.from(new Uint8Array(hash));
  return arr.map(b => b.toString(16).padStart(2, '0')).join('');
}

/* ---------- suas funções de login por usuário/senha (mantive e integrei) ---------- */
const enterClient = () => {
  // 👉 Faz o teclado sumir no celular
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur()
  }
  const userData = client.data.value || [];

  // Verifica se o usuário principal existe e não é coach
  const userExists = userData.some(
    u => u.username === user.value && u.password === senha.value && !u.coach
  );

  // Verifica se o usuário existe em algum `team`
  const teamMember = userData
    .flatMap(u => u.team || []) // Garante que lidamos com times definidos ou ausentes
    .find(
      member => member.username === user.value && member.password === senha.value
    );

  // 🔒 Verifica se o usuário principal está bloqueado
  const blockedUser = userData.find(
    u =>
      u.username === user.value &&
      u.password === senha.value &&
      u.status === 'Bloqueado'
  );

  // 🔒 Verifica se o membro de time está bloqueado
  const blockedTeamMember = userData
    .flatMap(u => u.team || [])
    .find(
      member =>
        member.username === user.value &&
        member.password === senha.value &&
        member.status === 'Bloqueado'
    );

  if (blockedUser || blockedTeamMember) {
    console.log("Usuário bloqueado!");
    userBlocked.value = true;
    setTimeout(() => {
      userBlocked.value = false;
    }, 2000);
    return;
  }

  if (userExists) {
    console.log("Usuário principal encontrado e não é coach!");
    const foundUser = userData.find(
      u => u.username === user.value && !u.coach
    );
    // Configura o cookie com o ID do coach
    coachIdCookie.value = foundUser._id;
    return navigateTo(`/atleta/${foundUser._id}`);
  } else if (teamMember) {
    console.log("Atleta encontrado no time!");
    // Encontra o coach associado ao atleta no time
    const coach = userData.find(
      u => u.team && u.team.some(t => t._id === teamMember._id)
    );
    if (coach) {
      coachIdCookie.value = coach._id; // Configura o cookie com o ID do coach
    }
    return navigateTo(`/atleta/${teamMember._id}`);
  } else {
    console.log("Usuário não encontrado ou senha incorreta!");
    dontUser.value = true;
    setTimeout(() => {
      dontUser.value = false;
    }, 2000);
  }
};

const divUser = ref(true);
const divSenha = ref(false);
function enterDivSenha() {
divUser.value = false
divSenha.value = true
}

const trigger = () => {
  enterClient();
};

const id = ref('');
const dontPerson = ref('')
const enterPersonal = () => {
  const userData = client.data.value || [];
  const userExists = userData.some(u => u.username === user.value && u.password === senha.value);
  const idExists = userData.find(u => u.username === user.value && u.password === senha.value);

  if (userExists) {
    console.log("Usuário encontrado!");
    return navigateTo(`/coach/${idExists._id}`);
  } else {
    console.log("Usuário não encontrado ou senha incorreta!");
    dontUser.value = true;
    setTimeout(() => {
      dontUser.value = false;
    }, 5000);
  }
};

const trig = () => {
  enterPersonal()
}

/* ---------- PIN interaction functions ---------- */
function pressDigit(d) {
  if (pinDigits.value.length >= maxPinLength) return
  pinDigits.value.push(d)
  pinError.value = ''
  if (pinDigits.value.length === maxPinLength) {
    submitPin()
  }
}
function backspace() {
  pinDigits.value.pop()
}

async function submitPin() {
  isSubmittingPin.value = true
  pinError.value = ''
  const entered = pinDigits.value.join('')
  try {
    const obj = getStoredPinObj()
    if (!obj || !obj.hash || !obj.userId) {
      pinError.value = 'Nenhum PIN cadastrado neste dispositivo.'
      triggerShake()
      return
    }
    const h = await hashStringHex(entered)
    if (h === obj.hash) {
      // Encontrar o usuário pelo userId no client.data e redirecionar conforme tipo
      const userData = client.data.value || [];
      const found = userData.find(u => u._id === obj.userId) ||
                    // também buscar em times (caso o PIN esteja associado a um membro de time)
                    userData.flatMap(u => u.team || []).find(t => t._id === obj.userId)
      if (found) {
        // Se for membro de time, redireciona para atleta, senão para atleta/coach conforme coach flag
        if (found._id && !found.coach) {
          // se for atleta (ou membro), vamos para rota atleta
          return navigateTo(`/atleta/${found._id}`)
        } else if (found._id && found.coach) {
          return navigateTo(`/coach/${found._id}`)
        } else {
          // fallback
          return navigateTo(`/atleta/${obj.userId}`)
        }
      } else {
        // fallback: redireciona para /app ou exibe erro
        return navigateTo(`/atleta/${obj.userId}`)
      }
    } else {
      pinError.value = 'PIN incorreto'
      triggerShake()
    }
  } catch (e) {
    pinError.value = 'Erro ao validar PIN'
    triggerShake()
  } finally {
    isSubmittingPin.value = false
    pinDigits.value = []
  }
}

function triggerShake() {
  shake.value = true
  setTimeout(()=> (shake.value = false), 600)
}

/* ---------- criar / remover PIN (após autenticação via senha) ---------- */
const showSetPinModal = ref(false)
const newPin = ref('')
const confirmPin = ref('')
const setPinError = ref('')
const setPinLoading = ref(false)
const hasPinStored = ref(false)

async function openSetPin() {
  // neste exemplo simples, assumimos que o usuário já se autenticou por senha antes de criar PIN
  // se quiser, exija reautenticação - aqui abrimos modal
  newPin.value = ''
  confirmPin.value = ''
  setPinError.value = ''
  showSetPinModal.value = true
}

function closeSetPin() {
  showSetPinModal.value = false
}

async function handleSetPin() {
  setPinError.value = ''
  if (!/^\d+$/.test(newPin.value) || newPin.value.length < 4) {
    setPinError.value = 'PIN deve ter ao menos 4 dígitos numéricos.'
    return
  }
  if (newPin.value !== confirmPin.value) {
    setPinError.value = 'PINs não coincidem.'
    return
  }
  // aqui vamos tentar associar o PIN ao usuário atualmente logado (com base no campo `user` ou `senha`)
  // melhor prática: criar PIN somente após autenticação real. No exemplo, tentamos encontrar o usuário atual
  setPinLoading.value = true
  try {
    const userData = client.data.value || [];
    // procurar usuário com credenciais atuais
    const foundUser = userData.find(u => u.username === user.value && u.password === senha.value)
    // se não achar, tentamos encontrar membro de time com as mesmas credenciais
    const foundTeamMember = userData.flatMap(u => u.team || []).find(m => m.username === user.value && m.password === senha.value)

    const targetId = foundUser ? foundUser._id : (foundTeamMember ? foundTeamMember._id : null)
    if (!targetId) {
      setPinError.value = 'Autentique-se com usuário/senha antes de criar o PIN (use os campos acima).'
      setPinLoading.value = false
      return
    }

    const h = await hashStringHex(newPin.value)
    setStoredPinObj({ hash: h, userId: targetId })
    showSetPinModal.value = false
    hasPinStored.value = true
    alert('PIN salvo neste dispositivo.')
  } catch (err) {
    setPinError.value = 'Falha ao salvar PIN.'
  } finally {
    setPinLoading.value = false
    newPin.value = ''
    confirmPin.value = ''
  }
}

async function handleRemovePin() {
  const ok = confirm('Remover PIN deste dispositivo?')
  if (!ok) return
  setStoredPinObj(null)
  alert('PIN removido.')
  hasPinStored.value = false
}

/* detecta se existe PIN armazenado ao montar */
onMounted(() => {
  // tenta detectar storage em local/session (checamos ambos para compat)
  try {
    const ls = localStorage.getItem(PIN_STORAGE_KEY)
    const ss = sessionStorage.getItem(PIN_STORAGE_KEY)
    hasPinStored.value = !!(ls || ss)
  } catch {
    hasPinStored.value = false
  }
})

watch(rememberDevice, () => {
  // atualizar indicação de PIN (se mudar a opção, a checagem de onde está armazenado muda)
  try {
    const raw = getStorage().getItem(PIN_STORAGE_KEY)
    hasPinStored.value = !!raw
  } catch {
    hasPinStored.value = false
  }
})

/* ---------- helper para exibir dots do PIN ---------- */
const pinDots = computed(() => new Array(maxPinLength).fill(0).map((_, i) => i < pinDigits.value.length))

/* ---------- restante do seu código de UI / tema / toggles mantidos ---------- */
const photoOpen = ref(false);
function openPhoto() {
  photoOpen.value = !photoOpen.value;
}

const colorMode = useColorMode()

colorMode.value =  "dark";

function theme() {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
}

const colorCookie = useCookie('colorCookie')
if (colorMode.value === "dark") {
  colorCookie.value = "darkCookie"
} else {
 colorCookie.value = "lightCookie"
}
colorCookie.value === "darkCookie" ? colorMode.value = "dark" : colorMode.value ="light"

const passView = ref(true)
const pass = ref('password')
function swPass() {
  passView.value = !passView.value;
  pass.value = 'password'
};

function swText() {
  passView.value = !passView.value;
  pass.value = 'text'
};

const linkClient = ref(true)
const linkPersonal = ref(false)
const atletaShow = ref(true)
const coachShow = ref(true)

function buttonFeed() {
  linkClient.value = true
  linkPersonal.value = false
  atletaShow.value = true
}

function buttonPartner() {
  linkClient.value = false
  linkPersonal.value = true
  atletaShow.value = false
}

const divLogin = ref(true)
const divAtleta = ref(false)
const divCoach = ref(false)
function formAtleta () {
  divLogin.value = false
  divAtleta.value = true
}
function formCoach () {
  divLogin.value = false
  divAtleta.value = false
}
function close () {
  divLogin.value = true
}

</script>

<template>
<div v-if='divLogin'>
  <div>
    <div v-if='dontUser' class="float">
      <div class="notific-float zoomOut">
        <div>
          <Icon name='material-symbols:x-circle-outline-rounded' style="color: red; zoom:2.2" />
        </div>
        <div>
          <div>
            <h3>
              Usuário não encontrado!
            </h3>
          </div>
        </div>
      </div>
    </div>

    <div v-if='userBlocked' class="float">
      <div class="notific-float zoomOut">
        <div>
          <Icon name='material-symbols:x-circle-outline-rounded' style="color: red; zoom:2.2" />
        </div>
        <div>
          <div>
            <h3 style='text-align: center;'>
              Usuário temporariamente suspenso!
            </h3>
          </div>
        </div>
      </div>
    </div>

    <div class="head-name">
      <div class="name">
        <Nav/>
      </div>
      <div class="link">
        <NuxtLink @click="buttonFeed" :class="{ aActive: linkClient }">
          Atletas
        </NuxtLink>
        <NuxtLink @click="buttonPartner" :class="{ aActivee: linkPersonal }">
          Coach
        </NuxtLink>
      </div>
    </div>

    <!-- Aqui: toggle entre PIN e formulário normal -->
    <div v-if='usingPin' style="display:flex; justify-content:center; gap:12px; margin-bottom:12px;">
      <button @click="usingPin = true" :class="{ aActive: usingPin }" class="login">PIN</button>
      <button @click="usingPin = false" :class="{ aActive: !usingPin }" class="login">Senha</button>
    </div>

    <!-- PIN area -->
    <div v-if="usingPin" class="login-pin" style="display:flex; flex-direction:column; align-items:center;">
      <div class="pin-display" :class="{'shake': shake}">
        <span v-for="(on, idx) in pinDots" :key="idx" :class="['dot', on ? 'filled' : '']"></span>
      </div>

      <p v-if="hasPinStored" class="hint">Insira seu PIN ({{ maxPinLength }} dígitos)</p>
      <p v-else class="hint">Nenhum PIN cadastrado neste dispositivo.<br> Crie um PIN após autenticar com usuário/senha.</p>

      <p v-if="pinError" class="error">{{ pinError }}</p>

      <div class="keypad" style="max-width:320px; margin-top:8px;">
        <button v-for="d in ['1','2','3','4','5','6','7','8','9']"
                :key="d"
                class="key"
                @click="pressDigit(d)"
                :disabled="isSubmittingPin"
                aria-label="Tecla {{d}}">
          <span class="num">{{ d }}</span>
        </button>

        <button class="key ghost" @click="backspace" :disabled="isSubmittingPin" aria-label="Apagar">⌫</button>

        <button class="key" @click="pressDigit('0')" :disabled="isSubmittingPin" aria-label="Tecla zero">
          <span class="num">0</span>
        </button>

        <button class="key action" @click="submitPin" :disabled="isSubmittingPin" aria-label="Entrar por PIN">
          <span v-if="isSubmittingPin" class="spinner"></span>
          <span v-else>OK</span>
        </button>
      </div>

      <div style="margin-top:10px; display:flex; gap:8px; align-items:center; justify-content:center; flex-wrap:wrap;">
        <label style="color:var(--muted); display:flex; align-items:center; gap:8px;">
          <input type="checkbox" v-model="rememberDevice" /> Lembrar neste dispositivo
        </label>
        <button class="login" @click="openSetPin">Criar / Alterar PIN</button>
        <button class="login" @click="handleRemovePin">Remover PIN</button>
      </div>
    </div>

    <!-- Cliente (formulário original) -->
    <div v-else-if='atletaShow' class="inputs">
      <div v-if='divUser'>
        <input type="email" @keyup.enter="enterDivSenha()" name="" id="username" placeholder="Usuário" autofocus
          v-model="user" required autocomplete="username">
      </div>
      <div v-if='divUser'>
        <NuxtLink class='login' @click="enterDivSenha()">
          AVANÇAR
          <Icon name="ic:round-keyboard-arrow-right" />
        </NuxtLink>
      </div>
      <h3 v-if='divSenha'> {{user}} </h3>
      <div v-if='divSenha' class="senha">
        <input v-bind:type="pass" @keyup.enter="trigger" name="" id="password" placeholder="Senha"
          v-model="senha" autocomplete="off">
        <Icon @click="swText" v-if="passView" name="mdi:eye" id="password-icon" />
        <Icon @click="swPass" v-else name="mdi:eye-off" id="password-icon" />
      </div>
        <label v-if='divSenha' style="color:var(--muted); display:flex; align-items:center; gap:2px;">
          <input type="checkbox" v-model="rememberDevice" /> Crie um PIN após autenticar senha. 
        </label>
      <div v-if='divSenha'>
        <NuxtLink class='login' @click="enterClient">
          LOGIN
          <Icon name="solar:login-3-outline" />
        </NuxtLink>
      </div>
      <div class="lost">
        <a href="https://api.whatsapp.com/send?phone=5521936184024%20&text=Ol%C3%A1%20professor!%20Esqueci%20o%20meu%20email%20e%20minha%20senha!"
          target="_blank">
          <h5>Esqueci minha senha</h5>
        </a>
      </div>
      <div class="lost">
        <a>
          <h5>
            Não tem cadastro? Clique
            <NuxtLink @click='formAtleta' class='it'>aqui</NuxtLink>
          </h5>
        </a>
      </div>
    </div>

    <!-- Personal -->
    <div v-else-if='coachShow' class="inputs">
      <div>
        <input type="email" @keyup.enter="trigger" name="" id="username" placeholder="Usuário" autofocus
          v-model="user" required autocomplete="username">
      </div>
      <div class="senha">
        <input v-bind:type="pass" @keyup.enter="trig" name="" id="password" placeholder="Senha"
          v-model="senha" autocomplete="off">
        <Icon @click="swText" v-if="passView" name="mdi:eye" id="password-icon" />
        <Icon @click="swPass" v-else name="mdi:eye-off" id="password-icon" />
      </div>
      <div>
        <NuxtLink class='login' @click="enterPersonal">
          LOGIN
          <Icon name="solar:login-3-outline" />
        </NuxtLink>
      </div>
      <div class="lost">
        <a href="https://api.whatsapp.com/send?phone=5521936184024%20&text=Ol%C3%A1%20professor!%20Esqueci%20o%20meu%20email%20e%20minha%20senha!"
          target="_blank">
          <h5>Esqueci minha senha</h5>
        </a>
      </div>
      <div class="lost">
        <a>
          <h5>
            Não tem cadastro? Clique
            <NuxtLink @click='formCoach' class='it'>aqui</NuxtLink>
          </h5>
        </a>
      </div>
    </div>

  </div>

  <div class="color">
    <a @click="theme()" :model="$colorMode.value">
      <Icon
        :name="colorMode.value === 'dark' ? 'line-md:moon-filled-to-sunny-filled-loop-transition' : 'line-md:sunny-filled-loop-to-moon-alt-filled-loop-transition'" />
    </a>
  </div>

</div>

  <div v-else-if='divAtleta'>

    <div class="form-personal">
        <div class='button-close'>
            <Icon name='material-symbols:cancel' @click='close()'/>
        </div>

        <FormAtleta/>

    </div>

  </div>
  <div v-else>

    <div class="form-personal">

        <div class='button-close'>
            <Icon name='material-symbols:cancel' @click='close()'/>
        </div>
        <FormCoach/>

    </div>

  </div>

  <!-- modal de criar PIN -->
  <div v-if="showSetPinModal" class="modal-backdrop" @click.self="closeSetPin">
    <div class="modal">
      <h3>Criar / Alterar PIN</h3>
      <p class="muted">PIN numérico — mínimo 6 dígitos. O PIN ficará armazenado localmente (hash) e associado ao seu usuário.</p>

      <input v-model="newPin" inputmode="numeric" pattern="[0-9]*" placeholder="Novo PIN" />
      <input v-model="confirmPin" inputmode="numeric" pattern="[0-9]*" placeholder="Confirmar PIN" />

      <p v-if="setPinError" class="error">{{ setPinError }}</p>

      <div class="modal-actions">
        <button class="login" @click="handleSetPin" :disabled="setPinLoading">
          <span v-if="setPinLoading" class="spinner"></span>
          Salvar PIN
        </button>
        <button class="login" @click="closeSetPin">Cancelar</button>
      </div>
    </div>
  </div>

</template>
<style scoped>
a {
  text-decoration: none;
  transition: all .3s linear;
  border: solid 2px transparent ;
}

.it {
    text-decoration: underline;
    cursor: pointer;
}

.button-close .icon{
    position: fixed;
    top: 2rem;
    right: 2rem;
    zoom: 1.2;
}

.form-personal {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    transform: translateX(0%);
    height: calc(100% - 0px);
    width: 100%;
    backdrop-filter: blur(55px);
    z-index: 1004;
}

.link {
   display: flex;
   justify-content: space-evenly;
   margin-top: 1rem;
   font-size: 1.1rem;
}

.link a {
    letter-spacing: 3px;
    margin: 5px 15px;
    text-align: center;
    cursor: pointer;
    font-family: 'Gagalin';
    letter-spacing: 3px;
}
.link   a:hover {
    cursor: pointer;
}


.aActive {
    color: #000;
}
.dark-mode .aActive {
  color:#fff;
}
.aActivee {
color:#000;
}
.dark-mode .aActivee {
  color: #fff;
}

body a {
    text-decoration: none;
    color: #aaa;
    transition: all .4s 
linear;
}
.head-logo {
  display: flex;
  justify-content: center;
  flex-direction: row-reverse;
  align-items: center;
  z-index: 1;
  flex-wrap: wrap;
}
.senha {
   color: #000;
  position: relative;
}
.dark-mode .senha{
  color: #fff;
  position:relative;
}

#password-icon {
  position: absolute;
  top: 19px;
  right: 12px;
  z-index: 100;
}

.swt {
display: flex;
justify-content: center;
flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
}

h3 {
  margin: 30px 10px 0 10px;

}

.logo {
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  height: 100px;
  width: 100px;
  margin: 7rem 0 1rem 0;
  border-radius: 50px 50px 50px 50px;
  z-index: 10;
}

.logo svg {
  height: 100px;
  width: 100px;
  z-index: 100;
  opacity: 1;
}

svg path {
  fill: #fff;
} 



.button-client {
  margin: 2rem 1.5rem;
  transition: all .4s linear;
  border: solid 1px #000;
  box-shadow: 0 0px 5px #000;
  border-radius: 8px;
  cursor: pointer;
  width: 160px;
  text-align: center;
  line-height: 18px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease-in-out 0s;
  height: 34px;
  font-size: 14px;
  padding-inline: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  background: var(--player-color);
}

.button-client:hover {
  background-color: var(--player-color)10;
  color: var(--player-color)80;
}

.button-client .icon {
  margin-top: -5px;
  margin-right: 5px;
  transition: all 0.2s ease-in-out 0s;
}

.button-client:hover .icon {
  color: var(--player-color)80;
}

.head-name {
  display: flex;
  margin-bottom: 10px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
}
.name {
  font-family: 'Gagalin';
  src: url('~/assets/Gagalin.otf') format('opentype');
  letter-spacing: 3px;
  font-size: 1.4rem;
  line-height: 1.5rem;
  margin: .2rem 1.5rem;
  color: var(--player-color);
}

@font-face {
  font-family: 'Gagalin';
  src: url('~/assets/Gagalin.otf') format('opentype');
}


.color {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
  position: fixed;
  height: 35px;
  width: 35px;
  transition: all 0.2s ease-in-out 0s;
  bottom: 3rem;
  /* bottom: 6rem; */
  right:1.5rem;
  border-radius: 9px;
  cursor: pointer;
  z-index: 100;
  border: solid 1px var(--player-color)10;
  box-shadow: 0 0px 5px var(--player-color)40;
  backdrop-filter: blur(100px)
}
.whats {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    position: fixed;
    height: 35px;
    width: 35px;
    transition: all 0.2s ease-in-out 0s;
    bottom: 3.5rem;
    right:1.5rem;
    border-radius: 9px;
    cursor: pointer;
    z-index: 100;
    border: solid 1px var(--player-color)10;
    box-shadow: 0 0px 5px var(--player-color)40;
    backdrop-filter: blur(100px)
}
.whats .icon, .color .icon {
  color: var(--player-color)90;
  zoom: 1;
}

.inputs {
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
}

.inputs div {
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
}

.dont-user {
  position: fixed;
  top: 10px;
  right: 10px;
  width: 12px;
  background-color: #ff1900;
  color: #fff;
  text-shadow: 2px 2px 2px #111;
  z-index: 20;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  border-radius: 5px;
  font-weight: bolder;
  padding: 8px 0px;
}

input {
  margin: .5rem auto;
  transition: all .4s linear;
  text-align: left;
  line-height: 18px;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.2s ease-in-out 0s;
  height: 36px;
  font-size: 14px;
  padding-inline: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
}

.inputs div h4 {
  text-align: left;
}

input:focus-visible {
  border: solid 1px var(--player-color);
  background-color: var(--player-color)10;
}

input:active {
  border-color: #000;
}

input:hover {
  background-color: var(--player-color)10;
}


input:focus {
  border: 0 none;
  background: #f4f4f4;
  color:#000;
  border: solid 2px #000;
  outline: 0;
}
.dark-mode input:focus {
  color: #fff;
  background: #181d26;
  border: solid 2px #fff;
}

body input {
  background: transparent;
  color: #000;
  border: solid 2px #000;
}

.dark-mode input {
color: #ffffff;
  border: solid 2px #fff;
}

body input::placeholder {
  color: #000;
}

.dark-mode input::placeholder {
  color: #fff;
}


h4 {
  transition: all .3s linear;
  margin: 0 0 0 10px;
  text-align: left;
}

h4:nth-child(1) {
  transition: all .3s linear;
  margin: 20px 0 0 10px;
}


.login {
  transition: all .4s linear;
  cursor: pointer;
  width: 140px;
  text-align: center;
  line-height: 18px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease-in-out 0s;
  height: 30px;
  font-size: 14px;
  padding-inline: 16px;
  padding-top: 6px;
  padding-bottom: 8px;
  margin: 1rem 1.5rem;
  background: transparent;
  color: #eee;
}
.dark-mode .login{
  background: #fff;
  color:#000;
      padding: 8px 12px;
    border-radius: 10px;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.04);
    color: var(--muted);
    cursor: pointer;
}

.lost h5{
  font-size: .6rem;
  color: #000;
}
.dark-mode .lost h5{
  color: #fff;
}

.login .icon {
  margin: -2px 0px 2px 4px;
  transition: transform .3s linear;
}

.login:hover {
  cursor: pointer;
  opacity: .7;
}
.login:hover .icon {
  margin: -2px 0px 2px 4px;
  transform: translateX(6px);
}
.float{
    position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1002;
      background: #ecedf060;
      backdrop-filter: blur(1px); /* Desfoque do fundo */
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* Sombras (opcional) */
      color: #333; /* Cor do texto */
      width: 100%; /* Largura fixa */
      height: 100vh; /* Altura fixa */
      padding: 20px; /* Espaçamento interno */
      text-align: center;
}

.notific-float {
    background: #fff;
    width:576px; /* Largura fixa */
      height: 128px; /* Altura fixa */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: relative; /* Fixa a div em relação à tela */
    top: 50%; /* Posiciona a div no meio da altura */
    left: 50%; /* Posiciona a div no meio da largura */
    transform: translate(
        -50%,
        -50%
    ); /* Centraliza ajustando a posição do elemento */
    z-index: 9999; /* Garante que esteja acima de todo o conteúdo */
    color: #000;
    padding:20px; /* Espaço interno */
    border-radius: 10px; /* Cantos arredondados (opcional) */
    text-align: left; /* Alinha o texto centralizado */
    backdrop-filter: blur(10px); /* Desfoque do fundo */
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* Sombras (opcional) */
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
}
.dark-mode .notific-float {
    background: #0f141e;
    color: #fff;
}

.notific-float h3 {
  margin: 5px 0 0 0;
}


@media (max-width: 1000px) {
.notific-float {
  width: 350px;
}
}
/* --- base (reescrevendo/resumindo um pouco do estilo anterior) --- */
* { box-sizing: border-box; }
:root {
  --card-bg: rgba(255,255,255,0.05);
  --muted: rgba(255,255,255,0.7);
  --accent: #6ea8fe;
}
.login-screen {
  min-height: 100vh;
  height: 100dvh;
  position: relative;
  display: grid;
  place-items: center;
  color: white;
  font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial;
}
.wallpaper {
  position: absolute; inset: 0;
  background-image: url('/chromeos-wallpaper.jpg'), linear-gradient(135deg,#0f172a 0%, #071133 100%);
  background-size: cover; background-position: center;
  filter: blur(8px) saturate(1.05); transform: scale(1.04); z-index: 0;
}
.center-wrap { position: relative; z-index: 2; width: 100%; max-width: 460px; padding: 24px; display:flex; flex-direction:column; gap:18px; align-items:center; }

/* card */
.login-card {
  width: 100%; background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02));
  border-radius: 14px; padding: 20px; box-shadow: 0 10px 30px rgba(2,6,23,0.6);
  backdrop-filter: blur(6px); border: 1px solid rgba(255,255,255,0.04); display:grid; gap:12px; text-align:center;
}

/* user */
.user-block .avatar { width:96px;height:96px;border-radius:50%;object-fit:cover;border:3px solid rgba(255,255,255,0.06);margin:0 auto;transition: transform .28s ease; }
.user-name { margin:6px 0 0; font-size:1.1rem; }
.user-email { margin:0; color:var(--muted); font-size:.9rem; }

/* tabs */
.mode-switch { display:flex; gap:8px; justify-content:center; margin-top:6px; }
.tab { padding:8px 12px; border-radius:10px; background:transparent; border:1px solid rgba(255,255,255,0.04); color:var(--muted); cursor:pointer; }
.tab.active { background: linear-gradient(90deg,var(--accent), #4a89ff); color:white; border-color: rgba(255,255,255,0.06); transform: translateY(-2px); }

/* PIN display */
.pin-display { margin: 12px 0; display:flex; justify-content:center; align-items:center; min-height:36px; gap:20px;}
.dots { display:flex; gap:10px; }
.dot { width:14px;height:14px;border-radius:50%;border:1px solid rgba(255,255,255,0.12); background:transparent; transition: all .18s ease; }
.dot.filled { background:white; transform: scale(0.95); box-shadow: 0 6px 14px rgba(2,6,23,0.6); }

/* shake animation */
@keyframes shakeX { 0%{transform:translateX(0)}25%{transform:translateX(-8px)}50%{transform:translateX(8px)}75%{transform:translateX(-6px)}100%{transform:translateX(0)} }
.shake { animation: shakeX .45s cubic-bezier(.36,.07,.19,.97); }

/* keypad */
.keypad { display:grid; grid-template-columns: repeat(3, 1fr); gap:10px; margin-top:8px; width:100%; }
.key { padding:18px 0; border-radius:10px; font-size:1.05rem; background: rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.04); cursor:pointer; user-select:none; transition: transform .12s cubic-bezier(.2,.9,.3,1), box-shadow .12s; display:flex; align-items:center; justify-content:center; }
.key:active { transform: scale(.96); box-shadow: 0 6px 18px rgba(2,6,23,0.6); }
.key.ghost { background: transparent; color: var(--muted); }
.key.action { grid-column: 3 / 4; background: linear-gradient(90deg,var(--accent), #4a89ff); color:white; font-weight:600; }
.num { font-weight:600; font-size:1.05rem; }

/* actions */
.pin-actions { display:flex; gap:10px; justify-content:center; align-items:center; margin-top:8px; flex-wrap:wrap; }
.remember { display:flex; gap:8px; align-items:center; color:var(--muted); font-size:.9rem; }

/* password area */
.password-input { padding:10px 12px; border-radius:10px; border:1px solid rgba(255,255,255,0.06); background: rgba(0,0,0,0.16); color:white; width:100%; margin-top:8px; }
.actions-row { display:flex; gap:8px; margin-top:10px; justify-content:center; }

/* buttons */
.login-btn { padding:10px 16px; border-radius:10px; background: linear-gradient(90deg,var(--accent), #4a89ff); color:white; border:none; font-weight:600; cursor:pointer; min-width:110px; display:inline-flex; align-items:center; gap:8px; justify-content:center;}
.secondary-btn { padding:10px 12px; border-radius:10px; background: transparent; border:1px solid rgba(255,255,255,0.06); color:var(--muted); cursor:pointer; }
.ghost { background: transparent; border: none; color: var(--muted); cursor: pointer; }

/* spinner */
.spinner { width:14px; height:14px; border-radius:50%; border:2px solid rgba(255,255,255,0.14); border-top-color:white; animation: spin .9s linear infinite; display:inline-block; }
@keyframes spin { to { transform: rotate(360deg); } }

/* errors / hints */
.error { color: #ffb4b4; margin-top:8px; font-size:.9rem; }
.hint { color: var(--muted); margin-top:4px; font-size:.9rem; }

/* footer */
.footer-controls { width:100%; display:flex; justify-content:space-between; align-items:center; color: var(--muted); gap:12px; font-size:.9rem; padding:6px 6px 0 6px; }

/* modal */
.modal-backdrop { position: fixed; inset:0; background: rgba(2,6,23,0.6); display:flex; align-items:center; justify-content:center; z-index: 50; }
.modal { background: #0f172a; padding:18px; border-radius:12px; width: min(420px, 92%); border:1px solid rgba(255,255,255,0.04); box-shadow: 0 20px 60px rgba(2,6,23,0.8); display:flex; flex-direction:column; gap:10px; }
.modal input { padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.06); background: rgba(255,255,255,0.02); color:white; }
.modal .muted { color: var(--muted); font-size:.9rem; }
.modal-actions { display:flex; gap:8px; justify-content:flex-end; margin-top:6px; }

/* responsive */
@media (max-width:420px) {
  .key { padding:14px 0; }
  .avatar { width:80px;height:80px; }
}

</style>
