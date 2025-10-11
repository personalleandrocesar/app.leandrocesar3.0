<script>
export default {
    mounted() {
        let lastScrollTop = 0;
        const navbar = document.getElementById('nav-container');

        window.addEventListener('scroll', function () {
            let scrollTop = window.scrollY || document.documentElement.scrollTop;

            if (scrollTop > lastScrollTop) {
                // Rolando para baixo
                navbar.style.top = '-100px'; // Ou qualquer outra posição desejada para esconder o navbar
            } else {
                // Rolando para cima
                navbar.style.top = '2px';
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Para o comportamento correto em bordas
        }, false);
    }
}


</script>
<script setup>
import { ref, computed, onMounted } from "vue";
const rota = useRoute();
const cookieTreinador = useCookie('coachId');

const usuarios = await useFetch(
    `https://api.leandrocesar.com/usersnw/${cookieTreinador.value}/team/${rota.params.id}`
);
const pessoa = usuarios.data.value;
const primeiroNome = computed(() => pessoa.name.split(" ")[0]);

useHead({
  titleTemplate: `${primeiroNome.value} ${pessoa.lastName} - Cliente | Leandro Cesar - App`,
});

const erroMsg = ref(null);
const notificacaoTres = ref(false);
const notificacaoQuatro = ref(false);
const mostrarDivFlutuante = ref(false);
const imagemPrevia = ref(null);
const arquivo = ref(null);
const carregando = ref(false);
const fotoAberta = ref(false);


const buscarDadosUsuario = async () => {
  const formatos = ['jpeg', 'jpg', 'png'];
  let ultimaImagem = null;
  for (const formato of formatos) {
    try {
      const resposta = await fetch(`https://api.leandrocesar.com/uploads/${pessoa.username}.${formato}`);
      if (resposta.ok) {
        const ultimaModificacao = resposta.headers.get('Last-Modified');
        if (!ultimaImagem || (ultimaModificacao && new Date(ultimaModificacao) > new Date(ultimaImagem.lastModified))) {
          ultimaImagem = { url: resposta.url, lastModified: ultimaModificacao };
        }
      }
    } catch {}
  }
  if (ultimaImagem) pessoa.foto = ultimaImagem.url;
};

onMounted(buscarDadosUsuario);

const abrirDivFlutuante = () => { mostrarDivFlutuante.value = true; };
const fecharDivFlutuante = () => {
  mostrarDivFlutuante.value = false;
  imagemPrevia.value = null;
  arquivo.value = null;
};

const alterarArquivo = (evento) => {
  arquivo.value = evento.target.files[0];
  if (arquivo.value) {
    imagemPrevia.value = URL.createObjectURL(arquivo.value);
    mostrarDivFlutuante.value = true;
  }
};

const enviarImagem = async () => {
  if (!arquivo.value) return alert("Por favor, selecione um arquivo.");
  const dadosFormulario = new FormData();
  dadosFormulario.append('image', arquivo.value, `${pessoa.username}.${arquivo.value.name.split('.').pop()}`);
  try {
    carregando.value = true;
    const resposta = await fetch('https://api.leandrocesar.com/api/upload', { method: 'POST', body: dadosFormulario });
    if (resposta.ok) {
      alert("Upload realizado com sucesso!");
      await buscarDadosUsuario();
      fecharDivFlutuante();
    } else {
      alert("Erro no upload.");
    }
  } catch {
    alert("Erro ao conectar com o servidor.");
  } finally {
    carregando.value = false;
  }
};

function alternarFoto() {
    fotoAberta.value = !fotoAberta.value;
}
const route = useRoute()

const reg = route.params.id
const logon = useCookie('logon')
// const logon = useCookie('logon', { maxAge: 4800})
logon.value = reg

const photoOpen = ref(false);
function openPhoto() {
    photoOpen.value = !photoOpen.value;
}


const coachIdCookie = useCookie('coachId')
console.log(coachIdCookie.value)

const Series = await useFetch(`https://api.leandrocesar.com/usersnw/${coachIdCookie.value}/team/${route.params.id}`);
const people = Series.data.value
console.log(people.name)

const dataConf = await useFetch(`https://api.leandrocesar.com/users/${route.params.id}`)
const inter = await useFetch(`https://api.leandrocesar.com/users/${route.params.id}`)
const status = people?.status
const nameValue = people?.name

const firstName = computed(() => {
  return nameValue.split(' ')[0] // Divide o nome completo em partes e retorna o primeiro nome
})


// talvez não precise do código abaixo
const logOff = () => {
    logon.value = null
}

const tag = useCookie('tag')
tag.value = tag.value


const bodyOne = ref(true)
function menu() {
    bodyOne.value = !bodyOne.value

}
const colorMode = useColorMode()

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

const state = useCookie('state')
state.value = state.value

const navA = ref(state.value === 1)
const navB = ref(state.value === 2)
const navC = ref(state.value === 3)
const navD = ref(state.value === 4)

const getGreetingMessage = () => {
  const now = new Date();
  const hour = now.getHours();

  if (hour < 12) {
    return "Bom dia";
  } else if (hour < 18) {
    return "Boa tarde";
  } else {
    return "Boa noite";
  }
};

const greetingMessage = computed(() => getGreetingMessage());
</script>
<template>
    <div v-if="bodyOne">
        <div id="nav-container" class='nav'>


        <div>
            <div class="nav-bottom">
                <NuxtLink :to="`/atleta/${route.params.id}`">
                    <Icon name='ic:round-arrow-back' />
                </NuxtLink>
                <!--
                <NuxtLink :to="`/atleta/${route.params.id}/treinos`">
                    <Icon name='solar:dumbbell-large-minimalistic-broken' />
                </NuxtLink>
                <NuxtLink :to="`/users/${route.params.id}/cardio`">
                    <Icon name='hugeicons:cardiogram-02' />
                </NuxtLink>
                <NuxtLink :to="`/users/${route.params.id}/avaliacao`">
                    <Icon name='bi:clipboard-pulse' />
                </NuxtLink> -->
            </div>
        </div>

        </div>

        <div class="color">

            <a @click="theme()" :model="$colorMode.value">
                <Icon
                    :name="colorMode.value === 'dark' ? 'line-md:sunny-filled-loop-to-moon-alt-filled-loop-transition': 'line-md:moon-filled-to-sunny-filled-loop-transition'" />
            </a>

        </div>
        <div class="whats">


            <a
                href="https://api.whatsapp.com/send?phone=5521936184024%20&text=Ol%C3%A1%20Leandro%20Cesar,%20fiquei%20interessado(a)%20nos%20seus%20Servi%C3%A7os,%20me%20chamo%20">
                <Icon name="ic:outline-whatsapp" />
            </a>
        </div>


        <slot />
    </div>



    <div v-else>
        <div id="nav-container" class='nav'>

            

            <div>
                <div class="nav-bottom">
                    <!-- <NuxtLink :to="`/users/${route.params.id}`">
                        <Icon name='solar:home-smile-bold' />
                    </NuxtLink> -->
                    <!-- <NuxtLink :to="`/users/${route.params.id}/treinos`">
                        <Icon name='solar:dumbbell-large-bold' />
                    </NuxtLink>
                    <NuxtLink :to="`/users/${route.params.id}/cardio`">
                        <Icon name='material-symbols:cardiology' />
                    </NuxtLink>
                    <NuxtLink :to="`/users/${route.params.id}/avaliacao`">
                        <Icon name='solar:clipboard-heart-bold' />
                    </NuxtLink> -->
                </div>
            </div>

            <div>

                <NuxtLink @click="menu()" class="button-client">
                    <Icon name="material-symbols:close-rounded" />
                </NuxtLink>

            </div>
        </div>
        <div class="head-logo" id="sobre">
            <NuxtLink @click="menu()" class="button-client">
            </NuxtLink>
            <!-- <div v-if='imageExists' class='logo'> -->
            <div class="logo">
              <img @click="alternarFoto" :src="pessoa.foto || imagemPrevia" alt="User Photo" />
              <div v-if="fotoAberta" class="nav-bar">
                <div class='logo-nav-bar'>
                  <img @click="alternarFoto" :src="pessoa.foto || imagemPrevia">
                </div>
              </div>
              <label class="photo" for="file-upload" @click="abrirDivFlutuante">
                <Icon name="ic:outline-photo-camera" />
              </label>
              <input id="file-upload" type="file" @change="alterarArquivo" hidden />
            </div>
            <div v-if="mostrarDivFlutuante" class="float-t">
              <div class="floating-div">
                <div>
                  <h3>Pré-visualização</h3>
                  <img v-if="imagemPrevia" :src="imagemPrevia" alt="Preview Image" />
                  <div v-else class='alt-image' ></div>
                </div>
                <div>
                  <button @click="enviarImagem" :disabled="carregando">{{ carregando ? "Enviando..." : "Upload" }}</button>
                  <button @click="fecharDivFlutuante">Cancelar</button>
                </div>
              </div>
            </div>
            </div>
        <div class="head-name">
            <div class="name">
                {{ people.name }} {{ people.lastName }}
            </div>
            <div class="email">{{ people.email }}</div>
        </div>
        <div>
            <p class="section-title"><Icon name="cil:weightlifitng" /> {{people.username}}</p>
            <p class="section-title"><Icon name="eos-icons:content-lifecycle-management" /> Ciclo atual: {{ people?.periodStart.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3-$2-$1') }} a {{
                people?.periodEnd.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3-$2-$1') }}</p>
            <p v-if="status === 1" class="section-option pending">
                <Icon name="solar:danger-square-outline" /> Pendente!
            </p>
            <p v-else-if="status === 0" class="section-option bloqued">
                <Icon name="solar:close-square-outline" /> Bloqueado!
            </p>
            <p v-else class="section-option verified">
                <Icon name="solar:check-square-outline" /> Verificado!
            </p>
                <p class="section-subtitle-two">ID: {{ people?._id}}</p>
                <p v-if="people?.service" class="section-subtitle-two">Serviço: {{ people?.service}}</p>
                <p v-if="people?.service" class="section-subtitle-two">Objetivo: {{ people?.target}}</p>
                <br>
            <!-- Hístórico -->
            <NuxtLink class="menu-button">
                <div>
                    <Icon name="solar:dumbbells-broken" />
                    <p>
                        Todos os treinos
                    </p>
                </div>
                <Icon name="ic:baseline-keyboard-arrow-right" />
            </NuxtLink>
            <!-- Histórico fim -->
            <!-- Avaliações -->
            <NuxtLink class="menu-button">
                <div>
                    <Icon name="fluent:clipboard-pulse-20-regular" />
                    <p>
                        Avaliações
                    </p>
                </div>
                <Icon name="ic:baseline-keyboard-arrow-right" />
            </NuxtLink>
            <!-- Avaliações fim -->

            <!-- Documentos -->
            <NuxtLink  class="menu-button">
                <div>
                    <Icon name="fluent:clipboard-text-edit-48-regular" />
                    <p>
                        Contratos
                    </p>
                </div>
                <Icon name="ic:baseline-keyboard-arrow-right" />
            </NuxtLink>
            <NuxtLink class="menu-button">
                <div>
                    <Icon name="fluent:clipboard-text-ltr-24-regular" />
                    <p>
                        Termos de uso
                    </p>
                </div>
                <Icon name="ic:baseline-keyboard-arrow-right" />
            </NuxtLink>
            <!-- Documentos fim -->

            <!-- ícones de rede sociais -->

            <!--  -->

            <!-- Botão Logout -->
            <NuxtLink to="/" class="logout" @click="logOff()">
                LOUGOUT
                <Icon name="solar:logout-3-linear" />
            </NuxtLink>
        </div>
    </div>
</template>
<style scoped>

.head-logo {
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    align-items: flex-start;
    z-index: 1;
    flex-wrap: wrap;
    margin-top: 1.5rem;
}

.icon {
    zoom: 1.1;
}

.logo {
    display: flex;
    justify-content: center;
    flex-direction: flex-start;
    align-items: center;
    flex-wrap: wrap;
    margin: -.5rem 1.5rem .7rem 1.5rem;
    border-radius: 200px;
    z-index: 10;
    background: linear-gradient(90deg, var(--player-color) 0%, #00d4ff 35%, #04be7a 100%);
    width: 72px;
    height: 72px;
}

.logo img {
    height: 65px;
    width: 65px;
    border-radius: 200px;
    z-index: 100;
    opacity: 1;
    object-fit: cover; /* Preenche o contêiner sem deformar */
}

.nav-bar {
    z-index: 200;
    transform: translateX(0%);
    position: fixed;
    height: calc(100% - 0px);
    bottom: 0px;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
}

.logo-nav-bar {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    transform: translateX(0%);
    position: fixed;
    bottom: 0px;
    height: calc(100% - 0px);
    width: 100%;
    background: linear-gradient(to bottom right, #00dc8290 0%, #00d4ff90 50%, #04be7a90 100%);
    backdrop-filter: blur(5px);
    z-index: 1004;

}

.logo-nav-bar img {
    width: 300px;
    border-radius: 200px;
    border: var(--player-color) 1px solid;
    opacity: 1;
    z-index: 100;

}

.button-client {
    margin: 1.2rem 1.5rem;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
    zoom: 1.3;
}

.button-client .icon {
    zoom: .9;
    margin-right: -3px;
}


.head-name {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
}


.name {
    font-size: 1.5rem;
    line-height: 1.5rem;
    margin: 1rem 1.5rem 0 1.5rem;
    font-weight: 700;
    letter-spacing: 1.5px;
    color: var(--player-color);

}

.email {
    font-size: .8rem;
    line-height: 1.5rem;
    margin: .2rem 1.6rem;
    font-weight: 700;
    letter-spacing: 1.1px;

}


.body-timeline {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    text-align: left;
    margin: 2rem 10px 120px 10px;
}

.main-logo {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    width: 100px;
    box-shadow: 1px 7px 20px var(--player-color);
    margin: 1.5rem;
    border-radius: 10px;
}

.main-logo img {
    width: 100px;
    border-radius: 10px;
    border: var(--player-color) 2px solid;
    opacity: 1;

}

.body-timeline p {
    text-align: left;
    margin: 0 10px 20px 20px;
}

.link {
    text-decoration: underline;
}

.link:hover {
    color: var(--player-color);
}

.section-title {
    text-align: left;
    margin: 10px 1.5rem;
    font-weight: 800;
}
.section-title .icon{
    zoom:.8
}

.section-subtitle {
    text-align: left;
    margin: -10px 1.5rem 15px;
    font-weight: 800;
    font-size: .9em;
}

.section-subtitle-two {
    text-align: left;
    margin: -16px 1.5rem 15px;
    font-weight: 800;
    font-size: .9em;
}

.section-option {
    text-align: left;
    margin: -6px 1.5rem 35px 2.8rem;
    font-size: .8em;
    font-weight: 800;
}

.section-option .icon {
    zoom: .8;
    margin-top: -3px;
}

.verified {
    color: green;
}

.pending {
    color: #e1a918;
}

.bloqued {
    color: #b30000;
}


.conf {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 20px;
}

.menu-square {
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-weight: 800;
    width: 49.6%;
    padding: 5px;
    border-radius: 10px;
    margin: 1px auto;
    border: solid .1px var(--player-color) 30%;
}

.menu-square div .icon {
    margin: 3px 0px;
    transition: transform .3s linear;
    transform: translateX(-10px);
}

.menu-square div {
    display: flex;
    flex-direction: column;
    font-size: 1em;
    justify-content: center;
    margin: 2px auto;
}

.menu-square div:nth-child(2) {
    display: flex;
    flex-direction: column;
    font-size: .7em;
    justify-content: center;
    margin: 2px auto;
}

.menu-square div:nth-child(3) {
    display: flex;
    flex-direction: column;
    font-size: .7em;
    justify-content: center;
    margin: 2px auto;
    color: #002aff;
}

.menu-button {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-weight: 800;
    width: 100%;
    padding: 6px 2px 2px 2px;
    margin: 5px auto;
    border: solid 1px var(--player-color)10%;
    border-bottom: solid .1px var(--player-color)40%;
    border-top: solid .2px transparent;
}

.menu-button div {
    display: flex;
    flex-direction: row;
    font-size: .8em;
    justify-content: space-between;
    margin-top: 2px;
}

.menu-button .icon {
    margin: -2px 0px 0px 26px;
    transition: transform .3s linear;
    transform: translateX(-15px);
}

.menu-button .icon:nth-child(2) {
    margin: 5px 0px 0px 26px;
    transition: transform .3s linear;
    transform: translateX(-25px);
}

.menu-button:hover {
    cursor: pointer;
    border-bottom: solid .2px var(--player-color);
    background-color: var(--player-color)10%;
}


.menu-button:hover .icon:nth-child(2) {
    transform: translateX(-15px);
}

.logout {
    position: fixed;
    bottom: 15px;
    left: 50%;
    width: 250px;
    margin-left: -125px;
    transition: all .4s linear;
    border: solid .1px var(--player-color) 70%;
    box-shadow: 0 0px 5px var(--player-color)10%;
    cursor: pointer;
    text-align: center;
    line-height: 18px;
    border-radius: 10px;
    font-weight: 600;
    transition: all 0.2s ease-in-out 0s;
    height: 34px;
    font-size: 14px;
    padding-inline: 16px;
    padding-top: 6px;
    padding-bottom: 8px;
}

.logout .icon {
    margin: 1px 0px 0px 6px;
    transition: transform .3s linear;
    transform: translateX(8px);
}

.logout:hover {
    background-color: var(--player-color)10%;
    color: var(--player-color);
    cursor: pointer;
}

.logout:hover .icon {
    margin: 1px 0px 0px 6px;
    transform: translateX(0px);
}

.nav {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    transition: all .4s linear;
    position: sticky;
    top: 2px;
    margin: 0px auto 16px auto;
    width: 97%;
    height: 50px;
    border-radius: 200px;
    padding: 12.2px 8px 12px 12px;
    backdrop-filter: blur(100px)
}

.nav a {
    margin: 0 2px;
    padding: 12.2px 8px 12px 12px;
    padding: 12.2px 8px 9px 8px;
    padding: 8px;
    text-decoration: none;
    cursor: pointer;
}

.nav a.router-link-exact-active {
    margin: 0 2px;
    color: var(--player-color);
    padding: 8px;

    border-radius: 10px;
    text-decoration: none;
    cursor: pointer;
}

.nav a.router-link-exact-active:hover {
    margin: 0 2px;
    color: #00dc82;
    color: var(--player-color);
    border-radius: 10px;
    text-decoration: none;
    cursor: pointer;
}

.nav a.router-link-exact-active:hover::after {
    position: absolute;
    top: 60px;
    left: 20px;
    background-color: var(--color-background);
    color: var(--player-color);
    border-radius: 10px;
    text-decoration: none;
    cursor: pointer;
}

.nav a:hover {
    background-color: transparent;
    color: var(--player-color);
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
    bottom: 3.9rem;
    right: 1.5rem;
    border-radius: 10px;
    cursor: pointer;
    border: solid 1px var(--player-color)10%;
    box-shadow: 0 0px 5px var(--player-color)40%;
    backdrop-filter: blur(100px);
    z-index: 1;
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
    bottom: 1.5rem;
    right: 1.5rem;
    border-radius: 10px;
    cursor: pointer;
    border: solid 1px var(--player-color)10%;
    box-shadow: 0 0px 5px var(--player-color)40%;
        z-index: 1;
    backdrop-filter: blur(100px);
}

.whats .icon,
.color .icon {
    color: var(--player-color)90%;
    zoom: 1;
}

.nav-bar {
    z-index: 200;
    transform: translateX(0%);
    position: fixed;
    height: calc(100% - 0px);
    bottom: 0px;
    width: 100%;
    position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
}

.logo-nav-bar {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    transform: translateX(0%);
    position: fixed;
    bottom: 0px;
    top: -1px;
    height: calc(100% - -1px);
    width: 100%;
    background: linear-gradient(to bottom right, #00dc8290 0%, #00d4ff90 50%, #04be7a90 100%);
    backdrop-filter: blur(5px);
    z-index: 1134004;
    

}

.logo-nav-bar img {
    width: 300px;
        height: 300px;
        border-radius: 200px;
        border: var(--player-color) 2px solid;
        opacity: 1;
        z-index: 100;
        -o-object-fit: cover;
        object-fit: cover;
        padding: 4px;
}

.photo {
    position: absolute;
    top: 68px;
    height: 25px;
    border-radius: 50%;
}

.photo .icon {
    color: var(--player-color);
    zoom:1;
    border-radius: 6px;
    background: var(--player-color)40%;
    padding: 3px;
}

.logo {
  position: relative;
  display: flex;
  align-items: center;
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

.floating-div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #f1fef9;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
}

.alt-image {
    height: 300px;
    border-radius: 200px;
    width: 300px;
    margin: 10px;
    background: #00dc8220;
}

.floating-div img {
  width: 300px;
  border-radius: 200px;
  height: 300px;
  display: block;
  margin: 10px auto;
  object-fit: cover; /* Preenche o contêiner sem deformar */
}

.floating-div button {
    margin: 5px;
    padding: 8px 12px;
    border-radius: 8px;
  border: none;
  cursor: pointer;
}

.floating-div button:first-child {
  background: green;
  color: white;
}

.floating-div button:last-child {
  background: red;
  color: white;
}

.floating-div button:disabled {
  background: gray;
  cursor: not-allowed;
}
/* Esconde o input de arquivo */
input[type="file"] {
  display: none;
}

</style>
