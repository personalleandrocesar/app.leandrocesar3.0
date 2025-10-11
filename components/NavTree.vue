<template>
    <div class='nav'>
        <div>
            <a @click="$router.go(-1)">
                <Icon name="ic:baseline-keyboard-arrow-left" /> Voltar
            </a>
        </div>
    </div>
</template>
<style scoped>
.nav {
    position: fixed;
    top: 1.5rem;
    margin: 0rem 0 0 1.5rem;
}

.nav a {
    transition: all .4s linear;
    border-radius: 8px;
    cursor: pointer;
    text-align: center;
    font-weight: 600;
    height: 34px;
    font-size: 16px;
    padding: 8px;
    
}

.nav a .icon {
    margin-top: -3px;
    margin-left: -5px;
}

.nav:hover a {
    color: #8d00ab;
}

.nav div {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
}
</style>
