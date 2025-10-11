<script setup>
import { ref, computed, watch } from 'vue'
const layout = 'duo'

const route = useRoute()
const coachIdCookie = useCookie('coachId')
const dataTreino = await useFetch(`https://api.leandrocesar.com/usersnw/${coachIdCookie.value}/team/${route.params.id}/treinos/${route.params.idd}/${route.params.iddd}`)
const peoplesss = dataTreino.data.value
const treinus = peoplesss.set ||[]
const treino = ref(0)

console.log(treinus)

const { selectedColor, selectedClass, classColors, resetColorToDefault } = usePlayerColor()

const setTreino = useCookie('setTreino')

const currentExercise = computed(() => {
  return treinus[treino.value]
})
console.log(currentExercise)

const exerciseImg = ref(false);

function openExercise() {
  exerciseImg.value = !exerciseImg.value;
}


const itemExercise = () => {
  return treinus.length
}

const listExercise = () => {
  return treinus
}

const i = treino.value
const listExercisee = () => {
  return treinus[i]?.img
}

const pending = ref(false)

const previousExercise = () => {
  if (treino.value > 0) {
    treino.value--
  }
}

const nextExercise = () => {
  if (treino.value < treinus.length - 1) {
    treino.value++
  }
}

const view = ref('gridView')
// const view = useCookie('view')
// view.value = view.value
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


console.log(currentExercise)

// Estado reativo
const isImageVisible = ref(false); // Estado da imagem em destaque
const selectedExercise = ref({}); // Exercício atual selecionado

// Função para exibir os detalhes do exercício
function showExerciseDetails(exercise) {
  selectedExercise.value = exercise; // Define o exercício atual
  isImageVisible.value = true; // Mostra a imagem em destaque
}

// Função para ocultar os detalhes do exercício
function hideExerciseDetails() {
  isImageVisible.value = false; // Oculta a imagem em destaque
}



</script>

<template>
  <NuxtLayout :name="layout">

     <!-- <div class="alternate">
      <span @click="chooseList" :class="{ alternateList: alternateList }">
        <Icon name="mdi:format-list-text" /> Lista
      </span>
      <span @click="chooseGrid" :class="{ alternateGrid : alternateGrid }">
        <Icon name="solar:slider-minimalistic-horizontal-bold" /> Bloco
      </span>
       <span class="light" :class="{ }">
        <Icon name="solar:align-horizonta-spacing-bold" /> Total
      </span> 
    </div>  -->
    
    <div class="main-div-tree" v-if="buttonGrid || selectG()">
    <div class='div-tree-one'>
      <h5>
        {{ currentExercise.id }} - {{ itemExercise() }} Exercícios
      </h5>
      <h5>
        <Icon name='solar:dumbbell-bold' /> {{route.params.iddd}}
      </h5>
    </div> 
      <ul>
        <li v-for="id in itemExercise()" @click='itemExercise((treino = id - 1))' :class="{ active: id === currentExercise.id }" >
          {{ id }}
        </li>
      </ul>
      <img :src="currentExercise.img" class="square" @click="openExercise" />
      <h2>
        {{ currentExercise.nome }}
        <br>
      </h2>

      <div v-if="exerciseImg" class="nav-bar-photo" @click="openExercise">
        <div class="nav-top">
          <div class="nav-flow-photo">
            <div class="div-img-full">
              <img :src="currentExercise.img" />
            </div>
          </div>
        </div>
      </div>

      <p v-if="pending">Carregando...</p>
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
            <!-- <h4>
              <input class="charge" @input="updateCharge" placeholder="" disabled />
            </h4> -->
            <h4>
            --
            </h4>
          </div>
          <div class="exercise-square">
            <h4>
              <Icon name='solar:alarm-bold' />
            </h4>
            <h4 v-if='currentExercise.time'>
              {{ currentExercise.time }}
            </h4>
            <h4 v-else>
                --
            </h4>
          </div>
        </div>
        <div  v-if='currentExercise.obs' class="obs">
          {{ currentExercise.obs }}
        </div>
        <div  v-else class="obs">
          Sem observações
        </div>
      </div>

      <div class="button">
        <span @click="previousExercise">
          <Icon name="mdi:chevron-left" /> ANTERIOR
        </span>
        <span @click="nextExercise">
          PRÓXIMO
          <Icon name="mdi:chevron-right" />
        </span>
      </div>
      <br>
      <!-- <div class="cron">
        <div>
            <span v-if='startCounter = true'>
                <Icon name='solar:play-bold'  @click="startCounter" />
            </span>   
            <span v-else>
                <Icon name='solar:pause-bold'  @click="pauseCounter" />
            </span>    
            <span>
                <Icon name='solar:stop-bold'  @click="resetCounter" />
            </span>    
        </div>
      </div>
      <div class="counter">
          -{{ counter }}-
      </div> -->
    </div>

    
<!-- <div class="main-div-twoo" v-else="buttonList || selectL()">
      <h3 class="title">
        {{ itemExercise() }} Exercícios 
        <span>
          <Icon name='solar:dumbbell-bold' /> {{route.params.iddd}}
       </span>
      </h3>
      
      <ul class="exercise-list">
        <li v-for="(exercise, index) in listExercise()" :key="index" class="exercise-item">
          <h3 class="exercise-header">
            <img :src="exercise.img" class="miniSquare" @click="showExerciseDetails(exercise)" />
            <span>{{ exercise.nome }}</span>
          </h3>
          <table class="exercise-table">
            <thead>
              <tr>
                <th>Série</th>
                <th>Reps</th>
                <th>Carga</th>
                <th>Intervalo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ exercise.sets }}</td>
                <td>{{ exercise.reps }}</td>
                <td>--</td>
                <td>{{ exercise.time }}</td>
              </tr>
            </tbody>
          </table>
          <span  class='col' v-if="exercise.obs">{{ exercise.obs }}</span>
          <span  class='col' v-else>Sem detalhes</span>
        </li>
      </ul>
      

    </div> -->
      <div v-if="isImageVisible" class="nav-bar-photo" @click="hideExerciseDetails">
        <div class="nav-top">
          <div class="nav-flow-photo">
            <div class="div-img-full">
              <img :src="selectedExercise.img" :alt="selectedExercise.nome" @click="hideExerciseDetails"/>
            </div>
          </div>
        </div>
      </div>
    <!-- <div v-if="isImageVisible" class="modal" @click="hideExerciseDetails">
      <div class="modal-content" @click.stop>
        <img :src="selectedExercise.img" :alt="selectedExercise.nome" @click="hideExerciseDetails"/>
       
      </div>
    </div> -->

    <!-- Série em Bloco -->
    
    <br>
    <br>
    <br>
  </NuxtLayout>
</template>

<style scoped>

.div-main-two {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.exercise-card {
  border: 1px solid #ccc;
  padding: 1rem;
  cursor: pointer;
  transition: 0.3s;
}

.exercise-card:hover {
  transform: scale(1.05);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 5px;
  text-align: center;
}

.modal-content img {
  max-width: 100%;
  height: auto;
}
/* Lista de exercícios */
.exercise-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.exercise-item {
  margin-bottom: 20px;
  padding: 15px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.exercise-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* Cabeçalho do exercício */
.exercise-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.miniSquare {
  width: 50px;
  margin-right: 10px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.miniSquare:hover {
  transform: scale(1.1);
}

.exercise-header span {
  font-size: 18px;
  font-weight: bold;
}

/* Tabela de exercícios */
.exercise-table {
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  font-size: 14px;
  text-align: left;
}

.exercise-table th {
  background-color: var(--player-color)90;
  color: white;
  padding: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.exercise-table td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.exercise-table tbody tr:hover {
  background-color: #f1f1f1;
}

/* Responsividade */
@media (max-width: 768px) {
  .exercise-header span {
    font-size: 16px;
  }

  .miniSquare {
    width: 40px;
    height: 40px;
  }

  .exercise-table {
    font-size: 12px;
  }
}

.light {
  color: #ddd;
}

.dark-mode .light {
    color: #777;
}


.charge {
  width: 30px;
  border-radius: 8px;
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
  border: solid .1px var(--player-color)80;
  padding: 0px 8px;
  border-radius: 6px;
  margin: 3px 0 ;
  margin: 5px 0rem;
  background-color: var(--player-color)10;
  border: solid .2px var(--player-color)10;
}
.main-div-twoo ul li {
  border-radius: 6px;
  padding: 0px;
  
}
.main-div-twoo {
  margin: 0 1rem ;
}
.title {
  margin: 1rem 2% 0 2%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.main-div-twoo h3 {
font-size: 1rem;
}

.main-div-twoo h3 .icon {
  zoom: 1.2;
}

.title span .icon {
    zoom: .9 ;
}

.main-div-twoo ul li:nth-child(2n -1) {
    border: 2px solid var(--player-color);
    padding:1rem;
    margin: 1.5rem 1rem 1.5rem 1rem;
    border-radius: 10px;
    background-color: #020024;
    color: #ffffff;
    box-shadow: 0 0 20px var(--player-color);
    font-family: 'Orbitron-Regular', sans-serif;
}

.alternate {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 0rem 2% 0rem 2%;
  box-shadow: 0 0px 5px #00f2ff10;
  border: solid 1px var(--player-color)40;
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
  background-color: var(--player-color)50;
  color: var(--player-color);
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
  color: var(--player-color);
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
  background-color: var(--player-color)50;
  font-weight: bold;
  color: var(--player-color);  
  margin: 2px;
}
.alternateList {
  background-color: var(--player-color)50;
  font-weight: bold;
  color: var(--player-color);  
  margin: 2px;
}
.roww {
  display: flex;
  flex-direction: row;
  align-content: normal;
  justify-content: flex-start;
  align-items: center;
}

.roww span:nth-child(1) {
  font-size: 1.1rem;
}

b {
  color: var(--player-color);
  font-weight: 900;
}

h2 {
  color: var(--player-color);
  font-weight: 900;
      height: 42px;
}

.main-div-one {
  overflow-x: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.main-div-twoo {
  position: relative;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 0px;
  margin-bottom: 60px;
}

.main-div-twoo ul{
  position: relative;
  overflow-x: auto;
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

.img-exe{
  color: var(--player-color);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  background-color: var(--player-color)40;
    border-radius: 6px;
}

.img-exe img {
  margin-left: 10px;
    height: 50px;
    margin-right: 15px;
    border-radius: 200px;
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
    background-color: var(--player-color)40;
}
th, td {
  border: 1px solid var(--player-color);
  padding: 8px;
  text-align: left;
}


.col {
    font-size: .8rem;
}

.main-div-tree ul {
  overflow-x: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.active {
  color: var(--player-color);
}
.main-div-tree ul li {
  overflow-x: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  cursor: pointer;
  margin-right: 102px;
}
.main-div-tree {
  position: relative;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: .4rem;
}

.div-tree-one {
  position: relative;
  overflow-x: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 5%
}
.main-div-tree ul li {
  border: solid .1px var(--player-color)80;
  padding: .5px 6px;
  border-radius: 6px;
  margin: 0px 0rem;
  background-color: var(--player-color)20;
  border: solid .2px var(--player-color)10;
}

.main-div-tree ul li:nth-child(2n -1) {
  background-color: var(--player-color)60;
}
.main-div-tree .icon{   
  cursor: pointer;
}
.main-div-tree h2{
  margin: .3rem 1.5rem;
      text-align: center;
}
.main-div-tree h3{
  margin-left: 1.5rem;
  color: var(--player-color);
  font-size: 1.2rem;
}
.main-div-tree h5{
  color: var(--player-color);
  font-size: .8rem;
}

.square-list{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.exercise {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 5px 5% 20px 5%;
}

.exercise-square {
  width: max-content;
  height: 55px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5px 2px 0 2px;
  border-radius: 8px;
  background-color: var(--player-color)40;
  backdrop-filter: blur(35px);
  border: 1px solid var(--player-color); 
}
.exercise-square:nth-child(1) {
  width: 15%
}
.exercise-square:nth-child(2) {
  width: 45%
}
.exercise-square:nth-child(3) {
  width: 15%
}
.exercise-square:nth-child(4) {
  width: 15%
}
.exercise-square h4:nth-child(12) {
  color: var(--player-color);
}
.exercise-square h4:nth-child(1) {
  color: var(--player-color);
}
.exercise-square:nth-child(3) input {
  background-color: transparent;
}

.exercise-square .icon {
    zoom: 1.1;
    margin-bottom: 2px
}

.button {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  z-index: 120;
}
.cron {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  z-index: 120;
}

.cron .icon {
    color: var(--player-color);
    zoom: 1.4;
}

.counter {
    color: var(--player-color);
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 1rem;
  font-size: 4rem;
  font-family: 'Nirequa';
}

.button .icon{
  color: var(--player-color);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: -1px;
  zoom:1.7;
}
.button span:nth-child(1){
  background-color: var(--player-color)20;
  color: var(--player-color);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
  padding-right: 25px;
  font-weight: bolder;
  border: 1px solid var(--player-color); 
}
.button span:nth-child(2){
    background-color: var(--player-color)20;
    color: var(--player-color);
  font-weight: bolder;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
  padding-left: 28px;
  border: 1px solid var(--player-color); 
}
.dark-mode .button span:nth-child(1), .dark-mode .button span:nth-child(2){
  background-color: var(--player-color)60;
  color: var(--player-color);
}
/* 
border: 2px solid #2cd3db;
*/ 

.obs{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  margin: -10px 9% 10px 9%;
  height:50px;
  text-align: center;
}

.icon {
  margin-top: -2.5px;
}

.main-div-one {
  overflow-x: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 90px;
  width: 100%;
}
.main-div-one .icon{
  color:var(--player-color);
  margin-top: -2.5px;
}

.conf {  
  color:#555;
  height: 80px;
  backdrop-filter: blur(15px);
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 32.5%;
  margin: 10px auto;
  border-radius: 20px;  
  
  
  background-color: var(--player-color)10;
  border: 2px solid var(--player-color)20;
  border-top: 3px solid var(--player-color)40;
  border-bottom: 3px solid var(--player-color)40;
}

.square {
  height: 200px;
  width: auto;
  max-width: 370px;
  color:#555;
  background-color: #fff;
  backdrop-filter: blur(5px);
  overflow-x: auto;
  border-radius: 18px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 3px auto;
  border: 2px solid var(--player-color)90; 
  cursor: zoom-in;
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
  border-radius: 200px;
  align-items: center;
  margin: 5px;
  border: 2px solid var(--player-color)10; 
  cursor: zoom-in;
  
}

.photo-detail {
  bottom: 0px;
  z-index: 1004;
  transform: translateX(0%);
  position: fixed;
  height: calc(100% - 0px);
  bottom: 0px;
  width: 100%;
  background-color: var(--player-color);
}

.nav-top {
  display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: center;
    text-align: center;
}

.nav-bar-photo{
  z-index: 1004;
    transform: translateX(0%);
    position: fixed;
    height: calc(100% - 0px);
    bottom: 0px;
    width: 100%;
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    background-color: #ffffff50;
    background: var(--player-color) 10;
  }
  
  .nav-flow-photo {
   display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    z-index: 100;
    transform: translateX(0%);
    position: fixed;
    height: calc(100% - 0px);
    bottom: 0px;
    width: 100%;
  }
  
  .div-img-full img {
    box-shadow: 0px 7px 20px var(--player-color);
    height: auto;
    width: 95%;
    border-radius: 7px;
    border: var(--player-color) 2px solid;
    z-index: 100;
    opacity: 1;
}
</style>
