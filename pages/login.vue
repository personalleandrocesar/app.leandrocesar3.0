<script setup>
    import { ref, onMounted } from 'vue'
    import Loading from '~/components/Loading.vue'
useHead({
    titleTemplate: 'Personal Leandro Cesar',
})

const isLoading = ref(true)

onMounted(() => {
    // Simula um tempo de carregamento, substitua pelo seu carregamento real
    setTimeout(() => {
        isLoading.value = false
    }, 800)
})
</script>

<template>
        <div v-if="isLoading">
            <Loading />
        </div>
        <div v-else>
            <Login />
        </div>
</template>
