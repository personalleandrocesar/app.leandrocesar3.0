<script setup>

useHead({
    titleTemplate: 'Nex_Wod',
})

const buttonIcon = ref(true)
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

</script>

<template>

    <div class='box'></div>        
    
    <div class='view'>        
    
        <div class='nav'>
                        
            <NuxtLink to='/'>
            
                <img src="~assets/logo.png" >
                <h3>Nex_Wod</h3>
                
            </NuxtLink>
            
            <div>
            
                <div @click="theme()" :model="$colorMode.value">
                    <Icon
                        :name="colorMode.value === 'dark' ? 'line-md:sunny-filled-loop-to-moon-alt-filled-loop-transition' : 'line-md:moon-filled-to-sunny-filled-loop-transition'" />
                </div>
                <div v-if='buttonIcon' @click='button' class='button'>
                    <Icon name='ic:baseline-menu' />                    
                </div>
                <div v-else @click='button' class='button'>
                    <Icon name='ic:baseline-menu' />                    
                </div>
                
            </div>
            
        </div>
                
    </div>
    
    <div class="hr"></div>  
</template>
<style scoped>
.box {
    height: 60px;
    width:100%;
    box-shadow: 0px 3px 100px #8d00ab90;
    background: transparent;
}
.view {
    position: fixed;
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
    border-bottom: solid .1px #8d00ab70;
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
    margin-left: 3px;
    font-size: 1.8rem;
    font-family: 'Gagalin';
    letter-spacing: 1.3px;
    color: #8d00ab;
    font-weight: normal;
}

img{
    margin: 0rem 0rem 0px 1rem; 
    height: 40px;
    border-radius: 200px;
    box-shadow: 0px 2px 10px #8d00ab;   
}

.nav .icon {
    margin-right: 1rem;
    zoom: 1.1;
    color: #8d00ab;
}
.nav .button .icon {
    margin-right: 1rem;
    zoom: 1.3;
    color: #8d00ab;
}

.hr {
    height: 1px;
    background: linear-gradient(to right,#8d00ab05 0%,#8d00ab 50%,#8d00ab05 100%);
}
</style>