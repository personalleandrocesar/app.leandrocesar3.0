<script setup>
import { ref } from 'vue';
// import { reloadNuxtApp } from "nuxt/app";


const name= ref('')
const lastName= ref('')
const sex= ref('')
const birthday= ref('')
const whatsapp= ref('')
const service= ref('')
const target= ref('')
const email= ref('')
const username= ref('')
const password = ref('')
const day= ref('')
const time = ref('')
const payDay = ref('')
const periodStart= ref('')
const periodEnd = ref('')
const terms= ref('')
const status=ref('')


const subscriberOk = ref(false)

async function submitForm() {
  try {
    const response = await fetch('https://api.leandrocesar.com/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name.value,
        lastName: lastName.value,
        sex: sex.value,
        birthday: birthday.value,
        whatsapp: whatsapp.value,
        service: service.value,
        target: target.value,
        email: email.value,
        username: username.value.replace(/\s/g, '').toLowerCase(),
        password: password.value,
        day: day.value,
        time: time.value,
        payDay: payDay.value,
        periodStart: periodStart.value,
        periodEnd: periodEnd.value,
        terms: terms.value,
        status: status.value,
      }),
    });

    if (response.ok) {
      console.log('Data sent successfully');
      subscriberOk.value = true;
      setTimeout(() => {
        subscriberOk.value = false;
        formShow.value = false;
        // reloadNuxtApp({
        //   path: "/admin/clientes",
        //   ttl: 1000, // default 10000
        // });
      }, 4000);
    } else {
      console.error('Failed to send data');
    }
  } catch (error) {
    console.error('Error sending data:', error);
  }
}

const pop = useCookie('pop', { maxAge: 7889400 })
pop.value = pop.value

const photoOpen = ref(false);
function openPhoto() {
  photoOpen.value = !photoOpen.value;
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

const formShow = ref(true)


</script>
<template>
  <div>
    <!-- Cliente -->
    <div v-if='formShow'>
      <form @submit.prevent="submitForm">
        <!-- Nome e sobrenome -->
        <div class="inputs">

          <div>

            <span>Nome</span>
            <input type="text" id="name" autofocus v-model="name" required autocomplete="nome">

          </div>
          <div>

            <span>Sobrenome</span>
            <input type="text" id="sobrenome" v-model="lastName" required autocomplete="sobrenome">

          </div>
        </div>

        <!-- Sexo -->
        <div class="inputs">
          <div class="radio">

            <input type="radio" name='sex' id="feminino" class="check" v-model="sex" required value=feminino
              autocomplete="sexo" checked>
            <label for="feminino">Feminino</label>

          </div>
          <div class="radio">

            <input type="radio" name='sex' id="masculino" class="check" v-model="sex" required value="masculino"
              autocomplete="sexo">
            <label for="masculino">Masculino</label>

          </div>


        </div>
        <!-- Data de nascimento + Whatsapp -->
        <div class="inputs">

          <div>
            <span>Data de nascimento</span>
            <input type="date" name="" id="nascimento" autofocus v-model="birthday" required autocomplete="nascimento">
          </div>
          <div>
            <span>WhatsApp</span>
            <input type="tel" name="" id="whatsapp" placeholder="(xx)xxxxx-xxxx" required v-model="whatsapp"
              autocomplete="whatsapp">
          </div>

        </div>
        <!-- Serviço e objetivo -->
        <div class="inputs">

          <div>
            <span>Qual Serviço?</span>
            <select name="service" id="servico" required class="select" placeholder='' v-model="service">
              <option disabled value="">Selecione uma opção</option>
              <option value="Personal">Personal</option>
              <option value="Consultoria">Consultoria</option>
            </select>
          </div>

          <div>

            <span>Qual objetivo?</span>
            <select name="target" id="target" class="select" placeholder='' required v-model="target">
              <option disabled value="">Selecione uma opção</option>
              <option value="Hipertrofia">Hipertrofia</option>
              <option value="Emagrecimento">Emagrecimento</option>
              <option value="Acompanhamento">Só acompanhamento</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

        </div>
        <!-- E-mail -->
        <div class="inputs">
          <div>

            <span>E-mail</span>
            <input type="text" name="" id="email" v-model="email" autocomplete="email">

          </div>
        </div>
        <!-- Usuário e senha -->
        <div class="inputs senha">
          <div>
            <span>Usuário</span>
            <input type="text" required name="" id="usuario" v-model.trim="username" autocomplete="usuario">
          </div>
          <div class="senhaPs">
            <span>Senha</span>
            <input v-bind:type="pass" required name="" id="password" v-model="password" autocomplete="off">
            <Icon @click="swText" v-if="passView" name="ph:lock-key-open-bold" id="password-icon" />
            <Icon @click="swPass" v-else name="ph:lock-key-fill" id="password-icon" />
          </div>

        </div>
        <div class="inputs">
          <div>

            <span>Dias/semana</span>
            <input type="number" name="" required id="servico" v-model="day" autocomplete="servico">

          </div>
          <div>

            <span>Minutos/treino</span>
            <input type="number" name="" required id="vencimento" v-model="time" autocomplete="vencimento">

          </div>

        </div>
        <div class="inputs">
          <div>

            <span>Dia do Vencimento</span>
            <input type="number" name="" required id="vencimento" v-model="payDay" autocomplete="vencimento">

          </div>
          <div>

            <span>Início dos treinos</span>
            <input type="date" name="" required id="servico" placeholder="Tempo/treino" v-model="periodStart"
              autocomplete="servico">

          </div>
        </div>
        <div>

        </div>
        <div>

        </div>

        <div class="check-terms inputs">
          <input type="checkbox" id="terms" class="check" v-model="terms" required="true">
          <h5>
            <label for="terms">Aceito os</label>
            <NuxtLink to="/termos-de-uso" class="terms">
              Termos de uso
            </NuxtLink>
          </h5>
        </div>
        <div class="inputs">
          <button class="login" type="submit">
            ENVIAR
            <Icon name="solar:login-3-bold" />
          </button>
        </div>
        <br>
        <br>
        <br>
      </form>
    </div>
    <div v-else>
      <form @submit.prevent="submitForm">
        <!-- Nome e sobrenome -->
        <h3>Ficha de cadastro</h3>
        
      </form>
    </div>

    <div v-if="subscriberOk" class="subscriberOk top">
      <div>
        Cadastro realizado com Sucesso!
      </div>
    </div>



  </div>
</template>

<style scoped>

.subscriberOk {
  position: fixed;
  top: 10px;
  right: 10px;
  margin-left: 40%;
  background-color: #8d00ab;
  color: #fff;
  font-weight: bolder;
  text-shadow: -1px 2px 5px  #111;
  z-index: 20;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: bolder;
}
a {
  text-decoration: none;
  transition: all .3s linear;
  border: solid 2px transparent ;
}

.link {
   display: flex;
   justify-content: space-evenly;
   margin-top: 1.5rem;
   font-size: 1.1rem;
   font-weight: bolder;
}

.link a {
    letter-spacing: 2px;
    margin: 5px 15px;
    text-align: center;
    cursor: pointer;
}

.link a:hover { 
    border-bottom: solid 2px #8d00ab;
    cursor: pointer;
}

.aActive {
    border-bottom: solid 2px #8d00ab;
    color: #8d00ab;
}

.aActivee {
    border-bottom: solid 2px #8d00ab;
    color: #8d00ab;
    
}
.head-logo {
  display: flex;
  justify-content: center;
  flex-direction: row-reverse;
  align-items: center;
  z-index: 1;
  flex-wrap: wrap;
}
.senhaPs {
  position: relative;
}

#password-icon {
  position: absolute;
  top: 24px;
  right: 5px;
  z-index: 10000;
}

.inputs #password {
  padding-right: 28px;
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
  box-shadow: 0px 7px 20px #8d00ab;
  margin: 3rem 0 1.5rem 0;
  border-radius: 8px;
  z-index: 10;
}

.logo img {
  height: 100px;
  width: 100px;
  border-radius: 8px;
  border: #8d00ab 2px solid;
  z-index: 100;
  opacity: 1;
  
}


.button-client {
  margin: 2rem 1.5rem;
  transition: all .4s linear;
  border: solid 1px #8d00ab10;
  box-shadow: 0 0px 5px #8d00ab10;
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
}

.button-client:hover {
  background-color: #8d00ab10;
  color: #8d00ab80;
}

.button-client .icon {
  margin-top: -5px;
  margin-right: 5px;
  transition: all 0.2s ease-in-out 0s;
}

.button-client:hover .icon {
  color: #8d00ab80;
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
  font-size: 1.6rem;
  line-height: 1.5rem;
  margin: .2rem 1.5rem;
  font-weight: 700;
  color: #8d00ab;
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
  right:1.5rem;
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
    right:1.5rem;
    border-radius: 9px;
    cursor: pointer;
    z-index: 100;
    border: solid 1px #8d00ab10;
    box-shadow: 0 0px 5px #8d00ab40;
    backdrop-filter: blur(100px)
}
.whats .icon, .color .icon {
  color: #8d00ab90;
  zoom: 1;
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

.inputs #masculino.check, .inputs #feminino.check  {
  text-decoration: underline;
  margin: -15px -94px;
  height: 15px;
  cursor: pointer;
}

.inputs .radio {
  margin: 30px 30px 15px 30px;
}


.inputs .terms {
  text-decoration: underline;
  color:#8d00ab ;
  height: 15px;
  cursor: pointer;
}

.inputs #terms.check{
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
  transition: all .4s linear;
  border-bottom: solid 2px #8d00ab;
  text-align: left;
  width: 160px;
  font-weight: 600;
  border-radius: 4px;
  transition: all 0.2s ease-in-out 0s;
  height: 30px;
  font-size: 14px;
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
  border: solid 1px #8d00ab;
}

input:active {
  border-color: #8d00ab80;
}

input:hover {
  background-color: #8d00ab10;
}


input:focus {
  border: 0 none;
  border-bottom: solid 2px #8d00ab;
  outline: 0;
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


.select {
  transition: all .4s linear;
  border: 0;
  color: inherit;
  background-color: transparent ;
  border-bottom: solid 2px #8d00ab;
  border-radius: 5px ;
  cursor: pointer;
  width: 160px;
  text-align: left;
  transition: all 0.2s ease-in-out 0s;
  height: 30px;
  font-size: 14px;
}

.select:focus {
  border: 0 none;
  border-bottom: solid 2px #8d00ab;
  outline: 0;
}

.select:focus-visible {
  background-color: #8d00ab10;
}

.select:active {
  background-color: #8d00ab10;
}

.select:hover {
  background-color: #8d00ab10;
}



.login {
  transition: all .4s linear;
    border: solid 2px #8d00ab;
    cursor: pointer;
    width: 140px;
    text-align: center;
    line-height: 18px;
    border-radius: 88px;
    font-weight: 600;
    transition: all 0.2s ease-in-out 0s;
    height: 30px;
    font-size: 14px;
    padding-inline: 16px;
    padding-top: 6px;
    padding-bottom: 8px;
    margin: 1rem 1.5rem;
}

.lost h5{
  font-size: .6rem;
}

.login .icon {
  margin: -2px 0px 2px 4px;
  transition: transform .3s linear;
}

.login:hover {
  cursor: pointer;
  background-color: #8d00ab;
  color: #fff;
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
  background-color: #8d00ab ;
  color: #fff;
  margin-left: -40%;
  font-weight: 900;
  border: solid 1px #8d00ab10;
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
  border: solid 1px #8d00ab;
  box-shadow: 0 0px 5px #8d00ab10;
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
