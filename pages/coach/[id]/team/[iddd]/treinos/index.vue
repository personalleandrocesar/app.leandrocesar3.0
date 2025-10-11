<script setup>
import { ref } from 'vue';
import { reloadNuxtApp } from "nuxt/app";


const route = useRoute();
const Users = await useFetch(`https://api.leandrocesar.com/users/${route.params.id}`);
const Treinos = await useFetch(`https://api.leandrocesar.com/users/${route.params.id}/treinos`);
const item = Users.data.value;

const qtTreinos = Treinos.data.value

const treino = [...qtTreinos]


// if (Treinos.data.value == null) {
//     qtTreinos.value = Treinos.data.value.reverse();
// } else {
//     qtTreinos.value = Treinos.data.value;
// }





const subscriberOk = ref(false)

const add = ref(true)
function addClient() {
    add.value = !add.value
}

const items = ref(
    {
        name: '',
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
                // reloadNuxtApp({
                //     path: `/admin/clientes/${item.username}/treinos`,
                //     ttl: 1500, // default 10000
                // });
                return navigateTo(`/admin/clientes/${route.params.id}/treino/${items.value.name}`);
            }, 1500);
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
            Treino criado com Sucesso!
        </div>
    </div>
    <div id="grid">
        <div id="areaA">
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
                    <NuxtLink :to="`/admin/clientes/${item.username}/avaliacoes`">
                        <div class="reward-button">
                            <Icon name='solar:clipboard-heart-bold' />
                        </div>
                    </NuxtLink>



                    <div v-if="addCloseTrainning" class="new-user" @click="newTrainning">
                        <Icon name='material-symbols:add-notes' />
                    </div>
                    <div v-else class="new-user" @click="newTrainning">
                        <Icon name='material-symbols:cancel-rounded' />
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
                    <NuxtLink :to="`/admin/clientes/${item.username}/avaliacoes`">
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

                <br>
                <div class="main-div-two">
                    <h3>
                        <Icon name='solar:dumbbell-large-bold' /> TREINOS
                    </h3>
                </div>
                <br>
                <br>


                <div class="main-div-two">


                    <span v-for="(treino, index) in treino" :key="index">
                        <NuxtLink class="square" :to="`/admin/clientes/${item.username}/treino/${treino.name}`">
                            <div>
                                <h4>
                                    TREINO
                                </h4>
                            </div>

                            <div>
                                <h3>

                                </h3>

                                <h5>
                                    {{ treino.name }}
                                </h5>

                            </div>
                        </NuxtLink>
                    </span>
                </div>
                <br>
                <br>
                <br>
            </div>
            <div v-else class="new-form">
                <div class="new-form-squared">
                    <form @submit.prevent="submitTreino">
                        <!-- Nome e sobrenome -->
                        <div class="inputs">

                            <div>

                                <span>Nome do treino</span>
                                <input type="text" id="name" autofocus v-model="items.name" required
                                    autocomplete="nome">

                            </div>

                        </div>

                        <div class="inputs">
                            <button class="login" type="submit">
                                Criar
                                <Icon name="material-symbols:add-notes" />
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
    .none, .nav-users .actions-user  {
        display: none;
    }

    
}

@media (max-width: 1020px) {

    .nav-users .actions, .nav-users .actions-user,
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
    border-bottom: .10px solid #00dc8240;
    backdrop-filter: blur(45px);
    border-bottom: solid 1px #00dc8240;
    border-right: solid 1px #00dc8240;
}

.subscriberOk {
        background-color: #00dc82;
        color: #fff;
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
  border: solid 1px #00dc8210;
  z-index: 10000;
}

.clients {
    margin: 11px;
}

.clients span {
    border: 1px solid #00dc8290;
    padding: 3px 6px;
    border-radius: 8px;
    color: #00dc82;
    background-color: #00dc8230;
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
    color: #00dc82;
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
    border-bottom: .10px solid #00dc8240;
    backdrop-filter: blur(45px);
    border-bottom: solid 1px #00dc8240;
    border-right: solid 1px #00dc8240;
}
.reward{
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
    border: 1px solid #00dc8290;
    padding: 8px;
    border-radius: 8px;
    color: #00dc82;
    background-color: #00dc8230;
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
    border: solid 1px #00dc8210;
    background-color: transparent;
    padding: 4px 35px;
    margin: 2.5px 10px;
    border-radius: 8px;
    transition: all .3s linear;
    cursor: pointer;
}


.actions a:hover {
    border: solid 1px #00dc8260;
    background-color: #00dc8260;
}

.actions a.router-link-exact-active {
    background: #00dc8290;
    border: solid 1px #00dc82;
    color: #fff;
    text-decoration: none;
    cursor: pointer;
}

.actions-button a.router-link-exact-active:hover {
    background: #00dc8290;
    ;
    color: #fff;
    text-decoration: none;
    cursor: pointer;
}

.actions-button a.router-link-exact-active:hover::after {
    background-color: var(--color-background);
    color: #00dc82;
    text-decoration: none;
    cursor: pointer;
}

.nav-users .reward  div     {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    align-content: baseline;
}

.reward a {
    border: solid 1px #00dc8210;
    background-color: transparent;
    padding: 4px 15px;
    margin: 2.5px 7px;
    border-radius: 8px;
    transition: all .3s linear;
    cursor: pointer;
}


.reward a:hover {
    border: solid 1px #00dc8260;
    background-color: #00dc8260;
}

.reward a.router-link-exact-active {
    background: #00dc8290;
    border: solid 1px #00dc82;
    color: #fff;
    text-decoration: none;
    cursor: pointer;
}

.reward-button a.router-link-exact-active:hover {
    background: #00dc8290;
    ;
    color: #fff;
    text-decoration: none;
    cursor: pointer;
}

.reward-button a.router-link-exact-active:hover::after {
    background-color: var(--color-background);
    color: #00dc82;
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
    transition: all .4s linear;
    border-bottom: solid 2px #00dc82;
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
    border-bottom: solid 2px #00dc82;
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


.main-div-two {
    overflow-x: auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin: -20px 0 0 0;
    align-items: left;
    flex-wrap: wrap;
}

.main-div-two span {
    overflow-x: auto;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 0px;
    align-items: left;
}

.main-div-two .icon {
    color: #00dc82;
}

.square {
    background-color: #00dc8210;
    backdrop-filter: blur(5px);
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    margin: 2px 4px 4px 0px;
    border-radius: 8px;
    border: .1px solid #00dc8220;
    line-height: 1.4;
    transition: all .4s;
    border: 2px solid #00dc8210;
}

.square:nth-child(2n+1) {
    margin: 2px 0px 0px 4px;
}

.square:nth-child(2n) {
    margin: 2px 4px 0px 0px;
}

.square div h4 .icon {
    margin-top: -1px;
}

.square:nth-child(2) {
    margin-top: 10px;
}

.square:hover {
    background-color: #00dc8230;

    border-top: 2px solid #00dc8240;
    border-bottom: 2px solid #00dc8240;

}

.square div:nth-child(2),
.square div:nth-child(3) {
    margin: auto;
    border: none;
}

.main-div-two H3 {
    margin-left: 20px;

}

.main-div-two h4 {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: #00dc82;
}

.main-div-two h5 {
    font-size: .9rem;
}

.main-div-two a div {
    border-bottom: 2px solid #00dc8220;
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.main-div-two h4 .icon {
    margin-left: -3px;
}

.main-div-two div .icon {
    margin-top: -1px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.select {
    transition: all .4s linear;
    border: 0;
    color: inherit;
    background-color: transparent;
    border-bottom: solid 2px #00dc82;
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
    border-bottom: solid 2px #00dc82;
    outline: 0;
}

.select:focus-visible {
    background-color: #00dc8210;
}

.select:active {
    background-color: #00dc8210;
}

.select:hover {
    background-color: #00dc8210;
}

.login {
    transition: all .4s linear;
    border: solid 2px #00dc82;
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
    background-color: #00dc82;
    color: #fff;
}

.login:hover .icon {
    margin: -2px 0px 2px 4px;
    transform: translateX(6px);
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
</style>
