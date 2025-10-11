<script setup>
const route = useRoute()

useHead({
    titleTemplate: 'Nex_Wod',
})

const colorMode = useColorMode()

function theme() {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
}

const colorCookie = useCookie('colorCookie')
if (colorMode.value === "dark") {
  colorCookie.value = "darkCookie"
} else {
 colorCookie.value = "lightCookie"
}
colorCookie.value === "darkCookie" ? colorMode.value = "dark" : colorMode.value ="light"

const main =ref(true)
const buttonIcon =ref(true)

function button () {
  main.value = !main.value
  buttonIcon.value = !buttonIcon.value
}
</script>

<template>

    <div class='box'></div>        
    
    <div class='view'>        
    
        <div class='nav'>
            <div>
            
                <div v-if='buttonIcon' @click='button' class='button'>
                    <Icon name='ic:baseline-menu' />                    
                </div>
                <div v-else @click='button' class='button'>
                    <Icon name='ic:outline-close' />                    
                </div>
                
            </div>
                        
            <NuxtLink to='/'>
            
                <img src="~assets/logo.png" >
                <h3>Nex_Wod</h3>
                
            </NuxtLink>
            
            <div>
            
                <div @click="theme()" :model="$colorMode.value">
                    <Icon
                        :name="colorMode.value === 'dark' ? 'ic:baseline-dark-mode' : 'ic:round-light-mode'" />
                </div>
                
            </div>
            
        </div>
                
    </div>
    <div class="hr"></div>  
    <div v-if="main">
        <Treinos2Banner/>
    </div>
    <div v-else>
        <div>
            <!-- Hístórico -->
            <NuxtLink :to="`/treinos`" class="menu-button">
                <div>
                    <Icon name="mdi:kettlebell" />
                    <p>
                        Todos os treinos
                    </p>
                </div>
                <Icon name="ic:baseline-keyboard-arrow-right" />
            </NuxtLink>
            <!-- Histórico fim -->
           
            <!-- Documentos -->
            
            <NuxtLink :to="`/users/${route.params.id}/termos-de-uso`" class="menu-button">
                <div>
                    <Icon name="mdi:file-document" />
                    <p>
                        Termos de uso
                    </p>
                </div>
                <Icon name="ic:baseline-keyboard-arrow-right" />
            </NuxtLink>
            <!-- Documentos fim -->

        </div>
    </div>
</template>
<style scoped>
.box {
    height: 60px;
    width:100%;
    backdrop-filter: blur(10px);
    background: #8d00ab;
}
.view {
    position: fixed;
    z-index: 1000;
    top: 0px;
    right: 0;
    left: 0 ;
    height: 60px;
    width:100%;
    
}
.nav {
    height: 60px;
    width:100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    backdrop-filter: blur(10px);
    border-bottom: solid 1px #8d00ab;
}
.nav div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.nav a {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    z-index: 1;
    flex-wrap: wrap;
}

.nav h3 {
    color: #fff;
    margin-left: 5px;
    font-size: 1.8rem;
    font-family: 'Gagalin';
    letter-spacing: 1.3px;
    color: #fff;
    font-weight: normal;
}

img{
    margin: 0rem; 
    height: 40px;
    border-radius: 200px;
    box-shadow: 0px 2px 10px #8d00ab;   
}

.nav .icon {
    margin-right: 1rem;
    zoom: 1;
    color: #8d00ab;
    color: #fff;
}
.nav .icon:hover {
    color: #b800ff;
}

.dark-mode .nav .icon {
    color: #020024;
}
.dark-mode .nav .icon:hover {
    color: #b800ff;
}

.nav .button .icon {
    margin-left: .7rem;
    zoom: 1.3;
    color: #8d00ab;
    color: #fff;
}
.nav .button .icon:hover {
    color: #b800ff;
}


.button .icon {
    margin: 0;
    border-radius: 4px;
    transition: all .3s linear;
}

.button:hover .icon {
    background-color: #8d00ab60;
    border-radius: 4px;
}

/* .hr {
    height: 1.5px;
    background: linear-gradient(to right,#8d00ab05 0%,#8d00ab 50%,#8d00ab05 100%);
} */
.menu-button {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-weight: 800;
    width: 100%;
    padding: 10px 2px 2px 2px;
    margin: 0px auto;
    border: solid 1px #8d00ab10;
    border-bottom: solid .1px #8d00ab40;
    border-top: solid .2px transparent;
}


.menu-button div {
    display: flex;
    flex-direction: row;
    font-size: .8em;
    justify-content: space-between;
    transition: all .3s linear;
}

.menu-button:nth-child(1) {
    margin-top: 1rem;
}

.menu-button .icon {
    margin: -2px 0px 0px 2rem;
    transform: translateX(-15px);
    transition: all .3s linear;
    zoom: 1.2;
}
.menu-button:hover .icon {
    color: #b800ff;
}

.menu-button .icon:nth-child(2) {
    margin: 5px 0px 0px 26px;
    transform: translateX(-25px);
}

.menu-button:hover {
    cursor: pointer;
    border-bottom: solid .2px #b800ff;
}


.menu-button:hover .icon:nth-child(2) {
    transform: translateX(-15px);
}
</style>