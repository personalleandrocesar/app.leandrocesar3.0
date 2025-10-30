<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
const route= useRoute()
const rota = useRoute()
const cookieTreinador = useCookie('coachId');


const usuarios = await useFetch(
  `https://api.leandrocesar.com/usersnw/${cookieTreinador.value}/team/${rota.params.id}`
);

const xpAtual = ref(usuarios.data.value.xp || 0)
console.log(usuarios.data.value.xp)
const rankData = [
  { 
    nome: 'E', 
    min: 0, 
    max: 1000, 
    missoes: [
      { id: 'E1', titulo: 'Treinar 1 vez', completa: false },
      { id: 'E2', titulo: 'Completar tutorial', completa: false },
      { id: 'E3', titulo: 'Coletar recursos iniciais', completa: false }
    ] 
  },
  { 
    nome: 'D', 
    min: 1001, 
    max: 3000, 
    missoes: [
      { id: 'D1', titulo: 'Treinar 2 vezes', completa: false },
      { id: 'D2', titulo: 'Realizar 5 exercícios', completa: false },
      { id: 'D3', titulo: 'Coletar equipamentos básicos', completa: false }
    ] 
  },
  { 
    nome: 'C', 
    min: 3001, 
    max: 5000, 
    missoes: [
      { id: 'C1', titulo: 'Treinar 3 vezes', completa: false },
      { id: 'C2', titulo: 'Completar missão diária', completa: false },
      { id: 'C3', titulo: 'Coletar moedas de bronze', completa: false }
    ] 
  },
  { 
    nome: 'B', 
    min: 5001, 
    max: 8000, 
    missoes: [
      { id: 'B1', titulo: 'Treinar 4 vezes', completa: false },
      { id: 'B2', titulo: 'Vencer inimigo intermediário', completa: false },
      { id: 'B3', titulo: 'Coletar recursos raros', completa: false }
    ] 
  },
  { 
    nome: 'A', 
    min: 8001, 
    max: 12000, 
    missoes: [
      { id: 'A1', titulo: 'Treinar 5 vezes', completa: false },
      { id: 'A2', titulo: 'Derrotar chefe local', completa: false },
      { id: 'A3', titulo: 'Conseguir equipamento avançado', completa: false }
    ] 
  },
  { 
    nome: 'S', 
    min: 12001, 
    max: 18000, 
    missoes: [
      { id: 'S0-1', titulo: 'Completar missão especial', completa: false },
      { id: 'S0-2', titulo: 'Treinar com mestre', completa: false },
      { id: 'S0-3', titulo: 'Coletar item lendário', completa: false }
    ] 
  },
  { 
    nome: 'S', 
    nivel: 1, 
    min: 18001, 
    max: 25000, 
    missoes: [
      { id: 'S1-1', titulo: 'Subir de nível', completa: false },
      { id: 'S1-2', titulo: 'Derrotar chefe de nível 1', completa: false },
      { id: 'S1-3', titulo: 'Conseguir equipamento raro', completa: false }
    ] 
  },
  { 
    nome: 'S', 
    nivel: 2, 
    min: 25001, 
    max: 35000, 
    missoes: [
      { id: 'S2-1', titulo: 'Subir de nível', completa: false },
      { id: 'S2-2', titulo: 'Derrotar chefe de nível 2', completa: false },
      { id: 'S2-3', titulo: 'Completar missão diária', completa: false }
    ] 
  },
  { 
    nome: 'S', 
    nivel: 3, 
    min: 35001, 
    max: 45000, 
    missoes: [
      { id: 'S3-1', titulo: 'Subir de nível', completa: false },
      { id: 'S3-2', titulo: 'Derrotar chefe de nível 3', completa: false },
      { id: 'S3-3', titulo: 'Coletar artefato raro', completa: false }
    ] 
  },
  { 
    nome: 'S', 
    nivel: 4, 
    min: 45001, 
    max: 55000, 
    missoes: [
      { id: 'S4-1', titulo: 'Subir de nível', completa: false },
      { id: 'S4-2', titulo: 'Vencer inimigo lendário', completa: false },
      { id: 'S4-3', titulo: 'Treinar com mestre avançado', completa: false }
    ] 
  },
  { 
    nome: 'S', 
    nivel: 5, 
    min: 55001, 
    max: 65000, 
    missoes: [
      { id: 'S5-1', titulo: 'Subir de nível', completa: false },
      { id: 'S5-2', titulo: 'Completar missão especial', completa: false },
      { id: 'S5-3', titulo: 'Coletar item épico', completa: false }
    ] 
  },
  { 
    nome: 'S', 
    nivel: 6, 
    min: 65001, 
    max: 75000, 
    missoes: [
      { id: 'S6-1', titulo: 'Derrotar chefe de nível 6', completa: false },
      { id: 'S6-2', titulo: 'Subir de nível', completa: false },
      { id: 'S6-3', titulo: 'Completar 3 desafios', completa: false }
    ] 
  },
  { 
    nome: 'S', 
    nivel: 7, 
    min: 75001, 
    max: 85000, 
    missoes: [
      { id: 'S7-1', titulo: 'Subir de nível', completa: false },
      { id: 'S7-2', titulo: 'Derrotar chefe de nível 7', completa: false },
      { id: 'S7-3', titulo: 'Conseguir equipamento lendário', completa: false }
    ] 
  },
  { 
    nome: 'S', 
    nivel: 8, 
    min: 85001, 
    max: 95000, 
    missoes: [
      { id: 'S8-1', titulo: 'Completar missão diária', completa: false },
      { id: 'S8-2', titulo: 'Treinar com mestre', completa: false },
      { id: 'S8-3', titulo: 'Coletar artefato raro', completa: false }
    ] 
  },
  { 
    nome: 'S', 
    nivel: 9, 
    min: 95001, 
    max: 105000, 
    missoes: [
      { id: 'S9-1', titulo: 'Subir de nível', completa: false },
      { id: 'S9-2', titulo: 'Derrotar chefe de nível 9', completa: false },
      { id: 'S9-3', titulo: 'Coletar item lendário', completa: false }
    ] 
  },
  { 
    nome: 'S', 
    nivel: 10, 
    min: 105001, 
    max: 115000, 
    missoes: [
      { id: 'S10-1', titulo: 'Subir de nível máximo', completa: false },
      { id: 'S10-2', titulo: 'Derrotar chefe final', completa: false },
      { id: 'S10-3', titulo: 'Completar todas as missões', completa: false }
    ] 
  },
]

  // 4️⃣ Cálculos baseados no XP
  const rankAtual = computed(() => {
    return rankData.find(r => xpAtual.value >= r.min && xpAtual.value <= r.max)?.nome || 'E'
  })

  const proximoRank = computed(() => {
    const r = rankData.find(r => xpAtual.value >= r.min && xpAtual.value <= r.max)
    if (!r) return 'MAX'
    const index = rankData.indexOf(r)
    return rankData[index + 1]?.nome || 'MAX'
  })

  const xpClasse = computed(() => {
    const r = rankData.find(r => xpAtual.value >= r.min && xpAtual.value <= r.max)
    return r ? r.max - r.min + 1 : 1000
  })

  const xpRelativo = computed(() => {
    const r = rankData.find(r => xpAtual.value >= r.min && xpAtual.value <= r.max)
    return r ? xpAtual.value - r.min : 0
  })

  const xpMin = computed(() => {
    const r = rankData.find(r => xpAtual.value >= r.min && xpAtual.value <= r.max)
    return r?.min ?? 0
  })

  const xpMax = computed(() => {
    const r = rankData.find(r => xpAtual.value >= r.min && xpAtual.value <= r.max)
    return r?.max ?? 1000
  })

  const nivelAtualS = computed(() => {
    const sRank = rankData.find(r =>
      r.nome === 'S' && r.nivel !== undefined &&
      xpAtual.value >= r.min && xpAtual.value <= r.max
    )
    return sRank?.nivel ?? null
  })

  const proximoNivelS = computed(() => {
    const r = rankData.find(r => xpAtual.value >= r.min && xpAtual.value <= r.max)
    if (!r) return null
    const index = rankData.indexOf(r)
    const next = rankData[index + 1]
    return next?.nivel ?? null
  })

  const missoesAtuais = computed(() => {
    const r = rankData.find(r => xpAtual.value >= r.min && xpAtual.value <= r.max)
    return r?.missoes.filter(m => !m.completa) || []
  })


const xpVisual = ref(0)
const mostrarEstrela = ref(false)
const mostrarRankUp = ref(false)
const rankAnterior = ref('E')

function animarXP() {
    xpVisual.value = 0
    const destino = (xpRelativo.value / xpClasse.value) * 100

    const anim = setInterval(() => {
        if (xpVisual.value < destino) {
            xpVisual.value += 1
        } else {
            clearInterval(anim)
            mostrarEstrela.value = true

            if (rankAtual.value !== rankAnterior.value) {
                mostrarRankUp.value = true
                rankAnterior.value = rankAtual.value

                setTimeout(() => {
                    mostrarRankUp.value = false
                }, 3000)
            }

            setTimeout(() => {
                mostrarEstrela.value = false
            }, 600)
        }
    }, 10)
}

onMounted(() => {
    rankAnterior.value = rankAtual.value
    nextTick(animarXP)
})
</script>

<template>
    <div class="float-xp-section">
        <label>XP Atual</label>
        <div class="float-xp-bar">
            <div class="float-xp-progress" :style="{ width: xpVisual + '%' }">
                <transition name="float-star">
                    <span v-if="mostrarEstrela" class="star"></span>
                </transition>
            </div>
        </div>

        <div class="float-xp-text">
            {{ xpAtual }} – {{ xpMax }}

        </div>
    </div>

    <transition name="rankup-fade">
        <div v-if="mostrarRankUp" class="rankup-modal">
            🎖️ <strong>Rank Up!</strong><br />
            Agora você é Rank {{ rankAtual }}
        </div>
    </transition>
</template>

<style scoped>
.float-xp-section {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    font-family: 'Orbitron', sans-serif;
}

.float-xp-bar {
    background: #00000015;
    height: 10px;
    border-radius: 10px;
    margin-top: 5px;
    overflow: hidden;
    position: relative;
}
.dark-mode .float-xp-bar {
  background: #4c4c4c;
}

.float-xp-progress {
    height: 100%;
    background: var(--player-color);
    border-radius: 12px;
    transition: width 0.2s ease-out;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 6px;
    position: relative;
}

.float-xp-text {
    text-align: right;
    font-size: 0.9rem;
    color: #000;
    margin: 0.25rem 0 1rem 0;
}
.dark-mode .float-xp-text {
  color: #fff;
}

.star {
    font-size: 1.1rem;
    color: #ffd700;
    animation: flutuar 0.6s ease-out forwards;
}

@keyframes flutuar {
    0% {
        transform: translateY(0) scale(1);
        opacity: 1;
    }

    100% {
        transform: translateY(-24px) scale(1.3);
        opacity: 0;
    }
}

.float-star-enter-active,
.float-star-leave-active {
    transition: opacity 0.3s;
}

.float-star-enter-from,
.float-star-leave-to {
    opacity: 0;
}

.rankup-modal {
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #8d00ab;
    color: #fff;
    padding: 1.5rem 2rem;
    border-radius: 10px;
    font-size: 1.4rem;
    font-weight: bold;
    text-align: center;
    z-index: 999;
    box-shadow: 0 0 12px #b800ff;
    animation: popscale 0.4s ease-out;
}

@keyframes popscale {
    0% {
        transform: translate(-50%, -50%) scale(0.5);
        opacity: 0;
    }

    100% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
    }
}

.rankup-fade-enter-active,
.rankup-fade-leave-active {
    transition: opacity 0.4s ease;
}

.rankup-fade-enter-from,
.rankup-fade-leave-to {
    opacity: 0;
}
</style>
