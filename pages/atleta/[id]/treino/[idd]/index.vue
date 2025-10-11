<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useFetch, useCookie } from '#app'

const layout = "duo"
const route = useRoute()

const photoOpen = ref(false)
function openPhoto() {
  photoOpen.value = !photoOpen.value
}

const coachIdCookie = useCookie('coachId')
const dataTreino = await useFetch(`https://api.leandrocesar.com/usersnw/${coachIdCookie.value}/team/${route.params.id}/treinos/${route.params.idd}`)
const peoplesss = dataTreino.data.value || {}
const treinus = peoplesss?.serie || []
const treino = ref(0)

console.log(treinus)

const setTreino = useCookie('setTreino')
const treinoAtual = setTreino.value

const dataConf = await useFetch(`https://api.leandrocesar.com/usersnw/${route.params.id}`)
const Treinos = await useFetch(`https://api.leandrocesar.com/usersnw/${route.params.id}/treinos/${route.params.idd}`)


const treinos = ref('')

function chooseTreino() {
  setTreino.value = route.params.idd
}

const state = useCookie('state')

const useA = () => state.value = 1
const useB = () => state.value = 2
const useC = () => state.value = 3
const useD = () => state.value = 4

const navA = ref(state.value === 1)
const navB = ref(state.value === 2)
const navC = ref(state.value === 3)
const navD = ref(state.value === 4)

</script>

<template>
  <NuxtLayout :name="layout">
    <div class="main-div-twoo">
      <h3>
        <Icon name="solar:dumbbells-bold" /> SÉRIES
      </h3>
      <span v-for="(ss, index) in treinus" :key="index">
        <NuxtLink class="square" :to="`/atleta/${route.params.id}/treino/${route.params.idd}/${ss.name}`" @click="chooseTreino">
          <div>
            <h4>SÉRIE</h4>
          </div>
          <div>
            <h5>{{ ss.name }}</h5>
          </div>
        </NuxtLink>
      </span>
    </div>
  </NuxtLayout>
</template>






<style scoped>
body {
  background: #fff;
  color: #616161;

}

b {
  margin-left: 7px;
}

.main {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  justify-items: center;
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

.square {
  background-color: #00dc8210;
  backdrop-filter: blur(5px);
  overflow-x: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 3px 1.5rem;
  border-radius: 8px;
  border: .1px solid #00dc8220;
  line-height: 1.4;
  transition: all .4s;
  border: 2px solid #00dc8210;
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

.square div:nth-child(1) {
  padding-right: 12px;

}

.square div:nth-child(2),
.square div:nth-child(3) {
  margin: auto;
  border: none;
}

.story {
  background-color: #00dc8210;
  backdrop-filter: blur(5px);
  overflow-x: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 65%;
  margin: 8px auto;
  padding-top: 3px;
  border-radius: 8px;
  border: .1px solid #00dc8210;
  line-height: 1.4;
  transition: all .4s;
  font-weight: 700;
}

.story .icon {
  color: #00dc82;
  margin-top: -2px;
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
  margin-top: -2.5px;
}

.main-div-twoo h3 {
  margin: 20px 20px 0 20px;

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

.icon {
  zoom: 1.2;
  color: #fadb41;
  margin-top: -2.5px;
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

.conf:nth-child(1) {
  margin: 1rem 2px 0 5%;
}

.conf:nth-child(3) {
  margin: 1rem 5% 0 2px;
}


.conf h3 {
  font-size: .88rem;
}
</style>
