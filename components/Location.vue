<template>
 <div class="location">
    
    <div v-if="localAtual">
      <p><strong>Localização:</strong> <span>{{ localAtual }}</span></p>
    </div>


  </div>
</template>

<script setup>
// 🏠 Lista de locais cadastrados
const locais_cadastrados = [
  {
    nome: 'Deep Acupuntura',
    lat: -23.1234,
    lng: -46.5678
  },
  {
    nome: 'Casa',
    lat: -22.8121809,
    lng: -43.0188317
  },
  {
    nome: 'Academia SmFitness',
    lat: -22.89460,
    lng: -43.11958
  },
  {
    nome: 'Academia Halternativa - R. da Conceição',
    lat: -22.89443,
    lng: -43.11998
  },
]

const location = ref(null)
const address = ref(null)
const localAtual = ref(null)
const error = ref(null)

// Função para calcular distância entre dois pontos
const isWithinRange = (lat1, lng1, lat2, lng2, rangeInMeters = 50) => {
  const toRad = (value) => value * Math.PI / 180
  const R = 6371000
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c
  return distance <= rangeInMeters
}

// Função para identificar em qual local o usuário está
const encontrarLocal = (lat, lng) => {
  for (const local of locais_cadastrados) {
    if (isWithinRange(local.lat, local.lng, lat, lng)) {
      return local.nome
    }
  }
  // return 'Local desconhecido'
}

onMounted(() => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        location.value = { lat, lng }

        // 👇 Verifica se está em algum local cadastrado
        localAtual.value = encontrarLocal(lat, lng)

        try {
          const response = await $fetch(`https://api.opencagedata.com/geocode/v1/json`, {
            params: {
              q: `${lat}+${lng}`,
              key: '4596069489ca4ecc802c62c443198f5b',
              language: 'pt-BR',
              pretty: 1
            }
          })

          address.value = response?.results?.[0]?.formatted || 'Endereço não encontrado'
        } catch (err) {
          error.value = 'Erro ao buscar endereço: ' + err.message
        }
      },
      (err) => {
        error.value = `Erro ao obter localização: ${err.message}`
      }
    )
  } else {
    error.value = 'Geolocalização não suportada neste navegador.'
  }
})

</script>

<style scoped>
.location {
  margin: 0;
}
strong {
  color: #fff;
}

span {
  color: var(--player-color);

}
</style>
