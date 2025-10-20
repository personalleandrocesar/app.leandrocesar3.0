<script setup>
import { ref, onMounted } from 'vue'

const url = 'https://app.leandrocesar.com/img/myFotoTwo.jpg'
const imageExists = ref(false)

function checkImageExists(url) {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = url
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
  })
}

onMounted(async () => {
  imageExists.value = await checkImageExists(url)
})
</script>

<template>
  <div>
    <img v-if="imageExists" :src="url" alt="Foto" />
    <p v-else>Imagem não encontrada</p>
  </div>
</template>

