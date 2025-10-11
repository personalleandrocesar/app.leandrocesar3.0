<template>
  <div class="card">
    <div
      class="circle"
      :style="{
        background: `conic-gradient(var(--player-color) 0% ${percent}%, #444 ${percent}% 100%)`
      }"
    >
      <div class="inner-circle">
        <span>{{ percent }}%</span>
      </div>
    </div>
    <div class="info">
      <h3>{{ tipoInvestimento }}</h3>
      <p>R$ {{ valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</p>
    </div>
  </div>
</template>

<script setup>
const percent = 78
const valor = 1750
const tipoInvestimento = 'Pós-Fixado'
</script>

<style scoped>
.card {
  display: flex;
  align-items: center;
  border-radius: 12px;
  padding: 20px;
  color: white;
  font-family: sans-serif;
  width: fit-content;
}

.circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
}

.inner-circle {
  width: 44px;
  height: 44px;
  background-color: #1c1c1c;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.inner-circle span {
  font-size: 14px;
  font-weight: bold;
  color: white;
}

.info h3 {
  margin: 0;
  font-size: 16px;
  color: var(--player-color);
}

.info p {
  margin: 4px 0 0;
  font-size: 18px;
  font-weight: bold;
}
</style>
