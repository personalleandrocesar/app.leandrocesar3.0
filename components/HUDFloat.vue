<template>
  <div
    class="central-button"
    ref="circle"
    :class="{ fixed: !wasMoved }"
    :style="wasMoved ? { top: position.y + 'px', left: position.x + 'px' } : {}"
    @mousedown="startDrag"
    @touchstart="startDrag"
  >
    <NuxtLink 
      @click="menu" 
      @mousedown.prevent="startLongPress" 
      @mouseup="cancelLongPress" 
      @mouseleave="cancelLongPress"
      @touchstart.prevent="startLongPress" 
      @touchend="cancelLongPress" 
      class="circle"
    >
      HUD
    </NuxtLink>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const position = ref({ x: 100, y: 100 })
const dragging = ref(false)
const offset = ref({ x: 0, y: 0 })
const wasMoved = ref(false)
const circleSize = 55

let longPressTimer = null

// posição inicial em proporção da tela
const initialRatio = { x: 0.5007342143906021, y: 0.8865598027127004 }

function getClientXY(e) {
  if (e.type.startsWith("touch")) {
    const touch = e.touches[0] || e.changedTouches[0]
    return { x: touch.clientX, y: touch.clientY }
  }
  return { x: e.clientX, y: e.clientY }
}

// --- salvar proporção ---
function savePosition() {
  const vw = window.innerWidth
  const vh = window.innerHeight
  const percentX = position.value.x / vw
  const percentY = position.value.y / vh

  localStorage.setItem('circlePos', JSON.stringify({ x: percentX, y: percentY }))
  localStorage.setItem('circleMoved', 'true')
}

function loadPosition() {
  const saved = localStorage.getItem('circlePos')
  const moved = localStorage.getItem('circleMoved')

  if (saved && moved === 'true') {
    const { x, y } = JSON.parse(saved)
    position.value = {
      x: x * window.innerWidth,
      y: y * window.innerHeight
    }
    wasMoved.value = true
  } else {
    // 👉 usa posição inicial padrão
    position.value = {
      x: window.innerWidth * initialRatio.x,
      y: window.innerHeight * initialRatio.y
    }
    wasMoved.value = true
  }
}

const startDrag = (e) => {
  const { x, y } = getClientXY(e)
  dragging.value = true
  offset.value = {
    x: x - position.value.x,
    y: y - position.value.y
  }
}

const onDrag = (e) => {
  if (!dragging.value) return
  const { x, y } = getClientXY(e)

  let newX = x - offset.value.x
  let newY = y - offset.value.y

  const maxX = window.innerWidth - circleSize
  const maxY = window.innerHeight - circleSize

  if (newX < 0) newX = 0
  if (newY < 0) newY = 0
  if (newX > maxX) newX = maxX
  if (newY > maxY) newY = maxY

  position.value = { x: newX, y: newY }
  wasMoved.value = true
}

const stopDrag = () => {
  if (!dragging.value) return
  dragging.value = false
  savePosition()
}

// clique longo → resetar posição
const startLongPress = () => {
  cancelLongPress()
  longPressTimer = setTimeout(() => {
    resetToFixed()
  }, 2000)
}

const cancelLongPress = () => {
  if (longPressTimer) {
    clearTimeout(longPressTimer)
    longPressTimer = null
  }
}

const resetToFixed = () => {
  wasMoved.value = false
  localStorage.removeItem('circlePos')
  localStorage.removeItem('circleMoved')
  console.log("HUD resetado para posição fixa")
}

onMounted(() => {
  window.addEventListener('mousemove', onDrag)
  window.addEventListener('mouseup', stopDrag)
  window.addEventListener('touchmove', onDrag)
  window.addEventListener('touchend', stopDrag)

  // carregar posição proporcional ou inicial
  loadPosition()

  // atualizar posição proporcional ao resize
  window.addEventListener('resize', loadPosition)
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
  window.removeEventListener('touchmove', onDrag)
  window.removeEventListener('touchend', stopDrag)
  window.removeEventListener('resize', loadPosition)
  cancelLongPress()
})

const menu = () => {
  console.log("Abrir menu HUD")
}
</script>



<style scoped>
.central-button {
  z-index: 9999;
  position: fixed;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
}

.central-button.fixed {
  position: fixed;
  top: -30px;
  left: 50%;
  transform: translateX(-50%); /* corrige deslocamento horizontal */
}
.central-button:not(.fixed) {
  position: absolute;
}

.circle {
    background: #020024;
    color: white;
    border-radius: 50%;
    width: 55px;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 13px;
    box-shadow: 0 4px 10px var(--player-color);
    border: 4px solid var(--player-color);
}
.circle:active {
    cursor: grabbing;
    border: 4px solid #0097a7;
    box-shadow: 0 4px 10px #0097a7;
}
</style>
