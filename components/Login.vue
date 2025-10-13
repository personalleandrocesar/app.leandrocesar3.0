<script setup>
import { ref } from 'vue';
const user = ref('');
const senha = ref('');
const client = useFetch('https://api.leandrocesar.com/usersnw');

const dontUser = ref(false);

const coachIdCookie = useCookie('coachId'); // Criação do cookie para armazenar o ID do coach

const enterClient = () => {
  const userData = client.data.value;

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
    const coach = userData.find(u => u.team && u.team.some(t => t._id === teamMember._id));
    if (coach) {
      coachIdCookie.value = coach._id; // Configura o cookie com o ID do coach
    }
    return navigateTo(`/atleta/${teamMember._id}`);
  } else {
    console.log("Usuário não encontrado ou senha incorreta!");
    dontUser.value = true;
    setTimeout(() => {
      dontUser.value = false;
    }, 5000); // Define um timeout para limpar a mensagem após 5 segundos
  }
};

const trigger = () => {
  enterClient();
};

const id = ref('');
const dontPerson = ref('')
const enterPersonal = () => {
  const userData = client.data.value;
  const userExists = client.data.value.some(u => u.username === user.value && u.password === senha.value);
  const idExists = client.data.value.find(u => u.username === user.value && u.password === senha.value);
  
  
  
    if (userExists) {
      console.log("Usuário encontrado!");
      // Faça a ação para redirecionar ou permitir o acesso do usuário à página
      // return navigateTo(`/coach/${user.value}`);
      return navigateTo(`/coach/${idExists._id}`);
  
    } else {
      console.log("Usuário não encontrado ou senha incorreta!");
      // Mostre uma mensagem de erro ou realize outra ação adequada
      dontUser.value = true;
      setTimeout(() => {
        dontUser.value = false;
      }, 5000); // Define um timeout para limpar a mensagem após 5 segundos
    }
  };

const trig = () => {
  enterPersonal()
}

const pop = useCookie('pop', { maxAge: 7889400 })
pop.value = pop.value

const popOk = () => {
  return pop.value = "ok"
}

const popView = () => {
  if (pop.value === 'ok') {
    return false
  } return true
}

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
  <div v-if='dontUser' class="dont-user top">
    Usuário não encontrado!
  </div>
  <div v-else-if='dontPerson' class="dont-user top">
    Personal não encontrado!
  </div>
  <div>
    
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
    <!-- Cliente -->
    <div v-if='atletaShow' class="inputs">
      <div>
        <input type="email" @keyup.enter="trigger" name="" id="username" placeholder="Usuário" autofocus
          v-model="user" required autocomplete="username">
      </div>
      <div class="senha">
        <input v-bind:type="pass" @keyup.enter="trigger" name="" id="password" placeholder="Senha"
          v-model="senha" autocomplete="off">
        <Icon @click="swText" v-if="passView" name="mdi:eye" id="password-icon" />
        <Icon @click="swPass" v-else name="mdi:eye-off" id="password-icon" />

      </div>
      <div>
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
  <footer>

    <div v-if="popView()" class="pop-up">
      <p>
        Neste app, usamos cookies e outras tecnologias semelhantes para melhorar sua
        experiência e facilitar certos tipos de vantagens de navegação.
        Ao clicar no botão abaixo, você está ciente e concordando com estas funcionalidades.
      </p>
      <div class="button-pop" @click="popOk()">PROSSEGUIR!</div>
    </div>
  </footer>
  <div class="color">

    <a @click="theme()" :model="$colorMode.value">
      <Icon
        :name="colorMode.value === 'dark' ? 'line-md:moon-filled-to-sunny-filled-loop-transition' : 'line-md:sunny-filled-loop-to-moon-alt-filled-loop-transition'" />
    </a>

  </div>
  <!-- <div class="whats">


    <a
      href="https://api.whatsapp.com/send?phone=5521936184024%20&text=Ol%C3%A1%20Leandro%20Cesar,%20fiquei%20interessado(a)%20nos%20seus%20Servi%C3%A7os,%20me%20chamo%20">
      <Icon name="ic:outline-whatsapp" />
    </a>
  </div> -->
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
  border: solid 1pxvar(--player-color);
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
  background: #777;
  color:#fff;
  border: solid 2px #000;
  outline: 0;
}
.dark-mode input:focus {
  color: #000;
  background: #888;
  border: solid 2px #000;
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
  background: #000;
  color: #eee;
}
.dark-mode .login{
  background: #fff;
  color:#000;
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

.pop-up {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px 20px 20px 20px;
  padding: 15px;
  border-radius: 8px;
  position: fixed;
  bottom: 10px;
  width: 80%;
  left: 50%;
  background-color: var(--player-color) ;
  color: #fff;
  margin-left: -40%;
  font-weight: 900;
  border: solid 1px var(--player-color)10;
  z-index: 10000;
}

.pop-up p {
  font-weight: 700;
  font-weight: 900;
  font-size: 13px;
  color: #fff;
}

.button-pop {
  margin: 7px auto 0 auto;
  transition: all .4s linear;
  border: solid 1px var(--player-color);
  box-shadow: 0 0px 5px var(--player-color)10;
  border-radius: 8px;
  cursor: pointer;
  width: 50%;
  text-align: center;
  border: solid 1px #dadada;
}

.button-pop:hover {
  border: solid 1px #fff;
}

</style>
