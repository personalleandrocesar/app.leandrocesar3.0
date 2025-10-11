<script setup>
import { ref, watch } from 'vue'
const route = useRoute();
useHead({
  titleTemplate: 'General - Settings | app.leandrocesar.com',
});
const Users = await useFetch(`https://api.leandrocesar.com/usersnw/${route.params.id}/team`);
const item = Users.data.value;

const team = item ? [...item] : [];

const UserCoach = await useFetch(`https://api.leandrocesar.com/usersnw/${route.params.id}`);
const userCoachItem = UserCoach.data.value
console.log(userCoachItem)

const subscriberOk = ref(false);

const newDate = ref();
const name = ref('');
const lastName = ref('');
const sex = ref('feminino');
const foto = ref('');
const birthday = ref('');
const whatsapp = ref('');
const service = ref('');
const target = ref('');
const email = ref('');
const username = ref('');
const password = ref('');
const day = ref('');
const time = ref('');
const payDay = ref('');
const periodEnd = newDate;
const terms = ref('');
const status = ref('');
const creationUser = ref('');
const _id = ref('');


const addCloseClient = ref(true);
const closeAddClient = ref(false);
const editCloseClient = ref(true);
const closeEditClient = ref(false);
const add = ref(true);
const updt = ref(true);

const state = useCookie('state')
const list = ref();
const switList = ref(state.value === 'list' || state.value === undefined)
const switBlock = ref(state.value === 'block');
const block = ref();

function switchButtonBlock() {
    switBlock.value = true;
    switList.value = false;
    state.value = 'block';
}

function switchButtonList() {
    switBlock.value = false;
    switList.value = true;
    state.value = 'list';
}

function addClient() {
    add.value = false;
    addCloseClient.value = false;
    closeAddClient.value = true;
    switBlock.value = false;
    switList.value = false;
    block.value = true;
    state.value = 'block';
}

function closeClient() {
    add.value = true;
    addCloseClient.value = true;
    closeAddClient.value = false;
    switBlock.value = true;
    switList.value = false;
    block.value = false;
    state.value = 'list';
}

function editClient() {
    updt.value = true;
    add.value = false;
    addCloseClient.value = false;
    closeAddClient.value = false;
    switBlock.value = false;
    switList.value = false;
    block.value = false;
    editCloseClient.value = false;
    closeEditClient.value = true;
    state.value = 'edit';
}

function cEditClient() {
    add.value = false;
    addCloseClient.value = true;
    closeAddClient.value = false;
    editCloseClient.value = true;
    closeEditClient.value = false;
    switBlock.value = true;
    switList.value = false;
    block.value = false;
    state.value = 'list';
}
const user = {
  creationUser: team.creationUser
};

const creationDate = new Date(user.creationUser);

// Exemplo de formatação
const formattedDate = creationDate.toLocaleDateString("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const formattedTime = creationDate.toLocaleTimeString("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
});


async function submitForm() {
    try {
        // Requisição para cadastrar os dados
        const response = await fetch(`https://api.leandrocesar.com/usernw/${route.params.id}/team`, {
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
                foto: foto.value,
                service: service.value,
                target: target.value,
                email: email.value,
                username: username.value.replace(/\s/g, '').toLowerCase(),
                password: password.value.replace(/\s/g, ''),
                day: day.value,
                time: time.value,
                payDay: payDay.value,
                periodStart: periodStart.value,
                periodEnd: periodEnd.value,
                terms: terms.value,
                status: status.value,  
                creationUser: new Date().toISOString(),  
                _id: _id.value,  
            }),
        });

        if (response.ok) {
            console.log('Data sent successfully');
            subscriberOk.value = true;

            // Segunda requisição para verificar o _id
            const responseTwo = await fetch(`https://api.leandrocesar.com/usersnw/${route.params.id}/team`);
            if (!responseTwo.ok) {
                console.error('Failed to fetch team data');
                return;
            }

            const responseData = await responseTwo.json();
            const createdTeam = responseData.find(item => item.username === username.value); // Ajuste conforme a estrutura da resposta
            if (createdTeam && createdTeam._id) {
                console.log(`_id found: ${createdTeam._id}`);
                setTimeout(() => {
                    subscriberOk.value = false;
                    navigateTo(`/coach/${route.params.id}/team/${createdTeam._id}`);
                }, 1500);
            } else {
                console.error('No matching team found in the response');
            }
        } else {
            console.error('Failed to send data');
        }
    } catch (error) {
        console.error('Error sending data:', error);
    }
}

// Em seu arquivo Vue ou dentro de uma função em Nuxt 3 (por exemplo, em um `setup` ou método)

const del = async () =>  {
  try {
    // Envia a requisição DELETE para o backend (assumindo que o endpoint seja '/usersnw/:id')
    const response = await fetch(`https://api.leandrocesar.com/usersnw/${route.params.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Verifica se a resposta foi bem-sucedida
    if (response.ok) {
      const data = await response.json();
      console.log(data.message); // Exibe a mensagem de sucesso
      // Realize qualquer ação adicional após a exclusão, como atualizar o estado ou navegar para outra página
    } else {
      const errorData = await response.json();
      console.error('Erro ao excluir o usuário:', errorData.message);
      // Lide com erros da API, como exibir uma mensagem de erro na UI
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    // Lide com erros de rede ou outros problemas inesperados
  }
};


async function submitUpdate() {
    try {
        const response = await fetch('https://api.leandrocesar.com/usernw', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                name: name.value,
                lastName: lastName.value,
                sex: sex.value,
                birthday: birthday.value.replace(),
                whatsapp: whatsapp.value,
                foto: foto.value,
                service: service.value,
                target: target.value,
                email: email.value,
                username: username.value.replace(/\s/g, '').toLowerCase(),
                password: password.value.replace(/\s/g, ''),
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
                // reloadNuxtApp({
                // path: "/admin/clientes",
                // ttl: 1000, // default 10000
                // });
                return navigateTo(`/admin/clientes/${username.value.toLowerCase() }`);
            }, 1500);
        } else {
            console.error('Failed to send data');
        }
    } catch (error) {
        console.error('Error sending data:', error);
    }
}

const de = ref()
const periodStart = ref('')
const monthsToAdd = ref(0)
const calculateNewDate = () => {
  if (!periodStart.value || !monthsToAdd.value) {
    newDate.value = ''
    return
  }

  const start = new Date(periodStart.value)
  const months = parseInt(monthsToAdd.value)

  start.setMonth(start.getMonth() + months)

  newDate.value = start.toISOString().split('T')[0]
}

watch([periodStart, monthsToAdd], calculateNewDate)


const updateStatus = () => {
  if (!periodStart.value || !periodEnd.value) {
    status.value = '';
    return;
  }

  const today = new Date();
  const start = new Date(periodStart.value);
  const end = new Date(periodEnd.value);

  const daysSinceStart = Math.floor((today - start) / (1000 * 60 * 60 * 24));
  const daysUntilEnd = Math.floor((end - today) / (1000 * 60 * 60 * 24));

  if (daysSinceStart >= 1 && daysUntilEnd >= 0) {
    status.value = 2; // Dentro do período
  } else if (daysSinceStart > 3) {
    status.value = 0; // Fora do período após 3 dias
  } else if (daysSinceStart >= 1) {
    status.value = 1; // Dentro do período, mas mais de 1 dia passou
  } else {
    status.value = ''; // Caso padrão, pode ajustar conforme necessário
  }
}
watch([periodStart, periodEnd], updateStatus);


const colorMode = useColorMode();

const notificTree = ref(false)

function notifConfirm() {
    notificTree.value = true
}
function notifCancel() {
    notificTree.value = false
}

// Sincronizar com o tema atual ao carregar

</script>

<template>
    <div class="layout-no-sidebar">
      <!-- Barra fixa no topo -->
      <header class="topbar">
          <div>
              <h3>General Settings</h3>
          </div>
      </header>
            <div class="nav-users">
                <div class="users-conf">
                <NuxtLink :to="`/coach/${route.params.id}/settings`"  class="filter">
                    <Icon name='heroicons:user-circle' /> General
                </NuxtLink>
                <NuxtLink :to="`/coach/${route.params.id}/settings/users`"  class="filter">
                    <Icon name='heroicons:user-group' /> Users
                </NuxtLink>
                <NuxtLink :to="`/coach/${route.params.id}/settings/exercises`" class="filter" >
                    <Icon name='hugeicons:gymnastic-rings' /> Exercises
                </NuxtLink>
                <NuxtLink :to="`/coach/${route.params.id}/settings/notifications`" class="filter" >
                    <Icon name='heroicons:bell' /> Notifications
                </NuxtLink>
                </div>
            </div>
      <div class="content">
          <!-- Conteúdo com scroll -->
          <div class='line'>
            <div>
                <h3>Theme</h3>
                <p>Personalize a aparência do seu painel.</p>
            </div>
            <div>
        
            <div class="theme-switch">
                <input
                  type="radio"
                  id="system"
                  value="system"
                  v-model="$colorMode.preference"
                  class="radio-input"
                />
                <label for="system" class="pill"><Icon name='mi:computer'/> System</label>
            
                <input
                  type="radio"
                  id="light"
                  value="light"
                  v-model="$colorMode.preference"
                  class="radio-input"
                />
                <label for="light" class="pill"><Icon name='material-symbols:light-mode-outline-rounded'/> Light</label>
            
                <input
                  type="radio"
                  id="dark"
                  value="dark"
                  v-model="$colorMode.preference"
                  class="radio-input"
                />
                <label for="dark" class="pill"><Icon name='material-symbols:dark-mode-outline-rounded'/>Dark</label>
              </div>
            
                
            </div>
          </div>
          <div class='line'>
            <div>
                <h3>Profile</h3>
                <p>Essas informações serão exibidas publicamente, portanto, tenha cuidado com o que você compartilha.</p>
            </div>
            <div>
        
            <div class="theme-switch">
                <input
                type="radio"
                id="dark"
                value="dark"
                v-model="de"
                class="radio-input"
                />
                <label for="" class="pill p">Save changes</label>

            </div>
            
                
            </div>
          </div>
          <form>

              <div class='line'>
                  <div>
                <h3>Name</h3>
                <p>Aparecerá em recibos, faturas e outras comunicações.</p>
            </div>
            <div>
        
            <div class="theme-switch">
            <Icon class='sw-icon' name='heroicons:user'/>
                <input
                type="text"
                :value='userCoachItem.name'
                />

            </div>
            
                
            </div>
          </div>
          <div class='line'>
            <div>
                <h3>E-mail</h3>
                <p>Usado para fazer login, receber recibos de e-mail e atualizações de produtos.</p>
            </div>
            <div>
        
            <div class="theme-switch">
            <Icon class='sw-icon' name='heroicons:envelope'/>
                <input
                type="email"
                :value='userCoachItem.email'
                />

            </div>
            
                
            </div>
          </div>
          <div class='line'>
              <div>
                  <h3>Username</h3>
                <p>Seu nome de usuário exclusivo para fazer login e o URL do seu perfil.</p>
            </div>
            <div>
        
            <div class="theme-switch">
            <p class='sw-tx'>nexwood.com/</p>
                <input
                type="text"
                :value='userCoachItem.username'
                placeholder=''
                class='sw-i-tx'
                />

            </div>
            
                
        </div>
          </div>
          <div class='line'>
            <div>
                <h3>Avatar</h3>
            </div>
            <div>
        
            <div class="theme-switch ava">
            <p class='avatar-tx'>AC</p> 
            <img class='avatar'/>   
            <input
            type="radio"
            id="dark"
            :value='userCoachItem.foto'
            v-model="de"
            class="radio-input"
            />
            <label for="" class="pill p">Escolher</label>
            <p>JPG, GIF ou PNG. Máx. 1 MB.</p>


            </div>
            
                
            </div>
          </div>
          <div class='line'>
            <div>
                <h3>Biografia</h3>
                <p>Breve descrição do seu perfil.</p>
            </div>
            <div>
        
            <div class="theme-switch">
                <textarea>
                </textarea>



            </div>
            
                
            </div>
          </div>
          <div class='line'>
            <div>
                <h3>Password</h3>
                <p>Confirme sua senha atual antes de definir uma nova.</p>
            </div>
            <div>
        
            <div class="theme-switch">
                <input
                type="text"
                :value='userCoachItem.password'
                placeholder='Senha atual'
                class='sw-i-txx'
                />

            </div>
            <div class="theme-switch">
                <input
                type="text"
                value=''
                placeholder='Nova senha'
                class='sw-i-txx'
                />

            </div>
            
                
            </div>
          </div>
        </form>
          <div class='line'>
            <div>
                <h3>Conta</h3>
                <p>
                    Não quer mais usar nosso serviço? Você pode 
                    excluir sua conta aqui. Esta ação não é reversível. 
                    Todas as informações relacionadas a esta conta serão 
                    excluídas permanentemente.
                </p>
                <div class='line-end'>
                      <div class="theme-switch">
                          <input
                          type="radio"
                          id="dark"
                          value="dark"
                          class="radio-input"
                          />
                          <label @click='notifConfirm()' for="" class="pill ex-ex">Excluir conta</label>
              
                      </div>
                  
                      
                </div>
            </div>
            <div>   
                
                
            </div>
        </div>
        
        
    </div>
    <div v-if='notificTree' class="float">
            <div class="notific-floatt zoomOut" >
                <div>
                    <Icon name='uil:exclamation-circle' @click='closeNotific' style="color: red; zoom:2.2"/>
                </div>
                <div>
                    <div>
                        <h3>
                            Deletar conta
                        </h3>
                        <p>
                            Tem certeza que que deseja apagar a conta permanentemente? 
                        </p>
                    </div>
                    <div>   
                        <button @click='del()' class="pill-can ex">Deletar</button>
                        <button @click="notifCancel()" class="pill-can can">Cancelar</button>
                    </div>
                </div>
    
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
      background: #ecedf060;
      backdrop-filter: blur(1px); /* Desfoque do fundo */
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* Sombras (opcional) */
      color: #333; /* Cor do texto */
      width: 100%; /* Largura fixa */
      height: 100vh; /* Altura fixa */
      padding: 20px; /* Espaçamento interno */
      text-align: center;
}
.notific-floatt {
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
.dark-mode .notific-floatt {
    background-color: #0f172a;
}

.notific-floatt div {
    margin: 0px 15px 12px 15px;
}

.notific-floatt button{
    margin: 0 5px 0 0px;
}
.dark-mode .notific-floatt button{
    margin: 0 5px 0 0px;
    color: #fff;
}

.theme-switch {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: .5rem;
  margin-right: 1.5rem;
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

.login .icon {
    margin: -2px 0px 2px 4px;
}

.login:hover {
    cursor: pointer;
    background-color: #00dc82;
    color: #fff;
}

.login:hover .icon {
    margin: -2px 0px 2px 4px;
    transform: translateX(6px);
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
    width: 100px;
}
.ex:hover{
    background: red;
    opacity:.7;
}
.ex-ex {
    background: red;
    color: #fff;
    width: 140px;
}
.ex-ex :hover{
    background: red;
    opacity:.7;
}
.can{
    background: #00dc8210;
    color: #333;
    width: 100px;
}
.can:hover{
    opacity:.7;
}
.pill-can {
  padding: 0.3rem .7rem;
  font-size: 1rem;
  border: 2px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
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
    margin: 0 0 0 10px;
    text-align: left;
}

h4:nth-child(1) {
    margin: 20px 0 0 10px;
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

.login {
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
}

.login .icon {
    margin: -2px 0px 2px 4px;
}

.login:hover {
    cursor: pointer;
    background-color: #00dc82;
    color: #fff;
}

.login:hover .icon {
    margin: -2px 0px 2px 4px;
    transform: translateX(6px);
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

.line {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: flex-start;
    margin:20px 1%;
    padding: 10px 0 20px 0;
    border-bottom: solid 1px #00dc8230;
}
.line-end {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: flex-start;
    margin:20px 1% 0 1%;
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
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    background-color: var(--color-background);
    height: 46px;
    width: 46px;
    color: #718096;
    box-shadow: 0px 7px 20px #00dc82;
    border-radius: 4px;
    margin: 1rem;
    z-index: 10;
}

.logo img {
    height: 46px;
    width: 46px;
    border-radius: 4px;
    border: #00dc82 2px solid;
    z-index: 100;
    opacity: 1;
}

.head-name {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    font-family: ' gagalin';
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
