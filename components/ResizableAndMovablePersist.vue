<template>
  <div class="container">
    <!-- Botão para criar novas caixas -->
    <button class="create-btn" @click="createBox">＋ Nova Caixa</button>

    <!-- Renderiza as caixas salvas -->
    <div
      v-for="(box, index) in boxes"
      :key="box.id"
      class="resizable-movable"
      :style="{
        top: box.top + 'px',
        left: box.left + 'px',
        width: box.width + 'px',
        height: box.height + 'px'
      }"
      @mousedown="startMove($event, index)"
      ref="boxRefs"
    >
      <p>Caixa {{ index + 1 }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

const boxes = ref([]) // armazena as caixas
const boxRefs = ref([]) // refs para as divs

// 🔹 Carrega do localStorage ao iniciar
onMounted(() => {
  const saved = localStorage.getItem('boxes')
  if (saved) boxes.value = JSON.parse(saved)
})

// 🔹 Salva sempre que boxes mudar
watch(
  boxes,
  (val) => localStorage.setItem('boxes', JSON.stringify(val)),
  { deep: true }
)

// 🔹 Cria uma nova caixa
const createBox = () => {
  const newBox = {
    id: Date.now(),
    top: 100 + Math.random() * 200,
    left: 100 + Math.random() * 200,
    width: 240,
    height: 160,
  }
  boxes.value.push(newBox)
}

// 🔹 Movimento com Ctrl pressionado
let isMoving = false
let startX, startY, startLeft, startTop, currentIndex

const startMove = (e, index) => {
  if (!e.ctrlKey) return // só move com Ctrl
  e.preventDefault()

  isMoving = true
  currentIndex = index
  startX = e.clientX
  startY = e.clientY

  const box = boxes.value[index]
  startLeft = box.left
  startTop = box.top

  document.addEventListener('mousemove', moveBox)
  document.addEventListener('mouseup', stopMove)
}

const moveBox = (e) => {
  if (!isMoving) return

  const dx = e.clientX - startX
  const dy = e.clientY - startY

  const box = boxes.value[currentIndex]
  box.left = startLeft + dx
  box.top = startTop + dy
}

const stopMove = () => {
  isMoving = false
  document.removeEventListener('mousemove', moveBox)
  document.removeEventListener('mouseup', stopMove)
}

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', moveBox)
  document.removeEventListener('mouseup', stopMove)
})
</script>

<style scoped>
.container {
  height: 100vh;
  width: 100vw;
  background: #111;
  position: relative;
  overflow: hidden;
  font-family: sans-serif;
}

.create-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  background: #00bcd4;
  border: none;
  padding: 10px 16px;
  color: #fff;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 188, 212, 0.5);
  transition: 0.2s;
}

.create-btn:hover {
  background: #03e9f4;
  box-shadow: 0 0 15px rgba(3, 233, 244, 0.8);
}

.resizable-movable {
  position: absolute;
  border: 2px solid #00bcd4;
  background: #222;
  color: #00bcd4;
  text-align: center;
  resize: both;
  overflow: auto;
  user-select: none;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 188, 212, 0.6);
  transition: box-shadow 0.2s ease;
}

.resizable-movable:hover {
  box-shadow: 0 0 18px rgba(0, 188, 212, 0.8);
}

p {
  margin-top: 50px;
  font-size: 14px;
  line-height: 1.4;
}
</style>

