<script setup>

</script>

<template>
        <!-- <div class="hr"></div> -->
        <div class='main'>
            
            <div class='treinos'>
                <Icon name='mdi:kettlebell'/>Treinos
            </div>
        </div>
</template>
<style scoped>
.main {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;    
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
    color: #8d00ab;
    margin: 1.5rem;
    text-transform: uppercase;
    font-family: 'Gagalin';
    font-size: 1.4rem;
}

.treinos .icon {
    zoom: 1.6;
    margin: -3px 2px 0 0 ;
}

</style>