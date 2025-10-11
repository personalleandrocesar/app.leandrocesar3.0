<script setup>
import { ref } from 'vue';
import { reloadNuxtApp } from "nuxt/app";


const route = useRoute();
const Users = await useFetch(`https://api.leandrocesar.com/users/${route.params.id}`);
const Treinos = await useFetch(`https://api.leandrocesar.com/users/${route.params.id}/treinos/${route.params.idd}`);
const Series = await useFetch(`https://api.leandrocesar.com/users/${route.params.id}/treinos/${route.params.idd}/${route.params.iddd}`);

const item = Users.data.value;
const qtTreino = Treinos.data;
const qtTreinos = Series.data;

console.log(qtTreinos)




const subscriberOk = ref(false)

const add = ref(true)
function addClient() {
    add.value = !add.value
}

const items = ref(
    {
        "name": "treino-two ",
        "series": [
            {
                "name": "SerieA",
                "date": "30-06-2024",
                "set": [
                    {
                        "id": 1,
                        "num": "Exercício 1",
                        "nome": "Supino reto hammer",
                        "sets": 3,
                        "reps": "12 c/2\"",
                        "rest": "50'",
                        "grupo": "",
                        "obs": "Segurar 2 segundos embaixo a cada repetição.",
                        "photo": "supinoRetoHammer",
                        "img": "https://nexwod.app/exe/supinoRetoHammer.png"
                    },
                    {
                        "id": 2,
                        "num": "Exercício 2",
                        "nome": "Supino inclinado (HBC)",
                        "sets": 4,
                        "reps": "8",
                        "rest": "50''",
                        "grupo": "",
                        "obs": "Pegar halteres bem pesados.",
                        "photo": "supinoInclinado",
                        "img": "https://nexwod.app/exe/supinoInclinado.gif"
                    },
                    {
                        "id": 3,
                        "num": "Exercício 3",
                        "nome": "Desenvolvimento Hammer",
                        "sets": 3,
                        "reps": "10 + 10\"",
                        "rest": "50''",
                        "grupo": "",
                        "obs": "Fazer 10 reptições e segurar 10\" segundos embaixo na altura dos ombros.",
                        "photo": "desenvolvimentoMaquina",
                        "img": "https://nexwod.app/exe/desenvolvimentoMaquina.gif"
                    },
                    {
                        "id": 4,
                        "num": "Exercício 4",
                        "nome": "Elevação lateral (máquina)",
                        "sets": 3,
                        "reps": "8 +8\" +4",
                        "rest": "50''",
                        "grupo": "",
                        "obs": "Fazer 8 repetições, segurar 8 segundos em cima + 4 repetições. Fazer na máquina!",
                        "photo": "elevacaoLateralHBC",
                        "img": "https://nexwod.app/exe/elevacaoLateralHBC.gif"
                    },
                ]
            },
            {
                "name": "SerieB",
                "date": "30-06-2024",
                "set": [
                    { "id": '1', "exercício": 'extensora', "sets": 3, "reps": 12 }
                ]
            },

        ]
    }

);

async function submitTreino() {
    try {
        const response = await fetch(`https://api.leandrocesar.com/user/${route.params.id}/treinos`, {
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
                reloadNuxtApp({
                    path: `/admin/clientes/${item.username}/treinos`,
                    ttl: 1000, // default 10000
                });
            }, 1000);
        } else {
            console.error('Failed to Create Trainning');
        }
    } catch (error) {
        console.error('Error Create Trainning:', error);
    }
}

const reg = route.params.id
const logon = useCookie('logon')
// const logon = useCookie('logon', { maxAge: 4800})
logon.value = reg

const dataConf = await useFetch(`https://api.leandrocesar.com/users/${route.params.id}`)
const status = dataConf.data.value?.status
const photoOpen = ref(false);
function openPhoto() {
    photoOpen.value = !photoOpen.value;
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

const newForm = ref(true)
const addCloseTrainning = ref(true)
const newTrainning = () => {
    newForm.value = !newForm.value
    addCloseTrainning.value = !addCloseTrainning.value
}

useHead({
    titleTemplate: `Treinos - ${dataConf.data.value?.name} ${dataConf.data.value?.lastName} | Clientes | NEX_WOD`,
})



</script>
<template>
    <div v-if="subscriberOk" class="subscriberOk top">
        <div>
            Série criada com Sucesso!
        </div>
    </div>
    <div id="grid">
        <div id="areaA">
            <div class="nav-top">
                <div class="clients">
                    <Icon name='material-symbols:person' /> Cliente - {{ Users.data.value.name }} {{
                    Users.data.value.lastName }}
                </div>
                <div>
                    <div class="notifications">
                        <Icon name='mingcute:notification-newdot-fill' />
                    </div>
                </div>
            </div>
            <div class="nav-users">
                <div class='reward'>
                    <!-- <a @click="$router.go(-1)">
                        <Icon name="tabler:arrow-big-left-lines-filled" />
                    </a> -->

                    <NuxtLink :to="`/admin/clientes/${item.username}`">
                        <div class="reward-button">
                            <Icon name='material-symbols:shield-person' />
                        </div>
                    </NuxtLink>
                    <NuxtLink :to="`/admin/clientes/${item.username}/treinos`">
                        <div class="reward-button">
                            <Icon name='solar:dumbbell-large-bold' />
                        </div>
                    </NuxtLink>
                    <NuxtLink :to="`/admin/clientes/${item.username}/avaliacao`">
                        <div class="reward-button">
                            <Icon name='solar:clipboard-heart-bold' />
                        </div>
                    </NuxtLink>



                    <div v-if="addCloseTrainning" class="new-user" @click="newTrainning">
                        <Icon name='material-symbols:add-notes' />
                    </div>
                    <div v-else class="new-user" @click="newTrainning">
                        <Icon name='material-symbols:cancel-rounded' /> Fechar
                    </div>

                </div>
                <div class='actions'>
                    <NuxtLink :to="`/admin/clientes/${item.username}`">
                        <div class="actions-button">
                            <Icon name='material-symbols:shield-person' /> Resumo
                        </div>
                    </NuxtLink>
                    <NuxtLink :to="`/admin/clientes/${item.username}/treinos`">
                        <div class="actions-button">
                            <Icon name='solar:dumbbell-large-bold' /> Treinos
                        </div>
                    </NuxtLink>
                    <NuxtLink :to="`/admin/clientes/${item.username}/avaliacao`">
                        <div class="actions-button">
                            <Icon name='solar:clipboard-heart-bold' /> Avaliações
                        </div>
                    </NuxtLink>
                </div>
                <div class='actions-user'>

                    <div v-if="addCloseTrainning" class="new-user" @click="newTrainning">
                        <Icon name='material-symbols:add-notes' /> Novo Treino
                    </div>
                    <div v-else class="new-user" @click="newTrainning">
                        <Icon name='material-symbols:cancel-rounded' /> Fechar
                    </div>
                </div>
            </div>
            <div v-if="newForm">

                <h1>
                    Séries:

                </h1>
                <h1 v-for="(qtTreinos, index) in qtTreinos" :key="index">
                    <span
                        @click="navigateTo(`/admin/clientes/${item.username}/treino/${qtTreino.name}/${qtTreinos.name}`)">

                        {{ qtTreino }}

                    </span>
                </h1>

            </div>
            <div v-else class="new-form">
                <div class="new-form-squared">
                    <form @submit.prevent="submitTreino">
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
                                <input type="date" name="" id="nascimento" autofocus v-model="birthday" required
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
                                <input type="text" name="" id="email" v-model="email" autocomplete="email">

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
                                <input type="pass" required name="" id="password" v-model="password" autocomplete="off">
                            </div>

                        </div>
                        <div class="inputs">
                            <div>

                                <span>Dias/semana</span>
                                <input type="number" name="" required id="servico" v-model="day" autocomplete="servico">

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
                        <div>

                        </div>
                        <div>

                        </div>

                        <div class="inputs">
                            <button class="login" type="submit">
                                Criar
                                <Icon name="material-symbols:person-add-rounded" />
                            </button>
                        </div>
                        <br>
                        <br>
                        <br>
                    </form>

                </div>
            </div>

        </div>
    </div>
</template>
<style scoped>
.none,
.nav-users .reward {
    display: none;
}

@media (max-width: 650px) {

    .none,
    .nav-users .actions-user {
        display: none;
    }
}

@media (max-width: 1020px) {

    .nav-users .actions,
    .nav-users .actions-user,
    .actions-user .update-button,
    .actions-user .delete-button {
        display: none;
    }

    .nav-users .reward {
        display: inherit;
    }
}

.new-user {
    border: solid 1px #04be7a90;
    background-color: #04be7a;
    padding: 4px 15px;
    margin: 2.5px 10px;
    border-radius: 8px;
    transition: all .3s linear;
    cursor: pointer;
}

.new-user:hover {
    border: solid 1px #04be7a90;
    border-radius: 8px;
    color: #04be7a;
    background-color: #fff;
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
    margin: 30px 30px 15px 30px;
}


.inputs .terms {
    text-decoration: underline;
    color: #8d00ab;
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
    background-color: transparent;
    border-bottom: solid 2px #8d00ab;
    border-radius: 5px;
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

.subscriberOk {
    background-color: #8d00ab;
        text-shadow: 2px 2px 2px #111;
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
  color: #fff;
  margin-left: -40%;
  font-weight: 900;
  border: solid 1px #8d00ab10;
  z-index: 10000;
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

.reward {
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
    font-weight: bolder;
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

.actions {
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    align-content: baseline;
    margin: 0;
}

.actions a {
    border: solid 1px #8d00ab10;
    background-color: transparent;
    padding: 4px 35px;
    margin: 2.5px 10px;
    border-radius: 8px;
    transition: all .3s linear;
    cursor: pointer;
}


.actions a:hover {
    border: solid 1px #8d00ab60;
    background-color: #8d00ab60;
}

.actions a.router-link-exact-active {
    background: #8d00ab90;
    border: solid 1px #8d00ab;
    color: #fff;
    text-decoration: none;
    cursor: pointer;
}

.actions-button a.router-link-exact-active:hover {
    background: #8d00ab90;
    ;
    color: #fff;
    text-decoration: none;
    cursor: pointer;
}

.actions-button a.router-link-exact-active:hover::after {
    background-color: var(--color-background);
    color: #8d00ab;
    text-decoration: none;
    cursor: pointer;
}

.nav-users .reward div {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    align-content: baseline;
}

.reward a {
    border: solid 1px #8d00ab10;
    background-color: transparent;
    padding: 4px 15px;
    margin: 2.5px 7px;
    border-radius: 8px;
    transition: all .3s linear;
    cursor: pointer;
}


.reward a:hover {
    border: solid 1px #8d00ab60;
    background-color: #8d00ab60;
}

.reward a.router-link-exact-active {
    background: #8d00ab90;
    border: solid 1px #8d00ab;
    color: #fff;
    text-decoration: none;
    cursor: pointer;
}

.reward-button a.router-link-exact-active:hover {
    background: #8d00ab90;
    ;
    color: #fff;
    text-decoration: none;
    cursor: pointer;
}

.reward-button a.router-link-exact-active:hover::after {
    background-color: var(--color-background);
    color: #8d00ab;
    text-decoration: none;
    cursor: pointer;
}

.update-button {
    border: solid 1px #fadb4080;
    background-color: #fadb4080;
    padding: 4px 15px;
    margin: 2.5px 0px;
    border-radius: 8px;
    transition: all .3s linear;
    cursor: pointer;
}

.update-button:hover {
    border: solid 1px #fadb40;
    border-radius: 8px;
    color: #000;
    background-color: #fadb40;
}

.delete-button {
    border: solid 1px #ff190080;
    background-color: #ff190080;
    padding: 4px 15px;
    margin: 2.5px 10px;
    border-radius: 8px;
    transition: all .3s linear;
    cursor: pointer;
}

.delete-button:hover {
    border: solid 1px #ff1900;
    border-radius: 8px;
    color: #fff;
    background-color: #ff1900;
}

.reward-update {
    border: solid 1px #fadb4080;
    background-color: #fadb4080;
    padding: 4px 15px;
    margin: 2.5px 7px;
    border-radius: 8px;
    transition: all .3s linear;
    cursor: pointer;
}

.reward-update:hover {
    border: solid 1px #fadb40;
    border-radius: 8px;
    color: #000;
    background-color: #fadb40;
}

.reward-delete {
    border: solid 1px #ff190080;
    background-color: #ff190080;
    padding: 4px 15px;
    margin: 2.5px 7px;
    border-radius: 8px;
    transition: all .3s linear;
    cursor: pointer;
}

.reward-delete:hover {
    border: solid 1px #ff1900;
    border-radius: 8px;
    color: #fff;
    background-color: #ff1900;
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
