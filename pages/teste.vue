<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useAuth from '~/composables/useAuth'

const router = useRouter()
const { login } = useAuth()

/* ---------- usuário mock --------- */
const user = ref({
  name: 'Leandro Costa',
  email: 'leandro@example.com',
  avatarUrl: '/avatar-default.png'
})

/* ---------- senha tradicional -------- */
const password = ref('')
const loading = ref(false)
const error = ref('')

async function handlePasswordLogin() {
  error.value = ''
  if (!password.value) return
  loading.value = true
  try {
    await login({ email: user.value.email, password: password.value })
    // redireciona após login
    router.push('/app')
  } catch (err: any) {
    error.value = err?.message ?? 'Falha ao autenticar'
  } finally {
    loading.value = false
  }
}

/* ---------- PIN flow (UI) ---------- */
const usingPin = ref(true) // mostrar teclado PIN por padrão
const pinDigits = ref<string[]>([]) // digits entered
const maxPinLength = 4
const isSubmittingPin = ref(false)
const pinError = ref('')
const shake = ref(false)

/* persistence options */
const rememberDevice = ref(true) // quando true usa localStorage, senão sessionStorage

/* helper: hash string com Web Crypto (SHA-256) */
async function hashStringHex(input: string) {
  const enc = new TextEncoder()
  const data = enc.encode(input)
  const hash = await crypto.subtle.digest('SHA-256', data)
  const arr = Array.from(new Uint8Array(hash))
  return arr.map(b => b.toString(16).padStart(2, '0')).join('')
}

/* storage helpers */
const PIN_STORAGE_KEY = 'vault.pinHash'

function getStorage() {
  return rememberDevice.value ? localStorage : sessionStorage
}
async function getStoredPinHash() {
  try {
    return getStorage().getItem(PIN_STORAGE_KEY)
  } catch {
    return null
  }
}
async function setStoredPinHash(hash: string | null) {
  try {
    if (!hash) {
      getStorage().removeItem(PIN_STORAGE_KEY)
    } else {
      getStorage().setItem(PIN_STORAGE_KEY, hash)
    }
  } catch {}
}

/* tecla pressionada */
function pressDigit(d: string) {
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

/* verificar PIN localmente: compara hash do PIN digitado com o hash armazenado */
async function submitPin() {
  isSubmittingPin.value = true
  pinError.value = ''
  const entered = pinDigits.value.join('')
  try {
    const storedHash = await getStoredPinHash()
    if (!storedHash) {
      pinError.value = 'Nenhum PIN cadastrado neste dispositivo.'
      triggerShake()
      return
    }
    const h = await hashStringHex(entered)
    if (h === storedHash) {
      // sucesso - aqui você pode chamar sua API para obter token real. No demo, só redireciona.
      // Exemplo: await login({ email: user.email, pin: entered })  (no demo, não usado)
      router.push('/app')
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

async function openSetPin() {
  // modal para criar PIN (em produção exigir reautenticação)
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
  setPinLoading.value = true
  try {
    const h = await hashStringHex(newPin.value)
    await setStoredPinHash(h)
    showSetPinModal.value = false
    // opcional: informar ao usuário
    alert('PIN salvo neste dispositivo.')
  } catch (err) {
    setPinError.value = 'Falha ao salvar PIN.'
  } finally {
    setPinLoading.value = false
  }
}

async function handleRemovePin() {
  const ok = confirm('Remover PIN deste dispositivo?')
  if (!ok) return
  await setStoredPinHash(null)
  alert('PIN removido.')
}

/* --------- auto-detect if PIN present (to show hint) ---------- */
const hasPinStored = ref(false)
async function refreshHasPin() {
  hasPinStored.value = !!(await getStoredPinHash())
}
onMounted(refreshHasPin)
watch(rememberDevice, refreshHasPin)

/* small helper: show masked dots */
const pinDots = computed(() => {
  return new Array(maxPinLength).fill(0).map((_, i) => i < pinDigits.value.length)
})

</script>

<template>
  <div class="login-screen" role="main">
    <div class="wallpaper" aria-hidden="true"></div>

    <div class="center-wrap">
      <div class="login-card" role="form">
        <div class="user-block">
          <img :src="user.avatarUrl" alt="" class="avatar" />
          <h1 class="user-name">{{ user.name }}</h1>
          <p class="user-email">{{ user.email }}</p>
        </div>

        <!-- toggle entre PIN e senha -->
        <div class="mode-switch">
          <button :class="['tab', usingPin ? 'active' : '']" @click="usingPin = true">PIN</button>
          <button :class="['tab', !usingPin ? 'active' : '']" @click="usingPin = false">Senha</button>
        </div>

        <!-- PIN view -->
        <div v-if="usingPin" class="pin-area">
          <div :class="['pin-display', shake ? 'shake' : '']" aria-hidden="false">
            <div class="dots">
              <span v-for="(on, idx) in pinDots" :key="idx" :class="['dot', on ? 'filled' : '']"></span>
            </div>
          </div>

          <p class="hint" v-if="hasPinStored">Insira seu PIN ({{ maxPinLength }} dígitos)</p>
          <p class="hint" v-else>Sem PIN cadastrado. Crie um PIN após autenticar por senha.</p>

          <p v-if="pinError" class="error" role="alert">{{ pinError }}</p>

          <!-- keypad -->
          <div class="keypad" aria-hidden="false">
            <button v-for="d in ['1','2','3','4','5','6','7','8','9']"
                    :key="d"
                    class="key"
                    @click="pressDigit(d)"
                    :disabled="isSubmittingPin"
                    aria-label="Tecla {{d}}">
              <span class="num">{{ d }}</span>
            </button>

            <button class="key ghost" @click="backspace" :disabled="isSubmittingPin" aria-label="Apagar">
              ⌫
            </button>

            <button class="key" @click="pressDigit('0')" :disabled="isSubmittingPin" aria-label="Tecla zero">
              <span class="num">0</span>
            </button>

            <button class="key action" @click="submitPin" :disabled="isSubmittingPin" aria-label="Entrar por PIN">
              <span v-if="isSubmittingPin" class="spinner"></span>
              <span v-else>OK</span>
            </button>
          </div>

          <div class="pin-actions">
            <label class="remember">
              <input type="checkbox" v-model="rememberDevice" />
              Lembrar neste dispositivo
            </label>
            <button class="ghost" @click="openSetPin">Criar / Alterar PIN</button>
            <button class="ghost" @click="handleRemovePin">Remover PIN</button>
          </div>
        </div>

        <!-- Password view -->
        <div v-else class="password-area">
          <input v-model="password" type="password" placeholder="Digite sua senha" @keyup.enter="handlePasswordLogin"
                 :disabled="loading" class="password-input" />
          <div class="actions-row">
            <button class="login-btn" @click="handlePasswordLogin" :disabled="loading || !password">
              <span v-if="loading" class="spinner"></span>
              Entrar
            </button>
            <button class="secondary-btn" @click="openSetPin">Criar PIN</button>
          </div>
          <p v-if="error" class="error" role="alert">{{ error }}</p>
        </div>
      </div>

      <div class="footer-controls" aria-hidden="false">
        <div class="left-actions">
          <button class="ghost">Acessibilidade</button>
        </div>
        <div class="right-actions">
          <div class="status">
            <span class="dot" title="Conectado"></span>
            <span class="text">Wi-Fi</span>
          </div>
          <button class="ghost">Sair</button>
        </div>
      </div>
    </div>

    <!-- modal de criar PIN -->
    <div v-if="showSetPinModal" class="modal-backdrop" @click.self="closeSetPin">
      <div class="modal">
        <h3>Criar / Alterar PIN</h3>
        <p class="muted">PIN numérico — mínimo 4 dígitos. O PIN ficará armazenado localmente (hash).</p>

        <input v-model="newPin" inputmode="numeric" pattern="[0-9]*" placeholder="Novo PIN" />
        <input v-model="confirmPin" inputmode="numeric" pattern="[0-9]*" placeholder="Confirmar PIN" />

        <p v-if="setPinError" class="error">{{ setPinError }}</p>

        <div class="modal-actions">
          <button class="login-btn" @click="handleSetPin" :disabled="setPinLoading">
            <span v-if="setPinLoading" class="spinner"></span>
            Salvar PIN
          </button>
          <button class="secondary-btn" @click="closeSetPin">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
.pin-display { margin: 12px 0; display:flex; justify-content:center; align-items:center; min-height:36px; }
.dots { display:flex; gap:10px; }
.dot { width:14px;height:14px;border-radius:50%;border:1px solid rgba(255,255,255,0.12); background:transparent; transition: all .18s ease; }
.dot.filled { background:white; transform: scale(0.95); box-shadow: 0 6px 14px rgba(2,6,23,0.6); }

/* shake animation */
@keyframes shakeX { 0%{transform:translateX(0)}25%{transform:translateX(-8px)}50%{transform:translateX(8px)}75%{transform:translateX(-6px)}100%{transform:translateX(0)} }
.shake { animation: shakeX .45s cubic-bezier(.36,.07,.19,.97); }

/* keypad */
.keypad { display:grid; grid-template-columns: repeat(3, 1fr); gap:10px; margin-top:8px; }
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

