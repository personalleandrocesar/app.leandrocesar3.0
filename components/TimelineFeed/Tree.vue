<script setup>
 const colorMode = useColorMode()

function theme() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
}
 
</script>
<template>


  <div class="body-date">
    <span>
     18/02
    </span>
  </div>
  <div class="body">
      <div class='main-logo ' >
<a @click="theme()"  >


        <Icon :name="colorMode.value === 'dark' ? 'line-md:moon-filled-to-sunny-filled-loop-transition' : 'line-md:sunny-filled-loop-to-moon-alt-filled-loop-transition'"/> 
</a>
<a @click="theme()" :model="$colorMode.value" >


        <Icon :name="colorMode.value === 'light' ? 'line-md:moon-filled-to-sunny-filled-loop-transition' : 'line-md:sunny-filled-loop-to-moon-alt-filled-loop-transition'"/>
</a>        
      </div>
        <div class="main-text">
            
            <p>
              Modo de cor Ativado!!
            </p>
            <p>
              Funcionalidade Nova, <br>junto com um visual um pouco mais clean!
              <br><br>
              Só clicar em um dos ícones que estão em destaque, no canto inferior 
              esquerdo e pronto!
              <br><br> 
              Já muda pro tema dark ou light na hora!
            <br><br>
            Falta só ajustar um pouco os espaços e o contrate!
            <br><br>
            Mas, o mais importante é treinar!
            <br><br>
            Só vai!!
            <br><br>
            </p>
            
         <div>
      </div>
    </div>
        
  </div>
    
</template>
<style scoped>

.body-date{
  text-align: left;
  margin: 2rem 2rem -30px 2rem;
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
}
  span {
  font-weight: bold;
  }

.body{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  text-align: left;
  margin: 0rem 1.5rem -.5rem 1.5rem;
  border: #8d00ab20 2px solid;
  border-radius: 8px;
}

.main-logo {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  height: 100px;
  margin: 3rem 0rem;
  border-radius: 7px;
}

.main-logo .icon {
  zoom: 1.3;
  margin-right: 20px;
}

.main-logo img {
  height: 100px;
  border-radius: 7px;
  border: #8d00ab 2px solid;
  opacity: 1;
  
}
.body p{
  text-align: left;
  margin: 0 10px 20px 20px;
}

.main-text {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
}




</style>
