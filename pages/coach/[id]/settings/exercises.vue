<script setup>
import { ref, computed } from 'vue';
import { useFetch } from 'nuxt/app';

const route = useRoute();
useHead({
    titleTemplate: 'Exercises - Settings | app.leandrocesar.com',
});

const Users = await useFetch(`https://api.leandrocesar.com/exercises`);
const item = Users.data.value;
const allUsers = item || [];
const team = item ? [...item] : [];

const searchQuery = ref('');
const filteredUsers = computed(() => {
  return allUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.grupo.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const name = ref('');
const link = ref('');
const grupo = ref('');
const searchInputRef = ref(null); // Referência para o campo de pesquisa
const nameInputRef = ref(null); // Referência para o primeiro campo de entrada

// Atualizar a pesquisa
const updateSearchQuery = (event) => {
  searchQuery.value = event.target.value;
};

// Enviar o formulário
async function submit() {
    try {
        const response = await fetch('https://api.leandrocesar.com/exercise', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                name: name.value,
                grupo: grupo.value,
                img: `https://app.leandrocesar.com/exe/academia/${link.value}.gif`,
            }),
        });
        
        if (response.ok) {
            console.log('Data sent successfully');
            
            // Limpar os inputs
            name.value = '';
            link.value = '';
            grupo.value = '';

            // Focar no primeiro input
            if (nameInputRef.value) {
                nameInputRef.value.focus();
            }
        } else {
            console.error('Failed to send data', name.value);
        }
    } catch (error) {
        console.error('Error sending data:', error);
    }
}
</script>

<template>
    <div class="layout-no-sidebar">
      <!-- Barra fixa no topo -->
      <header class="topbar">
          <div>
              <h3>Exercises Settings</h3>
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
      <form @submit.prevent="submit">
          <!-- Conteúdo com scroll -->
          
          <div class='line'>
            <div>
                <h3>Nome no link</h3>
                <p>Colocar traço (-) entre as palavras.</p>
            </div>
            <div>
        
            <div class="theme-switch">
            <p class='sw-tx'>app.leandrocesar.com/exe/academia/  </p>
                <input
                type="text"
                v-model='link'
                placeholder='Supino-Reto'
                class='sw-i-tx'
                ref="nameInputRef"
                />

            </div>
            
                
            </div>
          </div>
          <div class='line'>
            <div>
                <h3>Nome do exercício</h3>
                <p>Aparecerá na lista de exercícios</p>
            </div>
            <div>
        
            <div class="theme-switch">
            <Icon class='sw-icon' name='hugeicons:gymnastic-rings'/>
                <input
                type="text"
                placeholder='Ex: Supino reto'
                v-model='name'
                
                />

            </div>
            
                
            </div>
          </div>
          
          <div class='line'>
            <div>
                <h3>Grupamento Muscular</h3>
                <p>Grupo muscular do exercício.</p>
            </div>
            <div>
        
            <div class="theme-switch">
            <Icon class='sw-icon' name='hugeicons:equipment-gym-03'/>
                <input
                type="text"
                placeholder='Ex: Peito'
                v-model='grupo'
                />

            </div>
            
                
            </div>
          </div>
          <div class='line'>
            <div class="theme-switch">
                <button class="pill p" type="submit">
                    Create Exercise
                </button>
            </div>
            <div>
        
            
                
            </div>
          </div>
          
          <div class='line-end'>
            <div>
                <h3>Lista de exercícios cadastrados</h3>
                <p>{{filteredUsers.length}} - Exercícios cadastrados no banco de dados.</p>
            </div>
          <div class="layout-no-sidebar border">
              <!-- Barra de pesquisa -->
              <div class="search-bar mar">
              <Icon name='heroicons-outline:search' /> 
                      <input
                      type="text"
                      autofocus
                          ref="searchInputRef"
                      v-model="searchQuery"
                      placeholder="Pesquisar Exercícios"
                      @input="updateSearchQuery"
                      class="search-input"
                      />
  
              </div>
      
              <!-- Lista de usuários filtrada -->
              <div class="user-list">
                  <div v-for="user in filteredUsers" :key="user._id" class="user-item">
                      <div>
                          <img :src='user.img' />
                          <div class="user-info">
                              <span class="user-name">{{ user.name }}</span>
                              <span class="user-username">{{ user.username }}</span>
                              - <span class="user-name">{{ user.grupo }}</span>
                          </div>
                      </div>
                      
                  </div>
                  
              </div>
      
      </div>
            
          </div>
    </form>
    
    
        </div>
    </div>
</template>
<style scoped>
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
    padding: 5px 5px 5px 33px;
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
    margin-right: -252px;
    z-index:100;
    font-weight: bolder;
    color: #aaa;
}
.sw-i-tx {
    padding: 2px 2px 2px 243px ;
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
    height: 45px;
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
    justify-content: flex-start;
    flex-direction: row;
    align-items: flex-start;
    margin:20px 1%;
    padding: 10px 0 20px 0;
}

.border {
    margin-left: 80px;
    padding-left: 40px;
    border-left: solid 1px #00dc8230;
}

.user-list {
  margin-top: 20px;
}
.user-list div{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 2px;
} 

.border .search-input {
    width: 580px;
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
