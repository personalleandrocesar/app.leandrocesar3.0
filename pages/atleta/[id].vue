<template>
    <NuxtPage/>
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
    
    .left-column img {
        display: flex;
        height: 100vh;
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