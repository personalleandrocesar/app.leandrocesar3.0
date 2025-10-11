<script setup>
import { usePlayerClass } from '@/stores/usePlayerClass'
import { onMounted, ref, watch } from 'vue'
import { useHead } from '#app'

const playerClass = usePlayerClass()
const treinos = ref([])

onMounted(() => {
  playerClass.loadClasse()

  // Simulação: carregar treinos da API ou localmente
  treinos.value = [
    {
      nome: 'Agachamento Livre',
      series: '4x12',
      carga: '60kg',
      feito: false
    },
    {
      nome: 'Flexão de Braço',
      series: '3x15',
      carga: 'Peso corporal',
      feito: false
    },
    {
      nome: 'Abdominal Supra',
      series: '3x20',
      carga: 'Peso corporal',
      feito: false
    },
    {
      nome: 'Corrida Leve',
      series: '10min',
      carga: '0kg',
      feito: false
    }
  ]
})

// Atualiza a cor do navegador com a da classe do jogador
watch(() => playerClass.classe, (nova) => {
  if (nova?.cor) {
    useHead({
      meta: [{ name: 'theme-color', content: nova.cor }]
    })
  }
}, { immediate: true })

function marcarFeito(index) {
  treinos.value[index].feito = true
}
</script>

<template>
  <div class="pagina-treinos">
    <header class="header" :style="{ borderColor: playerClass.classe?.cor }">
      <h2>Meus Treinos - Classe: {{ playerClass.classe?.nome || 'N/A' }}</h2>
      <span class="objetivo">{{ playerClass.classe?.objetivo }}</span>
    </header>

    <div class="lista-treinos">
      <div
        v-for="(treino, index) in treinos"
        :key="index"
        class="card"
        :class="{ concluido: treino.feito }"
      >
        <h3>{{ treino.nome }}</h3>
        <p>{{ treino.series }} — {{ treino.carga }}</p>
        <button @click="marcarFeito(index)" :disabled="treino.feito">
          {{ treino.feito ? 'Concluído' : 'Marcar como feito' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pagina-treinos {
  padding: 2rem;
  background: #020024;
  min-height: 100vh;
  color: white;
  font-family: 'Orbitron', sans-serif;
}

.header {
  border-left: 5px solid;
  padding-left: 1rem;
  margin-bottom: 2rem;
}

.objetivo {
  display: inline-block;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #ccc;
}

.lista-treinos {
  display: grid;
  gap: 1.5rem;
}

.card {
  background: #111;
  border-radius: 1rem;
  padding: 1.5rem;
  border: 2px solid #8d00ab;
  transition: 0.3s;
}

.card h3 {
  margin: 0 0 0.5rem;
  color: white;
}

.card p {
  color: #bbb;
  margin-bottom: 1rem;
}

.card button {
  background: #b800ff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 999px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.card button:hover {
  background: #8d00ab;
}

.card.concluido {
  opacity: 0.6;
  border-color: #0f0;
}

.card.concluido button {
  background: #0f0;
  color: #000;
  cursor: default;
}
</style>
