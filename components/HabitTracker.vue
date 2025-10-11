<template>
  <div class="habit-tracker">
    <!-- Grid de progresso tipo GitHub -->
    <div class="grid-dates-wrapper">
      <div class="grid-dates">
        <div
          v-for="(week, weekIndex) in weeks"
          :key="weekIndex"
          class="week"
        >
          <div
            v-for="day in week"
            :key="day.date"
            :class="['day', day.completed ? 'completed' : '']"
            :title="day.date"
          ></div>
        </div>
      </div>
    </div>

    <!-- Filtros de mês e ano -->
    <div class="two">
      <h2>{{ meses[mesSelecionado] }}  <span class="light">{{ anoAtual }}</span></h2>
      <div>
        <Nuxtlink @click="alterarMes(-1)"><Icon name="material-symbols:arrow-back-ios-new-rounded" /></Nuxtlink>
        <Nuxtlink @click="alterarMes(1)"><Icon name="material-symbols:arrow-forward-ios-rounded" /></Nuxtlink>
      </div>
    </div>

    <!-- Visão Mensal -->
    <div class="div-mes">
      <table>
    <thead>
      <tr>
        <th>Dom</th>
        <th>Seg</th>
        <th>Ter</th>
        <th>Qua</th>
        <th>Qui</th>
        <th>Sex</th>
        <th>Sáb</th>
      </tr>
    </thead>
     <tbody>
          <tr v-for="(semana, i) in diasDoMes" :key="i">
            <td
              v-for="dia in semana"
              :key="dia"
              :class="{ 
                ativo: dia === diaSelecionado,
                'dia-desativado': !dia || isDomingo(dia) || isPassado(dia) 
              }"
            >
              <NuxtLink
                :disabled="!dia || isDomingo(dia) || isPassado(dia)"
                @click="selecionarDiaMensal(dia)"
              >
                {{ dia || '' }}
              </NuxtLink>
            </td>
          </tr>
        </tbody>
  </table>



    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Dados do hábito
const habit = ref({
  title: 'Musculação todo dia',
  description: '1 hora por dia pelo menos',
  completedDays: ['2025-09-03', '2025-09-04', '2025-09-05', '2025-09-06', '2025-09-07', '2025-09-08', '2025-09-10']
})

// Configurações do calendário
const weekdays = ['seg', 'ter', 'qua', 'qui', 'sex', 'sáb', 'dom']
const currentMonth = ref(new Date())

// Função para alternar dia clicado
function toggleDay(date) {
  const index = habit.value.completedDays.indexOf(date)
  if (index > -1) {
    habit.value.completedDays.splice(index, 1)
  } else {
    habit.value.completedDays.push(date)
  }
}

// Função para formatar data YYYY-MM-DD
function formatDate(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

// Dias do mês com status
const monthDays = computed(() => {
  const year = currentMonth.value.getFullYear()
  const month = currentMonth.value.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const arr = []
  for (let i = 1; i <= daysInMonth; i++) {
    const dateObj = new Date(year, month, i)
    const date = formatDate(dateObj)
    arr.push({
      dayNumber: i,
      date,
      completed: habit.value.completedDays.includes(date)
    })
  }
  return arr
})

// Visualização tipo GitHub (últimos 12 meses)
const weeks = computed(() => {
  const today = new Date()
  const start = new Date(today)
  start.setDate(today.getDate() - 365) // últimos 365 dias

  const arr = []
  for (let i = 0; i < 53; i++) {
    const week = []
    for (let j = 0; j < 7; j++) {
      const dateObj = new Date(start)
      dateObj.setDate(start.getDate() + i * 7 + j)
      const date = formatDate(dateObj)
      week.push({
        date,
        completed: habit.value.completedDays.includes(date)
      })
    }
    arr.push(week)
  }
  return arr
})

import axios from "axios";

// Configuração inicial
const diasDaSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

// Estado do componente
const diaSelecionado = ref();
const mesSelecionado = ref(new Date().getMonth());
const anoAtual = ref(new Date().getFullYear());
const horarios = ref([]);
const diasDoMes = ref([]);
const dataAtual = new Date(); // Data atual para referência

// Modal
const exibirModal = ref(false);
const horarioSelecionado = ref("");
const nome = ref("");
const whatsapp = ref("");
const observacoes = ref("");

// Gera horários base (normal e sábados)
const gerarHorarios = (dia) => {
  const ehSabado = new Date(anoAtual.value, mesSelecionado.value, dia).getDay() === 6;
  return ehSabado
    ? Array.from({ length: 7 }, (_, i) => `${String(7 + i).padStart(2, "0")}:00`)
    : Array.from({ length: 15 }, (_, i) => `${String(7 + i).padStart(2, "0")}:00`);
};

// Função auxiliar para verificar se é domingo
const isDomingo = (dia) => {
  const diaSemana = new Date(anoAtual.value, mesSelecionado.value, dia).getDay();
  return diaSemana === 0;
};

// Função auxiliar para verificar se é um dia passado
const isPassado = (dia) => {
  const dataDia = new Date(anoAtual.value, mesSelecionado.value, dia).setHours(0, 0, 0, 0);
  const hoje = dataAtual.setHours(0, 0, 0, 0);
  return dataDia <= hoje; // Desativa dias anteriores e o próprio dia atual
};

// Função para encontrar o primeiro dia ativo (não domingo, não passado)
const encontrarPrimeiroDiaAtivo = () => {
  const totalDias = new Date(anoAtual.value, mesSelecionado.value + 1, 0).getDate();

  for (let dia = 1; dia <= totalDias; dia++) {
    if (!isDomingo(dia) && !isPassado(dia)) {
      return dia; // Retorna o primeiro dia válido
    }
  }
  return null; // Caso não haja dias disponíveis no mês
};

// Calcular os dias do mês
const calcularDiasDoMes = () => {
  const primeiroDia = new Date(anoAtual.value, mesSelecionado.value, 1).getDay();
  const totalDias = new Date(anoAtual.value, mesSelecionado.value + 1, 0).getDate();

  const semanas = [];
  let semana = Array(primeiroDia).fill(null);

  for (let dia = 1; dia <= totalDias; dia++) {
    if (semana.length === 7) {
      semanas.push(semana);
      semana = [];
    }
    semana.push(dia);
  }

  while (semana.length < 7) {
    semana.push(null);
  }
  semanas.push(semana);

  diasDoMes.value = semanas;
};


// Alterar mês
const alterarMes = (valor) => {
  mesSelecionado.value += valor;

  if (mesSelecionado.value < 0) {
    mesSelecionado.value = 11;
    anoAtual.value--;
  } else if (mesSelecionado.value > 11) {
    mesSelecionado.value = 0;
    anoAtual.value++;
  }

  calcularDiasDoMes();
};

// Selecionar um dia
const selecionarDiaMensal = async (dia) => {
  diaSelecionado.value = dia;

  const dataSelecionada = new Date(anoAtual.value, mesSelecionado.value, dia);
  await carregarHorarios(dataSelecionada);
};

// Carregar horários
const carregarHorarios = async (dataSelecionada) => {
  try {
    const { data } = await axios.get("/agendamentos/mensal", {
      params: {
        ano: dataSelecionada.getFullYear(),
        mes: dataSelecionada.getMonth() + 1,
        dia: dataSelecionada.getDate(),
      },
    });

    horarios.value = gerarHorarios(dataSelecionada.getDate()).map((hora) => {
      const jaAgendado = data.find((agendamento) => agendamento.hora === hora);
      return {
        hora,
        status: jaAgendado ? "Indisponível" : "Disponível",
      };
    });
  } catch (err) {
    console.error(err.message);
    horarios.value = gerarHorarios(dataSelecionada.getDate()).map((hora) => ({
      hora,
      status: "Disponível",
    }));
  }
};
// Inicializar
calcularDiasDoMes();

const primeiroDiaAtivo = encontrarPrimeiroDiaAtivo();
if (primeiroDiaAtivo) {
  diaSelecionado.value = primeiroDiaAtivo;
  selecionarDiaMensal(primeiroDiaAtivo); // Carrega os horários automaticamente
}

const obterNomeDiaSemana = (dia) => {
  const data = new Date(anoAtual.value, mesSelecionado.value, dia);
  return diasDaSemana[data.getDay()];
};
// Abrir modal de cadastro
const abrirCadastro = (hora) => {
  horarioSelecionado.value = hora;
  exibirModal.value = true;
};

// Fechar modal
const fecharModal = () => {
  exibirModal.value = false;
  nome.value = "";
  whatsapp.value = "";
  observacoes.value = "";
};

// Enviar cadastro
const enviarCadastro = async () => {
  try {
    await axios.post("/agendamentos", {
      dia: diaSelecionado.value,
      mes: mesSelecionado.value + 1,
      ano: anoAtual.value,
      hora: horarioSelecionado.value,
      nome: nome.value,
      whatsapp: whatsapp.value,
      observacoes: observacoes.value,
    });

    alert("Horário agendado com sucesso!");
    fecharModal();
  } catch (err) {
    console.error(err.message);
    alert("Erro ao agendar horário.");
  }
};

</script>

<style scoped>
.habit-tracker {
  font-family: sans-serif;
  margin: 1rem;
}

/* Wrapper para scroll horizontal */
.grid-dates-wrapper {
  overflow-x: auto;
  padding-bottom: 6px;
  -webkit-overflow-scrolling: touch;
}

/* Grid flex invertido para começar da direita */
.grid-dates {
  display: flex;
  margin: 0 .5rem;
  flex-direction: row; /* mais recente à direita */
  gap: 4px;
  min-width: max-content;
}

.week {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.day {
  width: 12px;
  height: 12px;
  background-color: #777;
  border-radius: 200px;
  cursor: pointer;
  transition: background 0.3s;
}

.day.completed {
  background-color: var(--player-color, #4caf50);
}

.month-calendar {
  margin-top: 20px;
}

.weekdays {
  display: flex;
  gap: 5px;
  font-size: 12px;
  font-weight: bold;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  margin-top: 5px;
}

.days .day {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}


.one {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.one .icon {
  margin: 0 0 0 15px;
  zoom: 1.1;
}
h1 {
  margin: 15px 15px 15px 5px;
  font-size: 1.2rem;
}

.two {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.two .icon {
    
  border: none;
  zoom: .9;
  cursor: pointer;
  margin: 10px;
}

h2 {
  font-size: 1rem;
  margin: 5px 15px;
}

th{
    border: .1px solid var(--player-color, #4caf50);
    padding: 0px;
    background-color: transparent;
}

td {
    border: .1px solid var(--player-color, #4caf50);
    padding: 0px;
}

td a{
    background-color: #777;
    
}

tbody{
    background-color: transparent;
}

</style>
