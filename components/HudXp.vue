<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { usePlayerRank } from '@/composables/usePlayerRank'
const route= useRoute()
const {
  xpAtual,
  rankAtual,
  proximoRank,
  nivelAtualS,
  proximoNivelS,
  xpClasse,
  xpRelativo,
  xpMin,
  xpMax,
  missoesAtuais
} = await usePlayerRank(route.params.id, route.params.iddd)


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
