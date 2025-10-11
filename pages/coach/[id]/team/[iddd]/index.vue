<script setup>
import { ref } from 'vue';
import { reloadNuxtApp } from "nuxt/app";
const route = useRoute();


const Users = await useFetch(`https://api.leandrocesar.com/usersnw/${route.params.id}/team/${route.params.iddd}`);
const item = Users.data.value;

console.log(Users.data.value)
console.log(item)

const subscriberOk = ref(false)

const add = ref(true)
function addClient() {
    add.value = !add.value
}

async function submitDelete() {
  error.value = null;
  success.value = null;

  try {
    const { data, error: fetchError } = await useFetch(`/usersnw/${route.params.id}/team/${route.params.iddd}}`, {
      method: 'DELETE',
    });

    if (fetchError.value) {
      error.value = fetchError.value.message || 'Erro ao tentar deletar o atleta.';
      return;
    }

    success.value = 'Atleta removido com sucesso.';
  } catch (err) {
    error.value = 'Erro ao conectar ao servidor.';
    console.error(err);
  }
}


const reg = route.params.id
const logon = useCookie('logon')
// const logon = useCookie('logon', { maxAge: 4800})
logon.value = reg

const dataConf = await useFetch(`https://api.leandrocesar.com/usersnw/${route.params.id}/team/${route.params.iddd}`);
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

useHead({
    titleTemplate: ` | Clientes | NEX_WOD`,
})
</script>
<template>
    <div v-if="subscriberOk" class="subscriberOk top">
        <div>
            Usuário deletado com Sucesso!
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
                    <div class="reward-update">
                        <Icon name='material-symbols:person-edit' />
                    </div>
                    <div class="reward-delete" @click="deleteUser">
                        <Icon name='material-symbols:person-off-rounded' />
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
                    <div class="update-button">
                        <Icon name='material-symbols:person-edit' /> Atualizar
                    </div>
                    <div class="delete-button" @click="submitDelete">
                        <Icon name='material-symbols:person-off-rounded' /> Deletar
                    </div>
                </div>
            </div>
            <div class="head-logo" id="sobre">
            <div class='logo'>
                <img @click="openPhoto()" :src="dataConf.data.value?.foto">
                <div class="name">
                    {{ dataConf.data.value?.name }} {{ dataConf.data.value?.lastName }}
                    <div class="email">{{ dataConf.data.value?.email }}</div>
                </div>
            </div>
            <div v-if="photoOpen" class="nav-bar">
                <div class='logo-nav-bar'>
                    <img @click="openPhoto" :src="dataConf.data.value?.foto">
                </div>
            </div>
        </div>
        <div>
            <p v-if="dataConf.data.value?.service" class="section-subtitle-two">Serviço: 
            {{ dataConf.data.value?.service }} | Objetivo - {{ dataConf.data.value?.target }}
        </p>
        
            <p v-if="status === 1" class="section-option pending">
                <Icon name="solar:danger-square-outline" /> Pendente!
            </p>
            <p v-else-if="status === 0" class="section-option bloqued">
                <Icon name="solar:close-square-outline" /> Bloqueado!
            </p>
            <p v-else class="section-option verified">
                <Icon name="solar:check-square-outline" /> Verificado!
            </p>
            
            <!-- 
                0 É INATIVO = BLOAQUEADO
                1 É ATIVO = PENDENTE
                2 É ATIVO = VERIFICADO - OK
            -->

            <div class="conf">
                <NuxtLink class="menu-square">
                    <div>
                        <div>
                            <p>
                                <Icon name="solar:dumbbell-large-bold" />
                                Treino
                            </p>
                        </div>
                        <div>
                            Atual: {{ start }}
                        </div>
                        <div> 
                            Próximo: {{ dataConf.data.value?.treinoNext }}
                        </div>
                    </div>
                </NuxtLink>
                <NuxtLink class="menu-square">
                    <div>
                        <div>
                            <p>
                                <Icon name="solar:clipboard-heart-bold" />
                                Avaliação
                            </p>
                        </div>
                        <div>
                            Atual: {{ dataConf.data.value?.valuationActual }}
                        </div>
                        <div>
                            Próxima: {{ dataConf.data.value?.valuationNext }}
                        </div>
                    </div>
                </NuxtLink>
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
    .none {
        display: none;
    }
}

@media (max-width: 1020px) {

    .nav-users .actions,
    .actions-user .update-button,
    .actions-user .delete-button {
        display: none;
    }

    .nav-users .reward {
        display: inherit;
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
    border-bottom: .10px solid #00dc8240;
    backdrop-filter: blur(45px);
    border-bottom: solid 1px #00dc8240;
    border-right: solid 1px #00dc8240;
}

.subscriberOk {
    background-color: #ff190080;
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
        font-weight: bolder;
        border-bottom: .10px solid #00dc8240;
        backdrop-filter: blur(45px);
        border-bottom: solid 1px #00dc8240;
        border-right: solid 1px #00dc8240;
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
.actions-user {
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

.reward {
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: flex-start;
    justify-content: space-between;
    align-content: baseline;
    margin: 0;
    overflow-x: auto;
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

.reward-user {
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    align-content: baseline;
    margin: 0;
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
    border: solid 1px #00dc8210;
    box-shadow: 0 0px 5px #00dc8240;
    backdrop-filter: blur(100px)
}

.head-logo {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: flex-start;
    z-index: 1;
    flex-wrap: wrap;
}

.icon {
    zoom: .9;
}

.logo {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    margin: 1.5rem;
    border-radius: 7px;
    z-index: 10;

}

.logo img {
    width: 80px;
    margin: -1px 0 0 -1px;
    border-radius: 18px;
    z-index: 100;
    border: #00dc82 0px solid;
    opacity: 1;
    background: linear-gradient(to bottom right, #00dc82 0%, #00dc8280 50%, #00f2ff 100%);
    padding: 3px;

}

.nav-bar {
    z-index: 200;
    transform: translateX(0%);
    position: fixed;
    height: calc(100% - 0px);
    bottom: 0px;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
}
h1
.logo-nav-bar {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    transform: translateX(0%);
    position: fixed;
    bottom: 0px;
    height: calc(100% - 0px);
    width: 100%;
    background: linear-gradient(to bottom right, #00dc8280 0%, #00dc8280 50%, #00dc82 100%);
    backdrop-filter: blur(5px);
    z-index: 1004;

}

.logo-nav-bar img {
    width: 300px;
    border-radius: 18px;
    border: #00dc82 0px solid;
    opacity: 1;
    z-index: 100;

}

.button-client {
    margin: 1.2rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    zoom: 1.3;
}

.button-client .icon {
    zoom: .9;
    margin-right: -3px;
}


.head-name {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
}


.name {
    font-size: 1.6rem;
    line-height: 1.5rem;
    margin: .2rem 1.5rem;
    font-weight: 700;
    letter-spacing: 1.5px;
    color: #00dc82;

}

.email {
    font-size: .8rem;
    line-height: 1.5rem;
    margin: .1rem .2rem;
    font-weight: 700;
    letter-spacing: 1.1px;

}


.body-timeline {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    text-align: left;
    margin: 2rem 10px 120px 10px;
}

.main-logo {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    width: 100px;
    box-shadow: 1px 7px 20px #00dc82;
    margin: 1.5rem;
    border-radius: 7px;
}

.main-logo img {
    width: 100px;
    border-radius: 7px;
    border: #00dc82 2px solid;
    opacity: 1;

}

.body-timeline p {
    text-align: left;
    margin: 0 10px 20px 20px;
}

.link {
    text-decoration: underline;
}

.link:hover {
    color: #00dc82;
}

.section-title {
    text-align: left;
    margin: 10px 1.5rem;
    font-weight: 800;
}

.section-subtitle {
    text-align: left;
    margin: .5rem 1.5rem 15px;
    font-weight: 800;
    font-size: .9em;
}

.section-subtitle-two {
    text-align: left;
    margin: -16px 1.5rem 15px;
    font-weight: 800;
    font-size: .9em;
}

.section-option {
    text-align: left;
    margin: -10px 1.5rem 15px;
    font-size: .8em;
    font-weight: 800;
}

.section-option .icon {
    zoom: .8;
    margin-top: -3px;
}

.verified {
    color: green;
}

.pending {
    color: #e1a918;
}

.bloqued {
    color: #b30000;
}


.conf {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 20px;
}

.menu-square {
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-weight: 800;
    width: 49.6%;
    padding: 5px;
    border-radius: 8px;
    margin: 1px auto;
    border: solid .1px #00dc8250;
}

.menu-square div .icon {
    margin: 3px 0px;
    transition: transform .3s linear;
    transform: translateX(-10px);
}

.menu-square div {
    display: flex;
    flex-direction: column;
    font-size: 1em;
    justify-content: center;
    margin: 2px auto;
}

.menu-square div:nth-child(2) {
    display: flex;
    flex-direction: column;
    font-size: .7em;
    justify-content: center;
    margin: 2px auto;
}

.menu-square div:nth-child(3) {
    display: flex;
    flex-direction: column;
    font-size: .7em;
    justify-content: center;
    margin: 2px auto;
    color: #002aff;
}

.menu-button {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-weight: 800;
    width: 100%;
    padding: 6px 2px 2px 2px;
    margin: 5px auto;
    border: solid 1px #00dc8210;
    border-bottom: solid .1px #00dc8240;
    border-top: solid .2px transparent;
}

.menu-button div {
    display: flex;
    flex-direction: row;
    font-size: .8em;
    justify-content: space-between;
    margin-top: 2px;
}

.menu-button .icon {
    margin: -2px 0px 0px 26px;
    transition: transform .3s linear;
    transform: translateX(-15px);
}

.menu-button .icon:nth-child(2) {
    margin: 5px 0px 0px 26px;
    transition: transform .3s linear;
    transform: translateX(-25px);
}

.menu-button:hover {
    cursor: pointer;
    border-bottom: solid .2px #00dc82;
    background-color: #00dc8210;
}


.menu-button:hover .icon:nth-child(2) {
    transform: translateX(-15px);
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