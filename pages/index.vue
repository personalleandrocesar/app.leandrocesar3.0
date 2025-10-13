<script setup>
useHead({
    titleTemplate: 'Nx_WOD',
})

const { selectedColor, selectedClass, classColors, resetColorToDefault } = usePlayerColor()

// useHead em forma de função — reativo por conta do selectedColor
useHead(() => ({
  meta: [
    {
      name: 'theme-color',
      // se selectedColor for um ref, .value dá a string; fallback para a var CSS ou cor padrão
      content: selectedColor?.value
        || getComputedStyle(document.documentElement).getPropertyValue('--player-color').trim()
        || '#7CFF89'
    }
  ]
}))

// garante valor inicial caso o composable não tenha setado
onMounted(() => {
  if (!selectedColor?.value) {
    selectedColor.value = getComputedStyle(document.documentElement).getPropertyValue('--player-color').trim() || '#7CFF89'
  }
})
</script>

<template>
  <div>
    <div class="grid-container">
      <div class="left-column desktop">
        <img src="~/assets/treino-hard.jpg">
      </div>
      <div class="right-column">
        <Login />
      </div>
    </div>
  </div>

</template>

<style scoped>

/* Exibe apenas no desktop */
.desktop {
  display: block;
}
.mobile {
  display: none;
}


@media (min-width: 1001px) {
  .grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr; /* Define duas colunas iguais */
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    height: 100vh; /* Limita o tamanho ao viewport */
    overflow: hidden; /* Previne que o conteúdo ultrapasse a borda */
  }

  .left-column, .right-column {
    text-align: center;
  }
  
  .right-column {
    overflow-y: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .left-column img {
    display: flex;
    height: 100vh;
    width: 100%;
    object-fit: cover;
    border-right: solid 2px var(--player-color);
  }
}

@media (max-width: 1000px) {
    .desktop {
      display: none;
    }
  .grid-container {
    display: grid;
    grid-template-columns: 1fr; /* Define uma coluna */
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    height: 100vh; /* Limita o tamanho ao viewport */
    overflow: hidden; /* Previne que o conteúdo ultrapasse a borda */
  }

  .left-column {
    text-align: center;
  }
  
  .dark-mode .right-column {
     text-align: center;
     /*background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('~/assets/treino-hard.jpg');*/
     background-size: cover; /* cobre toda a tela */
       background-position: center; /* centraliza a imagem */
       background-repeat: no-repeat; /* não repete */
   }
  
 .right-column {
    text-align: center;
    /*background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('~/assets/treino-hard.jpg');*/
    background-size: cover; /* cobre toda a tela */
      background-position: center; /* centraliza a imagem */
      background-repeat: no-repeat; /* não repete */
      display: flex;
        justify-content: center;
        align-items: center;
  }

  .left-column img {
    display: none;
  }
}

</style>
