<script setup>
import { ref, computed } from 'vue'

// Recebe contribuições [{ date: '2025-08-27', count: 3 }]
const props = defineProps({
  values: {
    type: Array,
    default: () => []
  }
})

const weeks = Array.from({ length: 52 })
const days = Array.from({ length: 8 })

// Map para acesso rápido
const dataMap = computed(() => {
  const map = new Map()
  props.values.forEach(entry => {
    map.set(entry.date, entry.count)
  })
  return map
})

function getCount(dateStr) {
  return dataMap.value.get(dateStr) || 0
}

// Gera todas as datas (365 dias incluindo hoje)
// Gera todas as datas (365 dias incluindo hoje)
function generateDates() {
  const today = new Date()
  const dates = []
  for (let i = 0; i < 365; i++) {
    const d = new Date(today) // cópia do hoje
    d.setDate(today.getDate() - i) // subtrai i dias respeitando fuso local
    const iso = toLocalISO(d)
    dates.push({
      date: iso,
      count: getCount(iso)
    })
  }
  return dates.reverse()
}

function toLocalISO(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}



const allDates = computed(() => generateDates())

// Paleta estilo GitHub
function getColor(count) {
  if (count === 0) return '#ebedf0'
  if (count === 1) return '#9be9a8'
  if (count === 2) return '#40c463'
  if (count === 3) return '#30a14e'
  return '#216e39'
}

// Tooltip
const tooltip = ref({
  visible: false,
  x: 0,
  y: 0,
  text: ''
})

// Formata data em PT-BR
function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
}

function showTooltip(event, count, date) {
  const hoje = toLocalISO(new Date())
  const prefix = (date === hoje) ? 'Hoje' : formatDate(date)

  tooltip.value = {
    visible: true,
    x: event.clientX + 12,
    y: event.clientY + 12,
    text: count > 0
      ? `${count} contribuição${count > 1 ? 'es' : ''} - ${prefix}`
      : `Sem contribuições - ${prefix}`
  }
}

function hideTooltip() {
  tooltip.value.visible = false
}
</script>

<template>
  <div class="contribution-graph">
    <!-- GRID -->
    <div class="weeks">
      <div v-for="(week, w) in weeks" :key="w" class="week">
        <div
          v-for="(day, d) in days"
          :key="d"
          class="day"
          :style="{ backgroundColor: getColor(allDates[w*7 + d]?.count || 0) }"
          @mouseenter="showTooltip($event, allDates[w*7 + d]?.count || 0, allDates[w*7 + d]?.date)"
          @mouseleave="hideTooltip"
        ></div>
      </div>
    </div>

    <!-- LEGENDA -->
    <div class="legend">
      <span>Menos</span>
      <div class="scale">
        <div v-for="i in 5" :key="i" class="day" :style="{ backgroundColor: getColor(i-1) }"></div>
      </div>
      <span>Mais</span>
    </div>

    <!-- TOOLTIP -->
    <div
      v-if="tooltip.visible"
      class="tooltip"
      :style="{ top: tooltip.y + 'px', left: tooltip.x + 'px' }"
    >
      {{ tooltip.text }}
    </div>
  </div>
</template>

<style scoped>
.contribution-graph {
  padding: 16px;
  font-family: sans-serif;
  position: relative;
}

.weeks {
  display: flex;
  gap: 4px;
}

.week {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.day {
  width: 14px;
  height: 14px;
  border-radius: 2px;
  cursor: pointer;
}

.legend {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  font-size: 12px;
  color: #666;
}

.scale {
  display: flex;
  gap: 4px;
}

.tooltip {
  position: fixed;
  background: #000;
  color: #fff;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  pointer-events: none;
  white-space: nowrap;
  z-index: 1000;
}
</style>
