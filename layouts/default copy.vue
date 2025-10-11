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
                navbar.style.top = '20px';
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Para o comportamento correto em bordas
        }, false);
    }
}


</script>
<script setup>
const route = useRoute()

const reg = route.params.id
const logon = useCookie('logon')
// const logon = useCookie('logon', { maxAge: 4800})
logon.value = reg

const dataConf = await useFetch(`https://api.leandrocesar.com/users/${route.params.id}`)
const inter = await useFetch(`https://api.leandrocesar.com/users/${route.params.id}`)
const status = dataConf.data.value?.status
const photoOpen = ref(false);
function openPhoto() {
    photoOpen.value = !photoOpen.value;
}

const nameValue = dataConf.data.value?.name

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

// const checkImageExists = async (url) => {
//   try {
//     const response = await fetch(url, { method: 'HEAD' });
//     if (response.ok) {
//       console.log('A imagem existe:', url);
//     } else {
//       console.log('A imagem não existe:', url);
//     }
//   } catch (error) {
//     console.log('Erro ao verificar a imagem:', error);
//   }
// };

// // Exemplo de uso
// checkImageExists(`https://app.leandrocesar.com/img/${route.params.id}.jpeg`);

const imageExists = ref(false);
const checkImageExists = async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    imageExists.value = response.ok; // Armazena o resultado
  } catch (error) {
    console.log('Erro ao verificar a imagem:', error);
  }
};

// Exemplo de uso da função
await checkImageExists(`https://app.leandrocesar.com/img/${route.params.id}.jpeg`);


</script>
<template>
    <div v-if="bodyOne">

        <div id="nav-container" class='nav'>

            <div v-if="navA">
                <div class="nav-bottom">
                    <NuxtLink :to="`/users/${route.params.id}`">
                        <Icon name='solar:home-smile-bold' />
                    </NuxtLink>
                    <NuxtLink :to="`/users/${route.params.id}/treinos`">
                        <Icon name='solar:dumbbell-large-bold' />
                    </NuxtLink>
                    <NuxtLink v-if="dataConf.data.value?.treinoA === SerieA"
                        :to="`/users/${route.params.id}/treinos/a`">
                        <Icon name='mdi:alpha-a-box' />
                    </NuxtLink>
                    <NuxtLink :to="`/users/${route.params.id}/avaliacao`">
                        <Icon name='solar:clipboard-heart-bold' />
                    </NuxtLink>
                </div>
            </div>

            <div v-else>
                <div class="nav-bottom">
                    <NuxtLink :to="`/users/${route.params.id}`">
                        <Icon name='solar:home-smile-bold' />
                    </NuxtLink>
                    <NuxtLink :to="`/users/${route.params.id}/treinos`">
                        <Icon name='solar:dumbbell-large-bold' />
                    </NuxtLink>
                    <NuxtLink :to="`/users/${route.params.id}/cardio`">
                        <Icon name='material-symbols:cardiology' />
                    </NuxtLink>
                    <NuxtLink :to="`/users/${route.params.id}/avaliacao`">
                        <Icon name='solar:clipboard-heart-bold' />
                    </NuxtLink>
                </div>
            </div>

            <div>

                <NuxtLink @click="menu()" class="button-client">
                    <Icon name="solar:hamburger-menu-bold" />
                </NuxtLink>

            </div>
        </div>

        <div v-if="route.path === `/users/${logon}` || route.path === `/users/${logon}/parcerias`" class="head-logo"
            id="sobre">
            <NuxtLink @click="menu()" class="button-client">
            </NuxtLink>
            <!-- <div v-if='imageExists' class='logo'> -->
            <div class='logo'>
                <img @click="openPhoto()" :src="inter.data.value?.foto">
            </div>
        </div>
        <div v-if="photoOpen" class="nav-bar">
            <div  class='logo-nav-bar'>
                <img @click="openPhoto" :src="inter.data.value?.foto">
            </div>
        </div>
        <div v-if="route.path === `/users/${logon}` || route.path === `/users/${logon}/parcerias`" class="head-name">
            <div class="name">
                Olá, {{ firstName }}
            </div>
        </div>
        <div class="color">

            <a @click="theme()" :model="$colorMode.value">
                <Icon
                    :name="colorMode.value === 'dark' ? 'line-md:moon-filled-to-sunny-filled-loop-transition' : 'line-md:sunny-filled-loop-to-moon-alt-filled-loop-transition'" />
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

            <div v-if="navA">
                <div class="nav-bottom">
                    <NuxtLink :to="`/users/${route.params.id}`">
                        <Icon name='solar:home-smile-bold' />
                    </NuxtLink>
                    <NuxtLink :to="`/users/${route.params.id}/treinos`">
                        <Icon name='solar:dumbbell-large-bold' />
                    </NuxtLink>
                    <NuxtLink v-if="dataConf.data.value?.treinoA" :to="`/users/${route.params.id}/treinos/a`">
                        <Icon name='mdi:alpha-a-box' />
                    </NuxtLink>
                    <NuxtLink :to="`/users/${route.params.id}/avaliacao`">
                        <Icon name='solar:clipboard-heart-bold' />
                    </NuxtLink>
                </div>
            </div>

            <div v-else>
                <div class="nav-bottom">
                    <NuxtLink :to="`/users/${route.params.id}`">
                        <Icon name='solar:home-smile-bold' />
                    </NuxtLink>
                    <NuxtLink :to="`/users/${route.params.id}/treinos`">
                        <Icon name='solar:dumbbell-large-bold' />
                    </NuxtLink>
                    <NuxtLink :to="`/users/${route.params.id}/cardio`">
                        <Icon name='material-symbols:cardiology' />
                    </NuxtLink>
                    <NuxtLink :to="`/users/${route.params.id}/avaliacao`">
                        <Icon name='solar:clipboard-heart-bold' />
                    </NuxtLink>
                </div>
            </div>

            <div>

                <NuxtLink @click="menu()" class="button-client">
                    <Icon name="solar:close-square-bold" />
                </NuxtLink>

            </div>
        </div>
        <div class="head-logo" id="sobre">
            <NuxtLink @click="menu()" class="button-client">
            </NuxtLink>
            <div v-if='imageExists' class='logo'>
                <img @click="openPhoto()" :src="dataConf.data.value?.foto">
            </div>
            <div v-if="photoOpen" class="nav-bar">
                <div class='logo-nav-bar'>
                    <img @click="openPhoto" :src="dataConf.data.value?.foto">
                </div>
            </div>
        </div>
        <div class="head-name">
            <div class="name">
                {{ dataConf.data.value?.name }} {{ dataConf.data.value?.lastName }}
            </div>
            <div class="email">{{ dataConf.data.value?.email }}</div>
        </div>
        <div>
            <p class="section-title">Ciclos</p>
            <p class="section-subtitle">Contrato atual: {{ dataConf.data.value?.periodStart.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3-$2-$1') }} - {{
                dataConf.data.value?.periodEnd.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3-$2-$1') }}</p>
            <p v-if="dataConf.data.value?.service" class="section-subtitle-two">Serviço: {{ dataConf.data.value?.service
                }}</p>

            <p v-if="status === 1" class="section-option pending">
                <Icon name="solar:danger-square-outline" /> Pendente!
            </p>
            <p v-else-if="status === 0" class="section-option bloqued">
                <Icon name="solar:close-square-outline" /> Bloqueado!
            </p>
            <p v-else class="section-option verified">
                <Icon name="solar:check-square-outline" /> Verificado!
            </p>
            <div class="conf">
                <NuxtLink class="menu-square">
                    <div>
                        <div>
                            <p>
                                <Icon name="solar:dumbbell-large-bold" />
                                Treino
                            </p>
                        </div>
                        <div>
                            Atual: {{ dataConf.data.value?.treinoActual }}
                        </div>
                        <div> 
                            Próximo: {{ dataConf.data.value?.treinoNext }}
                        </div>
                    </div>
                </NuxtLink>
                <NuxtLink v-if="dataConf.data.value?.valuationActual" class="menu-square">
                    <div>
                        <div>
                            <p>
                                <Icon name="solar:clipboard-heart-bold" />
                                Avaliação
                            </p>
                        </div>
                        <div>
                            Atual: {{ dataConf.data.value?.valuationActual }}
                        </div>
                        <div>
                            Próxima: {{ dataConf.data.value?.valuationNext }}
                        </div>
                    </div>
                </NuxtLink>
            </div>
            <!-- Hístórico -->
            <NuxtLink :to="`/users/${route.params.id}/treinos`" class="menu-button">
                <div>
                    <Icon name="solar:dumbbells-line-duotone" />
                    <p>
                        Todos os treinos
                    </p>
                </div>
                <Icon name="ic:baseline-keyboard-arrow-right" />
            </NuxtLink>
            <!-- Histórico fim -->
            <!-- Avaliações -->
            <NuxtLink :to="`/users/${route.params.id}/avaliacao`" class="menu-button">
                <div>
                    <Icon name="solar:clipboard-heart-linear" />
                    <p>
                        Avaliações
                    </p>
                </div>
                <Icon name="ic:baseline-keyboard-arrow-right" />
            </NuxtLink>
            <!-- Avaliações fim -->

            <!-- Documentos -->
            <p class="section-title">Documentos</p>
            <NuxtLink :to="`/users/${route.params.id}/contratos`" class="menu-button">
                <div>
                    <Icon name="solar:document-add-linear" />
                    <p>
                        Contratos
                    </p>
                </div>
                <Icon name="ic:baseline-keyboard-arrow-right" />
            </NuxtLink>
            <NuxtLink :to="`/users/${route.params.id}/termos-de-uso`" class="menu-button">
                <div>
                    <Icon name="solar:document-text-linear" />
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
                <Icon name="solar:logout-3-bold" />
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
    width: 55px;
    margin: 1.5rem;
    border-radius: 10px;
    z-index: 10;

}

.logo img {
    width: 49px;
    margin: -1px 0 0 -1px;
    border-radius: 10px;
    z-index: 100;
    border: #00dc82 1px solid;
    opacity: 1;
    background: linear-gradient(to bottom right, #00dc8280 0%, #00dc8280 50%, #00dc82 100%);
    padding: 1px;

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
    background: linear-gradient(to bottom right, #00dc8280 0%, #00dc8280 50%, #00dc82 100%);    backdrop-filter: blur(5px);
    z-index: 1004;

}

.logo-nav-bar img {
    width: 300px;
    border-radius: 10px;
    border: #00dc82 1px solid;
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
    font-size: 1.6rem;
    line-height: 1.5rem;
    margin: .2rem 1.5rem;
    font-weight: 700;
    letter-spacing: 1.5px;
    color: #00dc82;

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
    box-shadow: 1px 7px 20px #00dc82;
    margin: 1.5rem;
    border-radius: 10px;
}

.main-logo img {
    width: 100px;
    border-radius: 10px;
    border: #00dc82 2px solid;
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
    color: #00dc82;
}

.section-title {
    text-align: left;
    margin: 10px 1.5rem;
    font-weight: 800;
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
    margin: -10px 1.5rem 15px;
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
    border: solid .1px #00dc8250;
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
    border: solid 1px #00dc8210;
    border-bottom: solid .1px #00dc8240;
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
    border-bottom: solid .2px #00dc82;
    background-color: #00dc8210;
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
    border: solid .1px #00dc8270;
    box-shadow: 0 0px 5px #00dc8210;
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
    background-color: #00dc8210;
    color: #00dc8280;
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
    top: 20px;
    margin: 16px auto;
    box-shadow: 0 0px 5px #00f2ff10;
    border: solid 1px #00dc8240;
    width: 90%;
    height: 50px;
    border-radius: 10px;
    z-index: 101;
    padding: 12.2px 8px 12px 12px;
    backdrop-filter: blur(100px)
}

.nav a {
    margin: 0 2px;
    padding: 12.2px 8px 12px 12px;
    padding: 12.2px 8px 9px 8px;
    padding: 13px 14.5px 14.5px 14.5px;
    text-decoration: none;
    cursor: pointer;
}

.nav a.router-link-exact-active {
    background: linear-gradient(to bottom right, #00dc8210 0%, #00dc8210 50%, #00dc8210 100%);
    margin: 0 2px;
    color: #00dc82;
    padding: 13px 14.5px 14.5px 14.5px;

    border-radius: 10px;
    text-decoration: none;
    cursor: pointer;
}

.nav a.router-link-exact-active:hover {
    margin: 0 2px;
    padding: 13px 14.5px 14.5px 14.5px;
    color: #00dc82;
    background: linear-gradient(to bottom right, #00dc8210 0%, #00dc8210 50%, #00dc8210 100%);
    color: #00dc82;
    border-radius: 10px;
    text-decoration: none;
    cursor: pointer;
}

.nav a.router-link-exact-active:hover::after {
    position: absolute;
    top: 60px;
    left: 20px;
    background-color: var(--color-background);
    color: #00dc82;
    border-radius: 10px;
    text-decoration: none;
    cursor: pointer;
}

.nav a:hover {
    background-color: transparent;
    color: #00dc82;
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
    z-index: 100;
    border: solid 1px #00dc8210;
    box-shadow: 0 0px 5px #00dc8240;
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
    bottom: 1.5rem;
    right: 1.5rem;
    border-radius: 10px;
    cursor: pointer;
    z-index: 100;
    border: solid 1px #00dc8210;
    box-shadow: 0 0px 5px #00dc8240;
    backdrop-filter: blur(100px)
}

.whats .icon,
.color .icon {
    color: #00dc8290;
    zoom: 1;
}
</style>
