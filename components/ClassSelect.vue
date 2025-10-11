<template>
    <div class="class-select">
        <h2>Escolha sua Classe</h2>
        <p class="subtitle">Qual é o seu objetivo?</p>

        <div class="classes">
            <div v-for="classe in classes" :key="classe.nome" class="classe-card" :style="{ borderColor: classe.cor }"
                @click="selecionarClasse(classe)">
                <h3>{{ classe.nome }}</h3>
                <p>{{ classe.descricao }}</p>
                <span class="tag" :style="{ backgroundColor: classe.cor }">{{ classe.objetivo }}</span>
            </div>
        </div>

        <div v-if="classeSelecionada" class="resultado">
            <h3>Classe Escolhida: {{ classeSelecionada.nome }}</h3>
            <p>{{ classeSelecionada.descricao }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const classes = [
    {
        nome: '🪓 Berserker',
        objetivo: 'Hipertrofia',
        cor: '#8d00ab',
        descricao: 'Guerreiro de pura força. Busca romper limites físicos.'
    },
    {
        nome: '🗡️ Assassino Sombrio',
        objetivo: 'Emagrecimento',
        cor: '#b800ff',
        descricao: 'Rápido, ágil e letal. Corta excessos com precisão.'
    },
    {
        nome: '🛡️ Guardião de Lâminas',
        objetivo: 'Definição Muscular',
        cor: '#00d4ff',
        descricao: 'Equilíbrio entre força e estética. Cada linha é uma arma.'
    },
    {
        nome: '🏃 Corredor Arcano',
        objetivo: 'Resistência Aeróbica',
        cor: '#1fe0b0',
        descricao: 'Corre como o vento. Energia infinita em longas distâncias.'
    },
    {
        nome: '🧘 Monge de Ferro',
        objetivo: 'Resistência Muscular',
        cor: '#ff8500',
        descricao: 'Disciplina e constância. Aguenta o impossível.'
    },
    {
        nome: '🎭 Dançarino do Qi',
        objetivo: 'Mobilidade / Flexibilidade',
        cor: '#aa88ff',
        descricao: 'Mestre do movimento fluido. Corpo livre, mente afiada.'
    },
    {
        nome: '⚔️ Gladiador Técnico',
        objetivo: 'Performance Esportiva',
        cor: '#c0392b',
        descricao: 'Precisão e explosão. Cada treino é um combate tático.'
    }
]

const classeSelecionada = ref(null)

function selecionarClasse(classe) {
    classeSelecionada.value = classe
}
</script>

<style scoped>
.class-select {
    padding: 2rem;
    background: #020024;
    color: white;
    font-family: 'Orbitron', sans-serif;
    text-align: center;
}

.subtitle {
    margin-bottom: 2rem;
    color: #b800ff;
}

.classes {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: center;
}

.classe-card {
    border: 2px solid;
    border-radius: 1rem;
    padding: 1rem;
    width: 95%;
    background: #111;
    cursor: pointer;
    transition: transform 0.2s ease;
}

.classe-card:hover {
    transform: scale(1.05);
}

.classe-card h3 {
    margin-bottom: 0.5rem;
    color: #ffffff;
}

.classe-card p {
    font-size: 0.9rem;
    color: #ccc;
}

.tag {
    display: inline-block;
    margin-top: 0.75rem;
    padding: 0.3rem 0.75rem;
    border-radius: 999px;
    color: black;
    font-weight: bold;
}

.resultado {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid #fff2;
}
</style>
