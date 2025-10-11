<script>
export default {
  mounted() {
    let lastScrollTop = 0;
    const navbar = document.getElementById('nav-container');

    window.addEventListener('scroll', function () {
      let scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        // Rolando para baixo
        navbar.style.top = '-100px'; // Ou qualquer outra posição desejada para esconder o navbar
      } else {
        // Rolando para cima
        navbar.style.top = '2px';
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Para o comportamento correto em bordas
    }, false);
  }
}
</script>
<script setup>
import { ref, computed, watch, nextTick, onMounted } from "vue";
import { usePlayerColor } from '@/composables/usePlayerColor'
import { usePlayerRank } from '@/composables/usePlayerRank'
const rota = useRoute();


const { xpRelativo, xpClasse, rankAtual, nivelAtualS, proximoRank, xpMin, xpMax } = usePlayerRank()

      

const mostrarHUD = ref(false)
const { selectedColor, selectedClass, classColors, resetColorToDefault } = usePlayerColor()

const cookieTreinador = useCookie('coachId');

const usuarios = await useFetch(
  `https://api.leandrocesar.com/usersnw/${cookieTreinador.value}/team/${rota.params.id}`
);
const pessoa = usuarios.data.value;
const primeiroNome = computed(() => pessoa.name.split(" ")[0]);

useHead({
  titleTemplate: `${primeiroNome.value} ${pessoa.lastName} - Atleta | Nx_WOD`,

});
const classeSelecionada = ref(null)

function selecionarClasse(classe) {
  classeSelecionada.value = classe
}

// 🎯 Atualiza o <meta name="theme-color"> com base na cor da classe
watch(classeSelecionada, (novaClasse) => {
  if (novaClasse) {
    useHead({
      meta: [
        { name: 'theme-color', content: novaClasse.cor }
      ]
    })
  }
})
const erroMsg = ref(null);
const notificacaoTres = ref(false);
const notificacaoQuatro = ref(false);
const mostrarDivFlutuante = ref(false);
const imagemPrevia = ref(null);
const arquivo = ref(null);
const carregando = ref(false);
const fotoAberta = ref(false);


const buscarDadosUsuario = async () => {
  const formatos = ['jpeg', 'jpg', 'png'];
  let ultimaImagem = null;
  for (const formato of formatos) {
    try {
      const resposta = await fetch(`https://api.leandrocesar.com/uploads/${pessoa.username}.${formato}`);
      if (resposta.ok) {
        const ultimaModificacao = resposta.headers.get('Last-Modified');
        if (!ultimaImagem || (ultimaModificacao && new Date(ultimaModificacao) > new Date(ultimaImagem.lastModified))) {
          ultimaImagem = { url: resposta.url, lastModified: ultimaModificacao };
        }
      }
    } catch { }
  }
  if (ultimaImagem) pessoa.foto = ultimaImagem.url;
};

onMounted(buscarDadosUsuario);

const abrirDivFlutuante = () => { mostrarDivFlutuante.value = true; };
const fecharDivFlutuante = () => {
  mostrarDivFlutuante.value = false;
  imagemPrevia.value = null;
  arquivo.value = null;
};

const alterarArquivo = (evento) => {
  arquivo.value = evento.target.files[0];
  if (arquivo.value) {
    imagemPrevia.value = URL.createObjectURL(arquivo.value);
    mostrarDivFlutuante.value = true;
  }
};

const enviarImagem = async () => {
  if (!arquivo.value) return alert("Por favor, selecione um arquivo.");
  const dadosFormulario = new FormData();
  dadosFormulario.append('image', arquivo.value, `${pessoa.username}.${arquivo.value.name.split('.').pop()}`);
  try {
    carregando.value = true;
    const resposta = await fetch('https://api.leandrocesar.com/api/upload', { method: 'POST', body: dadosFormulario });
    if (resposta.ok) {
      alert("Upload realizado com sucesso!");
      await buscarDadosUsuario();
      fecharDivFlutuante();
    } else {
      alert("Erro no upload.");
    }
  } catch {
    alert("Erro ao conectar com o servidor.");
  } finally {
    carregando.value = false;
  }
};

function alternarFoto() {
  fotoAberta.value = !fotoAberta.value;
}
const route = useRoute()

const reg = route.params.id
const logon = useCookie('logon')
// const logon = useCookie('logon', { maxAge: 4800})
logon.value = reg

const photoOpen = ref(false);
function openPhoto() {
  photoOpen.value = !photoOpen.value;
}


const coachIdCookie = useCookie('coachId')
console.log(coachIdCookie.value)

const Series = await useFetch(`https://api.leandrocesar.com/usersnw/${coachIdCookie.value}/team/${route.params.id}`);
const people = Series.data.value
console.log(Series.data.value.treinos[0])

const dataConf = await useFetch(`https://api.leandrocesar.com/users/${route.params.id}`)
const inter = await useFetch(`https://api.leandrocesar.com/users/${route.params.id}`)
const status = people?.status
const nameValue = people?.name

const firstName = computed(() => {
  return nameValue.split(' ')[0] // Divide o nome completo em partes e retorna o primeiro nome
})

// talvez não precise do código abaixo
const logOff = () => {
  logon.value = null
}

const tag = useCookie('tag')
tag.value = tag.value


const bodyOne = ref(true)
const menuFloat = ref(false);
function menu() {
  menuFloat.value = !menuFloat.value
  mostrarHUD.value = !mostrarHUD.value
}
const colorMode = useColorMode()

function theme() {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
}

const colorCookie = useCookie('colorCookie')
if (colorMode.value === "dark") {
  colorCookie.value = "darkCookie"
} else {
  colorCookie.value = "lightCookie"
}
colorCookie.value === "darkCookie" ? colorMode.value = "dark" : colorMode.value = "light"

const state = useCookie('state')
state.value = state.value

const navA = ref(state.value === 1)
const navB = ref(state.value === 2)
const navC = ref(state.value === 3)
const navD = ref(state.value === 4)

const getGreetingMessage = () => {
  const now = new Date();
  const hour = now.getHours();

  if (hour < 12) {
    return "Bom dia";
  } else if (hour < 18) {
    return "Boa tarde";
  } else {
    return "Boa noite";
  }
};


const xp = ref('15%')
const xpPercent = parseFloat(xp.value * 100)
const xpCalc = parseFloat(xp.value) / 100;
const rank = ref('v')
const classe = ref('Berserk')
const titulo = ref('--/--')

const notificationLogOut = ref(false)
function logOut() {
  notificationLogOut.value = !notificationLogOut.value
}
const Configuration = ref(false)
const Aparency = ref(false)
const Ranking = ref(false)

function menuConfiguration() {
  Configuration.value = !Configuration.value

}
function menuAparency() {
  Aparency.value = !Aparency.value

}
function menuRanking() {
  Ranking.value = !Ranking.value

}

const greetingMessage = computed(() => getGreetingMessage());

const numberId = route.params.id
const raw = numberId
console.log(numberId)

const first5 = raw.slice(0, 6)
const last5 = raw.slice(-6)

const result = `${first5} ... ${last5}`

const treinoFloat = ref(false)
function treino() {
  mostrarHUD.value = !mostrarHUD.value
  treinoFloat.value = !treinoFloat.value
}

const treinus = ref([]);
const seriuss = ref([]); // Sériess do treino selecionado
const selectedTraining = ref(null); // Treino selecionado
const selectedSeries = ref(null); // Série selecionada
const setTreino = useCookie("setTreino");
const treinoAtual = ref(setTreino.value); // Carrega treino do cookie
const dataTreinuu = await useFetch(`https://api.leandrocesar.com/usersnw/${coachIdCookie.value}/team/${route.params.id}/treinos/${selectedTraining}/${selectedSeries}`)

const dataTreino = await useFetch(
  `https://api.leandrocesar.com/usersnw/${coachIdCookie.value}/team/${route.params.id}/treinos`
);

console.log(dataTreino)

treinus.value = dataTreino.data.value || [];
console.log(treinus)

// Função para carregar as séries do treino
async function loadSeries(training) {
  const dataSerie = await useFetch(
    `https://api.leandrocesar.com/usersnw/${coachIdCookie.value}/team/${route.params.id}/treinos/${training.name}`
  );
  seriuss.value = dataSerie.data.value?.serie || [];
  selectedTraining.value = training.name; // Armazena o treino selecionado
  treinoAtual.value = training.name; // Salva como treino atual
  setTreino.value = training.name; // Atualiza o cookie
}

const menuFloatCreate = ref('')

// Função para carregar os exercícios da série
async function loadExercises(series) {
  const dataExercises = await useFetch(
    `https://api.leandrocesar.com/usersnw/${coachIdCookie.value}/team/${route.params.id}/treinos/${selectedTraining.value}/${series.name}`
  );
  menuFloatCreate.value = true; // Exibe o menu flutuante
  exercises.value = dataExercises.data.value?.exercises || [];
  selectedSeries.value = { name: series.name, exercises: series.set || [] };
  const peoplessss = dataExercises.data.value
  const treinius = peoplessss.set || []
}


const dia = new Date().toLocaleDateString('pt-BR', { weekday: 'long' }).toLowerCase()

// 1. Plano semanal fixo
const plano = {
  segunda: 'Peito e tríceps',
  terça: 'Costas e bíceps',
  quarta: 'Pernas',
  quinta: 'Ombros',
  sexta: 'Full body',
  sábado: 'Cardio',
  domingo: 'Descanso'
}
const treinoHoje = ref(plano[dia])

function iniciarTreino() {
  if (treinoHoje.value === 'Descanso') {
    alert('Hoje é dia de descanso!')
    return
  }
  // Aqui você pode redirecionar ou exibir o treino do dia
  console.log('Iniciando treino:', treinoHoje.value)
}


// 2. Obtem o dia da semana de hoje
const diaDaSemana = new Date().toLocaleDateString('pt-BR', { weekday: 'long' }).toLowerCase()


// 3. Status inicial do treino
const statusTreino = ref('pendente') // 'pendente', 'feito' ou 'faltou'

// 4. Salva no localStorage
function salvarStatus(status) {
  const hoje = new Date().toISOString().split('T')[0]
  const key = `treino-${hoje}`

  const info = {
    data: hoje,
    treino: treinoHoje.value,
    status
  }

  localStorage.setItem(key, JSON.stringify(info))
  statusTreino.value = status
}

// 5. Carrega status salvo (se houver)
onMounted(() => {
  const hoje = new Date().toISOString().split('T')[0]
  const key = `treino-${hoje}`
  const salvo = localStorage.getItem(key)

  if (salvo) {
    statusTreino.value = JSON.parse(salvo).status
  }
})

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
const localAtual = ref('Local desconhecido')
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
  return 'Local desconhecido'
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

const { rankData } = usePlayerRank()

const niveisRankS = computed(() =>
  rankData.filter(r => r.nome === 'S' && r.nivel !== undefined)
)

const topClients = [
  { name: 'Camilla', rank: 'E', xp: 105000, avatar: '/assets/perfil.jpeg' },
  { name: 'Bruno', rank: 'D', xp: 98000, avatar: '/avatars/bruno.jpg' },
  { name: 'Ana', rank: 'C', xp: 87000, avatar: '/avatars/ana.jpg' },
  { name: 'Lucas', rank: 'C', xp: 76000, avatar: '/avatars/lucas.jpg' },
  { name: 'Camilla', rank: 'E', xp: 105000, avatar: '/avatars/camilla.jpg' },
  { name: 'Bruno', rank: 'D', xp: 98000, avatar: '/avatars/bruno.jpg' },
  { name: 'Ana', rank: 'C', xp: 87000, avatar: '/avatars/ana.jpg' },
  { name: 'Camilla', rank: 'E', xp: 105000, avatar: '/avatars/camilla.jpg' },
  { name: 'Bruno', rank: 'D', xp: 98000, avatar: '/avatars/bruno.jpg' },
  { name: 'Ana', rank: 'C', xp: 87000, avatar: '/avatars/ana.jpg' },
  { name: 'Camilla', rank: 'E', xp: 105000, avatar: '/avatars/camilla.jpg' },
  { name: 'Bruno', rank: 'D', xp: 98000, avatar: '/avatars/bruno.jpg' },
  { name: 'Ana', rank: 'C', xp: 87000, avatar: '/avatars/ana.jpg' },
  { name: 'Camilla', rank: 'E', xp: 105000, avatar: '/avatars/camilla.jpg' },
  { name: 'Bruno', rank: 'D', xp: 98000, avatar: '/avatars/bruno.jpg' },
  { name: 'Ana', rank: 'C', xp: 87000, avatar: '/avatars/ana.jpg' },
  { name: 'Camilla', rank: 'E', xp: 105000, avatar: '/avatars/camilla.jpg' },
  { name: 'Bruno', rank: 'D', xp: 98000, avatar: '/avatars/bruno.jpg' },
  { name: 'Ana', rank: 'C', xp: 87000, avatar: '/avatars/ana.jpg' },
  { name: 'Mariana', rank: 'B', xp: 65000, avatar: '/avatars/mariana.jpg' }
]


topClients.sort((a, b) => b.xp - a.xp)
</script>
<template>

    

  <nav class="bottom-menu">
    <NuxtLink :to="`/atleta/${route.params.id}`" class="menu-item">
        <Icon name="mingcute:home-2-line" />
        <span>Início</span>
    </NuxtLink>


    <div class="central-button">
      <NuxtLink @click="menu()" class="circle">
        HUD
      </NuxtLink>
    </div>

    
    <div class="menu-item">
      <Icon name="mynaui:chart-graph-solid" />
      <span>Progres.</span>
    </div>
  </nav>

  <div v-if="fotoAberta" class="nav-bar">
    <div class='logo-nav-bar'>
      <img @click="alternarFoto" :src="pessoa.foto || imagemPrevia">
    </div>
  </div>

  <div class="float-hud zoom" v-if="menuFloat">


    <div class="float-hud-container treinos ">
      <div id="nav-container" class='nav-treino'>
        <div>
          <div class="nav-bottom"></div>
        </div>
        <div>
          <NuxtLink @click="menu()" class="button-client">
            <Icon name="material-symbols:cancel-outline" />
          </NuxtLink>
        </div>
      </div>
      <div class="hud">
        <div class="float-header">
          <div class='name'>
            <div class="logo">
              <img @click="alternarFoto" :src="pessoa.foto || imagemPrevia" alt="User Photo" />

            </div>
            <div>

              <h2>{{ primeiroNome }} {{ pessoa.lastName }}</h2>
              <h4><span class="titulo">ID:</span> {{ result }}</h4>
              <h4><span class="classe">Classe:</span> {{ classe }}</h4>
              <h4><Location/></h4>
              <!--
                <h4><span class="titulo">Título:</span> {{ titulo }}</h4>
              -->
            </div>
          </div>

          <div>
            <span class="float-rank">RANK <p style="color: #ffffff">{{rankAtual}}</p></span>
            <span v-if="rankAtual === 'S' && nivelAtualS" class="float-nivel">Nível <p style="color: #ffffff">
                {{ nivelAtualS }}</p></span>
          </div>

        </div>

        <div v-if="mostrarHUD">
          <HudXp />
        </div>
        <div class="float-quite">

          <div class="float-missions">
            <h3>MISSÕES de Hoje <p>3 / 3</p>
            </h3>
            <hr>
            <h4>Progressos recentes</h4>
            <p><span class="check">✔</span> Aumento de peso</p>
            <p><span class="check">✔</span> Treino diario</p>
            <p><span class="check">✔</span> Bônus realizado</p>

          </div>

          <div class="float-rank-ladder">
            <p v-for="rank in ['S', 'A', 'B', 'C', 'D', 'E']" :key="rank" :class="{ active: rank === rankAtual }">
              {{ rank }}
            </p>
          </div>

        </div>

        <div class="float-menu-buttons">
          <button @click="menuConfiguration()">Configurações</button>
          <div class="float-menu-buttons-in">
            <button @click="menuAparency()">Aparência</button>
            <button @click="menuRanking()">Rankings</button>
        </div>
        </div>
        

        <button class="float-start-button" @click="logOut()">LOGOUT</button>
      </div>
    </div>
  </div>


  <!-- Notificações -->

  <!-- Logout -->
  <div class="float-notifications" v-if="notificationLogOut">
    <div class='hud-notifications'>
      <div class="notify">
        <Icon name="gravity-ui:exclamation-shape" />
        <p>
          Notificação
        </p>
      </div>
      <div class="notify-text">
        <p>
          Deseja realmente sair?
        </p>
      </div>
      <div class="notify-buttons">
        <button @click="navigateTo('/')">Sim</button>
        <button @click="logOut()">Não</button>
      </div>
    </div>
  </div>

  <!-- Configurações -->

  <div class="float-aparency" v-if="Configuration">
    <div class='hud-aparency'>
      <div id="nav-container" class='nav-aparency'>

        <div>
          <div class="nav-bottom"></div>
        </div>
        <div>
          <NuxtLink @click="menuConfiguration()" class="button-client">
            <Icon name="material-symbols:cancel-outline" />
          </NuxtLink>
        </div>
      </div>

      <div class="aparency">
          <Icon name="icon-park-twotone:config" />
          <p>
            Configurações
          </p>
      </div>
      <div  class="aparency-text">
        Localização atual
      </div>
      <FullLocation style='text-align:left;' />
    </div>

  </div>


  <!-- Aparencia -->

  <div class="float-aparency" v-if="Aparency">
    <div class='hud-aparency'>
      <div id="nav-container" class='nav-aparency'>

        <div>
          <div class="nav-bottom"></div>
        </div>
        <div>
          <NuxtLink @click="menuAparency()" class="button-client">
            <Icon name="material-symbols:cancel-outline" />
          </NuxtLink>
        </div>
      </div>

      <div class="aparency">
        <Icon name="solar:palette-round-line-duotone" />
        <p>
          Aparência
        </p>
      </div>
      <div class="aparency-text">
        <div>
          <span>
            Tema Base
          </span>
          <p>
            Escolha o tema padrão do Nx_WOD
          </p>
        </div>

      </div>
      <div class="theme-switch">
        <input type="radio" id="system" value="system" v-model="$colorMode.preference" class="radio-input" />
        <label for="system" class="pill">
          <Icon name='mi:computer' /> System
        </label>

        <input type="radio" id="light" value="light" v-model="$colorMode.preference" class="radio-input" />
        <label for="light" class="pill">
          <Icon name='material-symbols:light-mode-outline-rounded' /> Light
        </label>

        <input type="radio" id="dark" value="dark" v-model="$colorMode.preference" class="radio-input" />
        <label for="dark" class="pill">
          <Icon name='material-symbols:dark-mode-outline-rounded' />Dark
        </label>
      </div>
      <br>
      <div class="aparency-text">
        <div>
          <span>
            Cor de destaque
          </span>
          <p>
            Escolha o a cor de destaque de todo o app.
          </p>
        </div>

      </div>
      <div class="theme-switch">
        <input
        class="col"
      id="playerColor"
      type="color"
      v-model="selectedColor"
      list="presetColors"
    />

    <datalist id="presetColors">
      <option value="#b800ff">Guerreiro</option>
      <option value="#9b59b6">Mago</option>
      <option value="#2ecc71">Curandeiro</option>
      <option value="#e74c3c">Assassino</option>
      <option value="#ff1900">Gladiador</option>
      <option value="#f39c12">Caçador de Elite</option>
    </datalist>
        <Icon name="material-symbols:restart-alt-rounded" @click="resetColorToDefault" />
      </div>
      <div>
  </div>
    </div>


  </div>


  <!-- Ranking -->

  <div class="float-ranking" v-if="Ranking">
    <div class='hud-ranking'>
      <div id="nav-container" class='nav-aparency'>

        <div>
          <div class="nav-bottom"></div>
        </div>
        <div>
          <NuxtLink @click="menuRanking()" class="button-client">
            <Icon name="material-symbols:cancel-outline" />
          </NuxtLink>
        </div>
      </div>

      <div class="aparency">
        <Icon name="solar:ranking-line-duotone" />
        <p>
          Ranking
        </p>
      </div>
      <div class="ranking-box">
        <div class="ranking-list">
          <div class="ranking-item" v-for="(client, index) in topClients" :key="client.name">
            <div class="rank-info">
              <img :src="client.avatar" class="rank-avatar" alt="Avatar" />
              <div class="rank-xp">
              
                <div class="rank-name">{{ client.name }}</div>
                <div class="rank-rank">Rank {{ client.rank }} - {{ client.xp }} XP </div>

              </div>
            </div>
            <div class="rank-number">{{ index + 1 }} º</div>
          </div>
        </div>
      </div>
      
    </div>


  </div>

  
  <br>
  <br>
  <br>
  <br>
  <br>
      

  <!-- Fim das Notificações -->


  <!-- Páginas/rotas -->

  <!-- Treinos -->

  <div class="float zoom" v-if="treinoFloat">


    <div class="float-hud-container treinos ">
      <div id="nav-container" class='nav-treino'>
        <div>
          <div class="nav-bottom"></div>
        </div>
        <div>
          <NuxtLink @click="treino()" class="button-client">
            <Icon name="material-symbols:cancel-outline" />
          </NuxtLink>
        </div>
      </div>

      <div class="hud">
        <div class="float-header">
          <div class='name'>
            <div class="logo">
              <img @click="alternarFoto" :src="pessoa.foto || imagemPrevia" alt="User Photo" />
            </div>
            <div>
              <h2>{{ primeiroNome }} </h2>
              <h4>{{ classe }}</h4>
            </div>
          </div>

          <div>
            <span class="float-rank">RANK <p style="color: #ffffff">{{ rankAtual }}</p></span>
            <span v-if="rankAtual === 'S' && nivelAtualS" class="float-nivel">Nível <p style="color: #ffffff">
            {{ nivelAtualS }}</p></span>
          </div>
        </div>

        <div v-if="mostrarHUD">
          <HudXp />
        </div>


        <div class="treinos-title">
          <h3>Treinos</h3>
        </div>
        <div class="missions">


          <div>
            <div v-for="(treino, index) in treinus" :key="index">
              <div class="square" :class="{ selected: treino.name === treinoAtual }" @click="loadSeries(treino)">
                <div>
                  <h4>{{ treino.name }}</h4>
                </div>
              </div>
            </div>

            <div v-if="selectedTraining" class="info">
              <div class="main-div-two">
                <h3>
                  <Icon name="solar:dumbbells-broken" /> Séries do treino: {{ selectedTraining }}
                </h3>
              </div>
            </div>

            <div v-if="seriuss.length > 0" class="main-div-twoo" v-for="(qtSeries, index) in seriuss" :key="index">
              <div class="squareS" @click="loadExercises(qtSeries)">

                <div>
                  <h5>{{ qtSeries.name }}</h5>
                </div>
              </div>
            </div>

          </div>


        </div>
        <h3>Hoje é dia de <span>{{ treinoHoje }}</span></h3>
        <br>

        <button class="start-button" @click="iniciarTreino">Iniciar treino do dia</button>
      </div>
    </div>
    <nav class="bottom-menu">
      <NuxtLink @click='treino()' class="menu-item">
        <Icon name="streamline:travel-hotel-dumbell-sports-weights-dumbbell-sport-fitness" />
        <span>Treinos</span>
      </NuxtLink>
      <div class="menu-item">
        <Icon name="streamline:location-target-1" />
        <span>Histórico</span>
      </div>

      <div class="central-button">
        <NuxtLink @click="menu()" class="circle">
          HUD
        </NuxtLink>
      </div>

    </nav>

  </div>
<slot />
</template>


<style scoped>
.float-xp-section {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  font-family: 'Orbitron', sans-serif;
  color: #ffffff;
}

.float-xp-bar {
  height: 16px;
  width: 100%;
  background: #222;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 4px;
  box-shadow: inset 0 0 4px #000;
}

.float-xp-progress {
  height: 100%;
  background: linear-gradient(to right, #b800ff, #8d00ab);
  border-radius: 12px;
  transition: width 0.2s ease-out;
}

.float-xp-text {
  font-size: 0.85rem;
  color: #ccc;
  margin-top: 4px;
  text-align: center;
}

.hud-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
}

.panel {
  border: 2px solid var(--player-color);
  padding: 2rem 1rem;
  border-radius: 10px;
  width: 350px;
  background-color: #020024;
  color: #ffffff;
  box-shadow: 0 0 20px var(--player-color);
  font-family: 'Orbitron-Regular', sans-serif;
}


.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
  margin-bottom: 1rem;
}

.header h2 {
  color: #fff;
  font-size: 1.1rem;
}

.header h4 {
  color: var(--player-color);
}

.rank {
  border: 1px solid var(--player-color);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  color: var(--player-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}

.rank p {
  margin-left: .7rem;
}

.float-xp-bar {
  background: #ffffff33;
  height: 10px;
  border-radius: 10px;
  margin-top: 5px;
  overflow: hidden;
}


.float-xp-text {
  text-align: right;
  font-size: 0.9rem;
  color: #fff;
  margin: 0.25rem 0 1rem 0;
}

.float-xp-section {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  font-family: 'Orbitron', sans-serif;
  color: #ffffff;
}


.float-xp-progress {
  height: 100%;
  background: var(--player-color);
  border-radius: 12px;
  transition: width 0.2s ease-out;
}

.quite {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  color: var(--player-color);
  font-weight: bold;
}

.missions {
  border: 1px solid var(--player-color);
  padding: .5rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
}

.missions h3 {
  margin: 0 0 0.5rem 0;
  color: var(--player-color);
}

.rank-ladder {
  border: 1px solid var(--player-color);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: .5rem;
  color: var(--player-color);
  font-weight: bold;
  width: 20%;
  border-radius: 8px;
}

.rank-ladder p {
  padding: .1rem 0;
  color: var(--player-color);
}

.menu-buttons button {
  display: block;
  width: 100%;
  max-width: 300px;
  margin: 0.5rem auto;
  background: transparent;
  border: 2px solid var(--player-color);
  color: var(--player-color);
  padding: 0.75rem;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.menu-buttons button:hover {
  background: var(--player-color);
  color: #ffffff;
  border-color: var(--player-color);
}

.start-button {
  background: var(--player-color);
  border: none;
  color: #fff;
  padding: 0.75rem;
  width: 100%;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 0 10px var(--player-color);
  transition: background 0.3s;
}

.start-button:hover {
  opacity: 0.8;
}

.head-logo {
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  align-items: flex-start;
  z-index: 1;
  flex-wrap: wrap;
}

.icon {
  zoom: 1.1;
}

.logo {
  display: flex;
  justify-content: center;
  flex-direction: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin: -.5rem 1rem .7rem 0rem;
  border-radius: 200px;
  z-index: 10;
  background: linear-gradient(90deg, var(--player-color) 0%, var(--player-color) 35%, var(--player-color) 100%);
  width: 64px;
  height: 64px;
}

.logo img {
  height: 60px;
  width: 60px;
  border-radius: 200px;
  z-index: 100;
  opacity: 1;
  object-fit: cover;
  /* Preenche o contêiner sem deformar */
}


.logo-nav-bar img {
  width: 300px;
  border-radius: 200px;
  border: var(--player-color) 1px solid;
  opacity: 1;
  z-index: 100;

}

.button-client {
  margin: 1.2rem 1.5rem;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  zoom: 1.3;
}

.button-client .icon {
  zoom: .9;
  margin-right: -3px;
}


.head-name {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
}


.name {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
  color: var(--player-color);
}

.email {
  font-size: .8rem;
  line-height: 1.5rem;
  margin: .2rem 1.6rem;
  font-weight: 700;
  letter-spacing: 1.1px;

}


.body-timeline {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  text-align: left;
  margin: 2rem 10px 120px 10px;
}

.main-logo {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  width: 100px;
  box-shadow: 1px 7px 20px var(--player-color);
  margin: 1.5rem;
  border-radius: 10px;
}

.main-logo img {
  width: 100px;
  border-radius: 10px;
  border: var(--player-color) 2px solid;
  opacity: 1;

}

.body-timeline p {
  text-align: left;
  margin: 0 10px 20px 20px;
}

.link {
  text-decoration: underline;
}

.link:hover {
  color: var(--player-color);
}

.section-title {
  text-align: left;
  margin: 10px 1.5rem;
  font-weight: 800;
}

.section-title .icon {
  zoom: .8
}

.section-subtitle {
  text-align: left;
  margin: -10px 1.5rem 15px;
  font-weight: 800;
  font-size: .9em;
}

.section-subtitle-two {
  text-align: left;
  margin: -16px 1.5rem 15px;
  font-weight: 800;
  font-size: .9em;
}

.section-option {
  text-align: left;
  margin: -6px 1.5rem 35px 2.8rem;
  font-size: .8em;
  font-weight: 800;
}

.section-option .icon {
  zoom: .8;
  margin-top: -3px;
}

.verified {
  color: green;
}

.pending {
  color: #e1a918;
}

.bloqued {
  color: #b30000;
}


.conf {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 20px;
}

.menu-square {
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-weight: 800;
  width: 49.6%;
  padding: 5px;
  border-radius: 10px;
  margin: 1px auto;
  border: solid .1px var(--player-color)50;
}

.menu-square div .icon {
  margin: 3px 0px;
  transition: transform .3s linear;
  transform: translateX(-10px);
}

.menu-square div {
  display: flex;
  flex-direction: column;
  font-size: 1em;
  justify-content: center;
  margin: 2px auto;
}

.menu-square div:nth-child(2) {
  display: flex;
  flex-direction: column;
  font-size: .7em;
  justify-content: center;
  margin: 2px auto;
}

.menu-square div:nth-child(3) {
  display: flex;
  flex-direction: column;
  font-size: .7em;
  justify-content: center;
  margin: 2px auto;
  color: #002aff;
}

.menu-button {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-weight: 800;
  width: 100%;
  padding: 6px 2px 2px 2px;
  margin: 5px auto;
  border: solid 1px var(--player-color)10;
  border-bottom: solid .1px var(--player-color)40;
  border-top: solid .2px transparent;
}

.menu-button div {
  display: flex;
  flex-direction: row;
  font-size: .8em;
  justify-content: space-between;
  margin-top: 2px;
}

.menu-button .icon {
  margin: -2px 0px 0px 26px;
  transition: transform .3s linear;
  transform: translateX(-15px);
}

.menu-button .icon:nth-child(2) {
  margin: 5px 0px 0px 26px;
  transition: transform .3s linear;
  transform: translateX(-25px);
}

.menu-button:hover {
  cursor: pointer;
  border-bottom: solid .2px var(--player-color);
  background-color: var(--player-color)10;
}


.menu-button:hover .icon:nth-child(2) {
  transform: translateX(-15px);
}

.logout {
  position: fixed;
  bottom: 15px;
  left: 50%;
  width: 250px;
  margin-left: -125px;
  transition: all .4s linear;
  border: solid .1px var(--player-color)70;
  box-shadow: 0 0px 5px var(--player-color)10;
  cursor: pointer;
  text-align: center;
  line-height: 18px;
  border-radius: 10px;
  font-weight: 600;
  transition: all 0.2s ease-in-out 0s;
  height: 34px;
  font-size: 14px;
  padding-inline: 16px;
  padding-top: 6px;
  padding-bottom: 8px;
}

.logout .icon {
  margin: 1px 0px 0px 6px;
  transition: transform .3s linear;
  transform: translateX(8px);
}

.logout:hover {
  background-color: var(--player-color)10;
  color: var(--player-color)80;
  cursor: pointer;
}

.logout:hover .icon {
  margin: 1px 0px 0px 6px;
  transform: translateX(0px);
}

.nav {
  transition: all .4s linear;
  position: absolute;
  top: 15px;
  right: 20px;
  margin: 30px 0px 0px auto;
  border-radius: 200px;
}

.nav .icon {
  color: var(--player-color);
}

.nav a {
  margin: 0 2px;
  cursor: pointer;
}


.nav a:hover {
  background: transparent;
  color: #33e4fc;
}

.nav .icon {
  zoom: 1.1;
}

.color {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  position: fixed;
  height: 35px;
  width: 35px;
  transition: all 0.2s ease-in-out 0s;
  bottom: 3.9rem;
  right: 1.5rem;
  border-radius: 10px;
  cursor: pointer;
  border: solid 1px var(--player-color)10;
  box-shadow: 0 0px 5px var(--player-color)40;
  backdrop-filter: blur(100px);
  z-index: 1;
}

.whats {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  position: fixed;
  height: 35px;
  width: 35px;
  transition: all 0.2s ease-in-out 0s;
  bottom: 1.5rem;
  right: 1.5rem;
  border-radius: 10px;
  cursor: pointer;
  border: solid 1px var(--player-color)10;
  box-shadow: 0 0px 5px var(--player-color)40;
  z-index: 1;
  backdrop-filter: blur(100px);
}

.whats .icon,
.color .icon {
  color: var(--player-color)90;
  zoom: 1;
}

.nav-bar {
  z-index: 100000;
  transform: translateX(0%);
  position: fixed;
  height: calc(100% - 0px);
  bottom: 0px;
  width: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
}

.logo-nav-bar {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  transform: translateX(0%);
  position: fixed;
  bottom: 0px;
  top: -1px;
  height: calc(100% - -1px);
  width: 100%;
  background: linear-gradient(to bottom right, var(--player-color)90 0%, #00d4ff90 50%, var(--player-color)90 100%);
  backdrop-filter: blur(15px);
  z-index: 1134004;


}

.logo-nav-bar img {
  width: 300px;
  height: 300px;
  border-radius: 200px;
  border: var(--player-color) 2px solid;
  opacity: 1;
  z-index: 100;
  object-fit: cover;
  /* Preenche o contêiner sem deformar */
  padding: 4px;
}

.photo {
  position: absolute;
  top: 68px;
  height: 25px;
  border-radius: 50%;
}

.photo .icon {
  color: var(--player-color);
  zoom: 1;
  border-radius: 6px;
  background: var(--player-color)40;
  padding: 3px;
}

.logo {
  position: relative;
  display: flex;
  align-items: center;
}

.float-hud {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1006;
  background: var(--player-color)60;
  backdrop-filter: blur(15px);
  /* Desfoque do fundo */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  /* Sombras (opcional) */
  color: #333;
  /* Cor do texto */
  width: 100%;
  /* Largura fixa */
  height: 100vh;
  /* Altura fixa */
  padding: 0px;
  /* Espaçamento interno */
  overflow-y: auto;

}

.float {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1002;
  background: var(--player-color)60;
  backdrop-filter: blur(15px);
  /* Desfoque do fundo */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  /* Sombras (opcional) */
  color: #333;
  /* Cor do texto */
  width: 100%;
  /* Largura fixa */
  height: 100vh;
  /* Altura fixa */
  padding: 0px;
  /* Espaçamento interno */
  overflow-y: auto;

}

.hud {
  border: 2px solid var(--player-color);
  padding: 2rem 1rem;
  border-radius: 10px;
  margin: 0 0 50px 0;
  width: 350px;
  background-color: #020024;
  color: #ffffff;
  box-shadow: 0 0 20px var(--player-color);
  font-family: 'Orbitron-Regular', sans-serif;
}

.hud h3 span {
  font-size: 1rem;
  color: var(--player-color);
}

.float-hud-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5.7rem;
}

.float-panel {
  border: 2px solid var(--player-color);
  padding: 2rem 1rem;
  border-radius: 10px;
  width: 350px;
  background-color: #020024;
  color: #ffffff;
  box-shadow: 0 0 20px var(--player-color);
  font-family: 'Orbitron-Regular', sans-serif;
}


.float-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
  margin-bottom: 1rem;
}

.float-header h2 {
  color: #fff;
  font-size: 1.1rem;
}

.float-header h4 {
  color: var(--player-color);
}

span {
  font-size: 0.9rem;
}

.classe,
.titulo {
  color: #fff;
}

.float-rank {
  border: 1px solid var(--player-color);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  color: var(--player-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}

.float-rank p {
  margin-left: .7rem;
}
.float-nivel {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  color: var(--player-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}

.float-nivel p {
  margin-left: .7rem;
}


.float-xp-section {
  margin-bottom: 1.5rem;
}

.float-xp-bar {
  background: #ffffff33;
  height: 10px;
  border-radius: 10px;
  margin-top: 5px;
  overflow: hidden;
}

.float-xp-progress {
  height: 100%;
  background: var(--player-color);
  border-radius: 10px;
}

.float-xp-text {
  text-align: right;
  font-size: 0.9rem;
  color: #fff;
  margin-top: 0.25rem;
}

.float-quite {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  color: var(--player-color);
  font-weight: bold;
}

.float-missions {
  border: 1px solid var(--player-color);
  padding: .5rem;
  margin-bottom: 1.5rem;
  width: 77%;
  border-radius: 8px;
}

.float-missions h3 {
  margin: 0 0 0.5rem 0;
  color: var(--player-color);
  text-align: center;
}

hr {
  border: none;
  border: .1px solid var(--player-color)90;
  margin-bottom: 10px;
}

.float-rank-ladder {
  border: 1px solid var(--player-color);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: .5rem;
  color: var(--player-color);
  font-weight: bold;
  width: 20%;
  border-radius: 8px;
}

.float-rank-ladder p {
  padding: .1rem 0;
  color: var(--player-color);
}

.float-rank-ladder p {
  color: var(--player-color);
  font-weight: 400;
  transition: color 0.3s, font-weight 0.3s;
}

.float-rank-ladder p.active {
  color: #ffffff;
  font-weight: bold;
}

.float-menu-buttons button {
  display: block;
  width: 100%;
  max-width: 300px;
  margin: 0.5rem auto;
  background: transparent;
  border: 2px solid var(--player-color);
  color: var(--player-color);
  padding: 0.75rem;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.float-menu-buttons-in {
  display: flex;
  width: 100%;
  background: transparent;
  color: var(--player-color);
      padding: 0.25rem 0.3rem;
      gap: 0 .25rem;
    margin-top: -1rem;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.float-menu-buttons button:hover {
  background: var(--player-color);
  color: #ffffff;
  border-color: var(--player-color);
}

.float-start-button {
  background: var(--player-color);
  border: none;
  color: #fff;
  padding: 0.75rem;
  width: 100%;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 0 10px var(--player-color);
  transition: background 0.3s;
}

.float-start-button:hover {
  opacity: .7;
}

/* Esconde o input de arquivo */
input[type="file"] {
  display: none;
}

.float-notifications {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1008;
  backdrop-filter: blur(10px);
  /* Desfoque do fundo */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  /* Sombras (opcional) */
  color: #333;
  /* Cor do texto */
  width: 100%;
  /* Largura fixa */
  height: 100vh;
  /* Altura fixa */
  padding: 0px;
  /* Espaçamento interno */
  overflow-y: auto;

}

.hud-notifications {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1002;
  border: 2px solid var(--player-color);
  padding: 2rem 1rem;
  border-radius: 5px;
  margin: 0 0 50px 0;
  width: 90%;
  background-color: #020024;
  color: #ffffff;
  color: var(--player-color);
  box-shadow: 0 0 20px var(--player-color);
  font-family: 'Orbitron-Regular', sans-serif;
}

.notify {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin: 1.5rem 0;
}

.notify .icon {
  font-size: 30px;
  margin-right: 5px;
  padding: 3px;
  zoom: 2;
  border: 1px solid var(--player-color);
  border-radius: 2px;
}

.notify p {
  font-size: 10px;
  padding: 3px;
  zoom: 2;
  border: 1px solid var(--player-color);
  color: var(--player-color);
  border-radius: 2px;
}

.notify-text {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-bottom: 1.5rem;
}

.notify-buttons {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-size: 20px;
  margin-bottom: 1.5rem;
}

.notify-buttons button {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  padding: 2px 15px;
  margin: 0 -30px;
  background: transparent;
  border: 1px solid var(--player-color);
  color: var(--player-color);
  transition: all .4s linear;
}

.notify-buttons button:hover {
  background: var(--player-color);
  border: 1px solid var(--player-color);
  color: #fff;
}

.nav-aparency {
  transition: all .4s linear;
  position: absolute;
  top: -70px;
  right: -30px;
  margin: 30px 0px 0px auto;
  border-radius: 200px;
  color: var(--player-color);
}

.nav-aparency .icon {
  color: var(--player-color);
  zoom: 1.2;
}

.float-aparency {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1008;
  backdrop-filter: blur(10px);
  /* Desfoque do fundo */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  /* Sombras (opcional) */
  color: #333;
  /* Cor do texto */
  width: 100%;
  /* Largura fixa */
  height: 100vh;
  /* Altura fixa */
  padding: 0px;
  /* Espaçamento interno */
  overflow-y: auto;
  text-align: center;
}

.hud-aparency {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1002;
  border: 2px solid var(--player-color);
  padding: 2rem 1rem;
  border-radius: 5px;
  margin: 0 0 50px 0;
  width: 90%;
  background-color: #020024;
  color: #ffffff;
  color: var(--player-color);
  box-shadow: 0 0 20px var(--player-color);
  font-family: 'Orbitron-Regular', sans-serif;
}

.float-ranking {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1008;
  backdrop-filter: blur(10px);
  /* Desfoque do fundo */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  /* Sombras (opcional) */
  color: #333;
  /* Cor do texto */
  width: 100%;
  /* Largura fixa */
  height: 100vh;
  /* Altura fixa */
  padding: 0px;
  /* Espaçamento interno */
  overflow-y: auto;
  text-align: center;
}

.hud-ranking {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1009;
  border: 2px solid var(--player-color);
  padding: 2rem .8rem;
  border-radius: 5px;
  margin: 0 0 50px 0;
  width: 90%;
  background-color: #020024;
  color: #ffffff;
  color: var(--player-color);
  box-shadow: 0 0 20px var(--player-color);
  font-family: 'Orbitron-Regular', sans-serif;
}

.ranking-box {
  margin-top: 20px;
  height: calc(60dvh - 50px);
}

.ranking-title {
  color: #d800ff;
  font-size: 1.4rem;
  margin-bottom: 8px;
  text-align: center;
  letter-spacing: 1px;
  font-family: 'Orbitron', sans-serif;
}

.ranking-list {
  border-radius: 8px;
  padding: 0px;
  overflow-y:auto;
  height: calc(60dvh - 50px);
  
}

.ranking-item {
  background: rgba(170, 169, 169, 0.116);
  display: flex;
  border-radius: 20px;
  align-items: center;
  padding:5px 5px;
  margin: 5px 0px;
}

.ranking-item:last-child {
  border-bottom: none;
}

.rank-number {
  font-size: 1.2rem;
  font-weight: bold;
  width: 45px;
  color: #ffdc00;
  text-shadow: 0 0 5px #ffdc00;
}

.rank-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin: 0 10px;
  border: 2px solid #fff;
}

.rank-info {
  flex: 1;
  display: flex;
  color: #fff;
}

.rank-xp {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.rank-name {
  font-size: 1rem;
  font-weight: bold;
}

.rank-rank {
  font-size: 0.8rem;
  color: var(--player-color);
}

.treinos {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1002;
  border-radius: 5px;
  margin: 0 0 50px 0;
  color: #ffffff;
  color: var(--player-color);
  font-family: 'Orbitron-Regular', sans-serif;
}

.nav-treino {
  transition: all .4s linear;
  position: absolute;
  top: -70px;
  right: -30px;
  margin: 30px 0px 0px auto;
  border-radius: 200px;
}

.nav-treino .icon {
  color: var(--player-color);
  zoom: 1.2;
}

.aparency {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin: 1.5rem 0;
}

.aparency .icon {
  font-size: 30px;
  margin-right: 5px;
  padding: 3px;
  zoom: 2;
  border: 1px solid var(--player-color);
  border-radius: 2px;
}

.aparency p {
  font-size: 10px;
  padding: 3px;
  zoom: 2;
  border: 1px solid var(--player-color);
  color: var(--player-color);
  border-radius: 2px;
}

.aparency-text {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  font-size: 20px;
  margin-bottom: 1.5rem;
}

.aparency-text span {
  font-size: 1.1rem;
}

.aparency-text p {
  font-size: .8rem;
}

.aparency-buttons {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-size: 20px;
  margin-bottom: 1.5rem;
}

.aparency-buttons button {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  padding: 2px 15px;
  margin: 0 -30px;
  background: transparent;
  border: 1px solid var(--player-color);
  color: var(--player-color);
  transition: all .4s linear;
}

.aparency-buttons button:hover {
  background: var(--player-color);
  border: 1px solid var(--player-color);
  color: #fff;
}

.treinos-title h3 {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-size: 20px;
  color: var(--player-color);
  margin-bottom: 1.5rem;
}

.treinos-title button {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  padding: 2px 15px;
  margin: 0 -30px;
  background: transparent;
  border: 1px solid var(--player-color);
  color: var(--player-color);
  transition: all .4s linear;
}

.treinos-title button:hover {
  background: var(--player-color);
  border: 1px solid var(--player-color);
  color: #fff;
}

.theme-switch {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: .5rem;
  margin-bottom: 1rem;
}

.theme-switch .icon {
  margin-top: -3p
}

.radio-input {
  display: none;
}

.pill {
  padding: 0.2rem .6rem;
  font-size: .7rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.pill .icon {
  zoom: .9;
}

.radio-input:checked+.pill {
  background-color: var(--player-color);
  border-color: #00d4ff50;
  color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.pill:hover {

  border-color: var(--player-color);
}

.theme-switch .col {
  height: 30px;
  width: 50px;
}

.bottom-menu {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #020024;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  box-shadow: 0 -1px 5px #ffffff20;
}

.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: #999;
  transition: all .4s linear;
}

.menu-item:hover {
  color: var(--player-color);
  cursor: pointer;
}

.menu-item .icon {
  font-size: 20px;
}

.menu-item.active {
  color: var(--player-color);
}

.central-button {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
}

.central-button .circle {
  background: #020024;
  color: white;
  border-radius: 50%;
  width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 13px;
  box-shadow: 0 4px 10px var(--player-color);
  border: 4px solid var(--player-color);
  /* color:#33e4fc; */
}

.central-button .circle:hover {
  background: var(--player-color);
  box-shadow: 0 4px 10px var(--player-color);
  border: 4px solid var(--player-color);
}

.dark-mode body input {
  background: var(--vt-c-black-soft);
  color: #fff;
  border: transparent;
  height: 19px;
  width: 30px;
}

.dark-mode body input::placeholder {
  color: #ddd;
}

.dark-mode body input:focus {
  background: transparent;
}
</style>
