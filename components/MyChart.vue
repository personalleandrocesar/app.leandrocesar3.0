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
              background: `conic-gradient(${colors.active} 0% ${percentAtivos}%, ${background} ${percentAtivos}% 100%)`
      }"
    >
      <div class="inner-circle-two">
        <span>{{ percentAtivos }}%</span>
      </div>
    </div>
    <div class="info">
      <h3 :style="{color:` ${colors.active}`}"> Clientes Ativos</h3>
      <p>{{ ativosCount }} Clientes</p>
    </div>
  </div>
<!-- Clientes totais Inativos -->
<div class="card">
    <div
      class="circle-two"
      :style="{
              background: `conic-gradient(${colors.inactive} 0% ${percentInativos}%, ${background} ${percentInativos}% 100%)`
      }"
    >
      <div class="inner-circle-two">
        <span>{{ percentInativos }}%</span>
      </div>
    </div>
    <div class="info">
     <h3 :style="{color:`${colors.inactive}`}">Clientes Inativos</h3>
      <p>{{ inativosCount }} Clientes</p>
    </div>
  </div>

  <!-- Clientes totais Bloqueados -->
<div class="card">
    <div
      class="circle-two"
      :style="{
              background: `conic-gradient(${colors.blocked} 0% ${percentBloqueados}%, ${background} ${percentBloqueados}% 100%)`
      }"
    >
      <div class="inner-circle-two">
        <span>{{ percentBloqueados }}%</span>
      </div>
    </div>
    <div class="info">
      <h3 :style="{color: `${colors.blocked}`}">Clientes bloqueados</h3>
      <p>{{ bloqueadosCount }} Clientes</p>
    </div>
  </div>
  </div>

  
  <div class='template'>
  <!-- Total de Personais -->
<div @click='detailPersonal' class="card">
    <div
      class="circle-two"
      :style="{
              background: `conic-gradient(${colors.personal} 0% ${percentPersonal}%, ${background} ${percentPersonal}% 100%)`
      }"
    >
      <div class="inner-circle-two">
        <span>{{ percentPersonal }}%</span>
      </div>
    </div>
    <div class="info">
      <h3 :style="{color: `${colors.personal}`}" >{{ personalText }}</h3>
      <p>{{ personalCount }} Clientes</p>
    </div>
  </div>
 <div @click='detailConsultoria' class="card">
    <div
      class="circle-two"
      :style="{
              background: `conic-gradient(var(--player-color) 0% ${percentPersonal}%, ${background} ${percentPersonal}% 100%)`
      }"
    >
      <div class="inner-circle-two">
        <span>{{ percentConsultoria }}%</span>
      </div>
    </div>
    <div class="info">
      <h3>{{ consultoriaText }}</h3>
      <p>{{ consultoriaCount }} Clientes</p>
    </div>
  </div>

<div @click='detailAvaliacao' class="card">
    <div
      class="circle-two"
      :style="{
              background: `conic-gradient(var(--player-color) 0% ${percentAvaliacao}%, ${background} ${percentAvaliacao}% 100%)`
      }"
    >
      <div class="inner-circle-two">
        <span>{{ percentAvaliacao }}%</span>
      </div>
    </div>
    <div class="info">
      <h3>{{ avalicaoText }}</h3>
      <p>{{ avaliacaoCount }} Clientes</p>
    </div>

  </div>
 
</div>
<!-- 3º template = Personal -->
  <div class='template'>
  
  <!-- Personais Ativos -->
<div v-if='personalDetails' class="card-tree">
    <div
      class="circle-tree"
      :style="{
              background: `conic-gradient(blue 0% ${percentAtivos}%, ${background} ${percentAtivos}% 100%)`
      }"
    >
      <div class="inner-circle-tree">
        <span>{{ percentPersonalAtivos }}%</span>
      </div>
    </div>
    <div class="info-tree">
      <h3 :style="{color:` ${colors.active}`}"> Personais Ativos</h3>
      <p>{{ personalAtivos }} Clientes</p>
    </div>
  </div>
<!-- Personais Inativos -->
<div v-if='personalDetails' class="card-tree">
    <div
      class="circle-tree"
      :style="{
              background: `conic-gradient(${colors.inactive} 0% ${percentPersonalInativos}%, ${background} ${percentPersonalInativos}% 100%)`
      }"
    >
      <div class="inner-circle-tree">
        <span>{{ percentPersonalInativos }}%</span>
      </div>
    </div>
    <div class="info-tree">
      <h3 :style="{color:`${colors.inactive}`}">Personais Inativos</h3>
      <p>{{ personalInativos }} Clientes</p>
    </div>
  </div>

  <!-- Personais Bloqueados -->
<div v-if='personalDetails' class="card-tree">
    <div
      class="circle-tree"
      :style="{
              background: `conic-gradient(${colors.blocked} 0% ${percentPersonalBlocked}%, ${background} ${percentPersonalBlocked}% 100%)`
      }"
    >
      <div class="inner-circle-tree">
        <span>{{ percentPersonalBlocked }}%</span>
      </div>
    </div>
    <div class="info-tree">
      <h3 :style="{color: `${colors.blocked}`}">Personais bloqueados</h3>
      <p>{{ personalBlocked }} Clientes</p>
    </div>
  </div>
 </div>

<!-- 4º template = Consultoria-->
  <div class='template'>

  <!-- Consultoria Ativos -->
<div v-if='consultoriaDetails' class="card-tree">
    <div
      class="circle-tree"
      :style="{
              background: `conic-gradient(blue 0% ${percentConsultoriaAtivos}%, ${background} ${percentConsultoriaAtivos}% 100%)`
      }"
    >
      <div class="inner-circle-tree">
        <span>{{ percentConsultoriaAtivos }}%</span>
      </div>
    </div>
    <div class="info-tree">
      <h3 :style="{color:` ${colors.active}`}"> Consultoria Ativos</h3>
      <p>{{ consultoriaAtivos }} Clientes</p>
    </div>
  </div>
<!-- Consultoria Inativos -->
<div v-if='consultoriaDetails' class="card-tree">
    <div
      class="circle-tree"
      :style="{
              background: `conic-gradient(${colors.inactive} 0% ${percentConsultoriaInativos}%, ${background} ${percentConsultoriaInativos}% 100%)`
      }"
    >
      <div class="inner-circle-tree">
        <span>{{ percentConsultoriaInativos }}%</span>
      </div>
    </div>
    <div class="info-tree">
      <h3 :style="{color:`${colors.inactive}`}">Consultoria Inativos</h3>
      <p>{{ consultoriaInativos }} Clientes</p>
    </div>
  </div>

  <!-- Consultoria Bloqueados -->
<div v-if='consultoriaDetails' class="card-tree">
    <div
      class="circle-tree"
      :style="{
              background: `conic-gradient(${colors.blocked} 0% ${percentConsultoriaBlocked}%, ${background} ${percentConsultoriaBlocked}% 100%)`
      }"
    >
      <div class="inner-circle-tree">
        <span>{{ percentConsultoriaBlocked }}%</span>
      </div>
    </div>
    <div class="info-tree">
      <h3 :style="{color: `${colors.blocked}`}">Consultoria bloqueados</h3>
      <p>{{ consultoriaBlocked }} Clientes</p>
    </div>
  </div>
  </div>

<!-- 5º template = Avaliação Física -->
  <div class='template'>
  <!-- Avaliação Ativos -->
<div  v-if='avaliacaoDetails' class="card-tree">
    <div
      class="circle-tree"
      :style="{
              background: `conic-gradient(blue 0% ${percentAvaliacaoActive}%, ${background} ${percentAvaliacaoActive}% 100%)`
      }"
    >
      <div class="inner-circle-tree">
        <span>{{ percentAvaliacaoActive }}%</span>
      </div>
    </div>
    <div class="info-tree">
      <h3 :style="{color:` ${colors.active}`}"> Avaliação Ativos</h3>
      <p>{{ avaliacaoActive }} Clientes</p>
    </div>
  </div>
<!-- Avaliação Inativos -->
<div v-if='avaliacaoDetails' class="card-tree">
    <div
      class="circle-tree"
      :style="{
              background: `conic-gradient(${colors.inactive} 0% ${percentAvaliacaoInactive}%, ${background} ${percentAvaliacaoInactive}% 100%)`
      }"
    >
      <div class="inner-circle-tree">
        <span>{{ percentAvaliacaoInactive }}%</span>
      </div>
    </div>
    <div class="info-tree">
      <h3 :style="{color:`${colors.inactive}`}">Consultoria Inativos</h3>
      <p>{{ avaliacaoInactive }} Clientes</p>
    </div>
  </div>

  <!-- Avaliação Bloqueados -->
<div v-if='avaliacaoDetails' class="card-tree">
    <div
      class="circle-tree"
      :style="{
              background: `conic-gradient(${colors.blocked} 0% ${percentAvaliacaoBlocked}%, ${background} ${percentAvaliacaoBlocked}% 100%)`
      }"
    >
      <div class="inner-circle-tree">
        <span>{{ percentAvaliacaoBlocked }}%</span>
      </div>
    </div>
    <div class="info-tree">
      <h3 :style="{color: `${colors.blocked}`}">Consultoria bloqueados</h3>
      <p>{{ avaliacaoBlocked }} Clientes</p>
    </div>
  </div>
  </div>
</template>

<script setup>
const { selectedColor, selectedClass, classColors, resetColorToDefault } = usePlayerColor()

const cookieTreinador = useCookie('coachId')
const { data: team } = await useFetch(
  `https://api.leandrocesar.com/usersnw/${cookieTreinador.value}/team`
)
const percent = 100;

const colorMode = useColorMode()

// 🎨 Cores
const colors = {
  active: 'blue',
  inactive: '#ffd100',
  blocked: 'red',
  personal: 'var(--player-color)'
}

// 🌗 Fundo dinâmico com base no modo de cor
const background = computed(() => (colorMode.value === 'dark' ? '#333' : '#ccc'))

// 📊 Total de serviços
const totalServices = computed(() => team.value?.length || 0)

// 🔢 Função genérica para contar status
const countByStatus = (status) => computed(() =>
  team.value?.filter(item => item.status?.includes(status)).length || 0
)

// 🔢 Função genérica para calcular percentual
const percentOf = (countRef) => computed(() =>
  totalServices.value === 0 ? 0 : ((countRef.value / totalServices.value) * 100).toFixed(1)
)

// 🔹 Status principais
const ativosCount = countByStatus('Ativo')
const inativosCount = countByStatus('Inativo')
const bloqueadosCount = countByStatus('Bloqueado')

const percentAtivos = percentOf(ativosCount)
const percentInativos = percentOf(inativosCount)
const percentBloqueados = percentOf(bloqueadosCount)

// 🧍 Categorias de serviço
const serviceCount = (keyword) => computed(() =>
  team.value?.filter(item =>
    item.service?.toLowerCase().includes(keyword.toLowerCase())
  ).length || 0
)

const percentService = (countRef) => percentOf(countRef)

const personalText = 'Clientes de Personal'
const consultoriaText = 'Clientes de Consultoria'
const avalicaoText = 'Clientes de Avaliação'

const personalCount = serviceCount('Personal')
const consultoriaCount = serviceCount('Consultoria')
const avaliacaoCount = serviceCount('Avaliacao')

const percentPersonal = percentService(personalCount)
const percentConsultoria = percentService(consultoriaCount)
const percentAvaliacao = percentService(avaliacaoCount)

const personalAtivos = computed (()=>
team.value?.filter(item => item.status?.includes('Ativo') && item.service?.includes('Personal')).length || 0
)
const percentPersonalAtivos = percentOf(personalAtivos)

const personalInativos = computed (()=>
team.value?.filter(item => item.status?.includes('Inativo') && item.service?.includes('Personal')).length || 0
)
const percentPersonalInativos = percentOf(personalInativos)

const personalBlocked = computed (()=>
team.value?.filter(item => item.status?.includes('Bloqueado') && item.service?.includes('Personal')).length || 0
)
const percentPersonalBlocked = percentOf(personalBlocked)

const consultoriaAtivos = computed (()=>
team.value?.filter(item => item.status?.includes('Ativo') && item.service?.includes('Consultoria')).length || 0
)
const percentConsultoriaAtivos = percentOf(consultoriaAtivos)

const consultoriaInativos = computed (()=>
team.value?.filter(item => item.status?.includes('Inativo') && item.service?.includes('Consultoria')).length || 0
)
const percentConsultoriaInativos = percentOf(consultoriaInativos)

const consultoriaBlocked = computed (()=>
team.value?.filter(item => item.status?.includes('Bloqueado') && item.service?.includes('Consultoria')).length || 0
)
const percentConsultoriaBlocked = percentOf(consultoriaBlocked)

const avaliacaoActive = computed (()=>
team.value?.filter(item => item.status?.includes('Ativo') && item.service?.includes('Avaliacao')).length || 0
)
const percentAvaliacaoActive = percentOf(avaliacaoActive)
const avaliacaoInactive = computed (()=>
team.value?.filter(item => item.status?.includes('Inativo') && item.service?.includes('Avaliacao')).length || 0
)
const percentAvaliacaoInactive = percentOf(avaliacaoInactive)
const avaliacaoBlocked = computed (()=>
team.value?.filter(item => item.status?.includes('Bloqueado') && item.service?.includes('Avaliacao')).length || 0
)
const percentAvaliacaoBlocked = percentOf(avaliacaoBlocked)

const personalDetails = ref(false)
function detailPersonal() {
  personalDetails.value = !personalDetails.value
}

const consultoriaDetails = ref(false)
function detailConsultoria() {
  consultoriaDetails.value = !consultoriaDetails.value
}

const avaliacaoDetails = ref(false)
function detailAvaliacao() {
  avaliacaoDetails.value = !avaliacaoDetails.value
}
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
  padding: 15px 20px;
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
  padding: 5px 10px;
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
