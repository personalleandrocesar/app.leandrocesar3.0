<script setup>
import { ref, onMounted } from 'vue';
const layout = "duo"


useHead({
    titleTemplate: 'Nex_Wod: Seu Próximo Treino Diário!',
});


const user = ref('leandrocesar');
const senha = ref('');

const route = useRoute();

// Fetch de dados da API
const Users = await useFetch('https://api.leandrocesar.com/users');

// Verifica se há dados antes de acessar `Users.data`
const items = Users.data.value;

// Determina a largura percentual desejada para `sectionsWidth`
const sectionsWidth = `${ (items.length) }%`; // Exemplo de cálculo percentual
const lineWidth = '73%';

// Atualiza as variáveis CSS após a montagem do componente
onMounted(() => {
  document.documentElement.style.setProperty('--sections-width', sectionsWidth);
  document.documentElement.style.setProperty('--line-width', lineWidth);
});

const service = ref('')
const exists = Users.data.value.find(u => service);


const add = ref(true)
function addClient() {
    add.value = !add.value
}

const swit = ref(true)
function switchButton() {
    swit.value = !swit.value
}

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
colorCookie.value === "darkCookie" ? colorMode.value = "dark" : colorMode.value = "light"

const state = useCookie('state')
state.value = state.value


</script>

<template>
    
        <div id="grid">
            <div id="areaA">
                <div class='Doughnut'>
                    <MyChart />
                </div>
                
                Clientes: {{ Users.data.value.length }}
                <div class="graph">
                    <div class="personal" style="width: var(--sections-width);"  ></div>
                    <div class="consultoria" style="width: var(--line-width);"></div>
                </div>
            </div>
        </div>
</template>
<style scoped>
.graph{
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: nowrap;
    margin: 20px;
}
.legend{
    display: flex;
    justify-content: space-evenly;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;
    margin: 20px;
}

.personal, .consultoria {
  position: relative;          /* Largura total */
  height: 20px;           /* Espessura da linha */
  overflow: hidden;      /* Esconde o excesso da animação */
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
}

.personal::before {
  content: 'Personal';
  position: absolute;
  top: 0;
  width: 100%;
  height: 20px;
  color: #fff;
  border-radius: 7px 0px 0px 7px;
  text-align: center;
  padding-top: 1px;
  background: linear-gradient(to bottom right, #ff190010 0%, #ff190080 50%, #ff1900 100%);
  background: green;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-bottom: 1px solid #fff;
  animation: moveLine 1s linear; /* Animação de 15 segundos */
}

.consultoria::before {
  content: 'Consultoria';
  color: #555;
  border-top: 1px solid #fff;
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
  position: absolute;
  padding-top: 1px;
  text-align: center;
  top: 0;
  width: 100%;
  height: 20px;
  border-radius: 0px 7px 7px 0px;
  background: linear-gradient(to bottom right, #ff190010 0%, #ff190080 50%, #ff1900 100%);
  background: #09df00;
  animation: moveLine 1s linear; /* Animação de 15 segundos */
}

@keyframes moveLine {
  from {
    right: 100%;
  }
  to {
    right: 0%;
  }
}
.Doughnut {
    width: 260px;
    height: 260px;
    display: flex;
    align-items: center;
    justify-content: center;
}

@media (max-width: 650px) {
    .Doughnut {
        width: 230px;
        height: 230px;
        margin: auto;
    }
}

.nav-top {
    position: sticky;
    top: 0px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
    z-index: 1;
    height: 40px;
    font-weight: bolder;
    border-bottom: .10px solid #8d00ab40;
    backdrop-filter: blur(45px);
    border-bottom: solid 1px #8d00ab40;
    border-right: solid 1px #8d00ab40;
}

.clients {
    margin: 11px;
}

.clients span {
    border: 1px solid #8d00ab90;
    padding: 3px 6px;
    border-radius: 8px;
    color: #8d00ab;
    background-color: #8d00ab30;
    margin-left: 3px;
}

.notifications {
    border: solid 1px transparent;
    padding: 4px 5px;
    margin: 6px;
    border-radius: 8px;
    transition: all .3s linear;
    cursor: pointer;
}

.notifications:hover {
    padding: 4px 5px;
    border-radius: 8px;
    color: #8d00ab;
    background-color: #fff;
}

.nav-users {
    position: sticky;
    top: 40px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
    z-index: 1;
    height: 35px;
    font-weight: bolder;
    margin-bottom: 1rem;
    border-bottom: .10px solid #8d00ab40;
    backdrop-filter: blur(45px);
    border-bottom: solid 1px #8d00ab40;
        border-right: solid 1px #8d00ab40;
}

.users-conf {
    margin: 16px;
}

.users-conf span {
    border: 1px solid #8d00ab90;
    padding: 8px;
    border-radius: 8px;
    color: #8d00ab;
    background-color: #8d00ab30;
    margin-left: 3px;
}

.filter {
    border: solid 1px #8d00ab90;
    background-color: #8d00ab30;
    padding: 6px 7px;
    margin: 9px 35px;
    border-radius: 8px;
    transition: all .3s linear;
    cursor: pointer;
}

.filter:hover {
    border: solid 1px #fff;
    padding: 6px 7px;
    border-radius: 8px;
    color: #8d00ab;
    background-color: #fff;
}

.users-list {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
    z-index: 1;
    margin-bottom: 1rem;
    overflow-y: auto;
    overflow-x: hidden;
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
    bottom: 6rem;
    right: 1.5rem;
    border-radius: 9px;
    cursor: pointer;
    z-index: 100;
    border: solid 1px #8d00ab10;
    box-shadow: 0 0px 5px #8d00ab40;
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
    right: 1.5rem;
    border-radius: 9px;
    cursor: pointer;
    z-index: 100;
    border: solid 1px #8d00ab10;
    box-shadow: 0 0px 5px #8d00ab40;
    backdrop-filter: blur(100px)
}

.whats .icon,
.color .icon {
    color: #8d00ab90;
    zoom: 1;
}
</style>
