<template>

  <div class="body-date">
    <span>
      03/01
    </span>
  </div>
  <div class="body">
      <div class='main-logo ' >
          <img src="~/assets/feedTwo.jpg" alt="Foto da logo do Personal Leandro Cesar.">
      </div>
        <div class="main-text">
            
            <p>
              Bora fazer uma avaliação?
            </p>
            <p>
                A avaliação física é importante pra ver como está sua composição
                corporal atual (percentual de gordura, massa magra).
                <br>
                <br>
                O ideal é fazer de 3 em 3 meses, para ver se você está
                progredindo nos treinos!
                <br>
                <br>
                Marque agora mesmo, clicando no botão abaixo!
                <br>
                <br>
            </p>
            <a href="https://cal.com/leandrocesar/personal" target="_blank">
                 Agendar <Icon name="ic:baseline-keyboard-arrow-right" />
            </a>
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
  justify-content: center;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  height: 100px;
  box-shadow: 1px 7px 20px #8d00ab30;
  margin: 3rem 0rem;
  border-radius: 7px;
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



a {
    transition: all .4s linear;
    border: solid 1px #8d00ab10;
    box-shadow: 0 0px 5px #8d00ab10;
    border-radius: 8px;
    cursor: pointer;
    width: 120px;
    text-align: center;
    line-height: 4px;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.2s ease-in-out 0s;
    height: 34px;
    font-size: 16px;
    padding-inline: 8px;
    padding-top: 7px;
    padding-bottom: 8px;
    backdrop-filter: blur(15px);
    margin: -2rem auto 1rem auto;
  }

  a .icon {
    margin-top: -1px;
    margin-left: -4px;
    transition: all 0.2s ease-in-out 0s;
    margin-right: -2px;
  }
  
  a:hover {
    background-color: #8d00ab10;
}
  a:hover .icon {
  transform:translateX(4px)
}

.nav:hover a {
    color: #8d00ab80;

}
</style>
