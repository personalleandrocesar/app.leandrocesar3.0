<script setup>
import { ref, watch } from "vue";
const route = useRoute();
const router = useRouter();

const Users = await useFetch(
    `https://api.leandrocesar.com/usersnw/${route.params.id}/team/${route.params.iddd}`,
);
const item = Users.data.value;

const user = item;
const train = item.treinos
const name = user.name;
const firstName = computed(() => {
    return name.split(" ")[0]; // Divide o nome completo em partes e retorna o primeiro nome
});
useHead({
  titleTemplate: `${firstName.value}  ${user.lastName} - Cliente | Leandro Cesar - App`,
});

const content = ref(true)
const buttonCreate = ref(true)

function createTraininng () {
  content.value = ! content.value
  buttonCreate.value = ! buttonCreate.value
}


const items = ref(
    {
        named: '',
        creationUser: new Date().toISOString(), 
    }
)
const creationDate = items.value.creationUser.split('T')[0].replace(/(\d{4})-(\d{2})-(\d{2})/, '$3-$2-$1');
const subscriberOk = ref()
async function submitTreino() {
    try {
        const response = await fetch(`https://api.leandrocesar.com/usernw/${route.params.id}/atleta/${route.params.iddd}/treinos`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                treino: items.value
            }),
        });
        if (response.ok) {
            console.log('Create Trainning successfully');
            subscriberOk.value = true;
            setTimeout(() => {
                subscriberOk.value = false;
                // reloadNuxtApp({
                //     path: `/admin/clientes/${item.username}/treinos`,
                //     ttl: 1500, // default 10000
                // });
                // return navigateTo(`/coach/${route.params.id}/team/${route.params.idd}/treinos`);
            }, 1500);
        } else {
            console.error('Failed to Create Trainning');
        }
    } catch (error) {
        console.error('Error Create Trainning:', error);
    }
}
function coachFloat() {
    router.push(`/coach/${route.params.id}/atleta/${route.params.iddd}/treinos`);
}
</script>

<template>

    <div class="float zoom" >
        <div class="menu-float zoomOut" >
        
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
                            >
                        </div>
                    </div>
                <p class='go-to'>Go to</p>
                <NuxtLink
                    :to="`/coach/${route.params.id}`"
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
                    :to="`/coach/${route.params.id}/team`"
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
                    :to="`/coach/${route.params.id}/settings`"
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
                <NuxtLink :to="`/`">
                    <div>
                        <Icon name="stash:signout" />
                        <p>Sign Out</p>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
<style scoped>

.float{
    position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1002;
      background: #ffffff20;
      backdrop-filter: blur(5px); /* Desfoque do fundo */
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
    backdrop-filter: blur(20px); /* Desfoque do fundo */
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

      /* Container do botão */
      .switch {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
}

/* Oculta o checkbox padrão */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* Slider (parte deslizante do botão) */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 20px;
}

/* Círculo dentro do slider */
.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

/* Efeito ligado (quando o checkbox está marcado) */
input:checked + .slider {
  background-color: #00dc82;
}

input:checked + .slider:before {
  transform: translateX(16px);

}

.line {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: stretch;
    margin: 20px 1%;
    margin:20px 1%;
    padding: 10px 0 20px 0;
    border-bottom: solid 1px #00dc8230;
}

.line-columns {
    display: grid;
    grid-template-columns: .6fr 1fr; /* Barra fixa e conteúdo */
   
        
}

.bor {
    border-left: solid 1px #00dc8240;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    flex-direction: column;
  width: 100%;
}

.theme-switch {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  gap: .5rem;
  margin: 10px;
}
.theme-switch:not(:last-child) {
    padding-bottom: 10px;
    border-bottom: solid 1px #00dc8240;
}

.theme-switch .icon {
    margin-top:-3p
}

.radio-input {
  display: none;
}

.pill {
  padding: 0.3rem .7rem;
  font-size: 1rem;
  border: 2px solid #ccc;
  border-radius: 8px;
  background: #ddd;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.radio-input:checked + .pill {
  background-color: #00dc82;
  border-color: #00d4ff50;
  color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.pill:hover {
  background-color: #04be7a ;
  color:#fff;
}
.layout-no-sidebar {
  display: grid;
  grid-template-rows: auto 1fr; /* Barra fixa e conteúdo */
  overflow:auto;
}

.topbar {
  color: white;
  height: 60px;
  text-align: center;
  position: sticky;
  top: 0;
  border-bottom: solid .1px #00dc8230;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 10; /* Garante que a barra fique visível acima do conteúdo */
}
.topbar div{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
}

.topbar h3 {
    margin-left: 2rem;
}
.topbar h4 {
    color: #777;
    margin-left: .2rem;
    padding: 4px 6px;
    border-radius: 8px;
    background: #00dc8280;
    color: #fff;
}

.dark-mode .topbar h4 {
    color: #fff;
}

.content {
  overflow-y: auto; /* Adiciona scroll vertical no conteúdo */
}


.add-client-max, .edit-client-max {
    display:none;
}

@media (max-width: 650px) {
    .none {
        display: none;
    }

    .add-client-mini, .edit-client-mini {
        display: none;
    }

        .add-client-max, .edit-client-max {
            display: inherit;
        }
}

.lost h5 {
    font-size: .6rem;
}
.inputs {
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    font-weight: bolder;
    font-size: 14px;
}

.inputs div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: flex-start;
    margin: .5rem
}

.inputs #masculino.check,
.inputs #feminino.check {
    text-decoration: underline;
    margin: -15px -94px;
    height: 15px;
    cursor: pointer;
}

.inputs .radio {
    margin: 30px 0px 15px 0px;
}


.inputs .terms {
    text-decoration: underline;
    color: #00dc82;
    height: 15px;
    cursor: pointer;
}

.inputs #terms.check {
    text-decoration: underline;
    margin: 10px -64px;
    height: 15px;
    cursor: pointer;
}

.dont-user {
    position: fixed;
    top: 10px;
    right: 10px;
    width: 200px;
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
    border: solid 2px #00dc82;
    text-align: left;
    width: 500px;
    font-weight: 600;
    border-radius: 8px;
    height: 40px;
    font-size: 14px;
    padding: 5px 33px;
    color:#555;
     
}
textarea {
    border: solid 2px #00dc82;
    text-align: left;
    width: 500px;
    font-weight: 600;
    border-radius: 8px;
    height: 120px;
    background: transparent;
    font-size: 14px;
    color:#555;
     
}
textarea:focus {
    border: solid 2px #00dc82;
    outline: 0;
    padding: 5px;
    color: #555;
    background: #00dc8270;
}
.dark-mode textarea:focus {
    color: #fff;
}
textarea:active {
    border: solid 2px #00dc82;
     
}
textarea:focus-visible {
    border: solid 2px #00dc82;
}


.p{
        box-shadow: 0 1px 7px rgba(0, 0, 0, 0.3);
}
.ex{
    background: red;
    color: #fff;
}
.ex:hover{
    background: red;
    opacity:.9;
    color: #fff;
}
.sw-icon {
    margin-right: -40px;
    z-index:100;
}
.sw-tx {
    margin-right: -109px;
    z-index:100;
    font-weight: bolder;
    color: #aaa;
}
.sw-i-tx {
    padding: 2px 100px;
    margin-top:6px;
}
.sw-i-txx {
    padding: 2px 10px;
    margin-top:6px;
}

.sw-i-txx::placeholder {
    color: #333;
}
.dark-mode .sw-i-txx::placeholder {
    color: #999;
}
.avatar {
    height: 60px;
    width: 60px;
    border-radius: 30px;
    background:#999;
    margin-right: 0px;
    margin-left: 0px;
    border: solid 3px #999;
}

.avatar-tx {
    border-radius: 30px;
    margin: 3px -48px;
    margin-left: -640px;
    color: #fff;
    z-index: 2;
}
.inputs #username {
    width: 190px
}

.inputs #lastName {
    width: 130px
}

.inputs #email {
    width: 335px
}

.inputs div h4 {
    text-align: left;
}

input:focus-visible {
    border: solid 1px #00dc82;
}
input:active {
    border-color: #00dc8280;
}

input:hover {
    background-color: #00dc8210;
}


input:focus {
    border: 0 none;
    border: solid 2px #00dc82;
    outline: 0;
}

img {
    height: 25px;
    border-radius: 50%;
}



h4 {
    margin: 00px;
    text-align: left;
    color: #999;
}


.select {
    border: 0;
    color: inherit;
    background-color: transparent;
    border: solid 2px #00dc82;
    border-radius: 5px;
    cursor: pointer;
    width: 80px;
    text-align: left;
    height: 30px;
    font-size: 14px;
}
select::selection {
    border: solid 2px #00dc82;
    background: #00dc8240;
}

.select:focus {
    border: 0 none;
    border: solid 2px #fff;
    outline: 0;
}

.dark-mode .select:focus {
    border-color: #00dc8290 ;
}

.select:focus-visible {
    background-color: #00dc8210;
    border: solid 2px #00dc82;
}

.select:active {
    background-color: #00dc8210;
}

.dark-mode select:active {
    background: #111827;
    border: solid 2px #00dc82;
}

.select:hover {
    background-color: #00dc8210;
}

.create {
    border: solid 2px #00dc82;
    cursor: pointer;
    width: 140px;
    text-align: center;
    line-height: 18px;
    border-radius: 88px;
    font-weight: 600;
    height: 30px;
    font-size: 14px;
    padding-inline: 16px;
    padding-top: 6px;
    padding-bottom: 8px;
    margin: 1rem 1.5rem;
}

.lost h5 {
    font-size: .6rem;
}.create {
    padding: 6px 12px;
    border-radius: 8px;
    cursor: pointer;
    color:#00dc82;
    background-color: #00d4ff;
    border: none;
    opacity: .7;
}

.lost h5 {
    font-size: .6rem;
}

.create .icon {
    margin: -1px 0px 2px 4px;
}

.create:hover {
    opacity: 1;
}

.Doughnut {
    width: 320px;
    height: 320px;
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
    border-bottom: .10px solid #00dc8240;
    backdrop-filter: blur(45px);
    border-bottom: solid 1px #00dc8240;
    border-right: solid 1px #00dc8240;
}


.clients {
    margin: 11px;
}

.upper {
    text-transform: Capitalize;
    color: #00dc82;
}


.clients span {
    border: 1px solid #00dc8290;
    padding: 3px 6px;
    border-radius: 4px;
    color: #00dc82;
    background-color: #00dc8230;
    margin-left: 3px;
}

.notifications {
    border: solid 1px transparent;
    padding: 4px 5px;
    margin: 6px;
    border-radius: 4px;
    cursor: pointer;
}

.notifications:hover {
    padding: 4px 5px;
    border-radius: 4px;
    color: #00dc82;
}

.users-list {
    display: flex;
    justify-content: center;
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
    bottom: 6rem;
    right: 1.5rem;
    border-radius: 9px;
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
    bottom: 3.5rem;
    right: 1.5rem;
    border-radius: 9px;
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
.subscriberOk {
    background-color: #00dc82;
    text-shadow: 2px 2px 2px #111;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px 20px 20px 20px;
    padding: 15px;
    border-radius: 4px;
    position: fixed;
    bottom: 10px;
    width: 80%;
    left: 50%;
    color: #fff;
    margin-left: -40%;
    font-weight: 900;
    border: solid 1px #00dc8210;
    z-index: 10000;
}
#customers {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

#customers th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #00dc8280;
font-weight: bolder;
}

#customers td,
#customers th {
    border: 1px solid #00dc8240;
    padding: 8px;
    color: white;
    font-weight: bolder;
}

#customers tr:nth-child(1) {
    background-color: #00dc8230;
    }
#customers tr:nth-child(2n) {
    background-color: #00dc8230;
    }
    
    #customers tr:hover {
        background-color: #00dc8250 ;
    }
   
input[type="radio"] {
  accent-color: #00dc82; /* Muda a cor do botão de rádio */
  transform: scale(1); /* Diminui o tamanho do botão de rádio */
  width: 15px; /* Ajusta a largura do botão de rádio */
  height: 15px; /* Ajusta a altura do botão de rádio */
}
.row {
    display: flex;
    flex-direction: row;
    border: 1px solid #00dc8240;
    font-size: 1rem;
}

.row:nth-child(1) {
    position: sticky;
    top: 90px;
    font-size: 1.1rem;
    font-weight: bolder;
}

.row:nth-child(2n) {
    background-color: #00dc8210;

}

.header {
    font-weight: bold;
}

.cell {
    flex: 1;
    overflow: hidden;
    border-right: 1px solid #00dc8240;
}

.cell:nth-child(1) {
    flex: .17;
}



.cell:nth-child(2),
.cell:nth-child(3),
.cell:nth-child(4),
.cell:nth-child(6),
.cell:nth-child(7),
.cell:nth-child(8),
.cell:nth-child(9),
.cell:nth-child(10),
.cell:nth-child(11) {
    flex: 2;
}


.cell-two {
    flex: 1;
    overflow: hidden;
    border-right: 1px solid #00dc8240;
}

.cell-two:nth-child(1) {
    flex: 1;
}

.cell-two:nth-child(2),
.cell-two:nth-child(3),
.cell-two:nth-child(4),
.cell-two:nth-child(6),
.cell-two:nth-child(7),
.cell-two:nth-child(8),
.cell-two:nth-child(9),
.cell-two:nth-child(10) {
    flex: .4;
}

.cell-two:nth-child(10) {
    flex: .2;
}

.main {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
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
    height: 50px;
    font-weight: bolder;
    border-bottom: solid 1px #00dc8240;
    border-right: solid 1px #00dc8240;
    backdrop-filter: blur(45px);
}

.clients {
    margin: 11px;
}

.clients span {
    border: 1px solid #00dc8240;
    padding: 3px 6px;
    border-radius: 4px;
    color: #00dc82;
    background-color: #00dc8240;
    margin-left: 3px;
}

.add-client {
    border: solid 1px #00dc8290;
    background-color: #00dc82;
    padding: 5px 7px;
    margin: 5px;
    border-radius: 4px;
    cursor: pointer;
    color: #fff;
}

.add-client:hover {
    border: solid 1px #00dc8290 ;
    border-radius: 4px;
    color: #00dc82;
    background-color: #fff;
}

.edit-client {
    border: solid 1px #fadb4090;
    background-color: #fadb4080;
    padding: 5px 7px;
    margin: 1.5px 6px;
    border-radius: 4px;
    cursor: pointer;
    color: #fff;
}

.edit-client:hover {
    border: solid 1px #fadb4090 ;
    border-radius: 4px;
    color: #000;
    background-color: #fadb40;
}

.close-client {
    border: solid 1px #00dc82;
    background-color: #00dc82;
    padding: 5px 42px;
        margin: 1.5px 6px;
    border-radius: 4px;
    cursor: pointer;
    color: #fff;
}

.close-client:hover {
    border: solid 1px #00dc8290 ;
    border-radius: 4px;
    color: #00dc82;
    background-color: #fff;
}
.close-edit-client {
    border: solid 1px #fadb40;
    background-color: #fadb40;
    padding: 5px 42px;
        margin: 1.5px 6px;
    border-radius: 4px;
    cursor: pointer;
    color: #fff;
}

.close-edit-client:hover {
    border: solid 1px #00dc8290 ;
    border-radius: 4px;
    color: #00dc82;
    background-color: #fff;
}

.nav-users {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        align-items: flex-start;
        flex-wrap: wrap;
        width: 100%;
        z-index: 1;
        height: 46px;
        font-weight: bolder;
        backdrop-filter: blur(45px);
        margin-right: 1.5rem;
        border-bottom: solid .1px #00dc8230;
}

.users-conf {
    margin: 6px 0;
    padding: 7px;
    border-radius: 6px;
}


.filter {
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 10px;
}

.filter:hover {
    color: #00dc82;
    background-color: #00dc8220;
}
.filter-two {
    padding: 8px 12px;
    border-radius: 8px;
    cursor: pointer;
    color:#00dc82;
    background-color: #00d4ff;
}

.filter-two:hover {
    opacity: .8;
}

.filter.router-link-exact-active {
    border-bottom: solid 2px #00dc8270; 
    border-radius: 0;
}

.users-list {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    z-index: 1;
    width: 100%;
    overflow-y:auto;
}


.line-end {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: flex-start;
    margin:20px 1%;
    padding: 10px 0 20px 0;
}
.line p {
    margin-top: 5px;
}

.line select {
    margin-right: 2rem; 
}

.thed {
    position: sticky;
    top: 90px;
}

.title-user {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    height: 120px;
    width: 120px;
    margin: 2px;
    border-radius: 4px;
    border: solid 2px #00dc8260;
    text-align: center;
}

.title-user:hover {
    background-color: #00dc8260;
    color: #fff;
}

.title-user img {
    width: 60px;
    background-color: #00dc8260;
    border: 3px solid #00dc82;
    border-radius: 4px;
}

.title-user h4 {
    text-align: center;
    font-size:.6rem;
    margin: 4px 1px 0px 1px;
}


.form-cliente {
    border-radius: 50%;
    border: solid 3px #00dc82;
}

.cliente {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    color: #00dc82;
}


.file-cliente {
    margin-top: -20px;
    margin-left: 20px;
    zoom: .8;
}



.close {
    zoom: 1.6;
}


.length-full {
    color: #fff;
}

.users-full h1 {
    font-size: 3rem;
    margin-bottom: -1rem;
}

.users-full-status {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
    color: #00dc82;
}

.green {
    color: #00ff00;
}

.red {
    color: #cf0000;
}

.users-full-status h1 {
    font-size: 1.3rem;
}

.users-full-status h2 {
    font-size: 1.2rem;
}


.center {
    display: flex;
    justify-content: space-evenly;
    flex-direction: row;
    align-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    padding-top: 5px;
    margin-bottom: 1rem;
}

.center-start{
    display: flex;
        justify-content: flex-start;
        flex-direction: row;
        align-content: flex-start;
        align-items: center;
        flex-wrap: nowrap;
        width: 100%;
        margin-bottom: 4rem;
}

@media (max-width: 650px) {
    .center-start-one {
        display: none;
    }
}
.center-start-one {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
}
.center-start-two {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    margin-top: -20px;
}
.center-start-tree {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    margin: -60px 0 -50px 10px;
}
.center-start-tree span{
    margin: 5px 0px -10px 12px;
    font-weight: bolder ;
}

.center-start div a {
    margin: 0 20px;
}

.center-start input {
    margin: 10px ;
}

.others {
    z-index: 1;
}

.table-clients {
    width: 100%;
    z-index: 1;
    margin-top: -2rem;
}

.others-full {
    z-index: 1;
    background-color: #00dc8250;
}

.others-details {
    margin: 0 .5%;
    z-index: 1;
    background-color: #00dc8230;
    border: solid 3px #00dc8240;
    border-radius: 3px;
}

.list {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
    height: 100%;
}


.head-logo {
    z-index: 1;
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
}

.logo {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    background: linear-gradient(90deg, #00dc82 0%, #00d4ff 35%, #04be7a 100%);
    height: 98px;
    width: 98px;
    color: #718096;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 50px;
    margin-left: 1rem;
    z-index: 10;
}

.logo img {
    height: 98px;
    width: 98px;
    border-radius: 50px;
    /* border: #00dc82 2px solid; */
    z-index: 100;
    margin-right: 1.2rem;
    padding: 4px;
    opacity: 1;
}

.head-name {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: nowrap;
    width: 250px;    
}

.head-name span {
    font-size: .9rem;
    margin: 5px 0 7px 0;
}

.head-name h3 {
    color: #00dc82;
}

.status {
    border: solid 2px #00dc8240;
    Background: #00e900;
    border-radius: 8px;
    padding: 1px 20px;
    color: #fff;;
}
.statusOff {
    border: solid 2px #00dc8240;
    Background: #e70000;
    border-radius: 8px;
    padding: 1px 20px;
    color: #fff;
}

.table {
    display: flex;
    flex-direction: column;
}

.row {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #00dc8240;
    font-size: 1rem;
}

.row:nth-child(1) {
    background-color: #00dc8290;
    position: sticky;
    top: 90px;
    font-size: 1.1rem;
    font-weight: bolder;
}

.row:nth-child(2n) {
    background-color: #00dc8210;

}

td, th {
    text-align: left;
    border: none; /* Remove as bordas das células */
    padding: 20px; /* Adiciona espaçamento interno para uma melhor aparência */
}

tr {
    border: none; /* Remove as bordas das linhas */
}
</style>
