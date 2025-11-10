<template>
<!-- 1º template = Total de Clientes -->
  <div class='template'>
   <div class="card">
    <div
      class="circle"
      :style="{
        background: `conic-gradient(var(--player-color) 0% ${percent}%, #444 ${percent}% 100%)`
      }"
    >
      <div class="inner-circle">
        <span>{{ totalServices }}</span>
      </div>
    </div>
    <div class="info-one">
      <h3> Total de clientes</h3>
    </div>
   </div>
  </div>
<!-- 2º template = Ativos/Inativos/Bloqueados-->
  <div class='template'>
  <!-- Clientes totais Ativos -->
<div class="card">
    <div
      class="circle-two"
      :style="{
              background: `conic-gradient(blue 0% ${percentAtivos}%, ${background} ${percentAtivos}% 100%)`
      }"
    >
      <div class="inner-circle-two">
        <span>{{ percentAtivos }}%</span>
      </div>
    </div>
    <div class="info">
      <h3 :style="{color:` ${blue}`}"> Clientes Ativos</h3>
      <p>{{ ativosCount }} Clientes</p>
    </div>
  </div>
<!-- Clientes totais Inativos -->
<div class="card">
    <div
      class="circle-two"
      :style="{
              background: `conic-gradient(${yellow} 0% ${percentInativos}%, ${background} ${percentInativos}% 100%)`
      }"
    >
      <div class="inner-circle-two">
        <span>{{ percentInativos }}%</span>
      </div>
    </div>
    <div class="info">
      <h3 :style="{color:`${yellow}`}">Clientes Inativos</h3>
      <p>{{ inativosCount }} Clientes</p>
    </div>
  </div>

  <!-- Clientes totais Bloqueados -->
<div class="card">
    <div
      class="circle-two"
      :style="{
              background: `conic-gradient(red 0% ${percentBloqueados}%, ${background} ${percentBloqueados}% 100%)`
      }"
    >
      <div class="inner-circle-two">
        <span>{{ percentBloqueados }}%</span>
      </div>
    </div>
    <div class="info">
      <h3 :style="{color: `${red}`}">Clientes bloqueados</h3>
      <p>{{ bloqueadosCount }} Clientes</p>
    </div>
  </div>
  </div>
<!-- 3º template = Personal-->
  <div class='template'>
  <!-- Total de Personais -->
<div class="card">
    <div
      class="circle-two"
      :style="{
        background: `conic-gradient(var(--player-color) 0% ${percentPersonal}%, #444 ${percentPersonal}% 100%)`
      }"
    >
      <div class="inner-circle-two">
        <span>{{ percentPersonal }}%</span>
      </div>
    </div>
    <div class="info">
      <h3>{{ textPersonal }}</h3>
      <p>{{ personalCount }} Clientes</p>
    </div>
  </div>
  
  <!-- Clientes totais Ativos -->
<div class="card-tree">
    <div
      class="circle-tree"
      :style="{
              background: `conic-gradient(blue 0% ${percentAtivos}%, ${background} ${percentAtivos}% 100%)`
      }"
    >
      <div class="inner-circle-tree">
        <span>{{ percentAtivos }}%</span>
      </div>
    </div>
    <div class="info-tree">
      <h3 :style="{color:` ${blue}`}"> Clientes Ativos</h3>
      <p>{{ ativosCount }} Clientes</p>
    </div>
  </div>
<!-- Clientes totais Inativos -->
<div class="card-tree">
    <div
      class="circle-tree"
      :style="{
              background: `conic-gradient(${yellow} 0% ${percentInativos}%, ${background} ${percentInativos}% 100%)`
      }"
    >
      <div class="inner-circle-tree">
        <span>{{ percentInativos }}%</span>
      </div>
    </div>
    <div class="info-tree">
      <h3 :style="{color:`${yellow}`}">Clientes Inativos</h3>
      <p>{{ inativosCount }} Clientes</p>
    </div>
  </div>

  <!-- Clientes totais Bloqueados -->
<div class="card-tree">
    <div
      class="circle-tree"
      :style="{
              background: `conic-gradient(red 0% ${percentBloqueados}%, ${background} ${percentBloqueados}% 100%)`
      }"
    >
      <div class="inner-circle-tree">
        <span>{{ percentBloqueados }}%</span>
      </div>
    </div>
    <div class="info-tree">
      <h3 :style="{color: `${red}`}">Clientes bloqueados</h3>
      <p>{{ bloqueadosCount }} Clientes</p>
    </div>
  </div>
 </div>

<!-- 4º template -->
  <div class='template'>
<!-- consultoria -->
<div class="card">
    <div
      class="circle-two"
      :style="{
        background: `conic-gradient(var(--player-color) 0% ${percentPersonal}%, #444 ${percentPersonal}% 100%)`
      }"
    >
      <div class="inner-circle-two">
        <span>{{ percentConsultoria }}%</span>
      </div>
    </div>
    <div class="info">
      <h3>{{ textConsultoria }}</h3>
      <p>{{ consultoriaCount }} Clientes</p>
    </div>
  </div>
  </div>
</template>

<script setup>
const { selectedColor, selectedClass, classColors, resetColorToDefault } = usePlayerColor()

const cookieTreinador = useCookie('coachId');
const { data: team } = await useFetch(
  `https://api.leandrocesar.com/usersnw/${cookieTreinador.value}/team`
)
const percent = 100;

const colorMode = useColorMode()
const background = computed (() => {

if (colorMode.value === "dark") {
  return '#444';
} else {
  return '#ccc';
}
})
const blue= 'blue'
// Computed que conta quantos serviços existem no total
const totalServices = computed(() => team.value.length)
const ativosCount = computed(()=> 
  team.value.filter(item => item.status?.includes('Ativo')).length 
)
const percentAtivos = computed (()=> {
if(ativosCount === 0) return 0
return ((ativosCount.value / totalServices.value) * 100).toFixed(1)
})
const yellow = '#ffd100'
const inativosCount = computed(() => 
  team.value.filter(item => item.status?.includes('Inativo')).length
)
const percentInativos = computed (()=> {
if(inativosCount === 0) return ffd100
return ((inativosCount.value / totalServices.value) * 100).toFixed(1)
})
const red = 'red'
const bloqueadosCount = computed (()=> 
  team.value.filter(item=> item.status?.includes('Bloqueado')).length
)
const percentBloqueados = computed (()=> {
if (bloqueadosCount === 0) return 0
return ((bloqueadosCount.value / totalServices.value) * 100).toFixed(1)
})
// Computed que conta quantos têm "personal" no nome
const textPersonal = 'Clientes de personal'
const personalCount = computed(() =>
  team.value.filter(item => item.service?.includes('Personal')).length
)
// Percentual de personal sobre o total
const percentPersonal = computed(() => {
if (totalServices.value === 0) return 0
return ((personalCount.value / totalServices.value) * 100).toFixed(1) // ex: 40.0
})
const textConsultoria = 'Clinetes de Consultoria'
// Computed que conta quantos têm "consultoria" no nome
const consultoriaCount = computed(() =>
  team.value.filter(item => item.service?.toLowerCase().includes('consultoria')).length
)
// Computed de consultoria sobre o total
const percentConsultoria = computed(()=> {
if (totalServices === 0) return 0
return ((consultoriaCount.value / totalServices.value) * 100).toFixed(1)
})
</script>

<style scoped>
.template {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.card {
  display: flex;
  align-items: center;
  flex-direction: row;
  border-radius: 12px;
  padding: 20px;
  color: white;
  font-family: sans-serif;
  width: fit-content;
}

.circle {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
}

.inner-circle {
  width: 75px;
  height: 75px;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dark-mode .inner-circle {
  background-color: #0f141e;
}
.circle-two {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
}

.inner-circle-two {
  width: 60px;
  height: 60px;
  background-color: #fff;
  color: #000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dark-mode .inner-circle-two {
  background-color: #0f141e;
  color: fff;
}

.inner-circle-two span{
  font-size: .8rem;
  color: #000;
}
.dark-mode .inner-circle-two span{
  color: #fff;
}
.card-tree {
  display: flex;
  align-items: center;
  flex-direction: row;
  border-radius: 12px;
  padding: 5px;
  color: white;
  font-family: sans-serif;
  width: fit-content;
}
.circle-tree {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}

.inner-circle-tree {
  width: 48px;
  height: 48px;
  background-color: #fff;
  color: #000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dark-mode .inner-circle-tree {
  background-color: #0f141e;
  color: fff;
}

.inner-circle-tree span{
  font-size: .7rem;
  color: #000;
}
.dark-mode .inner-circle-tree span{
  color: #fff;
}
.info-tree h3 {
  font-size: .8rem;
}
.infor p {
  font-size: .6rem
}

.inner-circle span {
  font-size: 24px;
  font-weight: bold;
  color: #000;
}
.dark-mode .inner-circle span {
  color: #fff;
}
.info h3 {
  margin: 0;
  font-size: 18px;
  color: var(--player-color);
}

.info-one h3 {
  font-size: 22px;
  color: #000;
}

.dark-mode .info-one h3 {
  color: #fff;
}

.info p {
  margin: 4px 0 0;
  font-size: 18px;
  color: #000;
  font-weight: bold;
}
.dark-mode .info p {
  color: #fff;
}
</style>
