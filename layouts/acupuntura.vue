<script setup>
const route = useRoute();
import { ref, computed, onMounted, onUnmounted, watch } from "vue";

const Users = await useFetch(
    `https://api.leandrocesar.com/usersnw/${route.params.id}`
);
const item = Users.data.value;

const user = item;
const main = ref(true);
const buttonIcon = ref(true);

const menuOpen = useCookie("menuOpen")
menuOpen.value = true;
const navLeft = ref(true) || menuOpen.value; // Define se o menu está aberto ou fechado
if (menuOpen.value === true) {
    navLeft.value = true;
    menuOpen.value = true;
} else {
    navLeft.value = false;
    menuOpen.value = false;
}

const menu = ref(false); // Define se o menu está aberto ou fechado
const menuBar = ref(false); // Define se o menu está aberto ou fechado
const link = ref("");
function button() {
    navLeft.value = !navLeft.value;
    menuOpen.value = !menuOpen.value;
}
function buttonMenuBar() {
    menuBar.value = !menuBar.value;
    menu.value = !menu.value;
}
// Alternar visibilidade do menu lateral
const toggleMenu = () => {
    navLeft.value = !navLeft.value;
};

function home() {
    navigateTo(`/acupuntu/${route.params.id}`);
    menu.value = false;
    menuBar.value = false;
}
function team() {
    navigateTo(`/acupuntu/${route.params.id}/team`);
    menu.value = false;
    menuBar.value = false;
}

// Exemplo de classes dinâmicas para futuros ajustes
const gridClasses = computed(() => ({
    closed: !navLeft.value,
}));

const notSuspend = ref(true);
const settingsOpen = useCookie("settingsOpen");
const settings = ref(false) || settingsOpen.value; // Define se o menu está aberto ou fechado
if (settingsOpen.value === true) {
    settings.value = true;
    notSuspend.value = false;
}
function suspend() {
    notSuspend.value = !notSuspend.value;
    settings.value = !settings.value;
    settingsOpen.value = !settingsOpen.value;
}

const menuSuspend = ref(false);
const ative = ref(false);
function coach() {
    menuSuspend.value = !menuSuspend.value;
    ative.value = !ative.value;
}

const searchQuery = ref()
const searchInputRef = ref(null); // Referência do campo de pesquisa

// Força o foco no campo de pesquisa
function ensureSearchInputFocus() {
    if (searchInputRef.value) {
        searchInputRef.value.focus();
    }
}

// Chamada contínua para garantir o foco
onMounted(() => {
    ensureSearchInputFocus();

    window.addEventListener("keydown", escHandleGlobalKeydown);
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);

    onUnmounted(() => {
        window.removeEventListener("keydown", escHandleGlobalKeydown);
        window.removeEventListener("keydown", handleKeydown);
        window.removeEventListener("keyup", handleKeyup);
    });
});

// Observador reativo para restaurar o foco

function coachFloat() {
    menuFloat.value = !menuFloat.value;
    ative.value = !ative.value;
    ensureSearchInputFocus();
}

function coachOut() {
    menuSuspend.value = false;
    ative.value = false;
    ensureSearchInputFocus();
}

const menuFloat = ref(false);
const router = useRouter();

const pressedKeys = new Set(); // Armazena as teclas pressionadas

function escHandleGlobalKeydown(event) {
    if (event.key === "Escape") {
        menuFloat.value = false;
        ensureSearchInputFocus();
    }
}

function handleKeydown(event) {
    pressedKeys.add(event.key);

    // Combinação "g" e "h"
    if (pressedKeys.has("/") && pressedKeys.has("h")) {
        router.push(`/acupuntura /${route.params.id}`);
    }

    // Apenas "t"
    if (pressedKeys.has("/") && pressedKeys.has("t")) {
        router.push(`/acupuntura /${route.params.id}/team`);
    }
    
    if (pressedKeys.has("/") && pressedKeys.has("k")) {
      menuFloat.value = !menuFloat.value;
      ative.value = !ative.value;
    }

    // Apenas "s"
    if (pressedKeys.has("/") && pressedKeys.has("s")) {
        router.push(`/acupuntura /${route.params.id}/settings`);
    }
}

function handleKeyup(event) {
    pressedKeys.delete(event.key); // Remove a tecla liberada
}
watch([menu, menuFloat, ative], ensureSearchInputFocus);

const colorMode = useColorMode();

function theme() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
}

const colorCookie = useCookie("colorCookie");
if (colorMode.value === "dark") {
    colorCookie.value = "darkCookie";
} else {
    colorCookie.value = "lightCookie";
}
colorCookie.value === "darkCookie"
    ? (colorMode.value = "dark")
    : (colorMode.value = "light");

const notificTree = ref(false)

function notifConfirm() {
    notificTree.value = true
}
function notifCancel() {
    notificTree.value = false
}

function logout () {
  navigateTo('/')
}
    
</script>


<template>
    <div class="view" @mouseleave="coachOut">
        <div v-if="menu" class="menu">
            <div>
                <NuxtLink @click="home()" class="menu-button">
                    <div>
                        <Icon name="heroicons:home" />
                        <p>Home</p>
                    </div>
                </NuxtLink>
                
                <NuxtLink @click="team()" class="menu-button">
                    <div>
                        <Icon name="heroicons:user-group" />
                        <p>Team</p>
                    </div>
                </NuxtLink>
            </div>
        </div>
        <div :class="['grid-container', { closed: !navLeft }]">
            <div v-if="navLeft" class="left-column">
                <div>
                    <div class="nav">
                        <div>
                            <div
                            v-if="menuBar"
                            @click="buttonMenuBar"
                            class="menu-bar"
                            >
                            <Icon name="material-symbols:close-rounded" />
                        </div>
                        <div v-else @click="buttonMenuBar" class="menu-bar">
                            <Icon name="heroicons:bars-2-16-solid" />
                        </div>
                        <NuxtLink v-if="navLeft" :to='`/coach/${route.params.id}`'>
                            <img src="~assets/MyLogoBold.jpg" />
                                <h3>deepacupuntura</h3>
                                <h3></h3>
                            </NuxtLink>
                            <NuxtLink v-else :to='`/coach/${route.params.id}`'>
                                <img src="~assets/MyLogoBold.jpg" />
                                <h3></h3>
                            </NuxtLink>
                        </div>
                    </div>
                    
                    <div class="nav-left">
                        <div>
                            <NuxtLink @click='coachFloat'
                            class="menu-button search"
                            >
                            <div>
                                <Icon name="heroicons-outline:search" />
                                <p>Search...</p>
                            </div>
                            <div class='trap'>
                                <span>/</span>
                                <span>k</span>
                            </div>
                        </NuxtLink>
                        <NuxtLink
                        :to="`/acupuntura/${route.params.id}`"
                        class="menu-button"
                        >
                        <div>
                            <Icon name="heroicons:home" />
                            <p>Home</p>
                        </div>
                    </NuxtLink>
                    
                    <NuxtLink
                    :to="`/acupuntura/${route.params.id}/team`"
                    class="menu-button"
                    >
                    <div>
                        <Icon name="heroicons:user-group" />
                        <p>Clientes</p>
                    </div>
                </NuxtLink>
                <NuxtLink
                v-if="notSuspend"
                @click="suspend"
                class="menu-button"
                >
                <div>
                                    <Icon name="heroicons:cog-6-tooth" />
                                    <p>Settings</p>
                                </div>
                                <Icon name="heroicons:chevron-right-20-solid" />
                            </NuxtLink>
                            <NuxtLink
                            v-else
                            @click="suspend"
                            class="menu-button"
                            >
                            <div>
                                <Icon name="heroicons:cog-6-tooth" />
                                <p>Settings</p>
                            </div>
                            <Icon name="heroicons:chevron-down-20-solid" />
                        </NuxtLink>
                        <span v-if="settings">
                            <NuxtLink
                            :to="`/acupuntura/${route.params.id}/settings`"
                            class="menu-button"
                            >
                            <div>
                                <Icon name="ci:dot-01-xs" />
                                <p>General</p>
                                    </div>
                                </NuxtLink>
                                <NuxtLink
                                :to="`/acupuntura/${route.params.id}/settings/users`"
                                class="menu-button"
                                >
                                <div>
                                    <Icon name="ci:dot-01-xs" />
                                    <p>Users</p>
                                </div>
                            </NuxtLink>
                            <NuxtLink
                            :to="`/acupuntura/${route.params.id}/settings/exercises`"
                            class="menu-button"
                            >
                            <div>
                                <Icon name="ci:dot-01-xs" />
                                <p>Exercises</p>
                            </div>
                        </NuxtLink>
                                <NuxtLink
                                :to="`/acupuntura/${route.params.id}/settings/notifications`"
                                class="menu-button"
                                >
                                <div>
                                    <Icon name="ci:dot-01-xs" />
                                    <p>Notifications</p>
                                </div>
                            </NuxtLink>
                        </span>
                    </div>
                    </div>
                </div>
                <div>
                        <div  class="retract-button"  @click="button">
                            <Icon name="material-symbols:keyboard-double-arrow-left-rounded"/>
                        </div>
                        <div class="menu-suspend zoom" v-if="menuSuspend">
                            <div>
                                <div>
                                <p>Signed in as</p>
                                <h4>
                                    <b>{{ user.username }}</b>
                                </h4>
                            </div>
                            <div class="line"></div>
                            <NuxtLink
                            :to="`/acupuntura/${route.params.id}/settings`"
                            class="menu-button"
                            >
                            <div>
                                <Icon name="heroicons:cog-6-tooth" />
                                <p>Settings</p>
                            </div>
                        </NuxtLink>
                        <NuxtLink @click='coachFloat'
                                class="menu-button"
                                >
                                <div>
                                    <Icon name="heroicons-outline:terminal" />
                                    <p>Command menu</p>
                                </div>
                            </NuxtLink>
                        </div>
                        <div>
                            <div class="lin"></div>
                            <NuxtLink @click='notifConfirm' class="menu-button">
                                <div>
                                    <Icon name="stash:signout" />
                                    <p>Sign Out</p>
                                </div>
                            </NuxtLink>
                        </div>
                    </div>
                    <div class="track"></div>
                    <div class="user">
                        <NuxtLink
                        @click="coach"
                        :class="{ userActive: ative }"
                        class="menu-button"
                        >
                        <div>
                            <img
                            @click="openPhoto()"
                            src="/img/myFotoTwo.jpg"
                            />
                            <p :class="{ userActiveP: ative }">Leandro</p>
                        </div>
                        <Icon name="heroicons:ellipsis-vertical" />
                    </NuxtLink>
                </div>
            </div>
        </div>
        <div v-else class="left-column-two">
                <div class="nav-left">
                    <div class="nav">
                        <div>
                            <div
                            v-if="menuBar"
                            @click="buttonMenuBar"
                            class="menu-bar"
                            >
                            <Icon name="material-symbols:close-rounded" />
                        </div>
                        <div v-else @click="buttonMenuBar" class="menu-bar">
                            <Icon name="heroicons:bars-2-16-solid" />
                        </div>
                        <NuxtLink v-if="navLeft" :to='`/coach/${route.params.id}`'>
                            <img src="~assets/MyLogoBold.jpg" />
                            <h3>Nex_Wod</h3>
                        </NuxtLink>
                        <NuxtLink v-else :to='`/coach/${route.params.id}`'>
                            <img src="~assets/MyLogoBold.jpg" />
                        </NuxtLink>
                    </div>
                    <div>
                        <!-- <div @click="theme()" :model="$colorMode.value">
                            <Icon
                            :name="colorMode.value === 'dark' ? 'ic:baseline-dark-mode' : 'ic:round-light-mode'" />
                        </div> -->
                    </div>
                </div>
            <NuxtLink @click='coachFloat'
            class="menu-button search"
            >
            <div>
                <Icon name="heroicons-outline:search" />
            </div>
        </NuxtLink>
        <NuxtLink
        :to="`/acupuntura/${route.params.id}`"
        class="menu-button"
        >
        <Icon name="heroicons:home" />
    </NuxtLink>
    
                    <NuxtLink
                    :to="`/acupuntura/${route.params.id}/team`"
                    class="menu-button"
                    >
                    <Icon name="heroicons:user-group" />
                </NuxtLink>
                
                <NuxtLink
                :to="`/acupuntura/${route.params.id}/settings`"
                class="menu-button"
                >
                <Icon name="heroicons:cog-6-tooth" />
            </NuxtLink>
        </div>
        <div>
            <div class="retract-button"  @click="button">
            <Icon name="material-symbols:keyboard-double-arrow-right-rounded"/>
            </div>
            <div class="track"></div>
            <div class="user">
                <NuxtLink
                @click="coachFloat"
                :class="{ userActive: ative }"
                class="menu-button"
                >
                <img src="/img/myFotoTwo.jpg" />
            </NuxtLink>
                    </div>
                </div>
            </div>
            <div class="float zoom" v-if="menuFloat" >
                <div class="menu-float zoomOut"   v-if="menuFloat ">
                
                    <div>
                        <div class='conec'>
                            
                            <div>
                                
                                <p>Signed in as</p>
                                <h4>
                                    <b>{{ user.username }}</b>
                                </h4>
                            </div>
                            <div>
                                <Icon @click="coachFloat"  name='material-symbols:close-rounded' />
                            </div>
                        </div>
                        <div class="line"></div>  
                            <div class='float-top'>
                                <Icon class='filt' name='heroicons-outline:search' />
                                <div class="nav-users">
                                    <input autofocus type='text'
                                    ref="searchInputRef"
                                    v-model="searchQuery"
                                    placeholder="Procurar..."
                                    @input="updateSearchQuery"
                                    class="search-input"
                                    name='q'
                                    >
                                </div>
                            </div>
                        <p class='go-to'>Go to</p>
                        <NuxtLink
                            :to="`/acupuntura/${route.params.id}`"
                            class="menu-button"
                        >
                            <div>
                            <Icon name="heroicons:home" />
                            <p>Home</p>
                            </div>
                            <div class='trap'>
                                <span>/</span>
                                <span>h</span>
                            </div>
                        </NuxtLink>
                        <NuxtLink
                            :to="`/acupuntura/${route.params.id}/team`"
                            class="menu-button"
                        >
                            <div>
                            <Icon name="heroicons:user-group" />
                            <p>Team</p> 
                            </div>
                            <div class='trap'>
                                <span>/</span>
                                <span>t</span>
                            </div>
                        </NuxtLink>
                        <NuxtLink
                            :to="`/acupuntura/${route.params.id}/settings`"
                            class="menu-button"
                        >
                            <div>
                                <Icon name="heroicons:cog-6-tooth" />
                                <p>Settings</p>
                            </div>
                            <div class='trap'>
                                <span>/</span>
                                <span>s</span>
                            </div>
                        </NuxtLink>
                        <p class='go-to'>Theme</p>
                       
                        <a class="menu-button" @click="theme()" :model="$colorMode.value">
                            <div>
                            <Icon
                                name="line-md:moon-filled-to-sunny-filled-loop-transition"
                            /> 
                                <p>Light</p>
                            </div>
                        </a>
                        <a class="menu-button" @click="theme()" :model="$colorMode.value">
                            <div>
                            <Icon
                                name="line-md:sunny-filled-loop-to-moon-alt-filled-loop-transition"
                            /> 
                                <p>Dark</p>
                            </div>
                        </a>
                    </div>
                    <div>
                    <div class="line"></div>
                        <NuxtLink @click='notifConfirm' class="menu-button">
                            <div>
                                <Icon name="stash:signout" />
                                <p>Sign Out</p>
                            </div>
                        </NuxtLink>
                    </div>
                </div>
            </div>
            <div v-if='notificTree' class="float">
                    <div class="notific-float zoomOut" >
                        <div>
                            <Icon name='stash:signout' style="color: red; zoom:2.2"/>
                        </div>
                        <div>
                            <div>
                                <h3>
                                    Sair da conta
                                </h3>
                                <p>
                                    Tem certeza que que deseja sair? 
                                </p>
                            </div>
                            <div>   
                                <button @click='logout()' class="pill-can ex">Sair</button>
                                <button @click="notifCancel()" class="pill-can can">Cancelar</button>
                            </div>
                        </div>
            
                    </div>
            </div>
            <div class="main" @mouseleave="coachOut">
                <NuxtPage />
            </div>
        </div>
    </div>
</template>
<style scoped>
.notific-float {
    background: #f1fef9;
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
    color: #777;
    padding:20px; /* Espaço interno */
    border-radius: 10px; /* Cantos arredondados (opcional) */
    text-align: left; /* Alinha o texto centralizado */
    backdrop-filter: blur(10px); /* Desfoque do fundo */
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* Sombras (opcional) */
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
}
.dark-mode .notific-float {
    background: #020030;
}

.notific-float div {
    margin: 0px 15px 12px 15px;
}

.notific-float button{
    margin: 0 5px 0 0px;
}


.ex{
    background: red;
    color: #fff;
    width: 100px;
}
.ex:hover{
    background: red;
    opacity:.7;
}
.can{
    background: #00dc8210;
    width: 100px;
  color: #333;
}

.dark-mode .can {
    color: #fff;
}

.can:hover{
    opacity:.7;
}
.pill-can {
  font-weight: bolder;
  padding: 0.3rem .7rem;
  font-size: 1rem;
  border: 2px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}
    

.main {
    display: grid;
    grid-template-rows: auto 1fr; /* Barra fixa no topo e conteúdo abaixo */
    overflow: hidden; /* Para limitar o scroll no conteúdo */
}

.topbar {
    color: #fff;
    height: 70px;
    text-align: center;
    position: sticky;
    top: 0;
    border-bottom: solid 0.1px #00dc8230;
    backdrop-filter: blur(10px);
    z-index: 100; /* Garante que a barra fique sobre o conteúdo */
}

.content {
    overflow-y: auto; /* Adiciona scroll vertical se necessário */
    padding: 20px;
}
.grid-container {
    display: grid;
    grid-template-columns: 250px 1fr; /* Coluna esquerda e restante */
    height: 100%;
    background: #f0ece4;
    transition: grid-template-columns 0.3s ease; /* Suavizar a mudança no layout */
    transition: all 0.3s ease; /* Suavizar a abertura/fechamento */
}

.grid-container.closed {
    grid-template-columns: 55px 1fr; /* Quando fechado, a coluna esquerda é 0 */
}

.left-column {
    transition: all 0.3s ease; /* Suavizar a animação */
    z-index: 100;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.track {
    border-top: solid 0.1px #00dc8230;
    margin: 0 6%;
}
.line {
    border-top: solid 0.1px #00dc8230;
    margin: 0 0 5px 0;
}
.lin {
    border-top: solid 0.1px #00dc8230;
    margin: 5px 0;
}

.user img {
    height: 20px;
    margin-right: 10px;
    border-radius: 200px;
}

.userActive {
    background-color: #00dc8260;
    color: #00dc82;
}
.userActiveP {
    color: #00dc82;
}
.dark-mode .userActiveP {
    color: #fff;
}

.menu-suspend {
    background: #eee;
    position: relative;
    top:2px;
    margin: 0 6%;
    border-radius: 4px;
    text-align: left;
    padding: 10px 10px 2px 10px;
    border: solid 0.1px #00dc8230;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.menu-suspend .menu-button {
    margin: 5px 0 0 0;
}

.dark-mode .menu-suspend {
    background: #111832;
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


.conec {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}



.conec .icon {
    zoom: 1.2;
    border-radius: 6px;
}
.conec .icon:hover {
    background: #00dc8240;
}
.menu-float {
    background: #f1fef9;
    width: 778px; /* Largura fixa */
      height: 448px; /* Altura fixa */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: fixed; /* Fixa a div em relação à tela */
    top: 50%; /* Posiciona a div no meio da altura */
    left: 50%; /* Posiciona a div no meio da largura */
    transform: translate(
        -50%,
        -50%
    ); /* Centraliza ajustando a posição do elemento */
    z-index: 9999; /* Garante que esteja acima de todo o conteúdo */
    color: #777;
    padding:20px; /* Espaço interno */
    border-radius: 10px; /* Cantos arredondados (opcional) */
    text-align: left; /* Alinha o texto centralizado */
    backdrop-filter: blur(10px); /* Desfoque do fundo */
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* Sombras (opcional) */
      display: flex;
      flex-direction: column;
      justify-content: space-between;
}

.dark-mode .menu-float {
    color:#fff;
}

.menu-float h4 {
    text-transform: uppercase;
}

.menu-float .menu-button {
    margin: 5px 0 0 0;
}

.float-top {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
}

.go-to {
    margin:5px 0 0 0;
    font-weight: bolder;
}

.search-input{
    border: none;
    background: inherit;
    width: 100vh;
    padding: 5px 5px;
    font-size: 1.2rem;
}
.search-input::placeholder{
    width: 100vh;
    border: none;
    background: transparent;
}
.search-input:focus{
    border: none;
    background: transparent;
}
.search-input:focus-active{
    border: transparent;
}

input:focus {
    border: 0 none;
    outline: 0;
}

.dark-mode .menu-float {
    background: #111832;
}

.grid-container {
    display: grid;
    grid-template-columns: 250px 1fr; /* Define duas colunas iguais */
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    height: 100vh; /* Limita o tamanho ao viewport */
    overflow: hidden; /* Previne que o conteúdo ultrapasse a borda */
}

.left-column,
.right-column {
    text-align: center;
    border-right: solid 0.1px #00dc8230;
}

.right-column {
    overflow-y: auto;
}

.left-column-two {
    height: 100vh;
    width: 55px; /* Largura padrão da coluna */
    transition: all 0.3s ease; /* Suavizar a animação */
    overflow: hidden; /* Oculta conteúdo que ultrapassa a largura */
    width: 100%;
    transition: all 0.3s ease; /* Suavizar colapso/expansão */
    z-index: 100;
    border-right: solid 0.1px #00dc8230;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.left-column-two img {
    margin-left: 0.5rem;
}

.right-column {
    border-left: solid 1px #00dc8230;
    transition: all 0.3s ease; /* Suavizar mudanças visuais */
}

.main {
    display: grid;
    grid-template-rows: auto 1fr; /* Barra fixa no topo e conteúdo abaixo */
    overflow: hidden; /* Para limitar o scroll no conteúdo */
}

.topbar {
    color: #fff;
    height: 50px;
    text-align: center;
    position: sticky;
    top: 0;
    border-bottom: solid 0.1px #00dc8230;
    backdrop-filter: blur(10px);
    z-index: 100; /* Garante que a barra fique sobre o conteúdo */
}

.content {
    overflow-y: auto; /* Adiciona scroll vertical se necessário */
    padding: 20px;
}

.view {
    /* position: fixed; */
    z-index: 1000;
    top: 0px;
    right: 0;
    left: 0;
    height: 60px;
}
.nav {
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    backdrop-filter: blur(10px);
    margin: 15px 10px;
}
.nav div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.nav a {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    z-index: 1;
    flex-wrap: wrap;
}

.nav h3 {
    margin-left: 15px;
    font-size: 1rem;
    font-family: "Gagalin";
    letter-spacing: 1.3px;
    color: #555;
    color: #ff1900;
    font-weight: normal;
}

.nav img {
    margin: 0 0 0 0.8rem;
    height: 28px;
    border-radius: 200px;
    box-shadow: 0px 2px 10px #ff1900;
}
.left-column-two .nav img {
    margin: 0 0 0 0.2rem;
}

.nav .icon {
    margin-right: 1rem;
    zoom: 1;
    color: #00dc82;
    color: #fff;
}
.nav .icon:hover {
    color: #04be7a;
}

.dark-mode .nav .icon {
    color: #020024;
}
.dark-mode .nav .icon:hover {
    color: #04be7a;
}

.nav .button .icon {
    margin: 0 0.4rem 0 0.7rem;
    zoom: 1.3;
    color: #00dc82;
    color: #555;
}
.nav .button .icon:hover {
    color: #04be7a;
}

.menu {
    height: 100vh;
}

.menu-bar {
    margin: 0 -5px 0 15px;
}

.menu-bar .icon {
    zoom: 1.2;
}
.dark-mode .menu-bar .icon {
    color: #555;
    zoom: 1.2;
}

.button .icon {
    margin: 0;
    border-radius: 4px;
    transition: all 0.3s linear;
}

.button:hover .icon {
    background-color: #00dc8260;
    border-radius: 4px;
}

.menu-button {
    align-items: center;
    transition: background-color 0.2s ease;
    text-decoration: none;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 6px 6%;
    padding: 7px 5px;
    border-radius: 6px;
}
.retract-button {
    align-items: right;
    transition: background-color 0.2s ease;
    text-decoration: none;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin: 6px 6%;
    padding: 7px 5px;
    border-radius: 6px;
    cursor: pointer;
}

.search{
    border: solid .1px #00dc8220;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
}
.search:hover:nth-child(1){
    background: #00dc8205;
}

.left-column-two .search div .icon{
    margin-left: 10px;
}
.trap span {
    margin:0 1px;
    padding:1px;
    height: 20px;
    width: 20px;
    background: #00dc8250;
    color:#777;
    text-align:center;
    border-radius: 5px;
    border: solid .1px #00dc8240;
    font-weight: bolder;
    font-size: .9rem;
}

.dark-mode .trap span {
    color:#fff;
}

.menu-button div {
    display: flex;
    align-items: center;
}
.menu-button a {
    width: 95%;
}

.menu-button p {
    font-size: 1rem;
    font-weight: bolder;
    margin: 0;
    color: #555;
}

.menu-button div {
    display: flex;
    flex-direction: row;
    font-size: 0.8em;
    justify-content: space-between;
    color: #555;
}

.menu-button .icon {
    margin: 0px 0.5rem 0 0.5rem;
    zoom: 0.9;
}
.left-column-two .menu-button .icon {
    margin: 0px auto;
    zoom: 0.9;
}
.menu-button:hover .icon {
    color: #555;
}

.menu-button:hover p {
    color: #555;
    font-weight: bolder;
}
.menu-button:hover {
    cursor: pointer;
    background: transparent;
    color: #555;
    background: #e6e1d6;
}

.menu-button.router-link-exact-active {
    color: #e6e1d6;
    cursor: pointer;
    border-left: transparent;
    background: #dbad7260;
}
.menu-button.router-link-exact-active p {
    color: #555;
    cursor: pointer;
}
.menu-button.router-link-exact-active .icon {
    color: #555;
    cursor: pointer;
}
.menu-button.router-link-exact-active:hover p,
.menu-button.router-link-exact-active:hover .icon {
    color: #555 ;
    cursor: pointer;
}
.menu-button.router-link-exact-active p {
    font-weight: bolder;
}
/* @media (min-width: 1001px) {

        .grid-container {
            display: grid;
            box-sizing: border-box;
            padding:0;
            margin:0;
        }

        .left-column {
            overflow-y: auto;
        }
        .right-column {
            border-left: solid 1px #00dc8230;
        }

        .left-column img {
            display: flex;
            width: 100%;
            object-fit: cover;
        }
    }
    */
@media (min-width: 1001px) {
    .nav .menu-bar {
        display: none;
    }
}
@media (max-width: 1000px) {
    .grid-container {
        display: flex;
        justify-content: center;
        width: 100%; /* Define duas colunas iguais */
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    .view {
        background: #00dc82;
        position: sticky;
        z-index: 10000;
        top: 0px;
        right: 0;
        left: 0;
        height: 60px;
        width: 100%;
    }

    .left-column-two,
    .left-column,
    .nav .button {
        display: none;
    }

    .left-column,
    .right-column {
        text-align: center;
        margin-bottom: 20px;
    }

    .left-column img {
        display: flex;
        height: 100vh;
        width: 100%;
        object-fit: cover;
    }

    .left-column img {
        display: none;
    }
}
</style>
