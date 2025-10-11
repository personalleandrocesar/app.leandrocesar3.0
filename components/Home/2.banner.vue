<script setup>

</script>

<template>
        <!-- <div class="hr"></div> -->
        <div class='main'>
            <!-- <img src='~/assets/treino-hard.webp'> -->
            <h3>
                Seu próximo
                <br>
                Treino Diário
            </h3>  
            
            <p>
                Nex_Wod é sua plataforma de treinos online! Treinos diários na palma da sua mão, rápidos e sem complicação. 
                
            </p>
            <p>
                Supere seus limites!
            </p>
            <div class='treinos'>
                <NuxtLink to='/treinos' ><Icon name='mdi:kettlebell'/>Treinos <Icon name='ic:twotone-keyboard-arrow-right'/></NuxtLink>
                <!-- <img src='~/assets/googleplay.svg'> -->
            </div>
        </div>
</template>
<style scoped>
.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;    
    background: 
    linear-gradient(#8d00ab, #8d00ab10, #8d00ab40, #8d00ab),
        url(~/assets/treino-hard.jpg);
    background-repeat: no-repeat;
        background-size: 100%;
        height: 420px;
        box-shadow: 8px 8px 8px #8d00ab, -8px 8px 8px #8d00ab;
}


.main h3 {
    margin-top:1rem;
    color: #fff;
    font-family: 'Gagalin';
    font-size: 2.5rem;
    letter-spacing: 1px;
    color: #8d00ab;
    text-align: center;
    font-weight: normal;
    z-index: 1000;
    text-shadow: 2px 2px 2px #ddd,-2px -2px 2px #ddd;
}

.main p {
    z-index: 100;
    margin: 2rem 1rem 0rem 1rem;
    font-family: 'Ubuntu';
    letter-spacing: 1px;
    font-size: 1.2rem;
    font-weight: normal;
    text-align: center;
    color: #fff;
    text-shadow: 2px 2px 2px #020024;
}

.main a {
    padding: 10px 35px;
    background: transparent;
    color: #fff;
    border-radius: 4px;
    border: solid .7px #fff;
}

.main a:hover {
    background: #b800ff;
}
.main img {
    margin-top: 40px;
    background: transparent;
    color: #fff;
    border-radius: 4px;
}

.hr {
    height: 1px;
    box-shadow: 0px 30px 20px #8d00ab90;
}

.treinos {
    margin-top: 2rem;
}

.treinos .icon {
    zoom: 1.4;
    margin: -3px 3px 0 0 ;
}

</style>