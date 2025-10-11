<template>
  <div class="float-xp-section">
    <label>XP — Rank {{ rankAtual }}</label>
    <div class="float-xp-bar">
      <div class="float-xp-progress" :style="{ width: xpVisual + '%' }">
        <transition name="float-star">
          <span v-if="mostrarEstrela" class="star">⭐</span>
        </transition>
      </div>
    </div>

    <div class="float-xp-text">
      {{ xpAtual }} / {{ rankLimits[rankAtual] }}
    </div>
  </div>

  <transition name="rankup-fade">
    <div v-if="mostrarRankUp" class="rankup-modal">
      🎖️ <strong>Rank Up!</strong><br />
      Agora você é Rank {{ rankAtual }}
    </div>
  </transition>
</template>


<script setup>
// Lógica futura aqui
</script>

<style scoped>
.main-container {
  background: #020024;
  min-height: 100vh;
  padding: 2rem;
  color: #ffffff;
  font-family: 'Orbitron-Regular', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.rank-panel {
  border: 2px solid #b800ff;
  padding: 1rem;
  border-radius: 12px;
  width: 100%;
  max-width: 350px;
  text-align: center;
  box-shadow: 0 0 10px #8d00ab;
}

.xp-info {
  margin-top: 1rem;
}

.xp-bar {
  background: #ffffff33;
  border-radius: 8px;
  height: 12px;
  margin: 0.25rem 0;
  overflow: hidden;
}

.xp-progress {
  height: 100%;
  background: #b800ff;
  width: 0;
  transition: width 0.3s;
}

.missions-panel {
  text-align: center;
  color: #b800ff;
}

.check {
  color: #8d00ab;
  margin-right: 5px;
}

.hud-button {
  background: #00d0ff;
  border: 2px solid #00d0ff;
  color: #ffffff;
  padding: 0.75rem 2rem;
  font-weight: bold;
  border-radius: 10px;
  box-shadow: 0 0 15px #00d0ff;
  cursor: pointer;
  transition: 0.3s;
}

.hud-button:hover {
  background: transparent;
  color: #00d0ff;
}

.menu-buttons button {
  display: block;
  width: 100%;
  max-width: 300px;
  margin: 0.5rem auto;
  background: transparent;
  border: 2px solid #b800ff;
  color: #b800ff;
  padding: 0.75rem;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.menu-buttons button:hover {
  background: #8d00ab;
  color: #ffffff;
  border-color: #8d00ab;
}
</style>
