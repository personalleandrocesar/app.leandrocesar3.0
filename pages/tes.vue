<template>
  <div class="container">
    <div class="resizable-box" ref="box">
      <div class="resizer" ref="resizer"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'

const box = ref(null)
const resizer = ref(null)

onMounted(() => {
  let startX, startY, startWidth, startHeight

  const mouseDownHandler = (e) => {
    e.preventDefault()

    startX = e.clientX
    startY = e.clientY
    startWidth = parseInt(getComputedStyle(box.value).width, 10)
    startHeight = parseInt(getComputedStyle(box.value).height, 10)

    window.addEventListener('mousemove', mouseMoveHandler)
    window.addEventListener('mouseup', mouseUpHandler)
  }

  const mouseMoveHandler = (e) => {
    box.value.style.width = `${startWidth + e.clientX - startX}px`
    box.value.style.height = `${startHeight + e.clientY - startY}px`
  }

  const mouseUpHandler = () => {
    window.removeEventListener('mousemove', mouseMoveHandler)
    window.removeEventListener('mouseup', mouseUpHandler)
  }

  resizer.value.addEventListener('mousedown', mouseDownHandler)

  onBeforeUnmount(() => {
    resizer.value.removeEventListener('mousedown', mouseDownHandler)
    window.removeEventListener('mousemove', mouseMoveHandler)
    window.removeEventListener('mouseup', mouseUpHandler)
  })
})
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #111;
}

.resizable-box {
  width: 250px;
  height: 180px;
  border: 2px solid #00bcd4;
  background: #222;
  position: relative;
  box-shadow: 0 0 10px rgba(0, 188, 212, 0.5);
  transition: box-shadow 0.2s;
}

.resizable-box:hover {
  box-shadow: 0 0 15px rgba(0, 188, 212, 0.8);
}

.resizer {
  width: 14px;
  height: 14px;
  background: #00bcd4;
  position: absolute;
  right: 0;
  bottom: 0;
  cursor: se-resize;
  border-top-left-radius: 3px;
  box-shadow: 0 0 4px #00bcd4;
}
</style>

