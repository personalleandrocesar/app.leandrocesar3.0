<script setup>
import { ref } from 'vue';
import { reloadNuxtApp } from "nuxt/app";

useHead({
    titleTemplate: 'Clientes | NEX_WOD',
});

const Users = await useFetch('https://api.leandrocesar.com/users');
const item = Users.data.value;
const UsersId = await useFetch(`https://api.leandrocesar.com/users/:id`);

console.log(UsersId.data.value);

console.log(item);

const subscriberOk = ref(false)

const name = ref('')
const lastName = ref('')
const sex = ref('')
const birthday = ref('')
const whatsapp = ref('')
const service = ref('')
const target = ref('')
const email = ref('')
const username = ref('')
const password = ref('')
const day = ref('')
const time = ref('')
const payDay = ref('')
const periodStart = ref('')
const periodEnd = ref('')
const terms = ref('')
const status = ref('')

const switBlock = ref(true)
const switList = ref(false)
const addCloseClient = ref(true)
const closeAddClient = ref(false)
const add = ref(true)
const block = ref(false)
function switchButtonBlock() {
    switBlock.value = false
    switList.value = true
    block.value = !block.value
}
function switchButtonList() {
    switBlock.value = true
    switList.value = false
    block.value = !block.value
}

function addClient() {
    add.value = false
    addCloseClient.value = false
    closeAddClient.value = true
    // colorMode.value === 'dark' ? 'line-md:moon-filled-to-sunny-filled-loop-transition' : 'line-md:sunny-filled-loop-to-moon-alt-filled-loop-transition'
    switBlock.value = false
    switList.value = false
    block.value = true
}
function closeClient() {
    add.value = true
    addCloseClient.value = true
    closeAddClient.value = false
    // colorMode.value === 'dark' ? 'line-md:moon-filled-to-sunny-filled-loop-transition' : 'line-md:sunny-filled-loop-to-moon-alt-filled-loop-transition'
    switBlock.value = true
    switList.value = false
    block.value = false
    // if (switBlock.value === true  ) {
    //     return switBlock.value = true,
    //     switList.value = false
    // } else (switList === true) {
    //     return switList.value = true,
    //     switBlock.value = false
    // }

}

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
                reloadNuxtApp({
                    path: "/admin/clientes",
                    ttl: 1000, // default 10000
                });
            }, 2000);
        } else {
            console.error('Failed to send data');
        }
    } catch (error) {
        console.error('Error sending data:', error);
    }
}

function formatarData(input) {
    // Obtém a data do input
    let data = new Date(input.value);

    // Formata a data como DD-MM-YYYY
    let dia = data.getDate().toString().padStart(2, '0');
    let mes = (data.getMonth() + 1).toString().padStart(2, '0');
    let ano = data.getFullYear();

    // Define a data formatada de volta no input
    input.value = `${dia}-${mes}-${ano}`;
}


</script>

<template>

    <div id="grid">
        <div id="areaA">
            <div class="nav-top">
                <div class="clients">
                    <Icon name='solar:users-group-two-rounded-bold' /> Clientes <span> {{ Users.data.value.length }}
                    </span>
                </div>
                <div>
                    <div class="notifications">
                        <Icon name='mingcute:notification-newdot-fill' />
                    </div>
                </div>
            </div>
            <div class="nav-users">
                <div class="users-conf">
                    <div v-if="switBlock" class="filter" @click="switchButtonBlock">
                        <Icon name='solar:widget-linear' /> Blocos
                    </div>
                    <div v-else-if="switList" class="filter" @click="switchButtonList">
                        <Icon name='material-symbols:view-list-outline' /> Lista
                    </div>
                </div>
                <div>
                    <div v-if="addCloseClient" class="add-client" @click="addClient">Adicionar Cliente
                        <Icon name='material-symbols:add' />
                    </div>
                    <!-- parei aqui -->
                    <div v-else-if="closeAddClient" class="close-client" @click="closeClient">Fechar
                        <Icon name='material-symbols:cancel-rounded' />
                    </div>
                </div>
            </div>

            <div v-if="add">
                <div v-if="block" class="users-list">
                    <div v-for="(item, index) in item" :key="index">

                        <NuxtLink :to="`/admin/clientes/${item.username}`">

                            <div class="title-user">

                                <img :src="`/admin/clientes/${item.foto}`">
                                <h4>
                                    {{ item.name }} {{ item.lastName }}
                                </h4>
                            </div>

                        </NuxtLink>
                    </div>
                    <!-- <td>
                    <button @click="salvarEdicao(email._id)">Salvar</button>
                </td> -->
                </div>
                <div v-else class="users-list">

                    <table>
                        <thead>
                            <tr class="">
                                <th>
                                    <span>#</span>
                                </th>

                                <th>
                                    <span>Nome</span>
                                </th>
                                <th>
                                    <span>Serviço</span>
                                </th>
                                <th>
                                    <span>Objetivo</span>
                                </th>
                                <th>
                                    <span>Período</span>
                                </th>
                                <th>
                                    <span>Venc.</span>
                                </th>
                                <th>
                                    <span>Nascimento</span>
                                </th>
                                <th>
                                    <span>E-mail</span>
                                </th>
                                <th>
                                    <span>Status</span>
                                </th>
                            </tr><!---->
                        </thead>
                        <tbody v-for="(item, index) in item" :key="index">
                            <tr @click="navigateTo(`/admin/clientes/${item.username}`)">
                                <td>{{ index +1 }}</td>
                                <td>
                                    {{ item.name }} {{ item.lastName }}
                                </td>
                                <td>
                                    {{ item.service }}
                                </td>
                                <td>
                                    {{ item.target }}
                                </td>
                                <td>
                                    <span>
                                        {{ item.periodStart }} <br> {{ item.periodEnd }}
                                    </span>
                                </td>
                                <td>
                                    <span>
                                        {{ item.payDay }}
                                    </span>
                                </td>
                                <td>
                                    {{ item.birthday }}
                                </td>
                                <td>
                                    <span>
                                        {{ item.email }}
                                    </span>
                                </td>
                                <td>
                                    <span>
                                        {{ item.status }}
                                    </span>
                                </td>

                            </tr>
                        </tbody>
                    </table>


                </div>
            </div>
            <div v-else class="main">
                <div class="barTop center">

                </div>
                <form @submit.prevent="submitForm">
                    <div class="center-start">
                        <div class="center-start-one">
                            <div>
                                <img v-if="photoClient" class="cliente" :src="foto">
                                <Icon v-else class="cliente" name="material-symbols:account-circle-full" />
                            </div>
                            <div>
                                <input class="file-cliente" type="file" display="none" />

                            </div>
                        </div>
                        <div class="center-start-two inputs">
                            <div class="inputs">

                                <div>

                                    <span>Nome</span>
                                    <input type="text" id="name" autofocus v-model="name" required autocomplete="nome">

                                </div>
                                <div>

                                    <span>Sobrenome</span>
                                    <input type="text" id="sobrenome" v-model="lastName" required
                                        autocomplete="sobrenome">

                                </div>
                            </div>

                            <!-- Sexo -->
                            <div class="inputs">
                                <div class="radio">

                                    <input type="radio" name='sex' id="feminino" class="check" v-model="sex" required
                                        value=feminino autocomplete="sexo" checked>
                                    <label for="feminino">Feminino</label>

                                </div>
                                <div class="radio">

                                    <input type="radio" name='sex' id="masculino" class="check" v-model="sex" required
                                        value="masculino" autocomplete="sexo">
                                    <label for="masculino">Masculino</label>

                                </div>


                            </div>
                            <!-- Data de nascimento + Whatsapp -->
                            <div class="inputs">

                                <div>
                                    <span>Data de nascimento</span>
                                    <input type="date" name="" id="nascimento"  v-model="birthday" required
                                        autocomplete="nascimento">
                                </div>
                                <div>
                                    <span>WhatsApp</span>
                                    <input type="tel" name="" id="whatsapp" placeholder="(xx)xxxxx-xxxx" required
                                        v-model="whatsapp" autocomplete="whatsapp">
                                </div>

                            </div>
                            <!-- Serviço e objetivo -->
                            <div class="inputs">

                                <div>
                                    <span>Qual Serviço?</span>
                                    <select name="service" id="servico" required class="select" placeholder=''
                                        v-model="service">
                                        <option disabled value="">Selecione uma opção</option>
                                        <option value="Personal">Personal</option>
                                        <option value="Consultoria">Consultoria</option>
                                    </select>
                                </div>

                                <div>

                                    <span>Qual objetivo?</span>
                                    <select name="target" id="target" class="select" placeholder='' required
                                        v-model="target">
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
                                    <input type="text" name="" id="email" v-model="email" autocomplete="email" required>

                                </div>
                            </div>
                            <!-- Usuário e senha -->
                            <div class="inputs senha">
                                <div>
                                    <span>Usuário</span>
                                    <input type="text" required name="" id="usuario" v-model.trim="username"
                                        autocomplete="usuario">
                                </div>
                                <div class="senhaPs">
                                    <span>Senha</span>
                                    <input v-bind:type="pass" required name="" id="password" v-model="password"
                                        autocomplete="off">
                                    <Icon @click="swText" v-if="passView" name="ph:lock-key-open-bold"
                                        id="password-icon" />
                                    <Icon @click="swPass" v-else name="ph:lock-key-fill" id="password-icon" />
                                </div>

                            </div>
                            <div class="inputs">
                                <div>

                                    <span>Dias/semana</span>
                                    <input type="number" name="" required id="servico" v-model="day"
                                        autocomplete="servico">

                                </div>
                                <div>

                                    <span>Minutos/treino</span>
                                    <input type="number" name="" required id="vencimento" v-model="time"
                                        autocomplete="vencimento">

                                </div>

                            </div>
                            <div class="inputs">
                                <div>

                                    <span>Dia do Vencimento</span>
                                    <input type="number" name="" required id="vencimento" v-model="payDay"
                                        autocomplete="vencimento">

                                </div>
                                <div>

                                    <span>Início dos treinos</span>
                                    <input type="date" name="" required id="servico" placeholder="Tempo/treino"
                                        v-model="periodStart" autocomplete="servico">

                                </div>
                                </div>
                            </div>
                            </div>
                            <button class="login" type="submit">Adicionar</button>
                </form>
                <br>
                <br>
                <br>
                <!-- <div class="table-clients">
    
    
                    <form @submit.prevent="submitForm">
                        <div class="table">
                            <div class="row header">
                                <div class="cell-two">Nome</div>
                                <div class="cell-two">Sobrenome</div>
                                <div class="cell-two">Usuário</div>
                                <div class="cell-two">Email</div>
                                <div class="cell-two">Senha</div>
                                <div class="cell-two">Serviço</div>
                            </div>
                            <div class="row">
                                <div class="cell-two"><input type="text" v-model="name" name="name" /> </div>
                                <div class="cell-two"><input type="text" v-model="lastName" name="lastName" /> </div>
                                <div class="cell-two"><input type="text" v-model="username" name="username" /> </div>
                                <div class="cell-two"><input type="email" v-model="email" name="email" /></div>
                                <div class="cell-two"><input type="text" v-model="password" name="password" /> </div>
                                <div class="cell-two"><input type="text" v-model="service" name="service" /> </div>
                            </div>
                        </div>
                        <div class="table">
                            <div class="row header">
                                <div class="cell-two">Início</div>
                                <div class="cell-two">Fim</div>
                                <div class="cell-two">Objetivo</div>
                                <div class="cell-two">Status</div>
                                <div class="cell-two">Dias</div>
                                <div class="cell-two">Tempo</div>
                            </div>
                            <div class="row">
                                <div class="cell-two"><input type="date" v-model="periodStart" name="periodStart" /> </div>
                                <div class="cell-two"><input type="date" v-model="periodEnd" name="periodEnd" /> </div>
                                <div class="cell-two"><input type="text" v-model="target" name="target" /> </div>
                                <div class="cell-two"><input type="text" v-model="status" name="status" /> </div>
                                <div class="cell-two"><input type="text" v-model="day" name="day" /> </div>
                                <div class="cell-two"> <input type="text" v-model="time" name="time" /> </div>
                            </div>
                        </div>
    
                        <button class="input" type="submit" @click="refreshAll">Adicionar</button>
                    </form>
                    
                    
                </div> -->
                <div v-if="subscriberOk" class="subscriberOk top">
                    <div>
                        Inscrição realizada com Sucesso!
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
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
    margin: 0rem 1.5rem;
}

.lost h5 {
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
.inputs input {
  margin: .5rem auto;
  transition: all .4s linear;
  border-bottom: solid 2px #8d00ab;
  text-align: left;
  line-height: 18px;
  font-weight: 600;
  border-radius: 4px;
  transition: all 0.2s ease-in-out 0s;
  height: 34px;
  font-size: 14px;
  padding-inline: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
}

.inputs input:focus-visible {
    border: solid 1px #8d00ab;
    background-color: #8d00ab10;
}

.inputs input:active {
    border-color: #8d00ab80;
}

.inputs input:hover {
    background-color: #8d00ab40;
    cursor:pointer;
}


.inputs input:focus {
    border: 0 none;
    border-bottom: solid 2px #8d00ab;
    outline: 0;
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
    height: 50px;
    font-weight: bolder;
    border-bottom: .10px solid #8d00ab40;
    backdrop-filter: blur(45px);
    border-bottom: solid 1px #8d00ab40;
        border-right: solid 1px #8d00ab40;
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
.subscriberOk {
    position: fixed;
    top: 10px;
    right: 10px;
    width: 20%;
    margin-left: 40%;
    background-color: #8d00ab;
    color: #fff;
    text-shadow: 2px 2px 2px #111;
    z-index: 20;
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;
    border-radius: 8px;
    padding: 8px 0px;
    font-weight: bolder;
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
    background-color: #04be7a80;
font-weight: bolder;
}

#customers td,
#customers th {
    border: 1px solid #04be7a40;
    padding: 8px;
    color: white;
    font-weight: bolder;
}

#customers tr:nth-child(1) {
    background-color: #04be7a30;
    }
#customers tr:nth-child(2n) {
    background-color: #04be7a30;
    }
    
    #customers tr:hover {
        background-color: #04be7a50 ;
    }
    
input {
    padding: 5px 15px;
    font-size: 1rem;
    font-weight: bolder;
}

::placeholder {
    font-size: 1rem;
    font-weight: bolder;
}
.row {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #04be7a40;
    font-size: 1rem;
}

.row:nth-child(1) {
    position: sticky;
    top: 90px;
    font-size: 1.1rem;
    font-weight: bolder;
}

.row:nth-child(2n) {
    background-color: #04be7a10;

}

.header {
    font-weight: bold;
}

.cell {
    flex: 1;
    overflow: hidden;
    border-right: 1px solid #04be7a40;
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
    border-right: 1px solid #04be7a40;
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
    height: 40px;
    font-weight: bolder;
    border-bottom: solid 1px #00fa9e40;
    border-right: solid 1px #04be7a40;
    backdrop-filter: blur(45px);
}

.clients {
    margin: 11px;
}

.clients span {
    border: 1px solid #04be7a40;
    padding: 3px 6px;
    border-radius: 8px;
    color: #04be7a;
    background-color: #04be7a40;
    margin-left: 3px;
}

.add-client {
    border: solid 1px #04be7a90;
    background-color: #04be7a;
    padding: 5px 7px;
    margin: 1.5px 6px;
    border-radius: 8px;
    transition: all .3s linear;
    cursor: pointer;
    color: #fff;
}

.add-client:hover {
    border: solid 1px #04be7a90 ;
    border-radius: 8px;
    color: #04be7a;
    background-color: #fff;
}

.close-client {
    border: solid 1px #04be7a90;
    background-color: #04be7a;
    padding: 5px 42px;
        margin: 1.5px 6px;
    border-radius: 8px;
    transition: all .3s linear;
    cursor: pointer;
    color: #fff;
}

.close-client:hover {
    border: solid 1px #04be7a90 ;
    border-radius: 8px;
    color: #04be7a;
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
    border-bottom: solid 1px #04be7a40;
    border-right: solid 1px #04be7a40;
    backdrop-filter: blur(45px);
}

.users-conf {
    margin: -1px;
}

.users-conf span {
    border: 1px solid #04be7a90;
    padding: 2px;
    border-radius: 8px;
    color: #04be7a;
    background-color: #04be7a30;
    margin-left: 3px;
}

.filter {
    border: solid 1px #04be7a90;
    padding: 4px 12px;
    margin: 4px 14px;
    border-radius: 8px;
    transition: all .3s linear;
    cursor: pointer;
    background-color: #04be7a10;
}

.filter:hover {
    color: #fff;
    background-color: #04be7a90;
}

.users-list {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    z-index: 1;
    width: 100%;
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
    height: 100px;
    width: 156px;
    margin: 2px;
    border-radius: 8px;
    border: solid 2px #04be7a60;
}

.title-user:hover {
    background-color: #8d00ab60;
}

.title-user img {
    height: 35px;
    width: 35px;
    background-color: #04be7a60;
    border: 3px solid #04be7a;
    border-radius: 8px;
}

.title-user h4 {
    text-align: center;
    font-size:.8rem;
}


.form-cliente {
    border-radius: 50%;
    border: solid 3px #04be7a;
}

.cliente {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    color: #04be7a;
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
    color: #04be7a;
}

.button {
    height: 35px;
    width: 55px;
    text-align: center;
    padding-top: 4px;
    border-radius: 8px;
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
    background-color: #04be7a50;
}

.others-details {
    margin: 0 .5%;
    z-index: 1;
    background-color: #04be7a30;
    border: solid 3px #04be7a40;
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
    box-shadow: 0px 7px 20px #04be7a;
    border-radius: 8px;
    margin: 1rem;
    z-index: 10;
}

.logo img {
    height: 46px;
    width: 46px;
    border-radius: 8px;
    border: #04be7a 2px solid;
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
    border-bottom: 1px solid #04be7a40;
    font-size: 1rem;
}

.row:nth-child(1) {
    background-color: #04be7a90;
    position: sticky;
    top: 90px;
    font-size: 1.1rem;
    font-weight: bolder;
}

.row:nth-child(2n) {
    background-color: #04be7a10;

}
</style>
