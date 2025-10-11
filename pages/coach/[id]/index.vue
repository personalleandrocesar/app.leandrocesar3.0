<script setup>

// Configurar a tag <head>
useHead({
  titleTemplate: 'Home | app.leandrocesar.com',
});
</script>

<template>
  
</template>


<style scoped>
html, body {
    height: 100%; /* Garante que o body ocupe toda a altura */
    overflow-y: auto; /* Habilita o scroll vertical */
}

.div-bar {
    margin: 40px 0;   
}

.c-pie {
      width: 270px; /* Largura desejada */
      height: 270px; /* Altura desejada */
      margin: 0 auto; /* Centraliza o gráfico */
      color: #fff;
}
.c-bar {
      width: 300px; /* Largura desejada */
      height: 300px; /* Altura desejada */
      margin: 0 auto; /* Centraliza o gráfico */
      color: #fff;
}
.c-dog {
      width: 250px; /* Largura desejada */
      height: 250px; /* Altura desejada */
      margin: 0 auto; /* Centraliza o gráfico */
      color: #fff;
}
.c-dog:nth-child(1) {
      margin: 0px auto 0 auto; /* Centraliza o gráfico */
      color: #fff;
}
.c-bar-vertical {
      width: 240px; /* Largura desejada */
      height: 240px; /* Altura desejada */
      margin: 0 auto; /* Centraliza o gráfico */
      color: #fff;
}

.layout-no-sidebar {
  display: grid;
  grid-template-rows: auto 1fr; /* Barra fixa e conteúdo */
  height: 100vh; /* Altura total da viewport */
}

.topbar {
  color: white;
  height: 60px;
  text-align: center;
  position: sticky;
  top: 0;
  border-bottom: solid .1px #00dc8230;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 10; /* Garante que a barra fique visível acima do conteúdo */
}
.topbar div{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
}

.topbar h3 {
    margin-left: 2rem;
}
.topbar h4 {
    color: #777;
    margin-left: .2rem;
    padding: 4px 6px;
    border-radius: 8px;
    background: #00dc8280;
}

.topbar .icon {
    zoom: 1.1;
    margin-right: 1.5rem;
    transition: color .3s linear; 
    color: #0f172a83;
}

.dark-mode .topbar .icon {
    color: #fff;
}

.topbar .icon:hover {
    color: #00dc82;
    cursor: pointer;
}

.dark-mode .topbar h4 {
    color: #fff;
}

.content {
  overflow-y: auto; /* Adiciona scroll vertical no conteúdo */

}

.nav {
    height: 70px;
    width: 100%;
    border-bottom: solid .1px #00dc8230;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top:0;
    backdrop-filter: blur(50px);
}
.nav div{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.nav h3 {
    margin-left: 15px;
    
}
.head {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
.head div {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.head {
    text-align: left;
}
span {
    font-size: 0.7rem;
}

.img-coach {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 75px;
    width: 75px;
    border-radius: 50%;
    margin: .5rem;
    background: linear-gradient(
        90deg,
        rgba(0, 212, 255, 1) 0%,
        rgba(141, 0, 171, 1) 35%,
        rgba(0, 212, 255, 1) 100%
    );
}

.img-coach img {
    height: 67px;
    width: 67px;
    border-radius: 200px;
}

.box-rectangle-team {
    margin: 8px;
}

.rectangle {
    border: solid 2px #00dc8210;
    box-shadow:
        2px 2px 15px #00dc8290,
        -2px -2px 15px #00dc8290;
    padding: 20px;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: #00dc82;
    transition: all 0.3s linear;
}

.rectangle div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
.rectangle .intern {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
}

.rectangle .status {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    text-align: left;
}

.rectangle .status h4:nth-child(1) {
    color: #00d4ff;
}
.rectangle .status h4:nth-child(2) {
    color: #ccc;
}

.rectangle:hover {
    background: #04be7a;
}

.rectangle .intern h3,
.rectangle .intern h2 {
    color: #fff;
}

.rectangle .intern {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: left;
}

.rectangle .intern {
    margin-left: 15px;
}

.rectangle .icon {
    zoom: 3;
    background: #eee;
    color: #00dc82;
    padding: 5px;
    border-radius: 50%;
    box-shadow: 0px 0px 3px 3px #ffffff50;
}
.box-square-team {
    margin: 0 8px;
}

.box-square-team {
    margin: 0 8px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.aluno-card {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
}

.aluno-foto {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    margin-right: 1rem;
}

.box-square-presencial {
    margin: 0 8px;
}

.box-square-presencial {
    margin: 0 8px;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
.box-square-on-line {
    margin: 0 8px;
}

.box-square-on-line {
    margin: 0 8px;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.square {
    border: solid 2px #00dc8210;
    box-shadow:
        2px 2px 2px #00dc8290,
        -2px -2px 2px #8d0aab90;
    border-radius: 8px;
    width: 49%;
    padding: 20px 10px 10px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    transition: opacity 0.3s linear;
}

.square:hover {
    opacity: 0.7;
}

.square .intern {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: center;
    margin-top: 10px;
}
.square .intern div {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    text-align: center;
}
.square .intern div h4 {
    padding: 0 4px;
}
.square .intern div h4:nth-child(1) {
    color: green;
}
.square .intern div h4:nth-child(2) {
    color: red;
}

.intern h3 {
    margin-bottom: 5px;
}

.square .icon {
    zoom: 2;
    color: #fff;
    padding: 5px;
    border-radius: 50%;
    box-shadow: 0px 0px 3px 3px #ffffff50;
}

.square:nth-child(1) .icon {
    background: #00d4ff;
}
.square:nth-child(2) .icon {
    background: #ccc;
}

.atletas {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    text-align: left;
}
.v-for {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    text-align: left;
    border: solid 1px #00dc8210;
    box-shadow:
        1px 1px 1px #00dc8290,
        -1px -1px 1px #8d0aab90;
    border-radius: 8px;
    margin: 1.5%;
    transition: all 0.3s linear;
}

.div-v-for {
    
    height: 350px;
    overflow-y: auto;
}

.v-for:hover {
    background: #00dc8230;
}

.atletas div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 0 15px 0 0;
}

.v-for:nth-child(2n) {
    background: #00dc8210;
}

.v-for:nth-child(2n):hover {
    background: #00dc8230;
}

.atletas .img-coach {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 45px;
    width: 45px;
    border-radius: 50%;
    margin: .4rem;
    background: linear-gradient(
        90deg,
        rgba(0, 212, 255, 1) 0%,
        rgba(141, 0, 171, 1) 35%,
        rgba(0, 212, 255, 1) 100%
    );
}

.atletas .img-coach img {
    height: 41px;
    width: 41px;
    border-radius: 200px;
}

@media (min-width: 1001px) {
    .grid-container {
        display: grid;
        grid-template-columns: .4fr 0.5fr 0.4fr; /* Define duas colunas iguais */
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        gap: 1px;
        overflow-y: auto;
    }

    .left-column {
        text-align: center;
        overflow-y: auto;
    }
    .container, .content {
        overflow: auto; /* Garante que o conteúdo não seja cortado */
    }
    .right-column {
        text-align: center;
        max-height: 100vh; /* Altura máxima permitida */
        overflow-y: auto; /* Corta o conteúdo excedente */
        
    }
}
@media (max-width: 1000px) {
    .grid-container {
        display: grid;
        grid-template-columns: 1fr; /* Define duas colunas iguais */
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    .left-column,
    .right-column {
        text-align: center;
    }
    
    canvas {
        color: #fff;
    }

    .left-column img {
        display: flex;
        width: 100%;
        object-fit: cover;
    }

    .left-column img {
        display: none;
    }
}
</style>
