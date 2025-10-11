<template>
    <div class="loading-container">
        <div class="loading-content">
            <!-- Substitua pelo ícone ou texto que você deseja -->
            <div class="head-logo" id="sobre">
                <div class='logo'>
                    <img src="~/assets/logo.png">
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.loading-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}


.head-logo {
    display: flex;
    justify-content: center;
    flex-direction: row-reverse;
    align-items: center;
    z-index: 1;
    flex-wrap: wrap;
}


.logo {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    height: 120px;
    width: 120px;
    box-shadow: 0px 7px 20px #8d00ab;
    border-radius: 200px;
    z-index: 10;
}

.logo img {
    height: 120px;
    width: 120px;
    border-radius: 200px;
    border: #8d00ab 2px solid;
    z-index: 100;
    opacity: 1;

}
</style>
