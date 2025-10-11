<template>
        <div>
        <div class="grid-container">
        <div class="left-column"><img src='~/assets/treino-hard.jpg'></div>
          <div class="right-column"><Atleta1Index /></div>
        </div>
        </div>
</template>
<style scopde>
@media (min-width: 1001px) {
    
    .grid-container {
        display: grid;
        grid-template-columns: 1fr 1fr; /* Define duas colunas iguais */
        box-sizing: border-box;
        padding:0;
        margin:0;
    }
    
    .left-column, .right-column {
        text-align: center;
    }
    .right-column {
        max-height: 100vh; /* Altura máxima permitida */
          overflow-y: auto; /* Corta o conteúdo excedente */
    }
    
    .left-column img {
        display: flex;
        height: 100vh;
        width: 100%;
        object-fit: cover;
    }
}
@media (max-width: 1000px) {
    
    .grid-container {
        display: grid;
        grid-template-columns: 1fr; /* Define duas colunas iguais */
        box-sizing: border-box;
        padding:0;
        margin:0;
    }
    
    .left-column, .right-column {
        text-align: center;
    }
    
    .left-column img {
        display: flex;
        height: 100vh;
        width: 100%;
        object-fit: cover;
    }

    .left-column img {
        display: none;
    }
}
</style>