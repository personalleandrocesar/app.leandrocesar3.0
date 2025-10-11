<script setup>
import { ref, computed, onMounted } from 'vue'

const plano = {
    segunda: 'Peito e tríceps',
    terça: 'Costas e bíceps',
    quarta: 'Pernas',
    quinta: 'Ombros',
    sexta: 'Full body',
    sábado: 'Cardio',
    domingo: 'Descanso'
}

const diasSemana = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado']
const hoje = new Date()

// 🗓 Função para obter datas dos últimos 7 dias (ou semana atual)
function getDiasDaSemana() {
    const semana = []
    const hojeDia = hoje.getDay() // 0 = domingo

    for (let i = 0; i < 7; i++) {
        const diaIndex = i
        const data = new Date(hoje)
        data.setDate(data.getDate() - (hojeDia - diaIndex))

        const dataStr = data.toISOString().split('T')[0]
        const diaNome = diasSemana[diaIndex]
        const treino = plano[diaNome]

        semana.push({ dia: diaNome, data: dataStr, treino })
    }

    return semana
}

const semanaAtual = ref(getDiasDaSemana())

const historico = ref([])

onMounted(() => {
    const lista = semanaAtual.value.map(dia => {
        const saved = localStorage.getItem(`treino-${dia.data}`)
        let status = 'pendente'

        if (saved) {
            const obj = JSON.parse(saved)
            status = obj.status
        } else if (dia.treino === 'Descanso' || dia.treino === 'Livre') {
            status = 'descanso'
        } else if (dia.data < hoje.toISOString().split('T')[0]) {
            status = 'faltou'
        }

        return { ...dia, status }
    })

    historico.value = lista
})

// Ícone do status
function getIcon(status) {
    switch (status) {
        case 'feito':
            return '✅'
        case 'faltou':
            return '❌'
        case 'descanso':
            return '💤'
        default:
            return '⏳'
    }
}
</script>

<template>
    <div class="p-4 max-w-md mx-auto">
        <h2 class="text-xl font-bold mb-4">📆 Histórico da Semana</h2>
        <ul class="space-y-2">
            <li v-for="dia in historico" :key="dia.data" class="p-2 rounded border flex justify-between items-center"
                :class="{
                    'bg-green-100': dia.status === 'feito',
                    'bg-red-100': dia.status === 'faltou',
                    'bg-gray-100': dia.status === 'descanso',
                }">
                <div>
                    <strong class="capitalize">{{ dia.dia }}</strong>
                    <div class="text-sm text-gray-600">{{ dia.treino }}</div>
                </div>
                <span class="text-2xl">{{ getIcon(dia.status) }}</span>
            </li>
        </ul>
    </div>
</template>
