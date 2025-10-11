<script>
export default {
    mounted() {
        const inputField = document.getElementById('inputField');
        const dropdownList = document.getElementById('dropdownList');

        // Simular dados do banco de dados (substitua com seus próprios dados)
        const databaseData = ['Extensora', 'Puxada p/ frente', 'Desenvolvimento de ombros (AP)',
            'Supino maquina',];
        // const databaseData = ['Apple', 'Banana', 'Orange', 'Pineapple', 'Grape', 'Strawberry'];

        // Função para filtrar e exibir os itens da lista suspensa
        function filterDropdownList() {
            const searchText = inputField.value.toLowerCase(); // Texto digitado no campo de entrada, em minúsculas
            const filteredData = databaseData.filter(item => item.toLowerCase().includes(searchText)); // Filtrar os dados com base no texto digitado
            dropdownList.innerHTML = ''; // Limpar a lista suspensa
            filteredData.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
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
const UsersTrainnig = await useFetch(`https://api.leandrocesar.com/users/${route.params.id}/treino`);
const item = Users.data.value;

const treinos = ref('')

console.log(item);

const subscriberOk = ref(false)

const add = ref(true)
function addClient() {
    add.value = !add.value
}

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
    { exercicio: 'Extensora' },
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
        { id: '', num: '', nome: '', sets: '', reps: '', rest: '', grupo: '', obs: '', photo: '', img: `` }

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
            Série Atualizada!
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
                </div>
            </div>
            <h1>
                Treinos
            </h1>
            <h1>Enviar Treino</h1>

            <h5>{{ Users.data.value.treinos }}</h5>

            <br>
            <br>
            <br>
            <form @submit.prevent="submitTreino">
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
                            <td><input type="text" v-model="item.photo"></td>
                            <input type="hidden" :value="item.img = `https://nexwod.app/exe/${item.photo}.gif`"
                                readonly>
                            <button v-if="index > 0" @click="moveItemUp(index)">Subir</button>
                            <button v-if="index < items.length - 1" @click="moveItemDown(index)">Descer</button>
                            <button class="add-client" type="button" @click="deleteItem(index)">X</button>
                        </tr>
                    </tbody>
                </table>
                <div class="buttons">

                    <button class="add-client" type="button" @keyup.enter="addItem" @click="addItem">Add Item</button>
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
    border-radius: 3px;
    font-weight: bolder;
    padding: 8px 0px;
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
form {

    padding: 0;
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

.update-button {
    border: solid 1px #fadb4080;
    background-color: #fadb4080;
    padding: 5px 5px;
    margin: 9px 4px;
    border-radius: 8px;
    transition: all .3s linear;
    cursor: pointer;
}

.update-button:hover {
    border: solid 1px #fadb40;
    padding: 5px 5px;
    border-radius: 8px;
    color: #000;
    background-color: #fadb40;
}

.delete-button {
    border: solid 1px #ff190080;
    background-color: #ff190080;
    padding: 5px 5px;
    margin: 9px 4px;
    border-radius: 8px;
    transition: all .3s linear;
    cursor: pointer;
}

.delete-button:hover {
    border: solid 1px #ff1900;
    padding: 5px 5px;
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
