<script setup>

import { ref, computed, onMounted } from 'vue';
const route = useRoute();

useHead({
    titleTemplate: 'Users - Settings | app.leandrocesar.com',
});

const searchQuery = ref('');
const Users = await useFetch(`https://api.leandrocesar.com/usersnw/${route.params.id}/team`);
const allUsers = Users.data.value || [];


const filteredUsers = computed(() => {
  return allUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Função para atualizar o estado de pesquisa
const updateSearchQuery = (event) => {
  searchQuery.value = event.target.value;
};

const searchInputRef = ref(null); // Referência do campo de pesquisa

// Define o foco no input quando o componente for montado
onMounted(() => {
  if (searchInputRef.value) {
    searchInputRef.value.focus();
  }
});
// Força o foco no campo de pesquisa
function ensureSearchInputFocus() {
    if (searchInputRef.value) {
        searchInputRef.value.focus();
    }
}

</script>

<template>
    <div class="layout">
      <!-- Barra fixa no topo -->
      <header class="topbar">
          <div>
              <h3>Users Settings</h3>
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
        <div class="layout-no-sidebar d">
        <div class='line'>
          <div>
              <h3>Gerenciar acesso</h3>
              <p>Convide novos membros por endereço de e-mail.</p>
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
              <label for="" class="pill p">Convidar pessoas</label>

          </div>
          
              
          </div>
        </div>
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
                    placeholder="Pesquisar usuários"
                    @input="updateSearchQuery"
                    class="search-input"
                    />

            </div>
    
            <!-- Lista de usuários filtrada -->
            <div class="user-list">
                <div v-for="user in filteredUsers" :key="user._id" class="user-item">
                    <div>
                        <img :src='user.foto' />
                        <div class="user-info">
                            <span class="user-name">{{ user.name }}</span>
                            <span class="user-username">{{ user.username }}</span>
                        </div>
                    </div>
                    
                    <div>
                        <input
                        type="radio"
                        id="dark"
                        value="dark"
                        v-model="de"
                        class="radio-input"
                        />
                        <label for="" class="pill p">Ativo <Icon name="material-symbols:keyboard-arrow-down" /></label>
                        <Icon class='toot' name="heroicons:ellipsis-vertical" />
    
                    </div>
                </div>
                
            </div>
        </div>
    
    </div>
</div>
</template>
<style scoped>
.search-bar {
  margin: 20px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.search-bar input {
  border-radius: 8px;
    
}

.search-bar .icon {
    margin-left: 18px;
    margin-right: -38px;
    z-index:3;
}

.search-input {
  width: 100%;
  padding: 10px 0px 10px 40px;
  font-size: 14px;
  border-radius: 5px;
  border: solid 2px #ccc;
}

.user-list {
  margin-top: 20px;
}
.user-list div{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.user-item div:nth-child(1)  div:nth-child(2){
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.user-item {
  padding: 5px;
  border-top: 1px solid #00dc8240;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.toot {
    margin-right: 1.5rem;
    padding: 2px 2px;   
    zoom:1.2;
    border-radius: 4px;
    cursor: pointer;

}
.toot:hover {
    background: #ccc;   
}
.user-info {
  padding: 10px;
  display: flex;
    flex-direction: column;
  justify-content: flex-start;
}

.user-list img{
    margin: 0 5px 0 20px;
    height: 40px;
}

.user-name {
  font-weight: bold;
}

.user-username {
  color: #888;
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
  padding: .3rem .3rem .3rem .7rem;
  font-size: 1rem;
  border: 2px solid #ccc;
  border-radius: 8px;
  background: #444;
  color: #fff;
  transition: all 0.3s ease;
  text-align: center;
  margin: .5rem 1rem .5rem 0;
}



.radio-input:checked + .pill {
  background-color: #00dc82;
  border-color: #00d4ff50;
  color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.pill:hover {
  opacity:.9;
  color:#fff;
}
.layout {
  display: grid;
  grid-template-rows: auto 1fr; /* Barra fixa e conteúdo */
  overflow-y:auto;
 
}
.layout-no-sidebar {
  display: grid;
  grid-template-rows: auto 1fr; /* Barra fixa e conteúdo */

}

.border {
    border: 2px solid #ccc;
    margin: 30px 15px;
    border-radius: 8px;
}
.mar {
    margin: 20px 20px -5px 20px;
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
    border-radius: 4px;
    background: #00dc8280;
    color: #fff;
}

.dark-mode .topbar h4 {
    color: #fff;
}

.content {
  overflow-y: auto; /* Adiciona scroll vertical no conteúdo */
  display: grid;
  grid-template-columns: .38fr .7fr; /* Define duas colunas iguais */
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  gap: 1px;
  overflow-y: auto;
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
    border: solid 2px #ccc;
    text-align: left;
    width: 160px;
    font-weight: 600;
    border-radius: 4px;
    height: 30px;
    font-size: 14px;
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
    
input {
    padding: 5px 15px;
    font-size: 1rem;
    font-weight: bolder;
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
    border-bottom: 1px solid #00dc8240;
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
    flex-direction: column;
    align-items: flex-start;
    margin:20px 3%;
    padding: 10px 0 20px 0;
    position: sticky;
    top: 20px;

}
.line p {
    margin-top: 5px;
}

.line input {
    margin-top  : 0rem; 
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

.button {
    height: 35px;
    width: 55px;
    text-align: center;
    padding-top: 4px;
    border-radius: 4px;
    cursor: pointer;
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
