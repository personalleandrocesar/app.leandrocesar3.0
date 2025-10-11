<script setup>
import { usePlayerColor } from '@/composables/usePlayerColor'

const { selectedColor, selectedClass, classColors } = usePlayerColor()
</script>

<template>
    <div class="hud">
        <h2>{{ selectedClass }}</h2>

        <select v-model="selectedClass">
            <option v-for="(color, name) in classColors" :key="name" :value="name">
                {{ name }}
            </option>
        </select>

        <input type="color" v-model="selectedColor" />
    </div>
</template>

<style scoped>
.hud {
    background-color: var(--player-color);
    color: white;
    padding: 20px;
    border-radius: 12px;
    transition: background-color 0.3s ease;
}
</style>
