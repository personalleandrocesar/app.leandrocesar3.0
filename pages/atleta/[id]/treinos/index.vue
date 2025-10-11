<script setup>
import { ref } from "vue";
import { reloadNuxtApp } from "nuxt/app";
const route = useRoute();
const menuFloatCreate = ref(false);
const notific = ref(false);
const content = ref(true);
const exercises = ref([]); // Exercícios da série selecionada


function coachFloatCreate() {
    menuFloatCreate.value = !menuFloatCreate.value;
}

// Estado inicial
const linkFeed = ref(true);
const linkPartner = ref(false);
const feedShow = ref(true);
const treinus = ref([]);
const seriuss = ref([]); // Sériess do treino selecionado
const selectedTraining = ref(null); // Treino selecionado
const selectedSeries = ref(null); // Série selecionada
const setTreino = useCookie("setTreino");
const treinoAtual = ref(setTreino.value); // Carrega treino do cookie
const treino = ref(0)
const coachIdCookie = useCookie('coachId')
const dataTreinuu = await useFetch(`https://api.leandrocesar.com/usersnw/${coachIdCookie.value}/team/${route.params.id}/treinos/${selectedTraining}/${selectedSeries}`)


// Carrega os treinos ao carregar a página
const dataTreino = await useFetch(
  `https://api.leandrocesar.com/usersnw/${coachIdCookie.value}/team/${route.params.id}/treinos`
);

treinus.value = dataTreino.data.value || [];

// Função para carregar as séries do treino
async function loadSeries(training) {
  const dataSerie = await useFetch(
    `https://api.leandrocesar.com/usersnw/${coachIdCookie.value}/team/${route.params.id}/treinos/${training.name}`
  );
  seriuss.value = dataSerie.data.value?.serie || [];
  selectedTraining.value = training.name; // Armazena o treino selecionado
  treinoAtual.value = training.name; // Salva como treino atual
  setTreino.value = training.name; // Atualiza o cookie
}

// Função para carregar os exercícios da série
async function loadExercises(series) {
  const dataExercises = await useFetch(
    `https://api.leandrocesar.com/usersnw/${coachIdCookie.value}/team/${route.params.id}/treinos/${selectedTraining.value}/${series.name}`
  );
  menuFloatCreate.value = true; // Exibe o menu flutuante
  exercises.value = dataExercises.data.value?.exercises || [];
  selectedSeries.value = { name: series.name, exercises: series.set || [] };
  const peoplessss = dataExercises.data.value
  const treinius = peoplessss.set || []
  
  
  console.log(treinius)
  
  const itemExercise = () => {
    return selectedSeries.value.exercises.length
  }
  console.log(selectedSeries.value.exercises.length)
  
  const currentExercise = computed(() => {
    return treinius[treino.value]
  })
  console.log(currentExercise)
  
  const listExercise = () => {
    return treinius
  }
  
  const i = treino.value
  const listExercisee = () => {
    return treinius[i]?.img
  }
  
  const pending = ref(false)
  
  const previousExercise = () => {
    if (treino.value > 0) {
      treino.value--
    }
  }
  
  const nextExercise = () => {
    if (treino.value < treinius.length - 1) {
      treino.value++
    }
  }
}

// No seu script
function selectExercise(index) {
  // Aqui você pode definir qualquer lógica que precisa para selecionar o exercício
  treino.value = index;  // Atualiza o valor de treino
  console.log('Exercício selecionado:', treino.value);
}


// Carrega o último treino selecionado ao entrar na página
if (treinoAtual.value) {
  const lastTraining = treinus.value.find(t => t.name === treinoAtual.value);
  if (lastTraining) {
    loadSeries(lastTraining);
  }
}

function setTrainning() {
  setTreino.value = undefined;
  treinoAtual.value = null;
  reloadNuxtApp({
    path: `/atleta/${route.params.id}`,
    ttl: 100,
  });
}
const view = useCookie('view')
view.value = view.value
const alternateGrid = ref(true)
const alternateList = ref(false)

const buttonList = ref(false);
const buttonGrid = ref(false);
function chooseList() {
  buttonList.value = true,
    buttonGrid.value = false,
    view.value = 'listView',
    alternateGrid.value = false,
    alternateList.value = true
}
function chooseGrid() {
  buttonList.value = false,
    buttonGrid.value = true,
    view.value = 'gridView',
    alternateGrid.value = true,
    alternateList.value = false
}

const selectL = () => {
  if (view.value === 'listView') {
    return true,
      selectG.value = false,
      buttonList.value = true,
      buttonGrid.value = false,
      alternateGrid.value = false,
      alternateList.value = true
  }
}
const selectG = () => {
  if (view.value === 'gridView') {
    return true,
      selectL.value = false,
      buttonList.value = false,
      buttonGrid.value = true,
      alternateGrid.value = true,
      alternateList.value = false
  }
}



</script>

<template>
  <NuxtLayout name="two">
    <div class="main-div-two">
      <h3>
        <Icon name="solar:dumbbell-large-minimalistic-broken" /> TREINOS
      </h3>
    </div>

    <div>
      <div class="main">
        <div class="main-div-tree" v-for="(treino, index) in treinus" :key="index">
          <div
            class="square"
            :class="{ selected: treino.name === treinoAtual }"
            @click="loadSeries(treino)"
          >
            <div>
              <h4>{{ treino.name }}</h4>
            </div>
          </div>
          <Icon name="ic:round-arrow-drop-up" />
        </div>
      </div>

      <div class="info">
        <h5>Escolha um dos treinos acima!</h5>
      </div>

      <div v-if="selectedTraining" class="info">
        <div class="main-div-two">
          <h3>
            <Icon name="solar:dumbbells-broken" /> Séries do treino: {{ selectedTraining }}
          </h3>
        </div>
      </div>

      <div
        v-if="seriuss.length > 0"
        class="main-div-twoo"
        v-for="(qtSeries, index) in seriuss"
        :key="index"
      >
        <div class="squareS" @click="loadExercises(qtSeries)">
          
          <div>
            <h5>{{ qtSeries.name }}</h5>
          </div>
        </div>
      </div>
    </div>

    <div class="float zoom" v-if="menuFloatCreate">
      <div class="menu-float zoomOut">
      <div class='div-tree-onee'>
        <Icon @click="coachFloatCreate"  name='material-symbols:close-rounded' />
      </div>

      <div class="alternate">
        <span @click="chooseGrid" :class="{ alternateGrid : alternateGrid }">
          <Icon name="solar:slider-minimalistic-horizontal-bold" /> Bloco
        </span>
        <span @click="chooseList" :class="{ alternateList: alternateList }">
          <Icon name="mdi:format-list-text" /> Lista
        </span>
        <!-- <span class="light" :class="{ }">
          <Icon name="solar:align-horizonta-spacing-bold" /> Total
        </span> -->
      </div>
      
      
      <div class="main-div-twoo" v-if="alternateList || selectL()">
        <div class='div-tree-one'>
            <h5 v-if='selectedSeries'>
            <Icon name='solar:dumbbells-broken' /> {{selectedSeries.name}}
            </h5>
            <h5>
            {{selectedSeries.exercises.length}} Exercícios
            </h5>
        </div>

      <ul>
        <li v-for="(exercise, index) in selectedSeries?.exercises" :key="index">
          <h3 class='img-exe' >
              <!-- <img src="nome.img" class="miniSquare"  /> {{ exercise.nome }} -->
          </h3>
          <table>
            <tr>
              <th>Série</th>
              <th>Reps</th>
              <th>Carga</th>
              <th>Intervalo</th>
            </tr>
            <tr>
              <td>{{ exercise.sets }}</td>
              <td>{{ exercise.reps }}</td>
              <td>--</td>
              <td>{{ exercise.rest }}</td>
            </tr>
          </table>

          <span  class='col' v-if="exercise.obs">{{ exercise.obs }}</span>
          <span  class='col' v-else>Sem Detalhes</span>
        </li>
      </ul>
      
      </div>
      
      <div class="main-div-treeee" v-else="alternateGrid || selectG()">
        <div  v-if='selectedSeries'>
      <div class='div-tree-one'>
            <h5 v-if='selectedSeries'>
            <Icon name='solar:dumbbells-broken' /> {{selectedSeries.name}}
            </h5>
            <h5>
            {{selectedSeries.exercises.length}} Exercícios
            </h5>
        </div>
        
      <div class='div-tree-one'>
      <ul>
        <li v-for="(id, index) in selectedSeries.exercises" @click="selectExercise(index + 1)">
        <span>
          {{ id.id }}
        </span>          
        </li>
      </ul>
      </div> 
      <div class='div-tree-one'>
      <ul>
        <li v-for="(id, index) in selectedSeries.exercises" >
        <span>
          {{ id }}
        </span>          
        </li>
      </ul>
      </div> 
  
        <!-- <p v-if="pending">Carregando...</p>
        <div v-else>
          <div class="exercise">
            <div class="exercise-square">
              <h4>
                Sets
              </h4>
              <h4>
                {{ currentExercise.sets }}
              </h4>
            </div>
            <div class="exercise-square">
              <h4>
                Reps
              </h4>
              <h4>
                {{ currentExercise.reps }}
              </h4>
            </div>
            <div class="exercise-square">
              <h4>
                <Icon name='mdi:weight' />
              </h4>
              <h4>
                <input class="charge" @input="updateCharge" placeholder="" disabled />
              </h4>
            </div>
            <div class="exercise-square">
              <h4>
                <Icon name='solar:alarm-bold' />
              </h4>
              <h4>
                {{ currentExercise.rest }}
              </h4>
            </div>
          </div>
          <div  v-if='currentExercise.obs' class="obs">
            {{ currentExercise.obs }}
          </div>
          <div  v-else class="obs">
            Sem observações
          </div>
        </div> -->
  
        <!-- <div class="button">
          <span @click="previousExercise">
            <Icon name="mdi:chevron-left" /> ANTERIOR
          </span>
          <span @click="nextExercise">
            PRÓXIMO
            <Icon name="mdi:chevron-right" />
          </span>
        </div> -->
        
      
        </div>
      </div>
      </div> 

    </div>
  </NuxtLayout>
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
      padding: 20px 10px; /* Espaçamento interno */
      text-align: center;
}

.menu-float {
    background: #f1fef9;
    width: 99%; /* Largura fixa */
      height: 95%; /* Altura fixa */
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
    padding: 3px; /* Espaço interno */
    border-radius: 10px 10px 25px 25px; /* Cantos arredondados (opcional) */
    text-align: left; /* Alinha o texto centralizado */
    backdrop-filter: blur(10px); /* Desfoque do fundo */
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* Sombras (opcional) */
      display: flex;
      flex-direction: column;
     
}

.notific-float {
    background: #f1fef9;
        width: 27%; /* Largura */
        height: 8%; /* Altura */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        position: fixed; /* Fixa a div em relação à tela */
        bottom: 2%; /* Posiciona no canto inferior */
        right: 2%; /* Posiciona no canto direito */
        z-index: 9999; /* Garante que esteja acima de todo o conteúdo */
        color: #777;
        padding: 10px; /* Espaço interno */
        border-radius: 10px; /* Cantos arredondados */
        text-align: left; /* Alinha o texto */
        backdrop-filter: blur(20px); /* Desfoque do fundo */
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* Sombras */
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        opacity: 0; /* Invisível no início */
        transform: scale(0.8); /* Começa menor */
        animation: zoomIn 0.5s ease-out forwards; /* Animação de entrada */
}
/* Animação para surgir do fundo */
@keyframes zoomIn {
    to {
        opacity: 1; /* Totalmente visível */
        transform: scale(1); /* Volta ao tamanho original */
    }
}

.notific-float .icon {
    margin: -2px 5px 0 0;
    color: #00d4ff; zoom:1.1 
}

.square {
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.square.selected {
  background-color: #00dc8240; /* Cor de fundo para o treino selecionado */
  border: 2px solid #00dc82; /* Adiciona uma borda para destaque */
}

.square:hover {
  background-color: #e0e0e0;
}

body {
  background: #fff;
  color: #616161;

}


.alternate {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: .5rem 2% 1rem 2%;
  box-shadow: 0 0px 5px #00f2ff10;
  border: solid 1px #00dc8240;
  border-radius: 50px;
  box-shadow: 0 0px 5px #00f2ff10;
  -webkit-backdrop-filter: blur(100px);
  backdrop-filter: blur(100px);
  
}

.alternate span{
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: .8rem 0 .5rem 0;
  width: 100%;  font-size: .8rem;
  border-radius: 50px;
  margin: 2px;
  /* border: solid .2px #00dc8230; */
  
}
.alternate span:hover{
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: .8rem 0 .5rem 0;
  margin: 2px;
  width: 100%;  font-size: .8rem;
  border-radius: 50px;
  background-color: #00dc8250;
  color: #00dc82;
}
.alternate span:nth-child(3):hover{
  background-color: transparent;
  color: #ddd;
  margin: 2px;
}
.dark-mode .alternate span:nth-child(3):hover{
  background-color: transparent;
  color: #777;
  margin: 2px;
}

.alternate span .icon {
  zoom: 1.1;
  margin: -4px 3px 0 0;
}
.alternate span:hover .icon {
  color: #00dc82;
  zoom: 1.1;
}
.dark-mode .alternate span:nth-child(3):hover .icon {
  color: #777;
  zoom: 1.1;
}
.alternate span:nth-child(3):hover .icon {
  color: #ddd;
  zoom: 1.1;
}

.alternateGrid {
  background-color: #00dc8250;
  font-weight: bold;
  color: #00dc82;  
  margin: 2px;
}
.alternateList {
  background-color: #00dc8250;
  font-weight: bold;
  color: #00dc82;  
  margin: 2px;
}

.black {
  border: 1px solid #fadb41;
  text-transform: lowercase;
}


.arrowUp {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.arrowUp .icon {
  color: #00dc8280;
}

.info h5 {
  text-align: center;
  margin-top: 15px;
  font-weight: 700;
}

.main {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  justify-items: center;
  margin: 10px 5% 5px 5%;
}

.conf {
  color: #fff;
  height: 80px;
  background-color: #00dc82;
  backdrop-filter: blur(15px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  backdrop-filter: blur(5px);
  width: 100%;
  margin: 0px 10px;
  border-radius: 8px;
  border: 2px solid #44acb1;
}


.main-div-one {
  overflow-x: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
}

.main-div-one .icon {
  zoom: 1.2;
  color: #00dc82;
}

.main-div-two {
  overflow-x: hidden;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  text-align: left;
  padding:10px;
}

.main-div-two:nth-child(1) {
  overflow-x: hidden;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: left;
  margin: 10px 0 5px 0;
  justify-content: flex-start
}


.main-div-two .icon {
  color: #00dc82;
}
.main-div-two {
  overflow-x: hidden;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  text-align: left;
}

.main-div-two:nth-child(1) {
  overflow-x: hidden;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: left;
  margin: 10px 0 5px 0;
  justify-content: flex-start
}

.main-div-tree div {
  height: max-content;
}

.main-div-two .icon {
  color: #00dc82;
  zoom:.9;
}

.main-div-two h3 {
  font-size: .9rem;
  margin: 20px 5% 10px 5%;
}


/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px transparent;
  border-radius: 3px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 3px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: transparent;
}

.main-div-two h4 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.main-div-two a div {
  border-bottom: 2px solid #00dc8220;
  width: 90%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}


.main-div-two div .icon {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.main {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    overflow-x: auto;
    margin-bottom: -30px;
    /* scrollbar-width: thin;
    scrollbar-color: #0f172a transparent; */
  }
.main-two {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow-x: auto;
    margin-bottom: -30px;
    /* scrollbar-width: thin;
    scrollbar-color: #0f172a transparent; */
  }

  .main-div-tree {
    margin: 10px 5px 20px 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

  .main-div-tree .icon {
    color: #00dc82;
  }

  .main-div-tree .icon {
  color: #00dc82;
}

.main-div-tree H3 {
  margin-left: 20px;
}

.main-div-tree h4 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.main-div-tree a div {
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.main-div-tree h4 .icon {
  margin-left: -3px;
}

.main-div-tree div .icon {
  margin-top: -1px;
  display: flex;  
  flex-direction: row;
  justify-content: center;
  align-items: center;
}


.main-div-four {
  margin-top: .5rem;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
}

.main-div-four H3 {
  margin: 1rem;
  color: var(--color-text);
}

.main-div-four .icon {
  color: #00dc82;
  margin-top: -4px;
}

.main-div-four h4 {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.main-div-four a div {
  margin: auto;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.main-div-four h3 .icon {
  margin-left: 1px;
  zoom: 1.3;
}

.main-div-four div .icon {
  zoom: 1.3;
  margin-top: 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.main-div-twoo {
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: left;
}

.main-div-twoo .icon {
  color: #00dc82;
}   

.main-div-twoo h4 {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #00dc82;
}

.main-div-twoo h5 {
  font-size: .9rem;
}

.main-div-twoo a div {
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.main-div-twoo a div:nth-child(1) {
  border-right: 2px solid #00dc8220;
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.main-div-twoo a div:nth-child(2) h4{
    margin: 30px;
}
.main-div-twoo a div:nth-child(2){
    padding: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.main-div-twoo a div:nth-child(2) div{
    padding: 0px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.main-div-twoo h4 .icon {
  margin-left: -3px;
}

.main-div-twoo div .icon {
  margin-top: -1px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.main-square {
  color: var(--color-text);
  background-color: #00dc8210;
  backdrop-filter: blur(5px);
  overflow-x: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 0rem 1.5rem;
  border-radius: 10px;
  border: .1px solid #00dc8210;
  line-height: 1.4;
  transition: all .4s;
  border: 2px solid #00dc8210;
}

.main-square:hover {
  background-color: #00dc8230;
  border-right: 1px solid #00dc8230;
    border: 2px solid #00dc8220;
    border-top: 2px solid #00dc8240;
    border-bottom: 2px solid #00dc8240;
}

.squareRes {
  backdrop-filter: blur(5px);
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 80px;
  margin: 1.5rem;
  border-radius: 8px;
  overflow-x: hidden;
  background-color: #00dc8230;
  line-height: 1.2;
}



.square {
  background-color: #00dc8210;
  backdrop-filter: blur(5px);
  overflow-x: auto;
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100px;    
  border-radius: 8px;
  border: 2px solid #00dc8210;
  overflow-x: hidden;
}
.squareS {
    background-color: #00dc8210;
    backdrop-filter: blur(5px);
    overflow-x: auto;
    display: flex;
    flex-direction: row;
    height: 60px;
    justify-content: center;
    align-items: center;
    margin: 3px 1.5rem;
    border-radius: 8px;
    border: .1px solid #00dc8220;
    line-height: 1.4;
    transition: all .4s;
    border: 2px solid #00dc8210;
}

.squareS div h4 .icon {
  margin-top: -1px;
}

.squareS:nth-child(2) {
  margin-top: 10px;
}

.squareS:hover {
  background-color: #00dc8230;

  border-top: 2px solid #00dc8240;
  border-bottom: 2px solid #00dc8240;

}

.squareS div:nth-child(1) {
  padding-right: 12px;

}

.squareS div:nth-child(2),
.squareS div:nth-child(3) {
  margin: auto;
  border: none;
}

.squared {
  background-color: #00dc8230;
  border: 2px solid #00dc8220;
  border-top: 2px solid #00dc8240;
  border-bottom: 2px solid #00dc8240;
}


.square div:nth-child(2),
.square div:nth-child(3) {
  margin: auto;
  border: none;
}


.conf {
  height: 80px;
  backdrop-filter: blur(15px);
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 32.5%;
  margin: 1rem auto 0 auto;
  border-radius: 8px;
  background-color: #00dc8210;
  border: .1px solid #00dc8210;
}
.conf:nth-child(1){
  margin: 1rem 2px 0 5%;
}

.conf:nth-child(3){
  margin: 1rem 5% 0 2px;
}


.conf h3{
    font-size: .88rem;
}


table {
    border-radius: 10px;
    border: none;
    
}

table tr th, table tr td {
    border: none;
}
table tr th {
    border: none;
    background-color: #00dc8240;
}
th, td {
  border: 1px solid #00dc82;
  padding: 8px;
  text-align: left;
}

.main-div-twoo ul{
  position: relative;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 0px 1.2%;
}

.col {
    font-size: .8rem;
}

.miniSquare {
  height: 80px;
  width: auto;
  max-width: 80px;
  color:#555;
  background-color: #fff;
  backdrop-filter: blur(5px);
  overflow-x: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-radius: 8px;
  align-items: center;
  margin: 5px;
  border: 2px solid #00dc8210; 
  cursor: zoom-in;
  
}

ul {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 0;
  margin: 10px 0 ;
  font-weight: bold;
}

.main-div-twoo ul li {
  border: solid .1px #00dc8280;
  padding: 0px 8px;
  border-radius: 6px;
  margin: 3px 0 ;
  margin: 5px 0rem;
  background-color: #00dc8210;
  border: solid .2px #00dc8210;
}
.main-div-twoo ul li {
  border-radius: 12px;
  padding: 0px;
  
}
.main-div-twoo {
  margin: 0 .1rem ;
}

.title {
  margin: .0rem 0 0 3%;
}

.main-div-twoo h3 .icon {
  zoom: 1.2;
}


.main-div-twoo ul li:nth-child(2n -1) {
  background-color: #00dc8220;
}

.main-div-twoo {
  position: relative;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 0px;
  margin-bottom: 10px;
}

.main-div-twoo ul{
  position: relative;
  overflow-x: auto;
  scrollbar-width: thin; /* Firefox: deixa a barra fina */
  scrollbar-color: #eee transparent; /* Firefox: cor invisível */
  border-radius: 10px 10px 25px 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 0px 1.2%;
}

.main-div-twoo .icon{
  cursor: pointer;
}
.main-div-twoo h2{
  margin-left: 10px;
}
.main-div-twoo h3{
  color: #00dc82;
}
.img-exe{
  color: #00dc82;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  background-color: #00dc8240;
    border-radius: 10px 10px 0 0;
}

.img-exe img {
  margin-left: 10px;
    height: 45px;
    margin-right: 15px;
    border-radius: 10px;
    border: solid 2px #00dc82;
}

.col {
    border-radius: 0 0 8px 8px;
    border: none;display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    padding: 5px 5px 5px 10px;
    justify-content: center;
}

table {
    border-radius: 10px;
    border: none;
    
}

table tr th, table tr td {
    border: none;
}
table tr th {
    border: none;
    background-color: #00dc8240;
}
th, td {
  border: 1px solid #00dc82;
  padding: 8px;
  text-align: left;
}


.col {
    font-size: .8rem;
}
.div-tree-onee {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 0px 2px;
  zoom:1.3;
}
.div-tree-one {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.div-tree-one .icon {
    margin: 0 3px
}
.div-tree-one h5 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 10px; 
}
.main-div-treeee ul {
  overflow-x: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.main-div-treeee ul li {
  overflow-x: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  cursor: pointer;
  margin-right: 102px;
}
.main-div-treeee {
  position: relative;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.main-div-treeee ul li {
  border: solid .1px #00dc8280;
  padding: .5px 6px;
  border-radius: 6px;
  margin: 0px 0rem;
  background-color: #00dc8220;
  border: solid .2px #00dc8210;
}

.main-div-treeee ul li:nth-child(2n -1) {
  background-color: #00dc8260;
}
.main-div-treeee .icon{   
  cursor: pointer;
}
.main-div-treeee h2{
  margin-left: 1.5rem;
}
.main-div-treeee h3{
  margin-left: 1.5rem;
  color: #00dc82;
  font-size: 1.2rem;
}
.main-div-treeee h5{
  font-size: .9rem;
}
.main-div-treeee .icon{
    color: #00dc82;
}

</style>
