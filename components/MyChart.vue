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
<!-- 3º template = Personal -->
  <div class='template'>
  <!-- Total de Personais -->
<div class="card">
    <div
      class="circle-two"
      :style="{
              background: `conic-gradient(${colors.personal} 0% ${percentPersonal}%, #444 ${percentPersonal}% 100%)`
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
  
  <!-- Personais Ativos -->
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
      <h3 :style="{color:` ${blue}`}"> Personais Ativos</h3>
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
      <h3 :style="{color:`${yellow}`}">Personais Inativos</h3>
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
      <h3 :style="{color: `${red}`}">Personais bloqueados</h3>
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
      <h3>{{ consultoriaText }}</h3>
      <p>{{ consultoriaCount }} Clientes</p>
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
        background: `conic-gradient(var(--player-color) 0% ${percentAvaliacao}%, #444 ${percentAvaliacao}% 100%)`
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
const background = computed(() => (colorMode.value === 'dark' ? '#444' : '#ccc'))

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
team.value?.filter(item => item.status?.includes('Ativo')).length & team.value?.filter(item => item.service?.includes('Personal')).length
)
console.log(personalAtivos.value)
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
