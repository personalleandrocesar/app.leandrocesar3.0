<template>
  <div 
    v-if="menuAberto"
    class="overlay"
    @click.self="fecharMenu"
  >
    <div class="menu-flutuante">
      <h2>Menu</h2>
      <p>Conteúdo do menu...</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const menuAberto = ref(true)

function fecharMenu() {
  menuAberto.value = false
}
</script>

<style scoped>
.overlay {
  display: grid;
  place-items: center; /* centraliza o menu no grid */
  width: 100%;
  height: 100vh;
  background: rgba(0,0,0,0.3); /* escurece o fundo */
}

.menu-flutuante {
  width: 300px;
  height: 200px;
  background: white;
  border-radius: 8px;
  padding: 20px;
}
</style>
