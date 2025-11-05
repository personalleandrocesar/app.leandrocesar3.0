 <script setup>
import { ref, computed, watch, nextTick, watchEffect, onMounted } from "vue";
const rota = useRoute();
const route = useRoute();

function vibrarHUD() {
  if (navigator.vibrate) {
    navigator.vibrate([20]) // vibra por 200ms
  } else {
    console.log("Vibração não suportada nesse dispositivo.")
  }
}


const cookieTreinador = useCookie('coachId');
const {
  xpAtual,
  rankAtual,
  proximoRank,
  nivelAtualS,
  proximoNivelS,
  xpClasse,
  xpRelativo,
  xpMin,
  xpMax,
  missoesAtuais
} = await usePlayerRank(cookieTreinador.value, route.params.id)





const mostrarHUD = ref(false)
const { selectedColor, selectedClass, classColors, resetColorToDefault } = usePlayerColor()



const usuarios = await useFetch(
  `https://api.leandrocesar.com/usersnw/${cookieTreinador.value}/team/${rota.params.id}`
);

const { data: team } = await useFetch(
  `https://api.leandrocesar.com/usersnw/${cookieTreinador.value}/team`
)

const teamSortedByXp = ref([])

watchEffect(() => {
  if (team.value && Array.isArray(team.value)) {
    // cria cópia nova e ordena pelo XP (maior primeiro)
    teamSortedByXp.value = [...team.value].sort((a, b) => (b.xp || 0) - (a.xp || 0))
  }
})

function nomeCurto(nome) {
  if (!nome) return ''
  return nome.split(' ').slice(0, 2).join(' ')
}

const pessoa = usuarios.data.value;
console.log(pessoa.birthday)
const primeiroNome = computed(() => pessoa.name.split(" ")[0]);

console.log(usuarios.data.value)

// useHead em forma de função — reativo por conta do selectedColor
useHead(() => ({
  titleTemplate: `${primeiroNome.value} ${pessoa.lastName} - Atleta | Personal Leandro Cesar`,
  meta: [
    {
      name: 'theme-color',
      // se selectedColor for um ref, .value dá a string; fallback para a var CSS ou cor padrão
      content: selectedColor?.value
        || getComputedStyle(document.documentElement).getPropertyValue('--player-color').trim()
        || '#2ecc71'
    }
  ]
}))

// garante valor inicial caso o composable não tenha setado
onMounted(() => {
  if (!selectedColor?.value) {
    selectedColor.value = getComputedStyle(document.documentElement).getPropertyValue('--player-color').trim() || '#2ecc71'
  }
})
const classeSelecionada = ref(null)

function selecionarClasse(classe) {
  classeSelecionada.value = classe
}

// 🎯 Atualiza o <meta name="theme-color"> com base na cor da classe
// watch(classeSelecionada, (novaClasse) => {
//   if (novaClasse) {
//     useHead({
//       meta: [
//         { name: 'theme-color', content: novaClasse.cor }
//       ]
//     })
//   }
// })
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
  vibrarHUD()
}
const colorMode = useColorMode()

if (!colorMode.value){
  colorMode.preference ="dark"
}

function theme() {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
}

const colorCookie = useCookie('colorCookie', {default: () => 'darkCookie'})

if (colorMode.value === "dark") {
  colorCookie.value = "darkCookie"
} else {
  colorCookie.value = "lightCookie"
}

// colorCookie.value === "darkCookie" ? colorMode.value = "dark" : colorMode.value = "light"

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
const notificationTreinoDoDia = ref(false)
function notTreinoOut() {
  notificationTreinoDoDia.value = !notificationTreinoDoDia.value
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

const treinus = ref([]);
const seriuss = ref([]); // Sériess do treino selecionado
const setTreino = useCookie("setTreino");
const selectedTraining = ref(setTreino.value || null);

watch(selectedTraining, (novo) => {
  setTreino.value = novo; // sempre mantém cookie atualizado
});


const selectedSeries = ref(null); // Série selecionada
const treinoAtual = ref(setTreino.value); // Carrega treino do cookie
console.log(treinoAtual.value)
const dataTreinuu = await useFetch(`https://api.leandrocesar.com/usersnw/${coachIdCookie.value}/team/${route.params.id}/treinos/${selectedTraining}/${selectedSeries}`)

const dataTreino = await useFetch(
  `https://api.leandrocesar.com/usersnw/${coachIdCookie.value}/team/${route.params.id}/treinos`
);

const { data: dataAvaliacoes } = await useFetch(
  `https://api.leandrocesar.com/usersnw/${coachIdCookie.value}/team/${route.params.id}`
)

const avaliacoes = computed(() => dataAvaliacoes.value?.avaliacoes || [])

const ultimaAvaliacao = computed(() => {
  const list = avaliacoes.value
  return list.length ? list[list.length - 1] : null
})

const valuet = usuarios.data.value.avaliacoes
console.log(ultimaAvaliacao.value)

const divInfoIMC = ref(false)

const avaliacao = ultimaAvaliacao.value

const peso = avaliacao?.massa
const altura = avaliacao?.altura
console.log(peso)

const calcIMC = computed(() => {
    return (peso / (altura * altura)).toFixed(1)
})

const classIMC = computed(() => {
    if (calcIMC.value < 18.5) {
        return 'Baixo Peso';
    } else if (calcIMC.value >= 18.5 && calcIMC.value <= 24.9) {
        return 'Normal';
    } else if (calcIMC.value >= 25.0 && calcIMC.value <= 29.9) {
        return 'Sobrepeso';
    } else if (calcIMC.value >= 30 && calcIMC.value <= 34.9) {
        return 'Obesidade classe 1';
    } else if (calcIMC.value >= 35 && calcIMC.value <= 39.9) {
        return 'Obesidade classe 2';
    } else if (calcIMC.value >= 40.0) {
        return 'Obesidade classe 3';
    } else {
        return 'Digite os valores certo para saber seu IMC!!'
    }
})

const resClassIMC = classIMC.value

function infoIMC() {
    divInfoIMC.value = !divInfoIMC.value
}

const sexo = avaliacao?.sexo
const idade = parseFloat(avaliacao?.idade)
const dTorax = parseFloat(avaliacao?.dtorax)
const abdominal = parseFloat(avaliacao?.abdominal)
const coxa = parseFloat(avaliacao?.coxa)
const triceps = parseFloat(avaliacao?.tricipital)
const supraespinhal = parseFloat(avaliacao?.supraEspinhal)

const homens = dTorax + abdominal + coxa
const mulheres = triceps + supraespinhal + coxa

const dcHomens = 1.109380 - (0.0008267 * (homens)) + (0.0000016 * (homens * homens)) - (0.0002574 * (idade))
const dcMulheres = 1.0994921 - (0.0009929 * (mulheres)) + (0.0000023 * (mulheres * mulheres)) - (0.0001392 * (idade))

const percGHomens = (((4.95 / dcHomens) - 4.50) * 100).toFixed(1)
const percGMulheres = (((4.95 / dcMulheres) - 4.50) * 100).toFixed(1)

console.log(percGHomens)

console.log(percGMulheres)
const classHomens = computed(() => {

    if (percGHomens >= 5 && percGHomens <= 14.9) {
        return 'Normal';
    } else if (percGHomens >= 15 && percGHomens <= 19.9) {
        return 'Sobrepeso';
    } else if (percGHomens >= 20 && percGHomens <= 24.9) {
        return 'Obesidade Moderada';
    } else if (percGHomens >= 25 && percGHomens <= 29.9) {
        return 'Obesidade Elevada';
    } else if (percGHomens > 29.9) {
        return 'Obesidade Mórbida';
    } else {
        return 'Digite os valores certo para saber seu %G!!'
    }

})

const classMulheres = computed(() => {

    if (percGMulheres >= 10 && percGMulheres <= 24.9) {
        return 'Normal';
    } else if (percGMulheres >= 25 && percGMulheres <= 29.9) {
        return 'Sobrepeso';
    } else if (percGMulheres >= 30 && percGMulheres <= 34.9) {
        return 'Obesidade Moderada';
    } else if (percGMulheres >= 35 && percGMulheres <= 39.9) {
        return 'Obesidade Elevada';
    } else if (percGMulheres > 39.9) {
        return 'Obesidade Mórbida';
    } else {
        return 'Digite os valores certo para saber seu %G!!'
    }

})
const percentualFat = computed(() => {
    if (sexo === "feminino") {
        return percGMulheres
    } return percGHomens
})
const gorduraFat = percentualFat.value

console.log(percentualFat.value)
const classify = computed(() => {
    if (sexo === "feminino") {
        return classMulheres.value
    } return classHomens.value
})

// índices disponíveis para seleção
const indicesDisponiveis = computed(() => {
  return avaliacoes.value.map((_, i) => ({
    label: `Avaliação ${i + 1}`,
    index: i
  }))
})

// índices selecionados pelo usuário
const indiceBase = ref(avaliacoes.value.length - 2)       // padrão: penúltima
const indiceComparada = ref(avaliacoes.value.length - 1)  // padrão: última

// campos disponíveis e selecionados
const camposDisponiveis = ref(['massa', 'altura', 'idade', 'nascimento'])
const camposSelecionados = ref(['massa', 'altura', 'idade'])

// avaliações selecionadas
const avaliacaoBase = computed(() => avaliacoes.value[indiceBase.value] || null)
const avaliacaoComparada = computed(() => avaliacoes.value[indiceComparada.value] || null)

// comparação dinâmica
const comparacaoAvaliacao = computed(() => {
  if (!avaliacaoBase.value || !avaliacaoComparada.value) return null

  const resultado = {}
  camposSelecionados.value.forEach(campo => {
    const valorBase = parseFloat(avaliacaoBase.value[campo])
    const valorOutro = parseFloat(avaliacaoComparada.value[campo])

    if (!isNaN(valorBase) && !isNaN(valorOutro)) {
      const diff = valorOutro - valorBase
      resultado[campo] = {
        valorBase,
        valorOutro,
        diferenca: diff,
        status: diff > 0 ? 'aumentou' : diff < 0 ? 'diminuiu' : 'mesmo'
      }
    }
  })
  return resultado
})

const dadosTreino = dataTreino.data.value || []
treinus.value = [...dadosTreino].reverse()

const index = Number(setTreino.value) || 0; // fallback 0 caso não seja número
console.log(index)

const treinoo = treinus.value.find(t => t.id === setTreino);

if (treinoo) {
  console.log(treinoo.serie);
} else {
  console.log("Treino não encontrado!");
}


onMounted(() => {
  if (selectedTraining.value) {
    loadSeries(selectedTraining.value); // Agora funciona mesmo sendo string
  }
});

const setSerie = useCookie("setSerie")   // guarda a série selecionada

// Função para carregar as séries de um treino
async function loadSeries(trainingName) {
  try {
    console.log("Carregando treino:", trainingName)

    const data = await $fetch(
      `https://api.leandrocesar.com/usersnw/${coachIdCookie.value}/team/${route.params.id}/treinos/${trainingName}`
    )

    console.log("Resposta API:", data)

    // Preenche as séries
    seriuss.value = data?.serie ?? []
    selectedTraining.value = trainingName
    treinoAtual.value = trainingName
    setTreino.value = trainingName

    console.log("Séries carregadas:", seriuss.value)
  } catch (err) {
    console.error("Erro ao carregar séries:", err)
  }
}
const perfilDiv = ref(false)
const topPersonDiv = ref(true)
const treinoDiv = ref(false)
const missionsDiv = ref(true)
const comparations = ref();
const antropometriaDiv = ref(true);
const composicaoDiv = ref(false);
const bioimpedanciaDiv = ref(false);
const antroOneDiv = ref(true);
const antroTwoDiv = ref(false);
const antroTreeDiv = ref(false);

function antropometria (){
  antropometriaDiv.value = true
  antroOneDiv.value = true
  antroTwoDiv.value = false
  antroTreeDiv.value = false
  composicaoDiv.value = false
  bioimpedanciaDiv.value = false
 }

 function antroTwo () {
  antropometriaDiv.value = true
  antroOneDiv.value = false
  antroTwoDiv.value = true
  antroTreeDiv.value = false
  composicaoDiv.value = false
  bioimpedanciaDiv.value = false
 }

function antroTree () {
  antropometriaDiv.value = true
  antroOneDiv.value = false
  antroTwoDiv.value = false
  antroTreeDiv.value = true
  composicaoDiv.value = false
  bioimpedanciaDiv.value = false
 }
 
function composicao (){
  composicaoDiv.value = true
  bioimpedanciaDiv.value = false
  antroOneDiv.value = false
  antroTwoDiv.value = false
  antroTreeDiv.value = false
  antropometriaDiv.value = false
}

function bioimpedancia () {
  composicaoDiv.value = false
  antroOneDiv.value = false
  antroTwoDiv.value = false
  antroTreeDiv.value = false
  antropometriaDiv.value = false
  bioimpedanciaDiv.value = true	
}

  function treino() {
  mostrarHUD.value = !mostrarHUD.value
  treinoDiv.value = true
  missionsDiv.value = false
  topPersonDiv.value = true
  divSerie.value = false
  perfilDiv.value = false
}
function missions() {
  mostrarHUD.value = !mostrarHUD.value
  treinoDiv.value = false
  missionsDiv.value = true
  topPersonDiv.value = true
  perfilDiv.value = false
}
function perfil() {
  mostrarHUD.value = !mostrarHUD.value
  treinoDiv.value = false
  missionsDiv.value = false
  topPersonDiv.value = false
  perfilDiv.value = true
  divSerie.value = false
}
const divSerie = ref(false)

// Função para selecionar uma série
function loadExercises(qtSeries) {
  selectedSeries.value = qtSeries
  divSerie.value = true
  setSerie.value = qtSeries.name // salva no cookie
  console.log("Série selecionada:", qtSeries)
  treinoDiv.value = false
  missionsDiv.value = false
  topPersonDiv.value = false
}


// Carrega treino e série do cookie ao montar
onMounted(async () => {
  if (selectedTraining.value) {
    // Carrega treino do cookie
    await loadSeries(selectedTraining.value)

    // Depois que as séries forem carregadas, seleciona a série do cookie
    if (setSerie.value && seriuss.value.length > 0) {
      const serie = seriuss.value.find(s => s.name === setSerie.value)
      if (serie) {
        const seriuss = serie.set
        const idSerie = ref(0)
        selectedSeries.value = serie
        console.log("Série restaurada do cookie:", serie)
        const currentExercise = computed(() => {
          return seriuss[idSerie.value]
        })
        const serieId = currentExercise.value
        console.log(serieId.id)

      }
    }
  }
})

const pending = ref(false)

// computed para quantidade de exercícios
const totalExercicios = computed(() => {
  return selectedSeries.value?.set?.length || 0
})

const currentIndex = ref(0) // controla qual exercício está visível

const currentExercise = computed(() => {
  return selectedSeries.value?.set?.[currentIndex.value] || null
})
watch(currentExercise, (novo) => {
  console.log("Exercício atual:", novo)
})

currentExercise.sets = Array.from({ length: currentExercise.sets }, () => ({
  reps: currentExercise.reps,
  carga: null,
  descanso: currentExercise.time || null
}))

// funções de navegação
function nextExercise() {
  if (currentIndex.value < selectedSeries.value.set.length - 1) {
    currentIndex.value++
  }
}

function prevExercise() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const menuFloatCreate = ref('')
// selecionar treino

// cria cookie reativo (salva só o name)
const treinoCookie = useCookie('treinoSelecionado', { default: () => null })

const treinoSelecionado = ref(null)

const selecionarTreino = (treino) => {
  loadSeries(treino.name)

  if (treinoSelecionado.value?.name === treino.name) {
    treinoSelecionado.value = null
    treinoCookie.value = null
  } else {
    treinoSelecionado.value = treino
    treinoCookie.value = treino.name
  }
}

// restaurar treino salvo no cookie
watchEffect(() => {
  if (treinoCookie.value && treinus.value?.length) {
    const achado = treinus.value.find(t => t.name === treinoCookie.value)
    if (achado) {
      treinoSelecionado.value = achado
    }
  }
})


function closeTreino() {
  divSerie.value = false // Exibe o menu flutuante
  treinoDiv.value = true
  missionsDiv.value = false
  topPersonDiv.value = true
}
const exerciseImg = ref(false);
function openExercise() {
  exerciseImg.value = !exerciseImg.value;
}



/*
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
*/

// 0 = domingo, 1 = segunda ... 6 = sábado
const diasSemana = [
  'domingo',
  'segunda',
  'terça',
  'quarta',
  'quinta',
  'sexta',
  'sábado'
]

const plano = {
  segunda: 'Peito e tríceps',
  terça: 'Costas e bíceps',
  quarta: 'Pernas',
  quinta: 'Ombros',
  sexta: 'Full body',
  sábado: 'Cardio',
  domingo: 'Descanso'
}

const hojeIndex = new Date().getDay()
const dia = diasSemana[hojeIndex]

const treinoHoje = ref(plano[dia])
function iniciarTreino() {
  if (treinoHoje.value === 'Descanso') {
    alert('Hoje é dia de descanso!')
    return
  }
  // Aqui você pode redirecionar ou exibir o treino do dia
  notificationTreinoDoDia.value = true
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



const url = 'https://app.leandrocesar.com/img/myFotoTwo.jpg'
const imageExists = ref(false)

function checkImageExists(url) {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = url
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
  })
}

onMounted(async () => {
  imageExists.value = await checkImageExists(url)
})
const tableImc = ref(false);
function tableFloatIMC() {
tableImc.value = !tableImc.value;
}

const tableFat = ref(false);
function tableFloatFat() {
tableFat.value = !tableFat.value;
}

</script>
<template>

<div>
  <div v-if="topPersonDiv" class="hud-container">
    <div class="panel">
      <div class="header">
        <div class='name' v-if='imageExists'>
          <div class="logo">
            <img v-if='pessoa.foto' @click="alternarFoto" :src="pessoa.foto || imagemPrevia" alt="User Photo" />
              <div v-if="fotoAberta" class="nav-bar">
                <div class='logo-nav-bar'>
                  <img @click="alternarFoto" :src="pessoa.foto || imagemPrevia">
                </div>
              </div>
          </div>

          <div>

            <h2>{{ primeiroNome }}</h2>
            <h4>{{ classe }}</h4>
          </div>
        </div>
        <div class='name' v-else>
          <div class="logo">
                <Icon name='material-symbols-light:person-outline-rounded' /> 
              <div v-if="fotoAberta" class="nav-bar">
                <div class='logo-nav-bar'>
                  <img @click="alternarFoto" :src="pessoa.foto || imagemPrevia">
                </div>
              </div>
          </div>

          <div>

            <h2>{{ primeiroNome }}</h2>
            <h4>{{ classe }}</h4>
          </div>
        </div>

        <div>
          <span class="float-rank">RANK <p>{{ rankAtual }}</p></span>
          <span v-if="rankAtual === 'S' && nivelAtualS" class="float-nivel">Nível <p>{{
              nivelAtualS }}</p></span>
        </div>
      </div>

      <div>
        <HudXpAtleta />
      </div>

      <!-- Início -->
      <div class="missions" v-if="missionsDiv">
        <h3>Missões diárias</h3> 
        <li v-for="m in missoesAtuais" :key="m.id">
          {{ m.titulo }}
        </li>
      </div>
      <span v-if='treinoDiv'>Hoje é dia de <h3 style='color: var(--player-color); display: inline-block; margin-bottom: 10px;'>{{ treinoHoje }}</h3><br></span>
      
      <button class="start-button" @click="iniciarTreino">Iniciar treino do dia</button>
    </div>
  </div>
  <div class="hud-container-two" v-if="missionsDiv">
    <div class="panel">
        <div>
            <span class="float-rank" v-if="proximoNivelS === null">
            Próximo Rank → <span>{{ proximoRank }}</span>
            </span>
            
            <!-- mostra nível apenas se houver próximo nível de S -->
            <span v-if="proximoNivelS !== null" class="float-rank">
            Próximo Nível → <span>{{ proximoNivelS }}</span>
            </span>
        </div>
    </div>
  </div>
  <!-- <div class="hud-container-two" v-if="!treinoDiv">
    <div class="panel">
        <div>
            <span class="float-rank" v-if="proximoNivelS === null">
                
                
            </span>
            
        </div>
    </div>
  </div> -->
</div>



<!-- Páginas/rotas -->
<!-- Treinos -->

<div>


  <div class="panel" v-if="treinoDiv">
    <div>
      <div class="treinos-title">
        <h3>Treinos</h3>
      </div>
      <div class="missions">


          <div class="squared">
              <div
                v-for="(treino, index) in treinus"
                :key="index"
              >
                <div
                  v-if="!treinoSelecionado || treinoSelecionado.name === treino.name"
                  class="square"
                  :class="{ selected: treinoSelecionado?.name === treino.name }"
                  @click="selecionarTreino(treino)"
                >
                  <Icon name="streamline:travel-hotel-dumbell-sports-weights-dumbbell-sport-fitness" />
                  <h4>{{ treino.name }}</h4>
                </div>
              </div>
            </div>
         <div v-if="treinoSelecionado" class="info">
  <div class="main-div-two">
    <h3>
      
      Séries:
    </h3>
  </div>

<!-- Só lista os nomes das séries -->
 <!--
  <div 
  class="main-div-twoo" 
  v-for="(qtSeries, index) in seriuss" 
  :key="index"
>
  <NuxtLink 
    class="squareS" 
    :to="`/atleta/${route.params.id}/treino/${treinoAtual}/${qtSeries.name}`"
  >
    <h5>{{ qtSeries.name }}</h5>
  </NuxtLink>
</div>
  -->
<!-- Lista apenas os nomes das séries -->
<div class="squared">
    <div
    v-for="(qtSeries, index) in seriuss" 
    :key="index"
    >
      <div
      class="square-serie" 
      @click="loadExercises(qtSeries)" 
      style="cursor: pointer;"
      >
          <Icon name="solar:dumbbells-broken" />
        <h5>{{ qtSeries.name }}</h5>
      </div>
    </div>
  </div>
  

</div>


</div>

</div>


</div>

<!-- Início - DivSerie list -->
 <!-- <div v-if="divSerie">
    <div>
      <div class="aparency-text">
        
        <div v-if="selectedSeries" class="exercises-list">
   <h4>Exercícios da série: {{ selectedSeries.name }}</h4> 

  <div v-for="exercicio in selectedSeries.set" :key="exercicio.id" class="exercise-card">
    <h5>{{ exercicio.num }} - {{ exercicio.nome }}</h5>
    <p>Sets: {{ exercicio.sets }} | Reps: {{ exercicio.reps }} | Descanso: {{ exercicio.rest }}</p>
    <p><small>{{ exercicio.obs }}</small></p>
    <img :src="exercicio.img" :alt="exercicio.nome" width="120" />
  </div>
</div>


</div>
    <br>
    
<div>
</div>
</div>


</div>  -->
<!-- Fim - DivSerie list -->
 <div>
     
 <div v-if="perfilDiv" class="hud-container">
    <div class="panel">
      <div class="header">
        <div class='name'>
          <div class="logo">
            <img @click="alternarFoto" :src="pessoa.foto || imagemPrevia" alt="User Photo" />
            <div v-if="fotoAberta" class="nav-bar">
              <div class='logo-nav-bar'>
                <img @click="alternarFoto" :src="pessoa.foto || imagemPrevia">
              </div>
            </div>
          </div>
          <div>

              <h2> {{ primeiroNome }} {{ pessoa.lastName }}</h2>
              <h4><span class="titulo">ID:</span> {{ result }}</h4>
              <div v-if="ultimaAvaliacao">
                <h4><span class="titulo">Idade:</span> {{ ultimaAvaliacao.idade }} anos</h4>
               </div>
          </div>
        </div>

      
      </div>
      <div v-if="ultimaAvaliacao" class="medida-imc">
          <div class="medida-top">
            <label>Peso:</label>
            <span id="valorOmbro"> {{ultimaAvaliacao.massa}} kg</span>
          </div>
          <div class="medida-top">
            <label>Altura:</label>
            <span id="valorOmbro"> {{ultimaAvaliacao.altura}} m</span>
          </div>
       </div>
     <div class="silhueta-container" v-if='ultimaAvaliacao'>
    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
    width="100%" height="250pt" viewBox="0 0 640.000000 1280.000000"
    preserveAspectRatio="xMidYMid meet">
    <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
       fill="none" stroke="var(--player-color)" stroke-width="100">
       <path d="M3108 12784 c-90 -19 -148 -45 -225 -100 -142 -102 -221 -254 -243
       -472 -12 -114 -6 -197 17 -252 8 -19 19 -84 24 -145 14 -181 68 -335 148 -427
       35 -39 41 -53 47 -109 8 -82 -9 -175 -38 -206 -75 -80 -270 -140 -598 -183
       -335 -44 -430 -65 -524 -114 -113 -59 -172 -199 -213 -511 -24 -179 -23 -743
       1 -1040 30 -372 84 -809 126 -1013 16 -82 17 -98 5 -132 -39 -110 -50 -211
       -49 -460 1 -303 6 -351 114 -975 62 -366 76 -461 100 -710 21 -216 77 -371
       178 -492 49 -58 52 -66 52 -117 0 -130 45 -615 91 -976 35 -273 57 -419 101
       -655 l31 -170 -21 -165 c-47 -366 -59 -628 -43 -930 18 -321 43 -500 141 -995
       67 -342 100 -552 100 -642 0 -51 3 -64 19 -73 11 -5 25 -26 31 -45 16 -49 1
       -116 -71 -310 -33 -87 -62 -178 -66 -200 -5 -38 -2 -43 35 -77 65 -59 138 -81
       267 -82 154 -1 254 29 309 94 33 40 34 86 5 213 -20 84 -21 119 -20 407 0 173
       3 338 6 365 14 129 86 920 100 1085 31 383 45 663 45 920 0 156 5 283 11 310
       7 27 12 179 14 375 1 182 7 389 13 460 19 213 82 1447 82 1604 0 46 3 81 6 78
       12 -11 33 -769 33 -1172 1 -387 -2 -427 -34 -600 -13 -67 -19 -182 -25 -455
       -5 -201 -14 -437 -20 -525 -14 -193 -8 -792 16 -1390 24 -628 23 -715 -10
       -945 -15 -107 -28 -231 -27 -275 0 -44 -9 -141 -20 -215 -12 -74 -19 -152 -16
       -173 11 -84 96 -128 260 -135 165 -7 296 26 375 94 38 32 42 40 42 80 0 26
       -21 109 -51 202 -34 104 -53 181 -56 227 -5 66 -3 73 22 103 23 28 28 45 36
       139 15 161 43 326 105 611 30 142 69 320 85 397 119 551 179 1076 179 1561 0
       82 6 140 25 220 98 439 178 1007 216 1554 l13 175 42 45 c135 146 180 285 214
       660 6 68 15 140 20 160 5 19 13 71 20 115 6 44 39 211 75 370 120 543 145 714
       145 980 0 169 -15 299 -44 382 -8 23 -10 49 -5 66 13 47 47 396 66 662 12 175
       17 384 17 695 1 463 -7 597 -45 828 -34 206 -74 303 -152 365 -103 82 -206
       119 -522 186 -322 69 -467 120 -542 191 -32 29 -38 59 -38 196 l0 121 42 46
       c94 101 142 246 150 447 4 107 9 144 25 178 19 40 20 50 9 155 -26 245 -121
       392 -315 487 -135 67 -274 85 -418 54z m-964 -3709 c46 -256 95 -614 112 -822
       6 -76 4 -86 -25 -156 -35 -86 -74 -206 -94 -292 -14 -58 -14 -56 -9 85 3 86 0
       160 -6 182 -8 30 -6 49 9 97 10 33 24 119 30 191 16 175 -2 488 -47 815 -14
       100 5 36 30 -100z m2176 -690 c14 -123 35 -223 55 -272 11 -27 13 -44 6 -63
       -25 -66 -51 -272 -51 -404 0 -33 -2 -57 -5 -54 -3 3 -12 58 -20 124 -16 130
       -58 374 -80 470 -16 70 -11 137 41 539 l29 220 6 -230 c4 -126 12 -275 19
       -330z"/>
       </g>
       </svg>

       <!-- Medidas posicionadas -->
        <div v-if='antropometriaDiv'>
       <div v-if='antroOneDiv'>
       <div class="medida pescoço">
         <label>Pescoço:</label>
         <span id="valorOmbro"> {{ultimaAvaliacao.pescoco}} cm</span>
       </div>
       <div class="medida ombro">
         <label>Ombro:</label>
         <span id="valorOmbro"> {{ultimaAvaliacao.ombro}} cm</span>
       </div>
       <div class="medida torax">
         <label>Torax:</label>
         <span id="valorOmbro"> {{ultimaAvaliacao.torax}} cm</span>
       </div>
       <div class="medida torax-contraído">
         <label>Tor. contraído:</label>
         <span id="valorOmbro"> {{ultimaAvaliacao.toraxContraido}} cm</span>
       </div>
       <div class="medida torax-relaxado">
         <label>Tor. relaxado:</label>
         <span id="valorOmbro"> {{ultimaAvaliacao.toraxRelaxado}} cm</span>
       </div>
       <div class="medida cintura">
         <label>Cintura:</label>
         <span id="valorOmbro"> {{ultimaAvaliacao.cintura}} cm</span>
       </div>
       <div class="medida abdomen">
         <label>Abdômen:</label>
         <span id="valorOmbro"> {{ultimaAvaliacao.abdomem}} cm</span>
       </div>
     
       <div class="medida quadril">
         <label>Quadril:</label>
         <span id="valorOmbro"> {{ultimaAvaliacao.quadril}} cm</span>
       </div>
	<div class="medida imc">
	 <Icon name='bi:speedometer2' /> 
	 <Icon class='info-imc' @click='tableFloatIMC()' name='material-symbols:info-outline-rounded' /> 
         <label>IMC</label>
         <span id="valorOmbro"> {{calcIMC}}</span>
	<label id="valorOmbro"> Kg/m²</label>
       </div>
      </div>
      <!-- Medidas Antropometria dois -->
        <div v-if='antroTwoDiv'>
	<!-- lado esquerdo -->
       <div class="lado lado-esquerdo">
         <label>Lado Esquerdo</label>
       </div>
       <div class="medida braco-esquerdo">
         <label>Braço relaxado:</label>
         <span id="valorOmbro"> {{ultimaAvaliacao.bracoEsquerdoRelaxado}} cm</span>
       </div>
	<div class="medida braco-esquerdo-contraido">
         <label>Braço contraído:</label>
         <span id="valorOmbro"> {{ultimaAvaliacao.bracoEsquerdoContraido}} cm</span>
       </div>
	<div class="medida antebraco-esquerdo">
         <label>Antebraço:</label>
         <span id="valorOmbro"> {{ultimaAvaliacao.antebracoEsquerdo}} cm</span>
       </div>
	<div class="medida coxa-medial-esquerda">
         <label>Coxa medial:</label>
         <span id="valorOmbro"> {{ultimaAvaliacao.coxaMedialEsquerda}} cm</span>
       </div>
	<div class="medida coxa-distal-esquerda">
         <label>Coxa distal:</label>
         <span id="valorOmbro"> {{ultimaAvaliacao.coxaDistalEsquerda}} cm</span>
       </div>
	<div class="medida perna-esquerda">
         <label>Perna:</label>
         <span id="valorOmbro"> {{ultimaAvaliacao.pernaEsquerda}} cm</span>
       </div>
       <!-- Lado direito -->
	<div class="lado lado-direito">
         <label>Lado Direito</label>
       </div>
       <div class="medida braco-direita">
         <label>Braço relaxado:</label>
         <span id="valorOmbro"> {{ultimaAvaliacao.bracoDireitoRelaxado}} cm</span>
       </div>
       <div class="medida braco-direita-contraido">
         <label>Braço contraído:</label>
         <span id="valorOmbro"> {{ultimaAvaliacao.bracoDireitoContraido}} cm</span>
       </div>
       <div class="medida antebraco-direita">
         <label>Antebraço:</label>
         <span id="valorOmbro"> {{ultimaAvaliacao.antebracoDireito}} cm</span>
       </div>
       <div class="medida coxa-medial-direita">
         <label>Coxa medial:</label>
         <span id="valorOmbro"> {{ultimaAvaliacao.coxaMedialDireita}} cm</span>
       </div>
       <div class="medida coxa-distal-direita">
         <label>Coxa distal:</label>
         <span id="valorOmbro"> {{ultimaAvaliacao.coxaDistalDireita}} cm</span>
       </div>
       <div class="medida perna-direita">
         <label>Perna:</label>
         <span id="valorOmbro"> {{ultimaAvaliacao.pernaDireita}} cm</span>
       </div>
     </div>      
     <!-- Medidas Antropometria Três -->
        <div v-if='antroTreeDiv'>
	<!-- lado esquerdo -->
       <div class="lado lado-esquerdo">
         <label>Lado Esquerdo</label>
       </div>
       </div>
     </div>

     <!-- Medidas de Composição -->
       <div v-if='composicaoDiv'>
	<div class="d-cutanea supra-espinhal">
         <Icon name='material-symbols:body-fat' /><label>Sup.-espinhal:</label>
         <span id="valorOmbro"> {{ultimaAvaliacao.supraEspinhal}} mm</span>
       </div>
	<div class="d-cutanea abdomen">
         <Icon name='material-symbols:body-fat' /><label>Abdômen:</label>
         <span id="valorOmbro"> {{ultimaAvaliacao.abdominal}} mm</span>
       </div>
	<div class="d-cutanea axilar-media">
         <Icon name='material-symbols:body-fat' /><label>Axilar-média:</label>
         <span id="valorOmbro"> {{ultimaAvaliacao.axilarMedia}} mm</span>
       </div>
	<div class="d-cutanea sub-escapular">
         <Icon name='material-symbols:body-fat' /><label>Sub-escapular:</label>
         <span id="valorOmbro"> {{ultimaAvaliacao.subEscapular}} mm</span>
       </div>
       	<div class="d-cutanea tricipital">
         <Icon name='material-symbols:body-fat' /><label>Tricipital:</label>
         <span id="valorOmbro"> {{ultimaAvaliacao.tricipital}} mm</span>
       </div>
       	<div class="d-cutanea peitoral">
         <Icon name='material-symbols:body-fat' /><label>Peitoral:</label>
         <span id="valorOmbro"> {{ultimaAvaliacao.dtorax}} mm</span>
       </div>
       	<div class="d-cutanea coxa-media">
         <Icon name='material-symbols:body-fat' /><label>Coxa:</label>
         <span id="valorOmbro"> {{ultimaAvaliacao.coxa}} mm</span>
       </div>
       	<div class="d-cutanea perna">
         <Icon name='material-symbols:body-fat' /><label>Perna:</label>
         <span id="valorOmbro"> {{ultimaAvaliacao.perna}} mm</span>
       </div>
	<div class="medida p-gordura">
	 <Icon name='material-symbols:percent-rounded' /> 
	 <Icon class='info-imc' @click='tableFloatFat()' name='material-symbols:info-outline-rounded' /> 
         <label>Gordura</label>
         <span id="valorOmbro"> {{gorduraFat}}</span>
       </div>
      </div>
     <div v-if='bioimpedanciaDiv'>
	<div class="medida bio-fat">
	 <Icon name='material-symbols:percent-rounded' /> 
         <label>Gordura</label>
         <span id="valorOmbro"> {{ultimaAvaliacao.fat}}</span>
       </div>
	<div class="medida bio-muscle">
	 <Icon name='material-symbols:percent-rounded' /> 
         <label>Músculo</label>
         <span id="valorOmbro"> {{ultimaAvaliacao.muscle}}</span>
       </div>
	<div class="medida bio-visceral">
         <label>Gordura Visceral</label>
         <span id="valorOmbro"> {{ultimaAvaliacao.visceralFat}}</span>
       </div>
	<div class="medida bio-imc">
         <label>IMC</label>
         <span id="valorOmbro"> {{ultimaAvaliacao.bmi}}</span>
	<label id="valorOmbro"> Kg/m²</label>
       </div>
	<div class="medida bio-age">
         <label>Idade corporal</label>
         <span id="valorOmbro"> {{ultimaAvaliacao.bodyAge}}</span>
       </div>
	<div class="medida bio-basal">
         <label>Metabol. basal</label>
	<span id="valorOmbro"> {{ultimaAvaliacao.rm}}</span>
         <label id="valorOmbro"> Kcal/dia</label>
       </div>
     </div>


   
    </div>
     <div v-if='avaliacao' class='buttons-avaliacao'>
         <div class='antro'>
            <h5 @click='antropometria'  :class='{ active: antropometriaDiv}'>
              Antropometria
            </h5>
            <div class='antro-number'>
             <span @click='antropometria' :class='{ active: antroOneDiv }'>1</span>
             <span @click='antroTwo' :class='{ active: antroTwoDiv }'>2</span>	     
            </div>
         </div>
         <div>
            <h5 @click='composicao' :class='{ active: composicaoDiv}'>
              Composição
            </h5>
         </div>
         <div>
            <h5 @click='bioimpedancia' :class='{ active: bioimpedanciaDiv }'>
             Bioimpedância
             </h5>
         </div>
     </div>  
 
<div class='header' v-else>
    <div>
        <h4><span v-if="pessoa.username" class="titulo">Username:</span> {{ pessoa.username }}</h4>
        <h4><span class="titulo">Serviço:</span> {{ pessoa.service }}</h4>
        <h4><span class="titulo">Objetivo:</span> {{ pessoa.target }}</h4>
        <h4><span class="titulo">Data de nascimento:</span> {{ pessoa.birthday.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3-$2-$1') }}</h4>
        <h4><span class="titulo">WhatsApp:</span> {{ pessoa.whatsapp }}</h4>
        
        <h4><span v-if="pessoa.email" class="titulo">Email:</span> {{ pessoa.email }}</h4>
        <h4><span v-if="pessoa.day" class="titulo">Dias de treino:</span> {{ pessoa.day }} dias</h4>
        <h4><span v-if="pessoa.time" class="titulo">Horas de treino:</span> {{ pessoa.time }} minutos</h4>
        
    </div>
</div>
    </div>

    <!-- só renderiza as coparações se existir -->
    <div v-if='comparations'>
        <div v-if="avaliacoes.length > 1">
        <h3>Escolha a avaliação base:</h3>
        <select v-model.number="indiceBase">
            <option v-for="item in indicesDisponiveis" :key="item.index" :value="item.index">
            {{ item.label }}
            </option>
        </select>
    
        <h3>Escolha a avaliação para comparar:</h3>
        <select v-model.number="indiceComparada">
            <option v-for="item in indicesDisponiveis" :key="item.index" :value="item.index">
            {{ item.label }}
            </option>
        </select>
    
        <h3>Escolha os campos para comparar:</h3>
        <div>
            <label v-for="campo in camposDisponiveis" :key="campo" style="margin-right: 10px;">
            <input type="checkbox" v-model="camposSelecionados" :value="campo" />
            {{ campo }}
            </label>
        </div>
    
        <h3>Comparação Avaliações</h3>
        <ul>
            <li v-for="(item, campo) in comparacaoAvaliacao" :key="campo">
            <strong>{{ campo }}:</strong>
            Base = {{ item.valorBase }},
            Comparada = {{ item.valorOutro }},
            <em>{{ item.status }} ({{ item.diferenca >= 0 ? '+' : '' }}{{ item.diferenca }})</em>
            </li>
        </ul>
        </div>
    
        <p v-else>Carregando avaliações ou sem dados suficientes...</p>
        </div>
    </div>
    </div>

<div v-if="divSerie" class="hud-container">
  <div class="panel-treino">
    <div v-if="selectedSeries" class="exercises-list">
    <div class="aparency-treino" v-if="selectedSeries">
      <h4>{{ currentExercise.id }} - {{ totalExercicios }} Exercícios </h4> 
      <h4> <Icon name='solar:dumbbells-broken' /> {{ selectedSeries.name }}</h4> 
    </div>
    <ul>
    <li
      v-for="id in totalExercicios"
      :key="id"
      @click="currentIndex = id - 1"
      :class="{ active: currentIndex === id - 1 }"
      class="exercise-item"
    >
      {{ id }}
    </li>
    </ul>
  </div>
  <div>
      <!-- Exibe apenas o exercício atual -->
           <div v-if="currentExercise" class="exercise-card">
             <img :src="currentExercise.img" :alt="currentExercise.nome"  @click="openExercise" />
             <h2 class='title'>{{ currentExercise.nome }}</h2>
             
             <p v-if="pending">Carregando...</p>
             <div v-else>
             <div class="exercise" v-for="(set, index) in currentExercise.sets"
                   :key="index">
               <div class="exercise-square">
                 <h4>
                   Sets
                 </h4>
                 <h4>
                     {{ index + 1 }}
                 </h4>
               </div>
               <div class="exercise-square">
                 <h4>
                   Reps
                 </h4>
                 <h4>
                     <input type="text" v-model="currentExercise.reps" />
                 </h4>
               </div>
               <div class="exercise-square">
                   <h4>
                       kg
                   </h4>
                  <h4>
                      <input type="text" v-model="currentExercise.weight" placeholder="--" />
                 </h4> 
               </div>
               <div class="exercise-square">
                 <h4>
                   <Icon name='solar:alarm-linear' />
                 </h4>
                 <h4 v-if='currentExercise.time'>
                     <input type="text" v-model="currentExercise.time" />
                 </h4>
                 <h4 v-else>
                     --
                 </h4>
               </div>
             </div>
             </div>
             <div  v-if='currentExercise.obs' class="obs">
               {{ currentExercise.obs }}
             </div>
             <div  v-else class="obs">
               Sem observações
             </div>
           </div>
     
           <!-- Botões de navegação -->
           
  </div>


 </div>

           <div class="button">
             <span @click="prevExercise">
               <Icon name="mdi:chevron-left" /> ANTERIOR
             </span>
             <span @click="nextExercise">
               PRÓXIMO
               <Icon name="mdi:chevron-right" />
             </span>
           </div>
</div>

<br><br><br>
<br>
             <div v-if="exerciseImg" class="nav-bar-photo" @click="openExercise">
               <div class="nav-top">
                 <div class="nav-flow-photo">
                   <div class="div-img-full">
                     <img :src="currentExercise.img" />
                   </div>
                 </div>
               </div>
             </div>

</div>
<!-- Fim das rotas -->

  <!-- Nav -->
  <nav class="bottom-menu" v-if="!treinoDiv">
    <NuxtLink @click='treino()' class="menu-item">
      <Icon name="streamline:travel-hotel-dumbell-sports-weights-dumbbell-sport-fitness" />
      <!-- <span>Treinos</span> -->
    </NuxtLink>


    <div class="central-button">
      <NuxtLink @click="menu()" class="circle">
        HUD
      </NuxtLink>
    </div>

    <div @click='perfil()' class="menu-item">
      <Icon name="material-symbols:person-outline-rounded" />
      <!-- <span>Perfil</span> -->
    </div>
  </nav>
  <!-- Nav treino -->
  <nav class="bottom-menu" v-if="treinoDiv">
    <NuxtLink @click='missions()' class="menu-item">
        <Icon name="streamline:location-target-1" />
        <!-- <span>Missões</span> -->
    </NuxtLink>
    <div @click='perfil()' class="menu-item">
        <Icon name="material-symbols:person-outline-rounded" />
        <!-- <span>Perfil</span> -->
    </div>
     <div class="central-button">
      <NuxtLink @click="menu()" class="circle">
        HUD
      </NuxtLink>
    </div> 
  </nav>
  

  <!-- Foto quando clicada -->
  <div v-if="fotoAberta" class="nav-bar">
    <div class='logo-nav-bar'>
      <img @click="alternarFoto" :src="pessoa.foto || imagemPrevia">
    </div>
  </div>

  <!-- HUD -->
  <div class="float-hud zoom" v-if="menuFloat" @click.self="menu()">

    <div class="float-hud-container treinos zoomOut">
      <div id="nav-container" class='nav-treino'>
        <div>
          <div class="nav-bottom"></div>
        </div>
        <!-- <div>
          <NuxtLink @click="menu()" class="button-client">
            <Icon name="material-symbols:cancel-outline" />
          </NuxtLink>
        </div> -->
      </div>
      <div class="hud">
        <div class="float-header">
          <div class='name'>
            <div class="logo">
              <img @click="alternarFoto" :src="pessoa.foto || imagemPrevia" alt="User Photo" />

            </div>
            <div>

              <h2> {{ primeiroNome }} {{ pessoa.lastName }}</h2>
              <h4><span class="classe">Classe:</span> {{ classe }}</h4>
              <h4><Location/></h4>
              <!--
                <h4><span class="titulo">Título:</span> {{ titulo }}</h4>
              -->
            </div>
          </div>

          <div>
            <span class="float-rank">RANK <p>{{rankAtual}}</p></span>
            <span v-if="rankAtual === 'S' && nivelAtualS" class="float-nivel">Nível <p>
                {{ nivelAtualS }}</p></span>
          </div>

        </div>

        <div>
          <HudXpAtleta />
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

  <!-- Treino do dia -->
  <div @click.self='notTreinoOut()' class="float-notifications" v-if="notificationTreinoDoDia">
    <div class='hud-notifications zoomOut'>
      <div class="notify">
        <Icon name="streamline:travel-hotel-dumbell-sports-weights-dumbbell-sport-fitness" />
        <p>
          Treino do dia
        </p>
      </div>
      <div class="notify-text">
        <p>
          Deseja realmente iniciar o treino?
        </p>
      </div>
      <div class="notify-buttons">
        <button @click="">Sim</button>
        <button @click="notTreinoOut()">Não</button>
      </div>
    </div>
  </div>
  
  <!-- Logout -->
  <div class="float-notifications" v-if="notificationLogOut" @click.self="logOut()">
    <div class='hud-notifications zoomOut'>
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

  <div class="float-aparency" v-if="Configuration" @click.self="menuConfiguration()">
    <div class='hud-aparency zoomOut'>
      <div id="nav-container" class='nav-aparency'>

        <div>
          <div class="nav-bottom"></div>
        </div>
        <!-- <div>
          <NuxtLink @click="menuConfiguration()" class="button-client">
            <Icon name="material-symbols:cancel-outline" />
          </NuxtLink>
        </div> -->
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

  <div class="float-aparency" v-if="Aparency" @click.self="menuAparency()">
    <div class='hud-aparency zoomOut'>
      <div id="nav-container" class='nav-aparency'>

        <div>
          <div class="nav-bottom"></div>
        </div>
        <!-- <div>
          <NuxtLink @click="menuAparency()" class="button-client">
            <Icon name="material-symbols:cancel-outline" />
          </NuxtLink>
        </div> -->
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
      <option value="#8d00ab">Guerreiro</option>
      <option value="#b800ff">Mago</option>
      <option value="#2ecc71">Curandeiro</option>
      <option value="#e74c3c">Assassino</option>
      <option value="#ff1900">Gladiador</option>
      <option value="#f39c12">Caçador de Elite</option>
    </datalist>
        <span @click="resetColorToDefault"><Icon name="material-symbols:restart-alt-rounded" style='margin-right: 0px;'/>Resetar</span>
      </div>
      <div>
  </div>
    </div>


  </div>


  <!-- Ranking -->

  <div class="float-ranking" v-if="Ranking" @click.self="menuRanking()">
    <div class='hud-ranking zoomOut'>
      <div id="nav-container" class='nav-aparency'>

        <div>
          <div class="nav-bottom"></div>
        </div>
        <!-- <div>
          <NuxtLink @click="menuRanking()" class="button-client">
            <Icon name="material-symbols:cancel-outline" />
          </NuxtLink>
        </div> -->
      </div>

      <div class="aparency">
        <Icon name="solar:ranking-line-duotone" />
        <p>
          Ranking
        </p>
      </div>
      <div class="ranking-box">
        <div class="ranking-list">
          <div class="ranking-item" v-for="(membro, i) in teamSortedByXp" :key="membro.xp">
            <div class="rank-info">
              <div class="rank-xp">
              
                <div class="rank-name">{{ nomeCurto(membro.name) }}</div>
                <div class="rank-rank">Rank {{ membro.rank }} - {{ membro.xp }} XP </div>

              </div>
            </div>
            <div class="rank-number">{{ i + 1 }} º</div>
          </div>
        </div>
      </div>
      
    </div>


  </div>

  <!-- Fim das Notificações -->

<div class="float-notifications" v-if="tableFat" @click.self="tableFloatFat()">
    <div class='hud-notification-imc zoomOut'>
      <div class="notify">
        <Icon name="material-symbols:percent-rounded" />
        <p>
          Gordura
        </p>
      </div>
      <div class='main-div-tree-info'>
        <table>
                            <tr>
                                <th>
                                    Classificação
                                </th>

                                <th>
                                    Mulheres
                                </th>
                                <th>
                                    Homens
                                </th>
                            </tr>
                            <tr>

                                <td>
                                    Normal
                                </td>
                                <td>
                                    10.0 - 24.9
                                </td>
                                <td>
                                    5.0 - 14.9
                                </td>
                            </tr>
                            <tr>

                                <td>
                                    Sobrepeso
                                </td>
                                <td>
                                    25.0 - 29.9
                                </td>
                                <td>
                                    15.0 - 19.9
                                </td>
                            </tr>
                            <tr>

                                <td>
                                    Obesidade Moderada
                                </td>
                                <td>
                                    30.0 - 34.9
                                </td>
                                <td>
                                    20.0 - 24.9
                                </td>
                            </tr>
                            <tr>

                                <td>
                                    Obesidade Elevada
                                </td>
                                <td>
                                    35.0 - 39.9
                                </td>
                                <td>
                                    25.0 - 29.9
                                </td>
                            </tr>
                            <tr>

                                <td>
                                    Obesidade Mórbida
                                </td>
                                <td>
                                    > 39.9
                                </td>
                                <td>
                                    > 29.9
                                </td>
                            </tr>
                        </table>                       </div>
  </div>
  </div>
  <div class="float-notifications" v-if="tableImc" @click.self="tableFloatIMC()">
    <div class='hud-notification-imc zoomOut'>
      <div class="notify">
        <Icon name="bi:speedometer2" />
        <p>
          IMC
        </p>
      </div>
      <div class='main-div-tree-info'>
        <table>
                            <tr>
                                <th>
                                    Classificação
                                </th>

                                <th>

                                    IMC (kgm²)
                                </th>
                                <th>
                                    Risco de doenças
                                </th>
                            </tr>
                            <tr>

                                <td>
                                    Baixo Peso
                                </td>
                                <td>
                                    &lt; 18.5
                                </td>
                                <td>
                                    Baixo
                                </td>
                            </tr>
                            <tr>

                                <td>
                                    Normal
                                </td>
                                <td>
                                    18.5 - 24.9
                                </td>
                                <td>
                                    Ausente
                                </td>
                            </tr>
                            <tr>

                                <td>
                                    Sobrepeso
                                </td>
                                <td>
                                    25.0 - 29.9
                                </td>
                                <td>
                                    Aumentado
                                </td>
                            </tr>
                            <tr>

                                <td>
                                    Obesidade classe 1
                                </td>
                                <td>
                                    30.0 - 34.9
                                </td>
                                <td>
                                    Moderado
                                </td>
                            </tr>
                            <tr>

                                <td>
                                    Obesidade classe 2
                                </td>
                                <td>
                                    35.0 - 39.9
                                </td>
                                <td>
                                    Severo
                                </td>
                            </tr>
                            <tr>

                                <td>
                                    Obesidade classe 3
                                </td>
                                <td>
                                    &ge; 40.0
                                </td>
                                <td>
                                    Muito Severo
                                </td>
                            </tr>
                        </table>
                       </div>
  </div>  
  </div>  
</template>


<style scoped>
* {
  user-select: none;
}
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
  background: linear-gradient(to right, #b800ff, #b800ff);
  background: var(--player-color) 10;
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
  width: 100%;
}

.panel {
  border: 2px solid var(--player-color);
  padding: 2rem 1rem;
  margin: 1.5rem 1rem 1.5rem 1rem;
  border-radius: 10px;  
  background-color: #fff;
  color: #000;
  box-shadow: 0 0 20px var(--player-color);
  font-family: 'Orbitron-Regular', sans-serif;
}

.dark-mode .panel {
  background-color: #0f141e;
  color: #fff;
}

.panel-treino {
  border: 2px seolid var(--player-color);
  padding: 2rem 1rem;
  margin: 1rem.5rem;
  overflow-y:auto;
  border-radius: 10px;  
  background-color: #ffffff;
  box-shadow: 0 0 20px var(--player-color);
  font-family: 'Orbitron-Regular', sans-serif;
}

.dark-mode .panel-treino {
  background-color: #0f141e;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
  margin-bottom: 1rem;
}

.header h2 {
  color: #000;
  font-size: 1.1rem;
}
.dark-mode .header h2 {
  color: #fff;

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
  /*border: 1px solid var(--player-color);*/
  padding: .5rem;
  border-radius: 8px;
}

.missions h3 {
  margin: 0 0 0.5rem 0;
  color: var(--player-color);
}

.missions li {
    margin-left: 1.5rem;
    list-style-type: square;
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
  color: #000;
  padding: 0.75rem;
  width: 100%;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 0 10px var(--player-color);
  transition: background 0.3s;
}
.dark-mode .start-button {
  color: #fff;
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
.logo .icon {
  height: 50px;
  width: 50px;
  border-radius: 200px;
  z-index: 100;
  opacity: 1;
  object-fit: cover;
  color: #fff;
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
  margin: 0;
  width: 350px;
  background-color: #ffffff;
  color: #000000;
  box-shadow: 0 0 20px var(--player-color);
  font-family: 'Orbitron-Regular', sans-serif;
}

.dark-mode .hud {
  background-color: #0f141e;
  color: #ffffff;
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
  color: #000;
  font-size: 1.1rem;
}
.dark-mode .float-header h2 {
  color: #fff;
}

.float-header h4 {
  color: var(--player-color);
}

span {
  font-size: 0.9rem;
  font-family:  Orbitron-SemiBold;
}

.classe,
.titulo {
  color: #000;
}
.dark-mode .classe, .dark-mode .titulo {
  color: #fff;
}

.float-rank {
  border: 1px solid var(--player-color);
  font-weight: bolder;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  color: var(--player-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}

.float-rank span{
  color: #000;
}

.dark-mode .float-rank span {
  color: #fff;
}

.float-rank p {
  margin-left: .7rem;
  color: #000;
}

.dark-mode .float-rank p {
  color: #fff;
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
  /*margin-bottom: 1.5rem;*/
  color: var(--player-color);
  font-weight: bold;
}

.float-missions {
  border: 1px solid var(--player-color);
  padding: .5rem;
  margin-bottom: .5rem;
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
  margin-bottom: .5rem;
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
  color: #000000;
  font-weight: bold;
}
.dark-mode .float-rank-ladder p.active {
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
    margin-top: -.5rem;
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
  color: #000;
  padding: 0.75rem;
  width: 100%;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 0 10px var(--player-color);
  transition: background 0.3s;
}
.dark-mode .float-start-button {
  color: #fff;
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
  background-color: #ffffff;
  color: #ffffff;
  color: var(--player-color);
  box-shadow: 0 0 20px var(--player-color);
  font-family: 'Orbitron-Regular', sans-serif;
}
.dark-mode .hud-notifications {
  background-color: #0f141e;
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
  font-size: 16px;
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
  cursor: pointer;
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
  background-color: #ffffff;
  color: #000000;
  color: var(--player-color);
  box-shadow: 0 0 20px var(--player-color);
  font-family: 'Orbitron-Regular', sans-serif;
}
.dark-mode .hud-aparency {
  background-color: #0f141e;
  color: ffffff;
}


.hud-treino {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1002;
  border: 2px solid var(--player-color);
  border-radius: 5px;
  margin: 0 0 50px 0;
  width: 95%;
  background-color: #020024;
  color: #ffffff;
  height: 80vh;
  color: var(--player-color);
  box-shadow: 0 0 20px var(--player-color);
  font-family: 'Orbitron-Regular', sans-serif;
}


.button-treino {
    margin: 1.2rem 1.5rem;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
    zoom: 1.3;
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
  background-color: #fff;
  color: #000000;
  color: var(--player-color);
  box-shadow: 0 0 20px var(--player-color);
  font-family: 'Orbitron-Regular', sans-serif;
}
.dark-mode .hud-ranking {
  background-color: #0f141e;
  color: #ffffff;
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
  background: #f5f5f5;
  display: flex;
  border-radius: 8px;
  align-items: center;
  padding:5px 5px;
  margin: 5px 0px;
}

.dark-mode .ranking-item {
  background: #171d28;
}

.ranking-item:last-child {
  border-bottom: none;
}

.rank-number {
  font-size: 1.2rem;
  font-weight: bold;
  width: 65px;
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
  color: #777;
}
.dark-mode .rank-name {
  color: #fff;
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

.aparency-treino {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  font-size: 20px;
  margin-bottom: 1rem;
}

.panel-treino .aparency-treino h4{
  font-size: .8rem;
    color: var(--player-color);
}

ul {
  display: flex;
  align-items: space-between;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  font-size: 20px;
  margin-bottom: 1.5rem;
  padding: 0 .5rem;
}

.exercise-item {
  font-size: 1.1rem;
  list-style: none;
}

.exercise-item.active {
  font-weight: bold;
  color: var(--player-color);
}

.exercise-card {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  font-size: 20px;
  margin-bottom: .5rem;
}

.exercise-card img {
    height: 150px;
        width: auto;
        max-width: 370px;
        color: #555;
        background-color: #fff;
        -webkit-backdrop-filter: blur(5px);
        backdrop-filter: blur(5px);
        overflow-x: auto;
        border-radius: 8px;
        display: flex
    ;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin: 3px auto;
        border: 2px solid var(--player-color) 90;
        cursor: zoom-in;
}

.exercise {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 5px 0% 0px 0%;
}

.exercise-square {
  width: max-content;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px 2px 0 2px;
  border-radius: 4px;
  backdrop-filter: blur(35px);
  font-size: .8rem;
  border: 1px solid var(--player-color); 
  padding: 4px 0;
}
.exercise-square:nth-child(1) h4 {
  padding: 1px 2px;
}

.exercise-square input {
    text-align: center;
    border: none;
}

.exercise-square:nth-child(1) {
  width: 20%
}
.exercise-square:nth-child(2) {
  width: 60%
}
.exercise-square:nth-child(2) input {
  width: 150px;
}
.exercise-square:nth-child(3) {
  width: 20%
}

.exercise-square:nth-child(3) input {
  width: 37px;
}
.exercise-square:nth-child(4) {
  width: 20%;
  overflow: hidden;
}
.exercise-square:nth-child(4) input {
  width: 37px;
}
.exercise-square h4:nth-child(12) {
  color: var(--player-color);
}
.exercise-square h4:nth-child(1) {
  color: var(--player-color);
}
.exercise-square:nth-child(3) input {
  background-color: transparent;
}

.exercise-square .icon {
    zoom: .7;
    margin-bottom: .5px
}

.title{
    height: 40px;
    margin: 5px 0;
    text-align: center;
        font-size: 1.2rem;
}

.button {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 4rem;
  width: 100%;
  z-index: 120;
}
.cron {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  z-index: 120;
}

.cron .icon {
    color: var(--player-color);
    zoom: 1.4;
}

.counter {
    color: var(--player-color);
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 1rem;
  font-size: 4rem;
  font-family: 'Nirequa';
}

.button .icon{
  color: var(--player-color);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: -1px;
  zoom:1.7;
}
.button span:nth-child(1){
  background-color: var(--player-color)20;
  color: var(--player-color);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 8px;
  padding-right: 25px;
  font-weight: bolder;
  border: 1px solid var(--player-color); 
}
.button span:nth-child(2){
    background-color: var(--player-color)20;
    color: var(--player-color);
  font-weight: bolder;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 8px;
  padding-left: 28px;
  border: 1px solid var(--player-color); 
}


.nav-top {
  display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: center;
    text-align: center;
}

.nav-bar-photo{
  z-index: 1004;
    transform: translateX(0%);
    position: fixed;
    height: calc(100% - 0px);
    bottom: 0px;
    width: 100%;
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    background-color: #ffffff50;
    background: var(--player-color) 10;
  }
  
  .nav-flow-photo {
   display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    z-index: 100;
    transform: translateX(0%);
    position: fixed;
    height: calc(100% - 0px);
    bottom: 0px;
    width: 100%;
  }
  
  .div-img-full img {
    box-shadow: 0px 7px 20px var(--player-color);
    height: auto;
    width: 95%;
    border-radius: 7px;
    border: var(--player-color) 2px solid;
    z-index: 100;
    opacity: 1;
}


.dark-mode .button span:nth-child(1), .dark-mode .button span:nth-child(2){
  background-color: var(--player-color)60;
  color: var(--player-color);
}
/* 
border: 2px solid #2cd3db;
*/ 

.obs{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  margin: 5px 9% 10px 9%;
  height:50px;
  font-size: .8rem;
  text-align: center;
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
  align-items: flex-start;
  font-size: 20px;
  color: var(--player-color);
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

.squared{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
  overflow: auto;
  margin-bottom: .5rem;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}

.square{
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: nowrap;
  flex-direction: column;
  cursor: pointer;
  padding: 10px;
  height: 60px;
  width: 150px;
  margin: 10px 5px;
  border: 1px solid var(--player-color);
  border-radius: 8px;
}

.square:hover {
  background: var(--player-color);
  border: 1px solid var(--player-color);
border-radius: 8px;
}

.square:focus {
  background: var(--player-color);
  border: 1px solid var(--player-color);
border-radius: 8px;
}

.square.selected {
    background-color: var(--player-color);
}

.squared-serie{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}

.square-serie{
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: nowrap;
  flex-direction: column;
  cursor: pointer;
  padding: 5px 10px;
  height: 60px;
  width: 150px;
  margin: 5px;
  border: 1px solid var(--player-color);
  border-radius: 8px;
}
.square-serie .icon {
    margin-bottom: .3rem;
}

.square-serie:hover {
  background: var(--player-color);
  border: 1px solid var(--player-color);
border-radius: 8px;
}

.square-serie:focus {
  background: var(--player-color);
  border: 1px solid var(--player-color);
border-radius: 8px;
}

.square-serie.selected {
    background-color: var(--player-color);
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
  background: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 12px 0;
  box-shadow: 0 -1px 5px #00000020;
}
.dark-mode .bottom-menu {
  background: #0f141e;
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
  background: #ffffff;
  color: #333;
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
.dark-mode .central-button .circle {
  background: #0f141e;
  color:#ffffff;
}

.central-button .circle:hover {
  background: var(--player-color);
  box-shadow: 0 4px 10px var(--player-color);
  border: 4px solid var(--player-color);
  color: #000;
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

.silhueta-container {
  position: relative;
}

.silhueta {
  width: 1%;
  height: auto;
  border-radius: 10px;
  color: var(--player-color);
  object-fit: contain;
}

/* Campos de medidas */
.medida-imc {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 20px;
}

.medida-top {
  background: var(--player-color);
  padding: 2px 3px;
  border-radius: 4px;
  font-size: 14px;
  font-family: sans-serif;
  font-weight: bold;
  width: max-content;
}

.medida-top label {
    font-weight: bold;
}

.dark-mode .medida-top label {
  color: #000;
}

.medida {
  position: absolute;
  background: var(--player-color);
  padding: 2px;
  border-radius: 4px;
  font-size: 12px;
  font-family: sans-serif;
  font-weight: bold;
}

.medida label {
    font-weight: bold;
}

.dark-mode .medida label {
  color: #000;
}

.lado {
  position: absolute;
  background: var(--player-color);
  padding: 2px;
  border-radius: 4px;
  font-size: 12px;
  font-family: sans-serif;
  font-weight: bold;
}

.lado label {
    font-weight: bold;
    color:#fff;
}

/* Posição aproximada das medidas */
.pescoço {
  top: 8%;
  left: 55%;
}
.ombro {
  top: 15%;
  left: 57%;
}
.torax {
  top: 15%;
  right: 55%;
}
.torax-contraído {
  top: 22%;
  right: 50%;
}
.torax-relaxado {
  top: 29%;
  right: 50%;
}
.cintura {
  top: 29%;
  left: 59%;
}
.abdomen {
  top: 37%;
  left: 55%;
}
.supra-espinhal {
  top:44%;
  left:50%;
}
.quadril {
  top: 45%;
  left: 57%;
}

.lado-esquerdo {
  top: 2%;
  left: 65%;
  filter: none;
  color: #fff;
}

.braco-esquerdo {
  top: 20%;
  left:52%;
}
.braco-esquerdo-contraido {
  top: 27%;
  left: 52%;
}
.antebraco-esquerdo {
  top: 40%;
  left:57%;
}
.coxa-medial-esquerda {
  top:55%;
  left: 57%;
}
.coxa-distal-esquerda {
  top: 62%;
  left:57%;
}
.perna-esquerda {
  top: 75%;
  left:57%;
}

.lado-direito {
  top: 2%;
  left: 7%;
  filter: none;
  color: #fff;
}

.braco-direita {
  top: 20%;
  left:2%;
}
.braco-direita-contraido {
  top: 27%;
  left: 2%;
}
.antebraco-direita {
  top: 40%;
  left:7%;
}
.coxa-medial-direita {
  top:55%;
  left: 8%;
}
.coxa-distal-direita {
  top: 62%;
  left: 10%;
}
.perna-direita {
  top: 75%;
  left:19%;
}
.imc {
  display: flex;
  flex-direction: column;
  top:76%;
  width: 70px;
  height: 70px;
  left: 8%;
  justify-content: center;
  align-items:center;
  position: absolute;
}
.info-imc {
  position: absolute;
  top: -12px;
  color: #00caff;
  left: 65px;
  zoom:1;
}
.p-gordura {
  display: flex;
  flex-direction: column;
  width:70px;
  height:70px;
  top: 76%;
  left: 8%;
  justify-content: center;
  align-items:center;
}
.p-musculo {
  display: flex;
  flex-direction: column;
  width:70px;
  height:70px;
  top:52%;
  text-align: center;
  left: 8%;
  justify-content: center;
  align-items:center;
}
.bio-fat{
  display: flex;
  flex-direction: column;
  width:70px;
  height:70px;
  top: 6%;
  left: 8%;
  justify-content: center;
  align-items:center;
}
.bio-imc{
  display: flex;
  flex-direction: column;
  width:70px;
  height:70px;
  top: 6%;
  left: 73%;
  justify-content: center;
  align-items:center;
}

.bio-basal{
  display: flex;
  flex-direction: column;
  width:70px;
  height:70px;
  top: 41%;
  left: 73%;
  text-align: center;
  justify-content: center;
  align-items:center;
}

.bio-age{
  display: flex;
  flex-direction: column;
  width:70px;
  height:70px;
  top: 76%;
  left: 73%;
  text-align: center;
  justify-content: center;
  align-items:center;
}


.bio-muscle {
  display: flex;
  flex-direction: column;
  width:70px;
  height:70px;
  top: 41%;
  left: 8%;
  justify-content: center;
  align-items:center;
}
.bio-visceral {
  display: flex;
  flex-direction: column;
  width:70px;
  height:70px;
  top: 76%;
  left: 8%;
  justify-content: center;
  align-items:center;
  text-align: center;
}

.d-cutanea {
  position: absolute;
  background: var(--player-color);
  padding: 2px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}
.dark-mode .d-cutanea {
  color: #000;
}

.tricipital {
  top:40%;
  left:5%;
}
.sub-escapular {
  top:16%;
  left:5%;
}

.axilar-media {
  top:24%;
  left: 5%;
}

.peitoral {
  top: 32%;
  left:8%;
}

.coxa-media {
 left:58%;
 top:60%;
}

.perna {
  top: 80%;
  left: 55%;
}

.d-cutanea .icon{
  margin-top: -5px;
  margin-right: 3px;
  zoom:.9;
}

#valorOmbro {
    color: #fff;
    margin-left: 3px;
    border-radius: 4px;
    font-size: 13px;
    font-family: sans-serif;
}

.silhueta-wrapper svg{
  width: 300px  ; /* ajuste o tamanho */
  height: auto;
  margin: 10px 0;
}

.buttons-avaliacao {
    display: flex;
    font-size: 12px;
    justify-content: space-between;
    padding: 2px;
    border-radius: 4px;
    font-size: 12px;
    font-family: sans-serif;
    font-weight: bold;
}

.buttons-avaliacao h5 {
    color: #000;
    margin: 15px 3px 0 3px;
    border: 2px solid var(--player-color);
    border-radius: 4px;
    padding: 4px 8px;
    font-size: 10.7px;
    font-family: sans-serif;
    font-weight: bold;
    cursor: pointer;
}
.dark-mode .buttons-avaliacao h5{
  color: #fff;
}
.buttons-avaliacao h5:hover {
    color: var(--player-color);
}

.buttons-avaliacao .antro {
  display: flex;
  flex-direction: column;
  border:none;
}

.buttons-avaliacao .antro h5.active {
  background-color: var(--player-color)
}

.buttons-avaliacao  h5.active {
  background-color: var(--player-color)
}

.buttons-avaliacao span.active:hover {
  color: #fff;
}

.buttons-avaliacao h5.active:hover {
  color: #fff;
}

.buttons-avaliacao .antro h5.active:hover {
  color: #fff;
}


.antro-number {
  margin-top: 6px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.antro-number span {
  border: 2px solid var(--player-color);
  padding: 2px 5px;
  padding: 4px 12px;
  font-size: 10.7px;
  cursor: pointer;
  border-radius: 4px;
}
.antro-number span:hover {
  color: var(--player-color);
}

.antro-number span.active {
  background-color: var(--player-color)
}
.hud-notification-imc {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1002;
  border: 2px solid var(--player-color);
  padding: 2rem .5rem;
  border-radius: 5px;
  margin: 0 0 50px 0;
  width: 90%;
  background-color: #ffffff;
  color: #ffffff;
  color: var(--player-color);
  box-shadow: 0 0 20px var(--player-color);
  font-family: 'Orbitron-Regular', sans-serif;
}
.dark-mode .hud-notification-imc {
  background-color: #0f141e;
}
.main-div-tree-info {
  display: flex;
  justify-content: center;
  width: 100%;
}
table {
  border-collapse: no-collapse;
  font-family: Arial, sans-serif;
  font-size: 11.5px;
  margin: 0px 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* Cabeçalho */
table thead {
  background-color: #00dc8270;
  color: white;
  text-align: left;
}

table th {
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: bold;
}

table th:nth-child(1){
  width: 180px;
}
table th:nth-child(2){
  width: 100px;
}
table th:nth-child(3){
  width: 100px;
}

/* Linhas do corpo */
table tbody tr {
  border-bottom: 1px solid #00dc8240;
  transition: background-color 0.3s ease;
}
table tbody tr:nth-child(2n) {
    background-color: #00dc8220;
  border-bottom: 1px solid #00dc8240;
  transition: background-color 0.3s ease;
}

table tbody tr:hover {
  background-color: #00dc8250;
  cursor: pointer;
}

table td {
  vertical-align: middle;
}
</style>
