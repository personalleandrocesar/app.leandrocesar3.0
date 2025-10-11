<script setup>
const route = useRoute()
</script>
<template>
    <nav class="bottom-menu">
        <NuxtLink :to="`/atleta/${route.params.id}/treinos`" class="menu-item">
            <Icon name="streamline:travel-hotel-dumbell-sports-weights-dumbbell-sport-fitness" />
            <span>Treinos</span>
        </NuxtLink>
        <div class="menu-item">
            <Icon name="streamline:location-target-1" />
            <span>Missões</span>
        </div>

        <div class="central-button">
            <NuxtLink :to="`/atleta/${route.params.id}`" class="circle">
                HUD
            </NuxtLink>
        </div>

        <div class="menu-item">
            <Icon name="material-symbols:person-outline-rounded" />
            <span>Perfil</span>
        </div>
        <div class="menu-item">
            <Icon name="mynaui:chart-graph-solid" />
            <span>Progres.</span>
        </div>
    </nav>
</template>

<style scoped>
.bottom-menu {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #020024;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px 0;
    box-shadow: 0 -1px 5px #b800ff30;
    z-index: 10;
}

.menu-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
    color: #777;
}

.menu-item .icon {
    font-size: 20px;
}

.menu-item.active {
    color: purple;
}

.central-button {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
}

.central-button .circle {
    background: #b800ff;
    color: white;
    border-radius: 50%;
    width: 55px;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 13px;
    box-shadow: 0 4px 10px #800080;
    border: 4px solid #800080;
}
</style>
