<script setup>
  const xp = ref('80%')
  const rank = ref('E')
</script>
<template>
  <div class="hud-container">
    <div class="panel">
      <div class="header">
        <h2>ATLETA SHUN</h2>
        <span class="rank">RANK <p>{{ rank }}</p></span>
      </div>

      <div class="xp-section">
        <label>XP</label>
        <div class="xp-bar">
          <div class="xp-progress" :style="{ width:  xp  }"></div>
        </div>
        <div class="xp-text">500 / 1000</div>
      </div>

      <div class="missions">
        <h3>MISSIONS</h3>
        <ul>
          <li>Complete the training</li>
        </ul>
      </div>

      <div class="rank-ladder">
        <p>S</p>
        <p>A</p>
        <p>B</p>
        <p>C</p>
        <p>D</p>
        <p>E</p>
      </div>

      <button class="start-button">START TRAINING</button>
    </div>
  </div>
</template>

<style scoped>
.hud-container {
  background-color: #020024;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.panel {
  border: 2px solid #b800ff;
  padding: 2rem;
  border-radius: 10px;
  width: 350px;
  background-color: #020024;
  color: #ffffff;
  box-shadow: 0 0 20px #8d00ab;
  font-family: 'Orbitron-Regular', sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-bottom: 1rem;
}

.header h2 {
    color: #fff;
}

.rank {
  border: 1px solid #b800ff;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  color: #b800ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}

.rank p {
  margin-left: 1rem;
}

.xp-section {
  margin-bottom: 1.5rem;
}

.xp-bar {
  background: #ffffff33;
  height: 10px;
  border-radius: 10px;
  margin-top: 5px;
  overflow: hidden;
}

.xp-progress {
  height: 100%;
  background: #8d00ab;
  border-radius: 10px;
}

.xp-text {
  text-align: right;
  font-size: 0.9rem;
  color: #fff;
  margin-top: 0.25rem;
}

.missions {
  border: 1px solid #b800ff;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
}

.missions h3 {
  margin: 0 0 0.5rem 0;
  color: #b800ff;
}

.rank-ladder {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  color: #b800ff;
  font-weight: bold;
}

.start-button {
  background: #b800ff;
  border: none;
  color: #fff;
  padding: 0.75rem;
  width: 100%;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 0 10px #8d00ab;
  transition: background 0.3s;
}

.start-button:hover {
  background: #8d00ab;
}
</style>
