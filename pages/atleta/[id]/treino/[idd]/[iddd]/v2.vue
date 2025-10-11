<script setup>
import { ref, computed, watch } from 'vue'

const route = useRoute()
const dataTreino = await useFetch(`https://api.leandrocesar.com/users/${route.params.id}/treinos/${route.params.idd}/${route.params.iddd}`)
const qtSeries = dataTreino.data.value.set
const treino = ref(0)

const currentExercise = computed(() => {
  return dataTreino?.data.value.set[treino.value]
})

// const currentCharge = ref(currentExercise.value?.charge || 0)

// Método para enviar dados via PUT para a API
// async function updateCharge() {
//   const exerciseId = currentExercise.value.id; // Supondo que cada exercício tem um ID único
//   try {
//     const response = await fetch(`https://api.leandrocesar.com/users/${route.params.id}/treinos/${route.params.idd}/${route.params.iddd}/${exerciseId}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ charge: currentCharge.value })
//     });
//     const result = await response.json();
//     console.log('Updated successfully:', result);
//   } catch (error) {
//     console.error('Error updating:', error);
//   }
// }

// // Observa mudanças no valor do currentCharge e envia para a API
// watch(currentCharge, (newCharge) => {
//   updateCharge();
// });

function openExercise() {
  exerciseImg.value = !exerciseImg.value;
}

const exerciseImg = ref(false);

const itemExercise = () => {
  return dataTreino.data?.value?.set.length
}

const listExercise = () => {
  return qtSeries
}

const i = treino.value
const listExercisee = () => {
  return dataTreino?.data.value.set[i]?.img
}

const pending = ref(false)

const previousExercise = () => {
  if (treino.value > 0) {
    treino.value--
  }
}

const nextExercise = () => {
  if (treino.value < dataTreino.data?.value.set.length - 1) {
    treino.value++
  }
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

// const counter = ref(0);
// let intervalId = null;

// const startCounter = () => {
//     if (intervalId) return;

//     intervalId = setInterval(() => {
//         if (counter.value < 60) {
//             counter.value++;
//         } else {
//             clearInterval(intervalId);
//             intervalId = null;
//         }
//     }, 1000);
// };

// const pauseCounter = () => {
//     clearInterval(intervalId);
//     intervalId = null;
// };

// const resumeCounter = () => {
//     if (counter.value <= 0 || counter.value >= 60) return;

//     intervalId = setInterval(() => {
//         if (counter.value < 60) {
//             counter.value++;
//         } else {
//             clearInterval(intervalId);
//             intervalId = null;
//         }
//     }, 1000);
// };

// const resetCounter = () => {
//     clearInterval(intervalId);
//     intervalId = null;
//     counter.value = 0;
// };

console.log(currentExercise)

</script>

<template>
  <NuxtLayout>

    <div class="alternate">
      <span @click="chooseGrid" :class="{ alternateGrid : alternateGrid }">
        <Icon name="solar:slider-minimalistic-horizontal-bold" /> Bloco
      </span>
      <span @click="chooseList" :class="{ alternateList: alternateList }">
        <Icon name="mdi:format-list-text" /> Lista
      </span>
      <span class="light" :class="{ }">
        <Icon name="solar:align-horizonta-spacing-bold" /> Total
      </span>
    </div>

    <div class="main-div-two" v-if="buttonList || selectL()">
      <h3 class="title">
        {{ itemExercise() }} Exercícios
      </h3>

      <ul>
        <li v-for="(nome, index) in listExercise()" :key="index">
          <h3 class='img-exe' >
              <img :src="nome.img" class="miniSquare" @click="openExercise" />  {{ nome.nome }}
          </h3>
          <table>
            <tr>
              <th>Série</th>
              <th>Reps</th>
              <th>Peso (Kg)</th>
              <th>Intervalo</th>
            </tr>
            <tr>
              <td>{{ nome.sets }}</td>
              <td>{{ nome.reps }}</td>
              <td>-- Kg</td>
              <td>{{ nome.rest }}</td>
            </tr>
          </table>

        <span  class='col' v-if="nome.obs">{{ nome.obs }}</span>
        </li>
      </ul>
    </div>

    <!-- Série em Bloco -->
    <div class="main-div-tree" v-else="buttonGrid || selectG()">
      <ul>
        <li v-for="id in itemExercise()" @click='itemExercise((treino = id - 1))'>
        <span>
          {{ id }}
        </span>          
        </li>
      </ul>
    <div class='div-tree-one'>
      <h5>
        {{ currentExercise.id }} - {{ itemExercise() }} Exercícios
      </h5>
      <h5>
        <Icon name='solar:dumbbell-bold' /> {{route.params.iddd}}
      </h5>
    </div> 
      <!-- <h3>
        {{ currentExercise.id }} - {{ itemExercise() }}
      </h3> -->
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
    <br>
    <br>
    <br>
  </NuxtLayout>
</template>

<style scoped>
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

.main-div-two ul li {
  border: solid .1px #00dc8280;
  padding: 0px 8px;
  border-radius: 6px;
  margin: 3px 0 ;
  margin: 5px 0rem;
  background-color: #00dc8210;
  border: solid .2px #00dc8210;
}
.main-div-two ul li {
  border-radius: 8px;
  padding: 0px;
  
}
.main-div-two {
  margin: 0 1rem ;
}
.title {
  margin: 1.5rem 0 0 5%;
}
.main-div-two h3 {
  font-size: 1rem;
}
.main-div-two h3 .icon {
  zoom: 1.2;
}


.main-div-two ul li:nth-child(2n -1) {
  background-color: #00dc8220;
}

.alternate {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 1rem 5% 0 5%;
  box-shadow: 0 0px 5px #00f2ff10;
  border: solid 1px #00dc8240;
  border-radius: 15px;
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
  border-radius: 15px;
  /* border: solid .2px #00dc8230; */
  
}
.alternate span:hover{
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: .8rem 0 .5rem 0;
  width: 100%;  font-size: .8rem;
  border-radius: 15px;
  background-color: #00dc8250;
  color: #00dc82;
}
.alternate span:nth-child(3):hover{
  background-color: transparent;
  color: #ddd;
}
.dark-mode .alternate span:nth-child(3):hover{
  background-color: transparent;
  color: #777;
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
  background-color: #00dc8215;
  font-weight: bold;
  color: #00dc82;  
}
.alternateList {
  background-color: #00dc8210;
  font-weight: bold;
  color: #00dc82;  
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
  color: #00dc82;
  font-weight: 900;
}

h2 {
  color: #00dc82;
  font-weight: 900;
}

.main-div-one {
  overflow-x: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.main-div-two {
  position: relative;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 0px;
}

.main-div-two ul{
  position: relative;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 0px 1.2%;
}

.main-div-two .icon{
  cursor: pointer;
}
.main-div-two h2{
  margin-left: 10px;
}
.main-div-two h3{
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
    border-radius: 2px;
    border: none;display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    margin: 5px 5px 5px 10px;
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

.main-div-tree ul {
  overflow-x: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
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
  border: solid .1px #00dc8280;
  padding: .5px 6px;
  border-radius: 6px;
  margin: 0px 0rem;
  background-color: #00dc8220;
  border: solid .2px #00dc8210;
}

.main-div-tree ul li:nth-child(2n -1) {
  background-color: #00dc8260;
}
.main-div-tree .icon{   
  cursor: pointer;
}
.main-div-tree h2{
  margin-left: 1.5rem;
}
.main-div-tree h3{
  margin-left: 1.5rem;
  color: #00dc82;
  font-size: 1.2rem;
}
.main-div-tree h5{
  color: #00dc82;
  font-size: 1rem;
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
  color:#555;
  background-color: #00dc8240;
  backdrop-filter: blur(35px);
  border: 1px solid #00dc82; 
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
  color: #00dc82;
}
.exercise-square h4:nth-child(1) {
  color: #00dc82;
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
    color: #00dc82;
    zoom: 1.4;
}

.counter {
    color: #00dc82;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 1rem;
  font-size: 4rem;
  font-family: 'Nirequa';
}

.button .icon{
  color: #00dc82;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: -1px;
  zoom:1.7;
}
.button span:nth-child(1){
  background-color: #00dc8220;
  color: #00dc82;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
  padding-right: 25px;
  font-weight: bolder;
  border: 1px solid #00dc82; 
}
.button span:nth-child(2){
    background-color: #00dc8220;
    color: #00dc82;
  font-weight: bolder;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
  padding-left: 28px;
  border: 1px solid #00dc82; 
}
.dark-mode .button span:nth-child(1), .dark-mode .button span:nth-child(2){
  background-color: #00dc8260;
  color: #00dc82;
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
  color: #00dc82;
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
  
  
  background-color: #00dc8210;
  border: 2px solid #00dc8220;
  border-top: 3px solid #00dc8240;
  border-bottom: 3px solid #00dc8240;
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
  border: 2px solid #00dc8290; 
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
  border-radius: 8px;
  align-items: center;
  margin: 5px;
  border: 2px solid #00dc8210; 
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
  background-color: #00dc82;
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
    backdrop-filter: blur(5px);
background: linear-gradient(to bottom right, #00f2ff80 0%, #00dc8280 50%, #00dc82 100%);  
  }
  
  .div-img-full img {
    box-shadow: 0px 7px 20px #00dc82;
    height: auto;
    width: 95%;
    border-radius: 7px;
    border: #00dc82 2px solid;
    z-index: 100;
    opacity: 1;
}
</style>
