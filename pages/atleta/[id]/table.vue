<template>
  <div class="table-container">
    <table class="styled-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Avatar</th>
          <th>Name</th>
          <th>Set</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(exercise, idx) in serie.set" :key="exercise.id">
          <td>{{ exercise.id }}</td>
          <td>
            <img :src="exercise.img" alt="Avatar" class="user-avatar" />
          </td>
          <td>{{ exercise.nome }}</td>
          <td>
            <!-- Iterando sobre os sets e exibindo cada um em uma linha separada -->
            <table>
              <tbody>
                <tr v-for="(set, setIdx) in exercise.sets" :key="setIdx">
                  <td>{{ set }}</td>
                  <td>{{ exercise.reps }}</td>
                  <td>{{ exercise.obs }}</td>
                </tr>
              </tbody>
            </table>
          </td>
          
          <td>
            <!-- Botões de ação -->
            <button type="button" @click="moveExerciseUp(idx)" :disabled="idx === 0">↑</button>
            <button type="button" @click="moveExerciseDown(idx)" :disabled="idx === serie.set.length - 1">↓</button>
            <button type="button" @click="removeExercise(idx)" style="color: red;">X</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Dados da série
const serie = ref({
  set: [
    { id: 1, img: 'https://via.placeholder.com/40', nome: 'Exercise 1', sets: [1, 2, 3], reps: 10, obs: 'Keep your back straight' },
    { id: 2, img: 'https://via.placeholder.com/40', nome: 'Exercise 2', sets: [1, 2, 3, 4], reps: 12, obs: 'Focus on breathing' },
    { id: 3, img: 'https://via.placeholder.com/40', nome: 'Exercise 3', sets: [1, 2, 3, 4, 5], reps: 8, obs: 'Use moderate weight' },
  ],
});

// Função para mover o exercício para cima
const moveExerciseUp = (idx) => {
  if (idx > 0) {
    const temp = serie.value.set[idx];
    serie.value.set[idx] = serie.value.set[idx - 1];
    serie.value.set[idx - 1] = temp;
  }
};

// Função para mover o exercício para baixo
const moveExerciseDown = (idx) => {
  if (idx < serie.value.set.length - 1) {
    const temp = serie.value.set[idx];
    serie.value.set[idx] = serie.value.set[idx + 1];
    serie.value.set[idx + 1] = temp;
  }
};

// Função para remover o exercício
const removeExercise = (idx) => {
  serie.value.set.splice(idx, 1);
};
</script>

<style scoped>
/* Container da tabela */
.table-container {
  margin: 20px auto;
  padding: 10px;
  background-color: #1c1e26;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: #ffffff;
  max-width: 800px;
  overflow-x: auto;
}

/* Estilo da tabela */
.styled-table {
  width: 100%;
  border-collapse: collapse;
}

.styled-table th,
.styled-table td {
  padding: 12px 15px;
  text-align: left;
}

.styled-table thead tr {
  background-color: #2a2e38;
  border-bottom: 2px solid #444;
}

.styled-table tbody tr:nth-child(even) {
  background-color: #2f3440;
}

.styled-table tbody tr:hover {
  background-color: #383d47;
}

.styled-table th {
  font-weight: bold;
  color: #d1d5db;
}

/* Avatar dos usuários */
.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

/* Botões de ação */
button {
  margin: 0 4px;
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  background-color: #444;
  color: #fff;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #555;
}

button:disabled {
  background-color: #666;
  cursor: not-allowed;
}
</style>
