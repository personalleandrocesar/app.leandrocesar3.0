<template>
  <div class="full">
    <div class="one">
      <Icon name='ph:calendar' /><h1>Agendamento de sessões</h1>
    </div>

    <!-- Filtros de mês e ano -->
    <div class="two">
      <h2>{{ meses[mesSelecionado] }}  <span class="light">{{ anoAtual }}</span></h2>
      <div>
        <button @click="alterarMes(-1)">&#8249;</button>
        <button @click="alterarMes(1)">&#8250;</button>
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
              <button
                :disabled="!dia || isDomingo(dia) || isPassado(dia)"
                @click="selecionarDiaMensal(dia)"
              >
                {{ dia || '' }}
              </button>
            </td>
          </tr>
        </tbody>
  </table>

 <div v-if="horarios.length > 1" class="day">
  <h3>
    <span class="light">{{ obterNomeDiaSemana(diaSelecionado) }}
      
    </span> - 
    {{ diaSelecionado }}
  </h3>
</div>

  <div v-if="horarios.length > 1" class="time">
    <div v-for="(horario, index) in horarios" :key="index">
      <button
      v-if="horario.status === 'Disponível'"
      @click="abrirCadastro(horario.hora)"
      >
        {{ horario.hora }}
      </button>
      <span v-else>{{ horario.status }}</span>
  </div>
  
      </div>
    </div>

    <!-- Modal de cadastro -->
    <div v-if="exibirModal" class="modal-overlay">
      <div class="modal">
        <h3>Confirme suas informações</h3>
        <p>
          <Icon name='ph:calendar-plus' /> Dia: {{ diaSelecionado }} / {{ mesSelecionado + 1 }} / {{ anoAtual }} <br />
          <Icon name='material-symbols:nest-clock-farsight-analog-outline-rounded' /> Horário: {{ horarioSelecionado }}
        </p>
        <form @submit.prevent="enviarCadastro">
          <label for="nome">Nome:</label>
          <input type="text" id="nome" v-model="nome" required />

          <label for="whatsapp">E-mail:</label>
          <input type="text" id="whatsapp" v-model="email" required />

          <label for="whatsapp">WhatsApp:</label>
          <input type="text" id="whatsapp" v-model="whatsapp" required />
          
          <label for="observacoes">Observações:</label>
          <textarea id="observacoes" v-model="observacoes"></textarea>
          
          <div>
            <button type="button" @click="fecharModal">Cancelar</button>
            <button type="submit">Confirmar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
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

.two button {
  background-color: transparent;
  border: none;
  zoom: 1.6;
  cursor: pointer;
  margin: 0 5px;
}

h2 {
  font-size: 1rem;
  margin: 5px 15px;
}

.time h3 {
  text-align: left;
  margin: 15px;
}

.light {
  color: #999;
}

.div-mes{
  width: 100%;
}

.mes {
  display: flex;
  flex-wrap: wrap;
}

tbody tr td button {
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 5px;
  background-color: #f0f0f0;
  cursor: pointer;
  border: solid 3px transparent;
}

tbody tr td button:hover {
  border: solid 3px #dbad72;
}

tbody tr td.ativo button {
  background-color: #dbad72;
  color: #000;
}

tbody tr td button{
  width: 100%;
}

.modal-overlay {
    position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background-color: #f0ece499;
        backdrop-filter: blur(5px);
        display: flex;
        justify-content: center;
        align-items: center;
        height: calc(100vh - 200px);
}

.modal {
  border: solid 2px #dbad72;
  background: #f0ece4;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
}

.modal h3 {
  text-align: left;
  margin: 0px;
}

.modal p{
  text-align: left;
}

.modal button {
  margin: 10px 2px;
  width:100px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: #dbad72;
  cursor: pointer;
  border: solid 3px transparent;
}

.modal button:hover {
  opacity: .8;
}


table {
  width: 100%;
}

.day {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 15px;
}

.time {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: auto;
}

.time div {
  width: 47%;
  margin: 4px;
}

.time button {
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 5px;
  background-color: #f0f0f0;
  cursor: pointer;
  border: solid 3px transparent;
}

.time button:hover {
  border: solid 3px #dbad72;
}

th {
  border-top: 1px solid rgb(190, 190, 190);
  border-bottom: 1px solid rgb(190, 190, 190);
}

td {
  text-align: center;
}

form {
  text-align: left;
  display: flex;
  flex-direction: column;
}

input {
  background-color: #dbad7230;
  border-radius: 4px;
  padding: 4px 7px
}


textarea {
  background-color: #dbad7230;
  border-radius: 4px;
}

</style>
