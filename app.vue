<script setup>
const pop = useCookie('pop', { maxAge: 7889400 })
pop.value = pop.value

const popOk = () => {
  return pop.value = "ok"
}

const popView = () => {
  if (pop.value === 'ok') {
    return false
  } return true
}
</script>
<template>
  <NuxtLoadingIndicator color='repeating-linear-gradient(to right,#ffffff 0%,var(--player-color) 50%,var(--player-color)100%)' /> <!-- here -->
  <div>
    <NuxtPage/>
  </div>
  <footer>

    <div v-if="popView()" class="pop-up">
      <p>
        Neste app, usamos cookies e outras tecnologias semelhantes para melhorar sua
        experiência e facilitar certos tipos de vantagens de navegação.
        Ao clicar no botão abaixo, você está ciente e concordando com estas funcionalidades.
      </p>
      <div class="button-pop" @click="popOk()">PROSSEGUIR!</div>
    </div>
  </footer>
</template>
<style scoped>
 
.pop-up {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px 20px 20px 20px;
  padding: 15px;
  border-radius: 8px;
  position: fixed;
  bottom: 10px;
  width: 80%;
  left: 50%;
  background-color: #fff; 
  color: #000;
  margin-left: -40%;
  font-weight: 900;
  border: solid 1px #00000040;
  z-index: 10000;
}

.dark-mode .pop-up {
  background-color: #0f141e;
  color: #000;
  border: solid 1px #777777;
}

.pop-up p {
  font-weight: 700;
  font-weight: 900;
  font-size: 13px;
  color: #000;
}
.dark-mode .pop-up p {
  color: #fff;
}

.button-pop {
  margin: 7px auto 0 auto;
  transition: all .4s linear;
  border: solid 1px var(--player-color);
  box-shadow: 0 0px 5px var(--player-color)10;
  border-radius: 8px;
  cursor: pointer;
  width: 50%;
  text-align: center;
  border: solid 1px #dadada;
  color: #000;
}

.dark-mode .button-pop {
  color: #fff;
}

.button-pop:hover {
  border: solid 1px #fff;
}
</style>
