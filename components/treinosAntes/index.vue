<script>
export default {
    mounted() {
        const inputField = document.getElementById('inputField');
        const dropdownList = document.getElementById('dropdownList');
        const otherInput = document.getElementById('otherInput'); // Novo campo de entrada para outras informações

        // Simular dados do banco de dados (substitua com seus próprios dados)
        const databaseData = [
            { name: 'Extensora', otherInfo: 'extensora' },
            { name: 'Puxada p/ frente', otherInfo: 'Informação adicional para Puxada p/ frente' },
            { name: 'Desenvolvimento de ombros (AP)', otherInfo: 'Informação adicional para Desenvolvimento de ombros (AP)' },
            { name: 'Supino maquina', otherInfo: 'Informação adicional para Supino maquina' },
        ];

        // Função para filtrar e exibir os itens da lista suspensa
        function filterDropdownList() {
            const searchText = inputField.value.toLowerCase(); // Texto digitado no campo de entrada, em minúsculas
            const filteredData = databaseData.filter(item => item.name.toLowerCase().includes(searchText)); // Filtrar os dados com base no texto digitado
            dropdownList.innerHTML = ''; // Limpar a lista suspensa
            filteredData.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item.name;
                li.dataset.otherInfo = item.otherInfo; // Armazenar a informação adicional no atributo data
                dropdownList.appendChild(li);
            });
            if (searchText) {
                dropdownList.style.display = 'block'; // Exibir a lista suspensa se houver texto digitado
            } else {
                dropdownList.style.display = 'none'; // Esconder a lista suspensa se não houver texto digitado
            }
        }

        // Evento de digitação no campo de entrada
        inputField.addEventListener('input', filterDropdownList);

        // Evento de clique em um item da lista suspensa
        dropdownList.addEventListener('click', function (e) {
            if (e.target.tagName === 'LI') {
                inputField.value = e.target.textContent; // Adicionar texto ao campo de entrada
                otherInput.value = e.target.dataset.otherInfo; // Adicionar informação adicional ao outro campo de entrada
                dropdownList.style.display = 'none'; // Esconder a lista suspensa
            }
        });

        // Evento de clique fora do campo de entrada
        document.addEventListener('click', function (e) {
            if (!e.target.matches('#inputField') && !e.target.matches('#dropdownList')) {
                dropdownList.style.display = 'none'; // Esconder a lista suspensa
            }
        });
    }
}

</script>

<script setup>
import { ref } from 'vue';
import { reloadNuxtApp } from "nuxt/app";
useHead({
    titleTemplate: 'Clientes | NEX_WOD',
});

const route = useRoute();
const Users = await useFetch(`https://api.leandrocesar.com/users/${route.params.id}`);
const UsersTrainnig = await useFetch(`https://api.leandrocesar.com/users/${route.params.id}/treinos/${route.params.idd}`);
const item = Users.data.value;


const qtTreino = UsersTrainnig.data.value.name
const qtTreinos = UsersTrainnig.data.value.serie

const treinos = ref('')

console.log(UsersTrainnig.data.value.name);

const subscriberOk = ref(false)

const add = ref(true)
function addClient() {
    add.value = !add.value
}

async function submitTreino() {
    try {
        const response = await fetch(`https://api.leandrocesar.com/user/${route.params.id}/treinos/${route.params.idd}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: ss.value, 
                treino: items.value
            }),
        });
        localStorage.setItem('item', JSON.stringify(items.value));
        if (response.ok) {
            console.log('Data delete successfully');
            subscriberOk.value = true;
            setTimeout(() => {
                subscriberOk.value = false;
                reloadNuxtApp({
                    path: `/admin/clientes/${item.username}/treinos`,
                    ttl: 1000, // default 10000
                });
            }, 1000);
        } else {
            console.error('Failed to delete data');
        }
    } catch (error) {
        console.error('Error delete data:', error);
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


const exe = ref([
    { exercicio: 'Extensora'},
    { exercicio: 'Puxada p/ frente' },
    { exercicio: 'Remada na polia baixa' },
    { exercicio: 'Desenvolvimento de ombros (AP)' },
    { exercicio: 'Supino maquina' },
    { exercicio: 'Tríceps mergulho no graviton' },
    { exercicio: 'Remada no aparelho' },
    { exercicio: 'Rabdominal Infra' },
    { exercicio: 'abdominal Infra na Paralela' },
    { exercicio: 'Abdominal Máquina' },
    { exercicio: 'Abdominal Oblíquo no solo' },
    { exercicio: 'Abdominal Remador completo' },
    { exercicio: 'Abdominal supra' },
    { exercicio: 'Abdução de quadril na polia baixa' },
    { exercicio: 'Cadeira Abdutora' },
    { exercicio: 'Cadeira adutora' },
    { exercicio: 'Agachament Lunge' },
    { exercicio: 'Desenvolvimemto Arnold' },
    { exercicio: 'Back Squat' },
    { exercicio: 'Bíceps Aparelho' },
    { exercicio: 'Bíceps em pé(HBM)' },
    { exercicio: 'Bíceps Invertido (HBW)' },
    { exercicio: 'Bíceps Martelo' },
    { exercicio: 'Bíceps Sentado' },
    { exercicio: 'Agachamento Búlgaro' },
    { exercicio: 'Extensão de tronco (Cadeira Romana)' },
    { exercicio: 'Crucifixo Inverso (Ap)' },
    { exercicio: 'Crucifixo Inverso (HBC)' },
    { exercicio: 'Crucifixo Peitoral Reto (HBC)' },
    { exercicio: 'Desenvolvimento de Ombros (HBC)' },
    { exercicio: 'Desenvolvimento de Ombros (AP)' },
    { exercicio: 'Desenvolvimento de Ombros (alternando)' },
    { exercicio: 'Duck Walk' },
    { exercicio: 'Dumbbel Lunge' },
    { exercicio: 'Flexão de Ombros (HBC)' },
    { exercicio: '' },
    { exercicio: '' },
    { exercicio: '' },
    { exercicio: '' },
    { exercicio: '' },
    { exercicio: '' },
    { exercicio: '' },
    { exercicio: '' },
    { exercicio: '' },
    { exercicio: '' },
    { exercicio: '' },
    { exercicio: '' },
    { exercicio: '' },
    { exercicio: '' },
    { exercicio: '' },
    { exercicio: '' },
    { exercicio: '' },
    { exercicio: '' },
    { exercicio: '' },
    { exercicio: '' },
    { exercicio: '' },
    { exercicio: '' },
    { exercicio: '' },
    { exercicio: '' },
    { exercicio: '' },
    { exercicio: '' },
    { exercicio: '' },
    { exercicio: '' },
    { exercicio: '' },
    { exercicio: '' },
])

const ss = ref('');


const items = ref([
    
    { id: '', num: '', nome: '', sets: '', reps: '', rest: '', grupo: '', obs: '', photo: '', img: 'https://m.leandrocesar.com/exe/${item.photo}.gif`' }

]);

function addItem() {
    items.value.push({ id: '', num: '', nome: '', sets: '', reps: '', rest: '', grupo: '', obs: '', photo: '', img: '' });
}


function deleteItem(index) {
    items.value.splice(index, 1);
}

function clear() {
    items.value = ([
        {  id: '', num: '', nome: '', sets: '', reps: '', rest: '', grupo: '', obs: '', photo: '', img: `` }

    ])
}


onMounted(() => {
    const storedItems = JSON.parse(localStorage.getItem('item'));
    if (storedItems) {
        items.value = storedItems;
    }
});



onUpdated(() => {
    localStorage.setItem('item', JSON.stringify(items.value));
})

function moveItemUp(index) {
    if (index <= 0) return;
    const item = items.value[index];
    items.value.splice(index, 1);
    items.value.splice(index - 1, 0, item);
}

function moveItemDown(index) {
    if (index >= items.value.length - 1) return;
    const item = items.value[index];
    items.value.splice(index, 1);
    items.value.splice(index + 1, 0, item);
}


</script>
<template>
    <div v-if="subscriberOk" class="subscriberOk top">
        <div>
            Treino criado com Sucesso!
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


            <h1 v-for="(qtTreinos, index) in qtTreinos" :key="index">
                <span @click="navigateTo(`/admin/clientes/${item.username}/treino/${qtTreino}/${qtTreinos.name}`)">

                    {{ qtTreinos.name }}

                </span>
            </h1>

            <br>
            <br>
            <br>
            <form @submit.prevent="submitTreino">
                <td> <input type="text" v-model="ss"></td>
                <table>
                    <thead>
                        <th></th>
                        <th>Exercício</th>
                        <th>Sets</th>
                        <th>Reps</th>
                        <th>Intervalo</th>
                        <th>Observações</th>
                        <th>Imagem</th>
                        <th>Deletar?</th>
                    </thead>
                    <tbody>



                        <tr v-for="(item, index) in items" :key="index">

                            <input type="hidden" :value.v-model="item.id = index + 1" readonly>{{ item.id }}
                            <input type="hidden"
                                :value.v-model="item.num = 'Exercício ' + (index < 9 ? '' + (index + 1) : (index + 1))">
                            <td>
                                <input type="text" v-model="item.nome" id="inputField">
                                <ul id="dropdownList" class="list-susp"></ul>
                            </td>
                            <td><input type="number" v-model="item.sets"></td>
                            <td> <input type="text" v-model="item.reps"></td>
                            <td> <input type="text" v-model="item.rest"></td>
                            <td><textarea id="story" name="story" rows="2" cols="20" v-model="item.obs"></textarea></td>
                            <td><input type="text" v-model="item.photo" id='otherInput'></td>
                            <input type="hidden" :value="item.img = `https://nexwod.app/exe/${item.photo}.gif`"
                                readonly>
                            <button v-if="index > 0" @click="moveItemUp(index)">Subir</button>
                            <button v-if="index < items.length - 1" @click="moveItemDown(index)">Descer</button>
                            <button class="add-client" type="button" @click="deleteItem(index)">X</button>
                        </tr>
                    </tbody>
                </table>
                <div class="buttons">

                    <button class="add-client" type="button" @click="addItem">Add Item</button>
                    <br>
                    <br>
                    <button class="input" type="submit">Submit</button>

                </div>

            </form>

            <button class="input" type="button" @keyup.delete="clear" @click="clear">Resetar</button>








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

.subscriberOk {
    background-color: #8d00ab;
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


.main-div-two {
    overflow-x: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 0px 0 0 0;
    align-items: left;
    flex-wrap: wrap;
}

.main-div-two span {
    overflow-x: auto;
    width: 49.9%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 0px 0 0 0;
    align-items: left;
}

.main-div-two .icon {
    color: #8d00ab;
}

.square {
    background-color: #8d00ab10;
    backdrop-filter: blur(5px);
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    margin: 2px 4px 4px 0px;
    border-radius: 8px;
    border: .1px solid #8d00ab20;
    line-height: 1.4;
    transition: all .4s;
    border: 2px solid #8d00ab10;
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
    background-color: #8d00ab30;

    border-top: 2px solid #8d00ab40;
    border-bottom: 2px solid #8d00ab40;

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
    color: #8d00ab;
}

.main-div-two h5 {
    font-size: .9rem;
}

.main-div-two a div {
    border-bottom: 2px solid #8d00ab20;
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
