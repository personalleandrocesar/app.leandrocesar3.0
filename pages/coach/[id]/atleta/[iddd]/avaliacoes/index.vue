<script setup>
import { ref, watch, computed, nextTick, onMounted } from "vue";
const route = useRoute();

const { selectedColor, selectedClass, classColors, resetColorToDefault } = usePlayerColor()
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
} = await usePlayerRank(route.params.id, route.params.iddd)


const Users = await useFetch(
    `https://api.leandrocesar.com/usersnw/${route.params.id}/team/${route.params.iddd}`,
);
const item = Users.data.value;
const items = ref([]);

const menuFloatCreate = ref(false);
const notific = ref(false);
const notificTwo = ref(false);

const content = ref(true)
function coachFloatCreate() {
    menuFloatCreate.value = !menuFloatCreate.value;
}
const menuFloat = ref(false);
const menuFloatEx = ref(false);
const user = item;
const ava = item.avaliacoes;
const train = item.avaliacoes
const seriess = train

function closeNotific () {
  notific.value = false
  notificTwo.value = false
}

function time() {
    setTimeout(() => {
        
    }, 7000);
}

time();

const name = user.name;
const firstName = computed(() => {
    return name.split(" ")[0];
});
useHead({
  titleTemplate: `${firstName.value}  ${user.lastName} - Cliente | Leandro Cesar - App`,
});

const buttonCreate = ref(true)

function createTraininng () {
  content.value = ! content.value
  buttonCreate.value = ! buttonCreate.value
}

const create = ref(
    {
        named: '',
    }
)


const date = ref('');
const idade = ref('');
const massa = ref('');
const altura = ref('');
const nascimento = ref('');
const sexo = ref('');
const pescoco = ref('');
const ombro = ref('');
const torax = ref('');
const toraxRelaxado = ref('');
const toraxContraido = ref('');
const cintura = ref('');
const abdomem = ref('');
const quadril = ref('');
// lado direito
const bracoDireitoRelaxado = ref('');
const bracoDireitoContraido = ref('');
const antebracoDireito = ref('');
const coxaMedialDireita = ref('');
const coxaDistalDireita = ref('');
const pernaDireita = ref('');
// lado esquerdo
const bracoEsquerdoRelaxado = ref('');
const bracoEsquerdoContraido = ref('');
const antebracoEsquerdo = ref('');
const coxaMedialEsquerda = ref('');
const coxaDistalEsquerda = ref('');
const pernaEsquerda = ref('');
// Dobras Cutâneas
const dtorax = ref('');
const tricipital = ref('');
const subEscapular = ref('');
const axilarMedia = ref('');
const abdominal = ref('');
const supraEspinhal = ref('');
const coxa = ref('');
const perna = ref('');
// BioImpedância
const bmi = ref('');
const fat = ref('');
const muscle = ref('');
const rm = ref('');
const bodyAge = ref('');
const visceralFat = ref('');
// Diâmetros ósseos
const umero = ref('');
const punho = ref('');
const femur = ref('');
const tornozelo = ref('');
// Testes
const flexaoBraco = ref('');
const flexaoAbdominal = ref('');
// Postura
const posturaObs = ref('');
const retroversaoQuadril = ref('');
const anteroversaoOmbros = ref('');
const joelhosRecurvados = ref('');



const dTorax = dtorax.value
const triceps = tricipital.value
const supraespinhal = supraEspinhal.value

const homens = dTorax + abdominal + coxa
const mulheres = triceps + supraespinhal + coxa

const dcHomens = 1.109380 - (0.0008267 * (homens)) + (0.0000016 * (homens * homens)) - (0.0002574 * (idade))
const dcMulheres = 1.0994921 - (0.0009929 * (mulheres)) + (0.0000023 * (mulheres * mulheres)) - (0.0001392 * (idade))

const percGHomens = (((4.95 / dcHomens) - 4.50) * 100).toFixed(1)
const percGMulheres = (((4.95 / dcMulheres) - 4.50) * 100).toFixed(1)

const percentualFat = computed(() => {
    if (sexo === "feminino") {
        return percGMulheres
    } return percGHomens
})

const dataNascimento = ref('');
const dataAvaliacao = date; // data da avaliação

const idad = computed(() => {
  if (dataNascimento.value && dataAvaliacao.value) {
    return calcularIdade(dataNascimento.value, dataAvaliacao.value);
  }
  return '';
});

function calcularIdade(dataNascimento, dataReferencia) {
  const referencia = dataReferencia ? new Date(dataReferencia) : new Date();
  const nascimento = new Date(dataNascimento);
  
  let idade = referencia.getFullYear() - nascimento.getFullYear();
  const mes = referencia.getMonth() - nascimento.getMonth();
  
  if (mes < 0 || (mes === 0 && referencia.getDate() < nascimento.getDate())) {
    idade--;
  }
  
  return idade.toString();
}

async function submitTreino() {
    try {
        const response = await fetch(`https://api.leandrocesar.com/usernw/${route.params.id}/atleta/${route.params.iddd}/treinos`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                treino: newItem.value
            }),
        });
        if (response.ok) {
            console.log('Create Trainning successfully');
            subscriberOk.value = true;
            setTimeout(() => {
                subscriberOk.value = false;
            }, 1500);
        } else {
            console.error('Failed to Create Trainning');
        }
    } catch (error) {
        console.error('Error Create Trainning:', error);
    }
}

const creater = ref({
  series: items.value
});
const selectedTraining = ref(null);

function coachFloat(training) {
  menuFloat.value = !menuFloat.value;
  selectedTraining.value = training;
}
function coachFloatEx(training) {
  menuFloatEx.value = !menuFloatEx.value;
  selectedTraining.value = training;
}
const UsersTrainnig = await useFetch(`https://api.leandrocesar.com/users/${route.params.id}/treinos/${route.params.idd}`);

const qtTreino = UsersTrainnig.data.value
const qtTreinos = UsersTrainnig.data.value

const treinos = ref('')

const subscriberOk = ref(true)
const deleteOk = ref(false)

const add = ref(true)
function addClient() {
    add.value = !add.value
}

async function submitSerie() {
    try {
        const response = await fetch(`https://api.leandrocesar.com/usernw/${route.params.id}/atleta/${route.params.iddd}/treinos`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              treino: creater.value,
            }),
        });
        localStorage.setItem('item', JSON.stringify(items.value));
        if (response.ok) {
            console.log('Data create successfully');
            subscriberOk.value = true;
            setTimeout(() => {
                subscriberOk.value = false;
                return navigateTo(`/admin/clientes/${route.params.id}/treino/${route.params.idd}/${ss.value}`);
            }, 1500);
        } else {
            console.error('Failed to create data');
        }
    } catch (error) {
        console.error('Error create data:', error);
    }
}




const reg = route.params.id
const logon = useCookie('logon')
logon.value = reg

const logOff = () => {
    logon.value = null
}

const tag = useCookie('tag')
tag.value = tag.value

const bodyOne = ref(true)
function menu() {
    bodyOne.value = !bodyOne.value
}

const ss = ref('');

function clear() {
    items.value = ([
        { id: '', num: '', nome: '', sets: '', reps: '', rest: '', grupo: '', obs: '', photo: '', img: `` }
    ])
}

function removeAllItems() {
    items.value = [];
    newItem.value = {};
    itemIdCounter.value = []
}

function moveItemUp(index) {
    if (index <= 0) return;
    const item = items.value[index];
    items.value.splice(index, 1);
    items.value.splice(index - 1, 0, item);
}

function moveItemDown(index) {
    if (index >= items.value.length - 1) return;
    const item = items.value[index];
    items.value.splice(index, 1);
    items.value.splice(index + 1, 0, item);
}

const operator = ref('');

const creationUser= new Date().toISOString()

const newItem = ref({
  name: '',
  serie: [
    {
      name: '',
      set: [
        {
          id: '',
          nome: '',
          reps: '',
          sets: '',
          obs: '',
          time: '',
          img: ''
        }
      ]
    }
  ]
});
const creationDate = creationUser.split('T')[0].replace(/(\d{4})-(\d{2})-(\d{2})/, '$3-$2-$1');

const firstInputRef = ref(null);
const itemIdCounter = ref(1);

function addItem() {
  firstInputRef.value.focus();
  items.value.push({
    ...newItem.value,
    id: itemIdCounter.value,
    num: `Exercício ${itemIdCounter.value}`,
    rest: `${newItem.value.time}`,
    img: `https://app.leandrocesar.com/exe/${newItem.value.photo}.gif`,
  });
  itemIdCounter.value++;
  newItem.value = {
    name: '',
    serie: [
      {
        name: '',
        set: [
          {
            id: '',
            nome: '',
            reps: '',
            sets: '',
            obs: '',
            time: '',
            img: ''
          }
        ]
      }
    ]
  };
}

function removeItem(item) {
  items.value = items.value.filter(i => i !== item);
  creater.value.series = items.value;
}

function moveUp(index) {
    if (index > 0) {
        const temp = items.value[index];
        items.value[index] = items.value[index - 1];
        items.value[index - 1] = temp;
    }
}

function moveDown(index) {
    if (index < items.value.length - 1) {
        const temp = items.value[index];
        items.value[index] = items.value[index + 1];
        items.value[index + 1] = temp;
    }
}

onMounted(() => {
    const storedItems = JSON.parse(localStorage.getItem('items'));
    if (storedItems) {
        items.value = storedItems;
    }
});

watch(items, (newItems) => {
    localStorage.setItem('items', JSON.stringify(newItems));
}, { deep: true });

const main = ref(true)
const addCloseTrainning = ref(true)

function newTrainning() {
    addCloseTrainning.value = !addCloseTrainning.value
    main.value = !main.value
}

const training = ref({
  name: '',
  creationDate: '',
  serie: []
});

const newExercise = ref({
  nome: '',
  reps: '',
  sets: 0,
  obs: '',
  time: '',
  img: ''
});

const selectedSeries = ref(null);

function selectSeries(item) {
    selectedSeries.value = item;
}

const selectedSeriesIndex = ref(null);

const exerciseNameInput = ref(null);

const addSeries = () => {
  training.value.serie.push({ name: '', set: [] });
  selectedSeriesIndex.value = training.value.serie.length - 1;
};

function updateExerciseIds() {
  training.value.serie.forEach((serie) => {
    serie.set.forEach((exercise, index) => {
      exercise.id = index + 1; // Atualiza o ID com base na posição atual (base 1)
    });
  });
}


const removeSeries = (index) => {
  training.value.serie.splice(index, 1);
  if (selectedSeriesIndex.value === index) {
    selectedSeriesIndex.value = null;
  }
};

const removeSeriesAll = () => {
  notificTree.value = true
}

function notifConfirm() {
    notificTree.value = false
    training.value.serie = [];
    selectedSeriesIndex.value = null;
}


const notificConDel = ref(false);
function notifCancel() {
    notificConDel.value = !notificConDel.value
}

const removeAllSeries = () => {
  if (confirm("Tem certeza que deseja apagar todas as séries?")) {
    training.value.serie = [];
    selectedSeriesIndex.value = null;
  }
};

const addExercise = () => {
  if (selectedSeriesIndex.value !== null) {
    training.value.serie[selectedSeriesIndex.value].set.push({
      ...newExercise.value,
      id: training.value.serie[selectedSeriesIndex.value].set.length + 1 // ID baseado na posição
    });
    newExercise.value = {
      nome: '',
      reps: '',
      sets: 0,
      obs: '',
      time: '',
      img: ''
    };
    nextTick(() => exerciseNameInput.value.focus());
    searchQuery.value = '';
  } else {
    notificTwo.value = true;
    setTimeout(() => {
    notificTwo.value = false;
    }, 1800);
  }
};


const handleKeyDown = (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    addExercise();
  }
};

function moveExerciseUp(seriesIndex, exerciseIndex) {
  if (exerciseIndex > 0) {
    const serie = training.value.serie[seriesIndex].set;
    [serie[exerciseIndex - 1], serie[exerciseIndex]] = [serie[exerciseIndex], serie[exerciseIndex - 1]];
    updateExerciseIds(); // Atualiza os IDs após a troca
  }
}


function moveExerciseDown(seriesIndex, exerciseIndex) {
  const serie = training.value.serie[seriesIndex].set;
  if (exerciseIndex < serie.length - 1) {
    [serie[exerciseIndex], serie[exerciseIndex + 1]] = [serie[exerciseIndex + 1], serie[exerciseIndex]];
    updateExerciseIds(); // Atualiza os IDs após a troca
  }
}

function removeExercise(seriesIndex, exerciseIndex) {
  training.value.serie[seriesIndex].set.splice(exerciseIndex, 1);
  updateExerciseIds(); // Atualiza os IDs após a remoção
}


async function handleSubmit() {
  try {
    const response = await fetch(`https://api.leandrocesar.com/usernw/${route.params.id}/atleta/${route.params.iddd}/treinos`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        treino: training.value,
      }),
    });
    if (response.ok) {
      console.log('Create Training successfully');
      // localStorage.clear();
      notific.value = true;
      setTimeout(() => {
          notific.value = false;
          reloadNuxtApp({
              path: `/coach/${route.params.id}/atleta/${route.params.iddd}/treinos` ,
              ttl: 5100,
          });
      }, 5000);
    } else {
      console.error('Failed to Create Training');
    }
  } catch (error) {
    console.error('Error Create Training:', error);
  }
}

const notificDel = ref(false);

async function deleteAvaliacao() {
  try {
    const avaliacaoId = selectedTraining.value._id
    const response = await fetch(`https://api.leandrocesar.com/usernw/${route.params.id}/atleta/${route.params.iddd}/avaliacao`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ avaliacaoId })
    })

    const result = await response.json()

    if (response.ok) {
      notificDel.value = true
      setTimeout(() => {
        notificDel.value = false
        reloadNuxtApp({
          path: `/coach/${route.params.id}/atleta/${route.params.iddd}/avaliacoes`,
          ttl: 3000,
        })
      }, 3000)
    } else {
      alert(result.message || 'Erro ao deletar avaliação')
    }
  } catch (err) {
    console.error('❌ Erro ao deletar avaliação:', err)
  }
}


const notificAtu = ref(false);
const notificErr = ref(false);

async function submitAtualizacao() {
  try {
    if (!selectedTraining.value) return

    // Pega o _id da avaliação
    const avaliacaoId = selectedTraining.value._id
    if (!avaliacaoId) {
      console.error('❌ Avaliação sem _id — não é possível atualizar.')
      return
    }

    // Cria um objeto com todos os campos a atualizar, exceto _id, date e data
    const camposAtualizados = { ...selectedTraining.value }
    delete camposAtualizados._id
    delete camposAtualizados.date
    delete camposAtualizados.data

    // Faz a requisição PUT com o ID da avaliação na URL
    const response = await fetch(
      `https://api.leandrocesar.com/usernw/${route.params.id}/atleta/${route.params.iddd}/avaliacao/${avaliacaoId}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(camposAtualizados)
      }
    )

    const result = await response.json()

    if (response.ok) {
      console.log('✅ Avaliação atualizada com sucesso:', result)
      notificAtu.value = true
      setTimeout(() => { notificAtu.value = false }, 3000)
    } else {
      console.error('❌ Erro ao atualizar avaliação:', result.message)
      notificErr.value = true
      setTimeout(() => { notificErr.value = false }, 3000)
    }

  } catch (err) {
    console.error('❌ Erro ao atualizar avaliação:', err)
    notificErr.value = true
    setTimeout(() => { notificErr.value = false }, 3000)
  }
}




async function submitAvaliacao() {
  try {
    // 👇 Faz a requisição para o backend
    const response = await fetch(`https://api.leandrocesar.com/usernw/${route.params.id}/atleta/${route.params.iddd}/avaliacao`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
      avaliacao: {
          date: date.value,
          idade: idad.value,
          massa: massa.value,
          altura: altura.value,
          nascimento: dataNascimento.value,
          sexo: sexo.value,
          pescoco: pescoco.value,
          ombro: ombro.value,
          torax: torax.value,
          toraxRelaxado: toraxRelaxado.value,
          toraxContraido: toraxContraido.value,
          cintura: cintura.value,
          abdomem: abdomem.value,
          quadril: quadril.value,
          // lado direito
          bracoDireitoRelaxado: bracoDireitoRelaxado.value,
          bracoDireitoContraido: bracoDireitoContraido.value,
          antebracoDireito: antebracoDireito.value,
          coxaMedialDireita: coxaMedialDireita.value,
          coxaDistalDireita: coxaDistalDireita.value,
          pernaDireita: pernaDireita.value,
          // lado esquerdo
          bracoEsquerdoRelaxado: bracoEsquerdoRelaxado.value,
          bracoEsquerdoContraido: bracoEsquerdoContraido.value,
          antebracoEsquerdo: antebracoEsquerdo.value,
          coxaMedialEsquerda: coxaMedialEsquerda.value,
          coxaDistalEsquerda: coxaDistalEsquerda.value,
          pernaEsquerda: pernaEsquerda.value,
          // Dobras Cutâneas
          dtorax: dtorax.value,
          tricipital: tricipital.value,
          subEscapular: subEscapular.value,
          axilarMedia: axilarMedia.value,
          abdominal: abdominal.value,
          supraEspinhal: supraEspinhal.value,
          coxa: coxa.value,
          perna: perna.value,
          // BioImpedância
          bmi: bmi.value,
          fat: fat.value,
          muscle: muscle.value,
          rm: rm.value,
          bodyAge: bodyAge.value,
          visceralFat: visceralFat.value,
          // Diâmetros ósseos
          umero: umero.value,
          punho: punho.value,
          femur: femur.value,
          tornozelo: tornozelo.value,
          // Testes
          flexaoBraco: flexaoBraco.value,
          flexaoAbdominal: flexaoAbdominal.value,
          // Postura
          posturaObs: posturaObs.value,
          retroversaoQuadril: retroversaoQuadril.value,
          anteroversaoOmbros: anteroversaoOmbros.value,
          joelhosRecurvados: joelhosRecurvados.value,
          }

      }), // o corpo tem que ter { avaliacao: {...} }
    })

    if (response.ok) {
      console.log('✅ Avaliação enviada com sucesso!')
      notific.value = true
      setTimeout(() => {
        notific.value = false
        reloadNuxtApp({
          path: `/coach/${route.params.id}/atleta/${route.params.iddd}/avaliacoes`,
          ttl: 3000,
        })
      }, 3000)
    } else {
      console.error('❌ Erro ao enviar avaliação')
    }
  } catch (error) {
    console.error('🚨 Erro ao conectar com API:', error)
  }
} 

const saveTraining = () => {
  localStorage.setItem('training', JSON.stringify(training.value));
};

const loadTraining = () => {
  const savedTraining = localStorage.getItem('training');
  if (savedTraining) {
    training.value = JSON.parse(savedTraining);
  }
};

onMounted(() => {
  loadTraining();
  console.log('Componente montado');
  nextTick(() => {
    if (exerciseNameInput.value) {
      exerciseNameInput.value.focus();
    }
  });
});

watch(training, saveTraining, { deep: true });

const searchQuery = ref('');
const Usserss = await useFetch(`https://api.leandrocesar.com/exercises`);
const users = Usserss.data;

const selectedEx = ref([]);
const selectedUserName = ref(''); // Nome do usuário selecionado para controlar o dropdown
const highlightedIndex = ref(-1); // Índice destacado no dropdown

const updateSearchQuery = () => {
  highlightedIndex.value = -1; // Reinicia o índice destacado
};

const navigateDropdown = (direction) => {
  if (filteredUsserss.value.length === 0) return;

  // Calcula o próximo índice destacado
  highlightedIndex.value = (highlightedIndex.value + direction + filteredUsserss.value.length) % filteredUsserss.value.length;
};

const confirmSelection = () => {
  if (highlightedIndex.value >= 0 && highlightedIndex.value < filteredUsserss.value.length) {
    selectUser(filteredUsserss.value[highlightedIndex.value]);
  }
};


const maxExercicios = '20'; // Limite máximo de exercícios a serem exibidos

const filteredUsserss = computed(() => {
  if (!searchQuery.value) return [];
  const filtered = users.value.filter(user =>
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.grupo.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
  return filtered.slice(0); // Limita os resultados a 'maxExercicios'
});


const selectUser = (user) => {
  if (!selectedEx.value.some(selected => selected._id === user._id)) {
    selectedEx.value.push(user);
  }
  searchQuery.value = user.name;
  selectedUserName.value = user.name;
  newExercise.value.nome = user.name;
  newExercise.value.img = user.img;
  selectedUserName.value = user.name; // Atualiza o controle do dropdown
  highlightedIndex.value = -1; // Reinicia o índice destacado
  // Filtra para exibir apenas o usuário selecionado
    filteredUsserss.value = [user];

};

const isZoomed = ref(false);

const toggleZoom = () => {
  isZoomed.value = !isZoomed.value;
};

const userId = ref('');
const athleteId = ref('');
const error = ref(null);
const notificTree = ref(false);
const notificFour = ref(false);

const showFloatingDiv = ref(false);
const previewImage = ref(null);
const file = ref(null);
const loading = ref(false);

const fetchUserData = async () => {
  const formats = ['jpeg', 'jpg', 'png'];
  let latestImage = null;

  // Tenta buscar imagens e verificar qual delas é a mais recente
  for (const format of formats) {
    try {
      const response = await fetch(`https://api.leandrocesar.com/uploads/${user.username}.${format}`);
      if (response.ok) {
        // Obtenha o cabeçalho 'Last-Modified' para comparar as datas
        const lastModified = response.headers.get('Last-Modified');
        
        if (lastModified) {
          if (!latestImage || new Date(lastModified) > new Date(latestImage.lastModified)) {
            latestImage = { url: `https://api.leandrocesar.com/uploads/${user.username}.${format}`, lastModified };
          }
        } else {
          // Caso o servidor não envie o cabeçalho Last-Modified, use a primeira imagem que encontrar
          latestImage = { url: `https://api.leandrocesar.com/uploads/${user.username}.${format}` };
        }
      }
    } catch (err) {
      console.error(`Erro ao buscar dados do usuário no formato ${format}:`, err);
    }
  }

  // Atualiza a foto do usuário com a imagem mais recente
  if (latestImage) {
    user.foto = latestImage.url;
    console.log('Imagem atualizada:', latestImage.url);
  }
};


onMounted(fetchUserData);

const openFloatingDiv = () => { showFloatingDiv.value = true; };
const closeFloatingDiv = () => {
  showFloatingDiv.value = false;
  previewImage.value = null;
  file.value = null;
};

const handleFileChange = (event) => {
  file.value = event.target.files[0];
  if (file.value) {
    previewImage.value = URL.createObjectURL(file.value);
    showFloatingDiv.value = true;
  }
};

const uploadImage = async () => {
  if (!file.value) return alert("Por favor, selecione um arquivo.");

  const formData = new FormData();
  formData.append('image', file.value, `${user.username}.${file.value.name.split('.').pop()}`);

  try {
    loading.value = true;
    const response = await fetch('https://api.leandrocesar.com/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert("Upload realizado com sucesso!");
      // Após o upload, chama a função para pegar a imagem mais recente
      await fetchUserData();
      closeFloatingDiv();
      
    } else {
      alert("Erro no upload.");
    }
  } catch (err) {
    console.error(err);
    alert("Erro ao conectar com o servidor.");
  } finally {
    loading.value = false;
  }
};


const imageExists = ref(false);
const checkImageExists = async () => {
  const formats = ['jpeg', 'jpg', 'png', 'webp'];
  for (const format of formats) {
    try {
      const response = await fetch(`https://api.leandrocesar.com/uploads/${user.username}.${format}`, { method: 'HEAD' });
      if (response.ok) {
        imageExists.value = true;
        console.log('ok a imagem existe!')
        return;
      }
    } catch (error) {
      console.log(`Erro ao verificar a imagem no formato ${format}:`, error);
    }
  }
  imageExists.value = false;
};

await checkImageExists();


const photoOpen = ref(false);
function openPhoto() {
    photoOpen.value = !photoOpen.value;
}
const Antropometria = ref(true)
const ComposicaoCorporal = ref(false)
const Bioimpedancia= ref(false)
const AvaliacaoPostural = ref(false)
const TestesFísicos = ref(false)

function setAntopometria () {
  Antropometria.value = true;
  ComposicaoCorporal.value = false;
  Bioimpedancia.value = false;
  AvaliacaoPostural.value = false;
  TestesFísicos.value = false;
}
function setComposicaoCorporal () {
  Antropometria.value =false;
  ComposicaoCorporal.value = true;
  Bioimpedancia.value = false;
  AvaliacaoPostural.value = false;
TestesFísicos.value = false;
}
function setBioimpedancia () {
  Antropometria.value = false;
  ComposicaoCorporal.value = false;
  Bioimpedancia.value = true;
  AvaliacaoPostural.value = false;
TestesFísicos.value = false;
}
function setTesteFisico () {
  TestesFísicos.value = true;
  Antropometria.value = false;
  ComposicaoCorporal.value = false;
  Bioimpedancia.value = false;
  AvaliacaoPostural.value = false;
}

function setAvaliacaoPostural () {
  Antropometria.value = false;
  ComposicaoCorporal.value = false;
  Bioimpedancia.value = false;
  AvaliacaoPostural.value = true;
TestesFísicos.value = false;
}
</script>


<template>
    <div class="layout-no-sidebar">
        <!-- Barra fixa no topo -->
        <header class="topbar">
            <div>
                <h3 class='upper'>
                <Icon name='cil:weightlifitng' /> {{ user.name.split(' ')[0] }} {{ user.lastName }}
                </h3>
            </div>
        </header>
            <div class="nav-users">
                <div class="users-conf">
                    <NuxtLink :to="`/coach/${route.params.id}/atleta/${route.params.iddd}`"  class="filter">
                        <Icon name='heroicons:user-circle' /> Geral
                    </NuxtLink>
                    <NuxtLink :to="`/coach/${route.params.id}/atleta/${route.params.iddd}/treinos`"  class="filter">
                        <Icon name='solar:dumbbell-large-minimalistic-broken' /> Treinos
                    </NuxtLink>
                    <NuxtLink :to="`/coach/${route.params.id}/atleta/${route.params.iddd}/avaliacoes`" class="filter" >
                        <Icon name='bi:clipboard-pulse' /> Avaliações
                    </NuxtLink>
                </div>
                <div class="users-conf"  v-if='train'>
                    <NuxtLink v-if='buttonCreate' @click="coachFloatCreate" class="filter-two">
                        <Icon name='bi:plus-lg' /> Criar Avaliação
                    </NuxtLink>
                    <NuxtLink v-else @click='coachFloatCreate' class="filter-two">
                        <Icon name='material-symbols:close' /> Fechar
                    </NuxtLink>
                </div>
            </div>
<div>
<div class="content">
          <!-- Conteúdo com scroll -->
        <div class='line'>
    <div class="line-columns">

                <div class="logo">
    <!-- Foto do usuário ou pré-visualização -->
    <img @click="openPhoto" :src="user.foto || previewImage" alt="User Photo" />
    <div v-if="photoOpen" class="nav-bar">
            <div  class='logo-nav-bar'>
                <img @click="openPhoto" :src="user.foto || previewImage">
                <!-- <img @click="openPhoto" :src="inter.data.value?.foto"> -->
            </div>
        </div>

    <!-- Ícone para abrir o seletor de arquivos -->
    <label class="photo" for="file-upload" @click="openFloatingDiv">
      <Icon name="uil:image-edit" />
    </label>


    <input id="file-upload" type="file" @change="handleFileChange" hidden />

    <!-- Informações do usuário -->
    <div class="head-name">
      <h3>{{ user.username }}</h3>
      <span><b>ID:</b> {{ user._id }}</span>
      <h4 :class="user.status !== 0 ? 'status' : 'statusOff'">
        {{ user.status === 0 ? "Inativo" : "Ativo" }}
      </h4>
    </div>
  </div>
  <!-- Div flutuante de pré-visualização -->
  <div v-if="showFloatingDiv" class="float">
  <div class="floating-div">
        <div>
            <h3>Pré-visualização</h3>
            <img v-if="previewImage" :src="previewImage" alt="Preview Image" />
            <div v-else class='alt-image' ></div>
        </div>
        <div>
            <button @click="uploadImage" :disabled="loading">
                {{ loading ? "Enviando..." : "Upload" }}
            </button>
            <button @click="closeFloatingDiv">Cancelar</button>
        </div>
  </div>
  </div>

                <div>
                    <div class='bor'>

                            <div class="theme-switch">
                                <div>
                                    <h4>WhatsApp</h4>
                                    <h3>{{user.whatsapp.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')}}</h3>                                </div>
                                <div>
                                    <h4>Data de nascimento</h4>
                                    <h3>{{user.birthday.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3-$2-$1')}}</h3>
                                </div>
                                <div>
                                    <h4>Objetivo</h4>
                                    <h3>{{user.target}}</h3>
                                </div>
                                <div>
                                    <h4>Serviço</h4>
                                    <h3>{{user.service}}</h3>
                                </div>
                            </div>
                    </div>



                </div>

            </div>
          </div>
        </div>
        <div class="content">
            <div class='line'>
            <div class="line-columns">

                  <div>
                  <div>

                  </div>
                      <h3>Lista de avaliações</h3>
                      <p>Avaliações anteriores</p>
                  </div>

                  <div>
                      <div class='bor'>
                              <div class="theme-switch-two">

                                <div v-if='ava' @click="coachFloat(training)" class='tr' v-for="(training, index) in [...train].sort((b, a) => new Date(a.date) - new Date(b.date))" :key="index">

                                    <!-- <NuxtLink :to="`/coach/${route.params.id}/atleta/${route.params.iddd}/treino/${training.named }`"> -->
                                    <NuxtLink>
                                        <div>
                                            <h3>{{ training.date.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3-$2-$1')}}</h3>
                                        </div> 
                                    </NuxtLink>
                                </div>
                                <div v-else >
                                    <h3>Sem avaliação!</h3>
                                    <br>
                                    <NuxtLink @click="coachFloatCreate">
                                        <div class='blue'>
                                            <h3>Criar avaliação</h3>
                                        </div>

                                    </NuxtLink>
                                </div>

                              </div>
                      </div>

                  </div>

              </div>
            </div>

          </div>
          </div>
          <div>
<div class="float zoom" v-if='menuFloatCreate'>
                              <div class="float-ex zoom" v-if='menuFloatEx'>
          <div class="menu-float-ex zoomOut" >

            <div>
                <div class="line-f"></div>




        </div>

        </div>
    </div>
                  <div class="menu-float zoomOut" >

                      <div>
                          <div class='conec'>

                              <div>
                                    <form @submit.prevent="submitAvaliacao()">
                                        <div>
                                            <button type="submit"><Icon name="material-symbols-light:add-notes-outline-rounded" />Criar avaliação</button>
                                        </div>
                                    </form>
                                    <div>
  </div>
                              </div>
                              <div>
                                <div>
                                    <Icon @click="coachFloatCreate"  name='material-symbols:close-rounded' />
                                </div>
                              </div>
                          </div>
                          <div class="line-f"></div>
                          <div class='conec'>

                              <div>
                                  

                                  </div>
                                  
                              </div>
                              <form @submit.prevent="handleSubmit">

                                <div>
                                    <div class='plus-serie-title'>
                                      <h3 @click='setAntopometria' class='title' :class='{active: Antropometria }'>Antropometria</h3>
                                  <h3 @click='setComposicaoCorporal' class='title' :class='{active: ComposicaoCorporal}' >Composição Corporal</h3>
                                  <h3 @click='setBioimpedancia' class='title' :class='{active : Bioimpedancia}'>Bioimpedância</h3>
                                  <h3 @click='setTesteFisico' class='title' :class='{active: TestesFísicos}'>Testes Físicos</h3>
                                  <h3 @click='setAvaliacaoPostural' class='title' :class='{active: AvaliacaoPostural}'>Avaliação Postural</h3>
                                  
                                    </div>
<form class='form-div' @submit.prevent="submitAvaliacao">
  <div  v-if='Antropometria'>
                        <!-- Nome e sobrenome -->
                        <h3>
                            Dados pessoais
                        </h3>
                        <div class="inputs">

                            <div>
                                <span>Dia da Avaliação</span>
                                <input type="date" id="name" v-model="date" autofocus required
                                    autocomplete="data">
                            </div>
                            <div>
                                <span>Nascimento</span>
                                <input v-model="dataNascimento" type="date" placeholder="Data de Nascimento">

                            </div>
                            <div>
                                <span>Idade</span>
                                <input type="text" id="idade" :value.v-model="idad" autofocus
                                    autocomplete="idade" disabled>
                            </div>
                            <div>
                                <span>Massa</span>
                                <input type="text" id="massa" v-model="massa" autofocus
                                    autocomplete="massa">
                            </div>
                            <div>
                                <span>Altura</span>
                                <input type="text" id="altura" v-model="altura" autofocus
                                    autocomplete="altura">
                            </div>
                            <div>
                                <span>Gênero</span>
                                    <select
                                        name="sexo"
                                        id="sexo"
                                        class="select"
                                        placeholder=""
                                
                                        v-model="sexo"
                                    >
                                        <option disabled value="">
                                            Selecione uma opção
                                        </option>
                                        <option value="feminino">Feminino</option>
                                        <option value="masculino">Masculino</option>
                                    </select>
                            </div>

                        </div>
                        <br>
                        <h3>
                            Circunferência
                        </h3>
                        <div class="inputs">
                            <div>
                                <span>Pescoço</span>
                                <input type="text" id="pescoco" v-model="pescoco" autofocus
                                    autocomplete="pescoco">
                            </div>
                            <div>
                                <span>Ombro</span>
                                <input type="text" id="ombro" v-model="ombro" autofocus
                                    autocomplete="ombro">
                            </div>
                            <div>
                                <span>Tórax</span>
                                <input type="text" id="torax" v-model="torax" autofocus
                                    autocomplete="torax">
                            </div>
                            <div>
                                <span>Tórax relaxado</span>
                                <input type="text" id="toraxRelaxado" v-model="toraxRelaxado" autofocus
                                    autocomplete="toraxRelaxado">
                            </div>
                            <div>
                                <span>Tórax contraído</span>
                                <input type="text" id="toraxContraido" v-model="toraxContraido" autofocus
                                    autocomplete="toraxContraido">
                            </div>
                            <div>
                                <span>Cintura</span>
                                <input type="text" id="cintura" v-model="cintura" autofocus
                                    autocomplete="cintura">
                            </div>
                            <div>
                                <span>Abdômen</span>
                                <input type="text" id="abdomem" v-model="abdomem" autofocus
                                    autocomplete="abdomem">
                            </div>
                            <div>
                                <span>Quadril</span>
                                <input type="text" id="quadril" v-model="quadril" autofocus
                                    autocomplete="quadril">
                            </div>

                        </div>
                        <br>
                        <h4>
                            Lado Direito
                        </h4>
                        <div class="inputs">
                            <div>
                                <span>Braço Direito Relaxado</span>
                                <input type="text" id="bracoDireitoRelaxado" v-model="bracoDireitoRelaxado" autofocus
                                    autocomPescoçoPescoçoplete="bracoDireitoRelaxado">
                            </div>
                            <div>
                                <span>Braço Direito Contraído</span>
                                <input type="text" id="bracoDireitoContraido" v-model="bracoDireitoContraido" autofocus
                                    autocomplete="bracoDireitoContraido">
                            </div>
                            <div>
                                <span>Antebraço Direito</span>
                                <input type="text" id="antebracoDireito" v-model="antebracoDireito" autofocus
                                    autocomplete="antebracoDireito">
                            </div>
                            <div>
                                <span>Coxa Medial Direita</span>
                                <input type="text" id="coxaMedialDireita" v-model="coxaMedialDireita" autofocus
                                    autocomplete="coxaMedialDireita">
                            </div>
                            <div>
                                <span>Coxa Distal Direita</span>
                                <input type="text" id="coxaDistalDireita" v-model="coxaDistalDireita" autofocus
                                    autocomplete="coxaDistalDireita">
                            </div>
                            <div>
                                <span>Perna Direita</span>
                                <input type="text" id="pernaDireita" v-model="pernaDireita" autofocus
                                    autocomplete="pernaDireita">
                            </div>

                        </div>
                        <br>
                        <h4>
                            Lado Esquerdo
                        </h4>
                        <div class="inputs">
                            <div>
                                <span>Braço Esquerdo Relaxado</span>
                                <input type="text" id="bracoEsquerdoRelaxado" v-model="bracoEsquerdoRelaxado" autofocus
                                autocomPescoçoPescoçoplete="bracoEsquerdoRelaxado">
                            </div>
                            <div>
                                <span>Braço Esquerdo Contraído</span>
                                <input type="text" id="bracoEsquerdoContraido" v-model="bracoEsquerdoContraido" autofocus
                                autocomplete="bracoEsquerdoContraido">
                            </div>
                            <div>
                                <span>Antebraço Esquerdo</span>
                                <input type="text" id="antebracoEsquerdo" v-model="antebracoEsquerdo" autofocus
                                autocomplete="antebracoEsquerdo">
                            </div>
                            <div>
                                <span>Coxa Medial Esquerda</span>
                                <input type="text" id="coxaMedialEsquerda" v-model="coxaMedialEsquerda" autofocus
                                autocomplete="coxaMedialEsquerda">
                            </div>
                            <div>
                                <span>Coxa Distal Esquerda</span>
                                <input type="text" id="coxaDistalEsquerda" v-model="coxaDistalEsquerda" autofocus
                                autocomplete="coxaDistalEsquerda">
                            </div>
                            <div>
                                <span>Perna Esquerda</span>
                                <input type="text" id="pernaEsquerda" v-model="pernaEsquerda" autofocus
                                autocomplete="pernaEsquerda">
                            </div>

                        </div>
                </div>
                        <br>
                        <div v-if='ComposicaoCorporal'>
                        <h3>
                            Dobras Cutâneas
                        </h3>
                        <div class="inputs">
                            <div>
                                <span>Tórax</span>
                                <input type="text" id="dtorax" v-model="dtorax" autofocus
                                    autocomplete="dtorax">
                            </div>
                            <div>
                                <span>Tríceps</span>
                                <input type="text" id="tricipital" v-model="tricipital" autofocus
                                    autocomplete="tricipital">
                            </div>
                            <div>
                                <span>Sub-Escapular</span>
                                <input type="text" id="subEscapular" v-model="subEscapular" autofocus
                                    autocomplete="subEscapular">
                            </div>
                            <div>
                                <span>Axilar média</span>
                                <input type="text" id="axilarMedia" v-model="axilarMedia" autofocus
                                    autocomplete="axilarMedia">
                            </div>
                            <div>
                                <span>Abdômen</span>
                                <input type="text" id="abdominal" v-model="abdominal" autofocus
                                    autocomplete="abdominal">
                            </div>
                            <div>
                                <span>Supra-Espinhal</span>
                                <input type="text" id="supraEspinhal" v-model="supraEspinhal" autofocus
                                    autocomplete="supraEspinhal">
                            </div>
                            <div>
                                <span>Coxa</span>
                                <input type="text" id="coxa" v-model="coxa" autofocus
                                    autocomplete="coxa">
                            </div>
                            <div>
                                <span>Perna</span>
                                <input type="text" id="perna" v-model="perna" autofocus
                                    autocomplete="perna">
                            </div>

                        </div>
                        <h3>
                            Diâmetro Ósseo
                        </h3>
                        <div class="inputs">
                            <div>
                                <span>Umero</span>
                                <input type="text" id="umero" v-model="umero" autofocus
                                    autocomplete="umero">
                            </div>
                            <div>
                                <span>Punho</span>
                                <input type="text" id="punho" v-model="punho" autofocus
                                    autocomplete="punho">
                            </div>
                            <div>
                                <span>Fêmur</span>
                                <input type="text" id="femur" v-model="femur" autofocus
                                    autocomplete="femur">
                            </div>
                            <div>
                                <span>Tornozelo</span>
                                <input type="text" id="tornozelo" v-model="tornozelo" autofocus
                                    autocomplete="tornozelo">
                            </div>

                        </div>
            </div>
            <!-- Fim de ComposicaoCorporal -->

            <div v-if='Bioimpedancia'>
                        <h3>
                            Bio-Impedância
                        </h3>
                        <div class="inputs">
                            <div>
                                <span>BMI</span>
                                <input type="text" id="bmi" v-model="bmi" autofocus
                                    autocomplete="bmi">
                            </div>
                            <div>
                                <span>FAT</span>
                                <input type="text" id="fat" v-model="fat" autofocus
                                    autocomplete="fat">
                            </div>
                            <div>
                                <span>MUSCLE</span>
                                <input type="text" id="muscle" v-model="muscle" autofocus
                                    autocomplete="muscle">
                            </div>
                            <div>
                                <span>Basal Metabolism</span>
                                <input type="text" id="rm" v-model="rm" autofocus
                                    autocomplete="rm">
                            </div>
                            <div>
                                <span>Body Age</span>
                                <input type="text" id="bodyAge" v-model="bodyAge" autofocus
                                    autocomplete="bodyAge">
                            </div>
                            <div>
                                <span>Visceral Fat</span>
                                <input type="text" id="visceralFat" v-model="visceralFat" autofocus
                                    autocomplete="visceralFat">
                            </div>

                        </div>
            </div>
            
            <!-- início de TestesFísicos -->
            <div v-if='TestesFísicos'>
                        <h3>
                            Testes Físicos
                        </h3>
                        <div class="inputs">
            
                            <div>
                                <span>Flexão de braço</span>
                                <input type="text" id="flexaoBraco" v-model="flexaoBraco" autofocus
                                    autocomplete="flexaoBraco">
                            </div>
                            <div>
                                <span>Abdominal</span>
                                <input type="text" id="flexaoAbdominal" v-model="flexaoAbdominal" autofocus
                                    autocomplete="flexaoAbdominal">
                            </div>

                        </div>
            </div>
            <!-- Início de AvaliacaoPostural --> 
            <div v-if='AvaliacaoPostural'>
                        <h3>
                            Postura
                        </h3>
                        <div class="inputs">
            
                            <div>
                                <span>Observações</span>
                                <textarea type="text" id="posturaObs" v-model="posturaObs" autofocus></textarea>
                                
                            </div>

                        </div>

            </div>
                        <br>
                    </form>
                                  

                                </div>


                              </form>




                  </div>

                  </div>
              </div>
          </div>
    </div>
<div class="float zoom" v-if='menuFloat'>
        <div class="menu-float zoomOut" >

            <div>
                <div class='conec'>

                    <div>
                      <div v-if="selectedTraining">
                        <h4>Avaliação: {{ selectedTraining.date.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3-$2-$1') }}</h4>
                        <!-- <span>Criada: {{ creationDate }}</span> -->
                      </div>

                    </div>

                    <div class='conec-in' v-if="selectedTraining.date || selectedTraining._id">

                        <div v-if="addCloseTrainning" class="new-user" @click="submitAtualizacao()">
                            <Icon name='material-symbols:source-notes-outline-rounded' /> Atualizar Avaliação
                        </div>
                        <div v-else='addCloseTrainning' class="new-user" @click="newTrainning">
                            <Icon name='material-symbols:cancel-rounded' /> Fechar
                        </div>
                        <div class="new-user" @click="notifCancel()">
                            <Icon name='charm:notes-cross' /> Deletar Avaliação
                        </div>

                    <div>
                        <Icon @click="coachFloat"  name='material-symbols:close-rounded' />
                    </div>
                </div>
                </div>
                <div class="line-f"></div>
                                              <form @submit.prevent="handleSubmit">

                                <div>
                                    <div class='plus-serie-title'>
                                      <h3 @click='setAntopometria' class='title' :class='{active: Antropometria }'>Antropometria</h3>
                                  <h3 @click='setComposicaoCorporal' class='title' :class='{active: ComposicaoCorporal}' >Composição Corporal</h3>
                                  <h3 @click='setBioimpedancia' class='title' :class='{active : Bioimpedancia}'>Bioimpedância</h3>
                                  <h3 @click='setTesteFisico' class='title' :class='{active: TestesFísicos}'>Testes Físicos</h3>
                                  <h3 @click='setAvaliacaoPostural' class='title' :class='{active: AvaliacaoPostural}'>Avaliação Postural</h3>
                                  
                                    </div>
<form v-if="selectedTraining" class='form-div' @submit.prevent="submitAvaliacao">
  <div  v-if='Antropometria'>
                        <!-- Nome e sobrenome -->
                        <h3>
                            Dados pessoais
                        </h3>
                        <div class="inputs">

                            <div>
                                <span>Dia da Avaliação</span>
                                <input type="date" id="name" v-model="selectedTraining.date" autofocus required
                                    autocomplete="data" disabled>
                            </div>
                            <div>
                                <span>Nascimento</span>
                                <input v-model="selectedTraining.nascimento" type="date" placeholder="Data de Nascimento">

                            </div>
                            <div>
                                <span>Idade</span>
                                <input type="text" id="idade" v-model="selectedTraining.idade" autofocus
                                    autocomplete="idade">
                            </div>
                            <div>
                                <span>Massa</span>
                                <input type="text" id="massa" v-model="selectedTraining.massa" autofocus
                                    autocomplete="massa">
                            </div>
                            <div>
                                <span>Altura</span>
                                <input type="text" id="altura" v-model="selectedTraining.altura" autofocus
                                    autocomplete="altura">
                            </div>
                            <div>
                                <span>Gênero</span>
                                    <select
                                        name="sexo"
                                        id="sexo"
                                        class="select"
                                        placeholder=""
                                
                                        v-model="selectedTraining.sexo"
                                    >
                                        <option disabled value="">
                                            Selecione uma opção
                                        </option>
                                        <option value="feminino">Feminino</option>
                                        <option value="masculino">Masculino</option>
                                    </select>
                            </div>

                        </div>
                        <br>
                        <h3>
                            Circunferência
                        </h3>
                        <div class="inputs">
                            <div>
                                <span>Pescoço</span>
                                <input type="text" id="pescoco" v-model="selectedTraining.pescoco" autofocus
                                    autocomplete="pescoco">
                            </div>
                            <div>
                                <span>Ombro</span>
                                <input type="text" id="ombro" v-model="selectedTraining.ombro" autofocus
                                    autocomplete="ombro">
                            </div>
                            <div>
                                <span>Tórax</span>
                                <input type="text" id="torax" v-model="selectedTraining.torax" autofocus
                                    autocomplete="torax">
                            </div>
                            <div>
                                <span>Tórax relaxado</span>
                                <input type="text" id="toraxRelaxado" v-model="selectedTraining.toraxRelaxado" autofocus
                                    autocomplete="toraxRelaxado">
                            </div>
                            <div>
                                <span>Tórax contraído</span>
                                <input type="text" id="toraxContraido" v-model="selectedTraining.toraxContraido" autofocus
                                    autocomplete="toraxContraido">
                            </div>
                            <div>
                                <span>Cintura</span>
                                <input type="text" id="cintura" v-model="selectedTraining.cintura" autofocus
                                    autocomplete="cintura">
                            </div>
                            <div>
                                <span>Abdômen</span>
                                <input type="text" id="abdomem" v-model="selectedTraining.abdomem" autofocus
                                    autocomplete="abdomem">
                            </div>
                            <div>
                                <span>Quadril</span>
                                <input type="text" id="quadril" v-model="selectedTraining.quadril" autofocus
                                    autocomplete="quadril">
                            </div>

                        </div>
                        <br>
                        <h4>
                            Lado Direito
                        </h4>
                        <div class="inputs">
                            <div>
                                <span>Braço Direito Relaxado</span>
                                <input type="text" id="bracoDireitoRelaxado" v-model="selectedTraining.bracoDireitoRelaxado" autofocus
                                    autocomPescoçoPescoçoplete="bracoDireitoRelaxado">
                            </div>
                            <div>
                                <span>Braço Direito Contraído</span>
                                <input type="text" id="bracoDireitoContraido" v-model="selectedTraining.bracoDireitoContraido" autofocus
                                    autocomplete="bracoDireitoContraido">
                            </div>
                            <div>
                                <span>Antebraço Direito</span>
                                <input type="text" id="antebracoDireito" v-model="selectedTraining.antebracoDireito" autofocus
                                    autocomplete="antebracoDireito">
                            </div>
                            <div>
                                <span>Coxa Medial Direita</span>
                                <input type="text" id="coxaMedialDireita" v-model="selectedTraining.coxaMedialDireita" autofocus
                                    autocomplete="coxaMedialDireita">
                            </div>
                            <div>
                                <span>Coxa Distal Direita</span>
                                <input type="text" id="coxaDistalDireita" v-model="selectedTraining.coxaDistalDireita" autofocus
                                    autocomplete="coxaDistalDireita">
                            </div>
                            <div>
                                <span>Perna Direita</span>
                                <input type="text" id="pernaDireita" v-model="selectedTraining.pernaDireita" autofocus
                                    autocomplete="pernaDireita">
                            </div>

                        </div>
                        <br>
                        <h4>
                            Lado Esquerdo
                        </h4>
                        <div class="inputs">
                            <div>
                                <span>Braço Esquerdo Relaxado</span>
                                <input type="text" id="bracoEsquerdoRelaxado" v-model="selectedTraining.bracoEsquerdoRelaxado" autofocus
                                autocomPescoçoPescoçoplete="bracoEsquerdoRelaxado">
                            </div>
                            <div>
                                <span>Braço Esquerdo Contraído</span>
                                <input type="text" id="bracoEsquerdoContraido" v-model="selectedTraining.bracoEsquerdoContraido" autofocus
                                autocomplete="bracoEsquerdoContraido">
                            </div>
                            <div>
                                <span>Antebraço Esquerdo</span>
                                <input type="text" id="antebracoEsquerdo" v-model="selectedTraining.antebracoEsquerdo" autofocus
                                autocomplete="antebracoEsquerdo">
                            </div>
                            <div>
                                <span>Coxa Medial Esquerda</span>
                                <input type="text" id="coxaMedialEsquerda" v-model="selectedTraining.coxaMedialEsquerda" autofocus
                                autocomplete="coxaMedialEsquerda">
                            </div>
                            <div>
                                <span>Coxa Distal Esquerda</span>
                                <input type="text" id="coxaDistalEsquerda" v-model="selectedTraining.coxaDistalEsquerda" autofocus
                                autocomplete="coxaDistalEsquerda">
                            </div>
                            <div>
                                <span>Perna Esquerda</span>
                                <input type="text" id="pernaEsquerda" v-model="selectedTraining.pernaEsquerda" autofocus
                                autocomplete="pernaEsquerda">
                            </div>

                        </div>
                </div>
                        <br>
                        <div v-if='ComposicaoCorporal'>
                        <h3>
                            Dobras Cutâneas
                        </h3>
                        <div class="inputs">
                            <div>
                                <span>Tórax</span>
                                <input type="text" id="dtorax" v-model="selectedTraining.dtorax" autofocus
                                    autocomplete="dtorax">
                            </div>
                            <div>
                                <span>Tríceps</span>
                                <input type="text" id="tricipital" v-model="selectedTraining.tricipital" autofocus
                                    autocomplete="tricipital">
                            </div>
                            <div>
                                <span>Sub-Escapular</span>
                                <input type="text" id="subEscapular" v-model="selectedTraining.subEscapular" autofocus
                                    autocomplete="subEscapular">
                            </div>
                            <div>
                                <span>Axilar média</span>
                                <input type="text" id="axilarMedia" v-model="selectedTraining.axilarMedia" autofocus
                                    autocomplete="axilarMedia">
                            </div>
                            <div>
                                <span>Abdômen</span>
                                <input type="text" id="abdominal" v-model="selectedTraining.abdominal" autofocus
                                    autocomplete="abdominal">
                            </div>
                            <div>
                                <span>Supra-Espinhal</span>
                                <input type="text" id="supraEspinhal" v-model="selectedTraining.supraEspinhal" autofocus
                                    autocomplete="supraEspinhal">
                            </div>
                            <div>
                                <span>Coxa</span>
                                <input type="text" id="coxa" v-model="selectedTraining.coxa" autofocus
                                    autocomplete="coxa">
                            </div>
                            <div>
                                <span>Perna</span>
                                <input type="text" id="perna" v-model="selectedTraining.perna" autofocus
                                    autocomplete="perna">
                            </div>

                        </div>
                        <h3>
                            Diâmetro Ósseo
                        </h3>
                        <div class="inputs">
                            <div>
                                <span>Umero</span>
                                <input type="text" id="umero" v-model="selectedTraining.umero" autofocus
                                    autocomplete="umero">
                            </div>
                            <div>
                                <span>Punho</span>
                                <input type="text" id="punho" v-model="selectedTraining.punho" autofocus
                                    autocomplete="punho">
                            </div>
                            <div>
                                <span>Fêmur</span>
                                <input type="text" id="femur" v-model="selectedTraining.femur" autofocus
                                    autocomplete="femur">
                            </div>
                            <div>
                                <span>Tornozelo</span>
                                <input type="text" id="tornozelo" v-model="selectedTraining.tornozelo" autofocus
                                    autocomplete="tornozelo">
                            </div>

                        </div>
            </div>
            <!-- Fim de ComposicaoCorporal -->

            <div v-if='Bioimpedancia'>
                        <h3>
                            Bio-Impedância
                        </h3>
                        <div class="inputs">
                            <div>
                                <span>BMI</span>
                                <input type="text" id="bmi" v-model="selectedTraining.bmi" autofocus
                                    autocomplete="bmi">
                            </div>
                            <div>
                                <span>FAT</span>
                                <input type="text" id="fat" v-model="selectedTraining.fat" autofocus
                                    autocomplete="fat">
                            </div>
                            <div>
                                <span>MUSCLE</span>
                                <input type="text" id="muscle" v-model="selectedTraining.muscle" autofocus
                                    autocomplete="muscle">
                            </div>
                            <div>
                                <span>Basal Metabolism</span>
                                <input type="text" id="rm" v-model="selectedTraining.rm" autofocus
                                    autocomplete="rm">
                            </div>
                            <div>
                                <span>Body Age</span>
                                <input type="text" id="bodyAge" v-model="selectedTraining.bodyAge" autofocus
                                    autocomplete="bodyAge">
                            </div>
                            <div>
                                <span>Visceral Fat</span>
                                <input type="text" id="visceralFat" v-model="selectedTraining.visceralFat" autofocus
                                    autocomplete="visceralFat">
                            </div>

                        </div>
            </div>
            
            <!-- início de TestesFísicos -->
            <div v-if='TestesFísicos'>
                        <h3>
                            Testes Físicos
                        </h3>
                        <div class="inputs">
            
                            <div>
                                <span>Flexão de braço</span>
                                <input type="text" id="flexaoBraco" v-model="selectedTraining.flexaoBraco" autofocus
                                    autocomplete="flexaoBraco">
                            </div>
                            <div>
                                <span>Abdominal</span>
                                <input type="text" id="flexaoAbdominal" v-model="selectedTraining.flexaoAbdominal" autofocus
                                    autocomplete="flexaoAbdominal">
                            </div>

                        </div>
            </div>
            <!-- Início de AvaliacaoPostural --> 
            <div v-if='AvaliacaoPostural'>
                        <h3>
                            Postura
                        </h3>
                        <div class="inputs">
            
                            <div>
                                <span>Observações</span>
                                <textarea type="text" id="posturaObs" v-model="selectedTraining.posturaObs" autofocus></textarea>
                                
                            </div>

                        </div>

            </div>
                        <br>
                    </form>
                                  

                                </div>


                              </form>



        </div>

        </div>
    </div>
    <div v-if='notific'>
            <div class="notific-float zoomOut" >
                <div>
                    <Icon name='material-symbols:check-circle-outline-rounded' /> Avaliação criada com sucesso!
                </div>
                <div>
                    <Icon name='material-symbols:close-rounded' @click='closeNotific' style="color: red; zoom:1.2"/>
                </div>
    
            </div>
    </div>
    <div v-if='notificDel'>
            <div class="notific-float zoomOut" >
                <div>
                    <Icon name='material-symbols:check-circle-outline-rounded' /> Avaliação deletada com sucesso!
                </div>
                <div>
                    <Icon name='material-symbols:close-rounded' @click='closeNotific' style="color: red; zoom:1.2"/>
                </div>
    
            </div>
    </div>
<div v-if='notificAtu'>
            <div class="notific-float zoomOut" >
                <div>
                    <Icon name='material-symbols:check-circle-outline-rounded' /> Avaliação Atualizada com sucesso!
                </div>
                <div>
                    <Icon name='material-symbols:close-rounded' @click='closeNotific' style="color: red; zoom:1.2"/>
                </div>
    
            </div>
    </div>
<div v-if='notificErr'>
            <div class="notific-float zoomOut" >
                <div>
                    <Icon name='tdesign:error-circle' style="color: red; zoom:1.2"/> Erro ao atualizar a avaliação!
                </div>
                <div>
                    <Icon name='material-symbols:close-rounded' @click='closeNotific' style="color: red; zoom:1.2"/>
                </div>
    
            </div>
    </div>
<div @click.self='notifCancel' v-if='notificConDel' class="float">
                <div class="notific-floatt zoomOut">
                    <div>
                        <Icon name='tdesign:error-circle' style="color: red; zoom:2.2" />
                    </div>
                    <div>
                        <div>
                            <h3>
                                Deletar avaliação
                            </h3>
                            <p>
                                Tem certeza que deseja deletar esta avaliação?
                            </p>
                        </div>
                        <div>
                            <button @click='deleteAvaliacao()' class="pill-can ex">Deletar</button>
                            <button @click="notifCancel()" class="pill-can can">Cancelar</button>
                        </div>
                    </div>

                </div>
            </div>
 
    <div v-if='notificTwo' class='float'>
        <div class="notific-float-two zoomOut" >
            <div>
                    <Icon name='material-symbols:close-rounded' @click='closeNotific' style="color: red; zoom:1.2"/> Por favor, selecione uma série!
                </div>            
            </div>
        </div>
        <div v-if='notificTree' class="float">
                <div class="notific-floatt zoomOut" >
                    <div>
                        <Icon name='uil:exclamation-circle' @click='closeNotific' style="color: red; zoom:2.2"/>
                    </div>
                    <div>
                        <div>
                            <h3>
                                Apagar Séries
                            </h3>
                            <p>
                                Tem certeza que deseja apagar todas as séries?
                            </p>
                        </div>
                        <div>   
                            <button @click='notifConfirm()' class="pill-can ex">Apagar</button>
                            <button @click="notifCancel()" class="pill-can can">Cancelar</button>
                        </div>
                    </div>
        
                </div>
        </div>
        
</template>
<style scoped>
*{
  font-family: "ubuntu";
}
.ex-a {
      position: fixed;
    left: 0px;
    bottom: 0;
    z-index: 100;
    background: #00dc8240;
    border-radius: 8px;
    border: solid .5px #00dc8280;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    font-size: .8rem;
}

.dark-mode .ex-a {
      color: #fff;
    background: #0f172a;
}

.ex-a div {
  padding: 2px 6px;
}

.ex-a d:hover {
  background: #00dc8280;
}

.photo {
    position: absolute;
    top: 96px;
    height: 25px;
    border-radius: 50%;
}

.photo .icon {
    color: #00dc82;
    zoom:1;
}

.logo {
  position: relative;
  display: flex;
  align-items: center;
}

.float-ex{
    position: fixed;
      top: 67%;
      left: 61%;
      transform: translate(0%, -50%);
      z-index: 1002;
      color: #333; /* Cor do texto */
      width:40%; /* Largura fixa */
      height: 76vh; /* Altura fixa */
      padding: 20px 0 20px 20px; /* Espaçamento interno */
      text-align: center;
}


.floating-div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #f1fef9;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
}

.dark-mode .floating-div{
  background: #111827;
}

.alt-image {
    height: 300px;
    border-radius: 200px;
    width: 300px;
    margin: 10px;
    background: #00dc8220;
  }

 .floating-div img {
  width: 300px;
  border-radius: 200px;
  height: 300px;
  display: block;
  margin: 10px auto;
  object-fit: cover; /* Preenche o contêiner sem deformar */
}

.floating-div button {
    margin: 5px;
    padding: 8px 12px;
    border-radius: 8px;
  border: none;
  cursor: pointer;
}

.floating-div button:first-child {
  background: green;
  color: white;
}

.floating-div button:last-child {
  background: red;
  color: white;
}

.floating-div button:disabled {
  background: gray;
  cursor: not-allowed;
}
/* Esconde o input de arquivo */
input[type="file"] {
  display: none;
}

/* Estiliza o botão substituto */
.custom-file-upload {
    display: inline-block;
    padding: 10px 20px;
    background: linear-gradient(90deg, #00dc82 0%, #00d4ff 35%, #04be7a 100%);
    color: white;
    border-radius: 200px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    transition: background-color 0.3s ease;
    margin-top: 25px;
    height: 98px;
    width: 98px;
}

.custom-file-upload:hover {
  background-color: #0056b3;
}

.search-bar-container {
  position: relative;
  width: 100%;
  max-width: 400px;
}

.search-input {
  width: 35%;
  padding: 8px;
  border-radius: 4px;
}

.dropdown-list {
  overflow-y: auto;
  height: 250px;
  position: absolute;
  top: 104%;
  left: 0;
  right: 65%;
  background: #f1fef9;
  font-size: .9rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  margin: 0;
  padding: 0;
  list-style: none;
}

.dark-mode .dropdown-list {
    background: #0f172a;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 2px 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.plus-serie-title {
    display: flex;
    flex-direction: row;
    align-items: strech;
    justify-content: space-between;
}

.dropdown-item:hover {
  background: #00dc8230;
}


.user-avatar-zoom {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 8px;
}

.image-container {
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  display: inline-block;
  overflow: hidden;
}

.image-container img {
   width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover; /* Preenche o contêiner sem deformar */
  margin-right: 0px;
  transition: transform 0.3s ease-in-out;
}

.image-container.zoomed img {
  zoom: 5;
}

li:hover img {
    zoom:3;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: bold;
}

.user-username {
  color: #888;
  font-size: 0.85em;
}

.selected-users {
  margin-top: 16px;
}

.selected-users h3 {
  margin-bottom: 8px;
  font-size: 1.2em;
}

.selected-user-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}
.series-container {
  display: flex;
  gap: .5rem;
}
.series-container h4{
  display: flex;
  gap: .5rem;
  flex-direction: row;
  align-items: strech;
  justify-content: space-between;
  margin-bottom: .5rem;
}


.content {
    overflow: auto; /* Barra de rolagem apenas na vertical */
    border-radius: 8px;
    /* Estilo para esconder visualmente a barra */
    scrollbar-width: thin; /* Firefox: deixa a barra fina */
    scrollbar-color: #eee transparent; /* Firefox: cor invisível */
}

.content-two {
    overflow: auto; /* Barra de rolagem apenas na vertical */
    border-radius: 8px;
    padding: 2rem .9rem;
    /* Estilo para esconder visualmente a barra */
    scrollbar-width: thin; /* Firefox: deixa a barra fina */
    scrollbar-color: #eee transparent; /* Firefox: cor invisível */
}


.series-column {
  border-radius: 8px;
  border: .1px solid #00dc8230;
  padding: .5rem;
  width: 1000px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.series-column h4 {
  margin-top: 0;
}

.series-column ul {
  padding: 0;
  list-style: none;
}
.float{
    position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 102;
      background: #ecedf060;
      backdrop-filter: blur(1px); /* Desfoque do fundo */
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* Sombras (opcional) */
      color: #333; /* Cor do texto */
      width: 100%; /* Largura fixa */
      height: 100vh; /* Altura fixa */
      padding: 20px; /* Espaçamento interno */
      text-align: center;
}


.conec {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin:5px;
    overflow: auto;
}
.conec div {
  display: flex;
  flex-direction: row;
}

.conec-in .new-user {
  margin: 0 10px;
}

.conec div button {
    margin: 0 5px;
    cursor: pointer;
    border-bottom: solid 3px #00d4ff;
    padding: 6px 16px;
}

.title {
    margin:.3rem .2rem .5rem .2rem;
}

label {
    font-weight: bolder;
}

.plus {
    margin:0rem;
}
.conec div button:hover {
    opacity: .8;
}

.conec span {
    font-size: .85rem;
}

.conec:nth-child(1  ) .icon:hover {
    background: #00dc8240;
}
.menu-float {
    background: #f1fef9;
    width: 95%; /* Largura fixa */
      height: 95%; /* Altura fixa */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: relative; /* Fixa a div em relação à tela */
    top: 50%; /* Posiciona a div no meio da altura */
    left: 50%; /* Posiciona a div no meio da largura */
    transform: translate(
        -50%,
        -50%
    ); /* Centraliza ajustando a posição do elemento */
    z-index: 1; /* Garante que esteja acima de todo o conteúdo */
    color: #777;
    padding:20px; /* Espaço interno */
    border-radius: 10px; /* Cantos arredondados (opcional) */
    text-align: left; /* Alinha o texto centralizado */
    backdrop-filter: blur(10px); /* Desfoque do fundo */
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* Sombras (opcional) */
      display: flex;
      flex-direction: column;
      justify-content: space-between;
     
}
.menu-float h3 {
  color: var(--player-color);
  font-size: 1.2rem;
}

.menu-float h4{
  color: #000;
  font-size: 1rem;
}
.dark-mode .menu-float h4 {
  color: #fff;
}
.menu-float span {
  font-size: .9rem;
}
.menu-float-ex {
    background: #f1fef9;
    width: 95%; /* Largura fixa */
      height: 95%; /* Altura fixa */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: relative; /* Fixa a div em relação à tela */
    top: 50%; /* Posiciona a div no meio da altura */
    left: 50%; /* Posiciona a div no meio da largura */
    transform: translate(
        -50%,
        -50%
    ); /* Centraliza ajustando a posição do elemento */
    z-index: 1; /* Garante que esteja acima de todo o conteúdo */
    color: #777;
    padding: 5px; /* Espaço interno */
    border-radius: 10px; /* Cantos arredondados (opcional) */
    text-align: left; /* Alinha o texto centralizado */
    backdrop-filter: blur(10px); /* Desfoque do fundo */
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* Sombras (opcional) */
      display: flex;
      flex-direction: column;
      justify-content: space-between;
     
}


.dark-mode .menu-float-ex {
      color: #fff;
    background: #0f172a;
}


.notific-float {
    background: #f1fef9;
        width: 27%; /* Largura */
        height: 8%; /* Altura */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        position: fixed; /* Fixa a div em relação à tela */
        bottom: 2%; /* Posiciona no canto inferior */
        right: 2%; /* Posiciona no canto direito */
        z-index: 9999; /* Garante que esteja acima de todo o conteúdo */
        color: #777;
        padding: 10px; /* Espaço interno */
        border-radius: 10px; /* Cantos arredondados */
        text-align: left; /* Alinha o texto */
        backdrop-filter: blur(20px); /* Desfoque do fundo */
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* Sombras */
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        opacity: 0; /* Invisível no início */
        transform: scale(0.8); /* Começa menor */
        animation: zoomIn 0.5s ease-out forwards; /* Animação de entrada */
}
.notific-floatt {
    background: #f1fef9;
    width:576px; /* Largura fixa */
      height: 128px; /* Altura fixa */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: relative; /* Fixa a div em relação à tela */
    top: 50%; /* Posiciona a div no meio da altura */
    left: 50%; /* Posiciona a div no meio da largura */
    transform: translate(
        -50%,
        -50%
    ); /* Centraliza ajustando a posição do elemento */
    z-index: 9999; /* Garante que esteja acima de todo o conteúdo */
    color: #000;
    padding:20px; /* Espaço interno */
    border-radius: 10px; /* Cantos arredondados (opcional) */
    text-align: left; /* Alinha o texto centralizado */
    backdrop-filter: blur(10px); /* Desfoque do fundo */
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* Sombras (opcional) */
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
}
.dark-mode .notific-floatt {
    background-color: #0f172a;
    color: #fff;
}

.notific-floatt div {
    margin: 0px 15px 12px 15px;
}

.notific-floatt button{
    margin: 0 5px 0 0px;
}
.dark-mode .notific-floatt button{
    margin: 0 5px 0 0px;
    color: #fff;
}

.notific-float-two {
    background: #f1fef9;
    width: 21%; /* Largura fixa */
      height: 15%; /* Altura fixa */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: relative; /* Fixa a div em relação à tela */
    top: 50%; /* Posiciona a div no meio da altura */
    left: 50%; /* Posiciona a div no meio da largura */
    transform: translate(
        -50%,
        -50%
    ); /* Centraliza ajustando a posição do elemento */
    z-index: 9999; /* Garante que esteja acima de todo o conteúdo */
    color: #777;
    padding:20px; /* Espaço interno */
    border-radius: 10px; /* Cantos arredondados (opcional) */
    text-align: left; /* Alinha o texto centralizado */
    backdrop-filter: blur(10px); /* Desfoque do fundo */
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* Sombras (opcional) */
      display: flex;
      flex-direction: column;
      justify-content: center;
}
/* Animação para surgir do fundo */
@keyframes zoomIn {
    to {
        opacity: 1; /* Totalmente visível */
        transform: scale(1); /* Volta ao tamanho original */
    }
}

.notific-float .icon, .notific-float-two .icon {
    margin: -2px 5px 0 0;
    color: #00d4ff; zoom:1.1 
}

.horizontal-line {
  position: relative;
  width: 100%;           /* Largura total */
  height: 1px;           /* Espessura da linha */
  overflow: hidden;      /* Esconde o excesso da animação */
}

.horizontal-line::before {
  content: '';
  position: absolute;
  top: 0;
  width: 100%;
  height: 1px;
  background: #ff1900;
  animation: moveLine 7s linear; /* Animação de 15 segundos */
}

.blue {
  display: flex;
  align-items: center;
  justify-content: center;
    width: 230px;
    height: 120px;
    border-radius: 8px;
    cursor: pointer;
    background: #00d4ff;
    color: #000;
}

.blue:hover {
    opacity: .8;
}

.dark-mode .menu-float {
    color:#fff;
    background: #0f172a;
}

.menu-float h4 {
    text-transform: uppercase;
}

.menu-float .menu-button {
    margin: 5px 0 0 0;
}

      /* Container do botão */
      .switch {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
}

/* Oculta o checkbox padrão */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* Slider (parte deslizante do botão) */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 20px;
}

/* Círculo dentro do slider */
.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

/* Efeito ligado (quando o checkbox está marcado) */
input:checked + .slider {
  background-color: #00dc82;
}

input:checked + .slider:before {
  transform: translateX(16px);

}

.line {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: stretch;
    margin: 20px 1%;
    margin: 20px 1%;
    padding: 10px 0 20px 0;
    border-bottom: solid 1px #00dc8230;
}
.line-two {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: stretch;
}

.line-f {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: stretch;
    margin:10px 0 0 0;
    border-bottom: solid 1px #00dc8230;
}

.line-columns {
    display: grid;
    grid-template-columns: .6fr 1fr; /* Barra fixa e conteúdo */
    

}

.bor {
    border-left: solid 1px #00dc8240;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    flex-direction: column;
}

.bor-two {
    border-left: solid 1px #00dc8240;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    flex-direction: column;
    width: 100%;
    height: 420px;
}

.theme-switch {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: .5rem;
  margin: 10px;
}
.theme-switch-two {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: .5rem;
  margin: 15px;
  
}

.theme-switch-two h3{
  text-align: left;
}

.theme-switch-two-ex {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: .5rem;
  margin: -15px 4px 0 4px;
  
}

/* Container principal */
.exercise-list-container-ex {
  margin: 20px auto;
  padding: 10px 0;
  width: 100%;
  border-radius: 8px;
  background-color: #f1fef9;
  height: 260px;  
  color: #555;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.dark-mode .exercise-list-container-ex {
      color: #fff;
    background: #0f172a;
}

.exercise-list-container {
  margin: 20px auto;
  padding: 10px 0;
  width: 100%;
  border-radius: 8px;
  background-color: #f1fef9;
  height: 330px;  
  color: #555;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.dark-mode .exercise-list-container {
  background-color: #111827;
  color: #fff;
}

/* Título */
.exercise-list-title {
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
  color: #555;
}


.dark-mode .exercise-list-title {
  background-color: #111827;
  color: #fff;
}

/* Tabela */
.exercise-table {
  width: 100%;
  height: 330px;
  border-collapse: collapse;
  background-color: #f1fef9;
}


.dark-mode .exercise-table {
  background-color: #111827;
  color: #fff;
}

.exercise-table-header {
  background-color: #00dc8220;
}

.exercise-table-row:nth-child(even) .exercise-table-cell {
  background-color: #00dc8220;
}

.exercise-table-row:hover .exercise-table-cell {
  background-color: #00dc8240;
}

.exercise-table-cell,
.exercise-table-cell-header {
  padding: 12px 15px;
  text-align: left;
}

.exercise-table-cell-header {
  font-weight: bold;
  color: #555;
}


.dark-mode .exercise-table-cell-header {
  color: #fff;
}

/* Imagem */
.exercise-image {
  width: 50px;
  height: 50px;
  border-radius: 4px;
  object-fit: cover;
}

.exercise-list {
    height: 330px;
    width: 100%;
    overflow-y: auto;
}

.tr {
  border: solid .1px #00dc8250;
  padding: 50px;
  border-radius: 8px;
  cursor: pointer;
}

.tr-two {
  border: solid .1px #00dc8220;
  padding: 15px 40px;
  border-radius: 8px;
  cursor: pointer;
}
.tr-two-ex {
  border: solid .1px #00dc8220;
  padding: 5px 20px;
  border-radius: 8px;
  cursor: pointer;
}

.tr:hover {
    background: #00dc8210;
}

.theme-switch:not(:last-child) {
    padding-bottom: 10px;
    border-bottom: solid 1px #00dc8240;
}

.theme-switch .icon {
    margin-top:-3p
}

.radio-input {
  display: none;
}

.pill {
  padding: 0.3rem .7rem;
  font-size: 1rem;
  border: 2px solid #ccc;
  border-radius: 8px;
  background: #ddd;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.radio-input:checked + .pill {
  background-color: #00dc82;
  border-color: #00d4ff50;
  color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.pill:hover {
  background-color: #04be7a ;
  color:#fff;
}
.layout-no-sidebar {
  display: grid;
  grid-template-rows: auto 1fr; /* Barra fixa e conteúdo */
  overflow:auto;
}

.topbar {
  color: white;
  height: 60px;
  text-align: center;
  position: sticky;
  top: 0;
  border-bottom: solid .1px #00dc8230;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  backdrop-filter: blur(85px);
  z-index: 1; /* Garante que a barra fique visível acima do conteúdo */
}
.topbar div{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
}

.topbar h3 {
    margin-left: 2rem;
}
.topbar h4 {
    color: #777;
    margin-left: .2rem;
    padding: 4px 6px;
    border-radius: 8px;
    background: #00dc8280;
    color: #fff;
}

.dark-mode .topbar h4 {
    color: #fff;
}


.add-client-max, .edit-client-max {
    display:none;
}

@media (max-width: 650px) {
    .none {
        display: none;
    }

    .add-client-mini, .edit-client-mini {
        display: none;
    }

        .add-client-max, .edit-client-max {
            display: inherit;
        }
}

.lost h5 {
    font-size: .6rem;
}
.inputs {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    font-weight: bolder;
    font-size: 14px;
}

.inputs div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: flex-start;
    margin: 0rem;
}

.inputs #masculino.check,
.inputs #feminino.check {
    text-decoration: underline;
    margin: -15px -94px;
    height: 15px;
    cursor: pointer;
}

.inputs .radio {
    margin: 30px 0px 15px 0px;
}


.inputs .terms {
    text-decoration: underline;
    color: #00dc82;
    height: 15px;
    cursor: pointer;
}

.inputs #terms.check {
    text-decoration: underline;
    margin: 10px -64px;
    height: 15px;
    cursor: pointer;
}

.dont-user {
    position: fixed;
    top: 10px;
    right: 10px;
    width: 200px;
    background-color: #ff1900;
    color: #fff;
    text-shadow: 2px 2px 2px #111;
    z-index: 20;
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;
    border-radius: 5px;
    font-weight: bolder;
    padding: 8px 0px;
}

input {
    text-align: left;
    width:192px;
    font-weight: 600;
    height: 34px;
    font-size: 15px;
    padding: 5px 8px;
    color:#555;
    border: 0 none;
border: solid 2px var(--player-color);
    margin: 5px 5px 0 0;
    border-radius: 3px;
transition: all .4s linear;

}

.td-one {
    width:70px;
}
.td-two {
    width:26    0px;
}


.cr-fix {
    position: sticky; /* Fixa a posição relativa ao elemento pai (.menu) */
    top: -20px;
    padding: 5px;
    border-radius: 6px;
    backdrop-filter: blur(15px);
}

button {
    background: #00d4ff;
    border: solid 1px #00d4ff;
    border-radius: 4px;
    padding: 7px 10px;
}

textarea {
    border: solid 2px #00dc82;
    text-align: left;
    width: 500px;
    font-weight: 600;
    border-radius: 8px;
    height: 120px;
    font-size: 14px;
    color:#555;

}
textarea:focus {
    border: solid 2px #00dc82;
    outline: 0;
    padding: 5px;
    color: #555;
    background: #00dc8270;
}
.dark-mode textarea:focus {
    color: #fff;
}
textarea:active {
    border: solid 2px #00dc82;

}

textarea:focus-visible {
    border: solid 2px #00dc82;
}


.p{
        box-shadow: 0 1px 7px rgba(0, 0, 0, 0.3);
}
.ex{
    background: red;
    color: #fff;
}
.ex:hover{
    background: red;
    opacity:.9;
    color: #fff;
}
.sw-icon {
    margin-right: -40px;
    z-index:100;
}
.sw-tx {
    margin-right: -109px;
    z-index:100;
    font-weight: bolder;
    color: #aaa;
}
.sw-i-tx {
    padding: 2px 100px;
    margin-top:6px;
}
.sw-i-txx {
    padding: 2px 10px;
    margin-top:6px;
}

.sw-i-txx::placeholder {
    color: #333;
}
.dark-mode .sw-i-txx::placeholder {
    color: #999;
}
.avatar {
    height: 60px;
    width: 60px;
    border-radius: 30px;
    background:#999;
    margin-right: 0px;
    margin-left: 0px;
    border: solid 3px #999;
}

.serie {
    overflow-y: auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap:2px;
}

.serie form input {
    width: 300px;
}
.serie form input:nth-child(3) {
    width: 295px;
}
.serie form input:nth-child(4) {
    width: 70px;
}
.serie form input:nth-child(5) {
    width: 225px;
}
.serie form input:nth-child(6) {
    width: 50px;
}
.serie form input:nth-child(7) {
    width: 220px;
}
.serie form input:nth-child(8) {
    width: 165px;
}

.bt-serie {
    padding: 10px 10px;
    margin:0 2px;
    background: #00d4ff;
    color: #333;
    border-radius: 6px;
}

.avatar-tx {
    border-radius: 30px;
    margin: 3px -48px;
    margin-left: -640px;
    color: #fff;
    z-index: 2;
}
.inputs #username {
    width: 190px
}

.inputs #lastName {
    width: 130px
}

.inputs #email {
    width: 335px
}

.inputs div h4 {
    text-align: left;
}

input:focus-visible {
    border: solid 1px #00dc82;
}
input:active {
    border-color: #00dc8280;
}
input:disabled {
  background-color: #fff;
}
input:hover {
    background-color: var(--player-color);
    color: #000;
}


input:focus {
    border: 0 none;
    border: solid 2px #00dc82;
    outline: 0;
    border-radius: 4px;
    color: #000;
}

img {
    height: 25px;
    border-radius: 50%;
}



h4 {
    margin: 00px;
    text-align: left;
    color: #999;
}


select {
    text-align: left;
    background-color: #fff;
    width:192px;
    font-weight: 600;
    height: 34px;
    font-size: 15px;
    padding: 5px 8px;
    color:#555;
    border: 0 none;
border: solid 2px var(--player-color);
    margin: 5px 5px 0 0;
    border-radius: 3px;
    transition: all .4s linear;
}

select:hover {
  background-color: var(--player-color);
    color: #000;
}

select::selection {
    border: solid 1px #00dc82;
    background: #00dc8240;
}

select:focus {
    border: solid 2px #00dc82;
}

.dark-mode .select:focus {
    border-color: #00dc82 ;
}

.select:focus-visible {
    background-color: #fff;
    border: solid 2px #00dc82;
}

.select:active {
    background-color: #fff;
}

.dark-mode select:active {
    background: #fff;
    border: solid 2px #00dc82;
}

.select:hover {
    background-color: var(player-color);
}

.create {
    border: solid 2px #00dc82;
    cursor: pointer;
    width: 140px;
    text-align: center;
    line-height: 18px;
    border-radius: 88px;
    font-weight: 600;
    height: 30px;
    font-size: 14px;
    padding-inline: 16px;
    padding-top: 6px;
    padding-bottom: 8px;
    margin: 1rem 1.5rem;
}

.lost h5 {
    font-size: .6rem;
}.create {
    padding: 6px 12px;
    border-radius: 8px;
    cursor: pointer;
    color:#00dc82;
    background-color: #00d4ff;
    border: none;
    opacity: .7;
}

.lost h5 {
    font-size: .6rem;
}

.create .icon {
    margin: -1px 0px 2px 4px;
}

.create:hover {
    opacity: 1;
}

.Doughnut {
    width: 320px;
    height: 320px;
}
.nav-top {
    position: sticky;
    top: 0px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
    z-index: 1;
    height: 40px;
    font-weight: bolder;
    border-bottom: .10px solid #00dc8240;
    backdrop-filter: blur(45px);
    border-bottom: solid 1px #00dc8240;
    border-right: solid 1px #00dc8240;
}


.clients {
    margin: 11px;
}

.upper {
    text-transform: Capitalize;
    color: #00dc82;
}


.clients span {
    border: 1px solid #00dc8290;
    padding: 3px 6px;
    border-radius: 4px;
    color: #00dc82;
    background-color: #00dc8230;
    margin-left: 3px;
}

.notifications {
    border: solid 1px transparent;
    padding: 4px 5px;
    margin: 6px;
    border-radius: 4px;
    cursor: pointer;
}

.notifications:hover {
    padding: 4px 5px;
    border-radius: 4px;
    color: #00dc82;
}

.users-list {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
    z-index: 1;
    margin-bottom: 1rem;
    overflow-y: auto;
    overflow-x: hidden;
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
    bottom: 6rem;
    right: 1.5rem;
    border-radius: 9px;
    cursor: pointer;
    z-index: 100;
    border: solid 1px #00dc8210;
    box-shadow: 0 0px 5px #00dc8240;
    backdrop-filter: blur(100px)
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
    bottom: 3.5rem;
    right: 1.5rem;
    border-radius: 9px;
    cursor: pointer;
    z-index: 100;
    border: solid 1px #00dc8210;
    box-shadow: 0 0px 5px #00dc8240;
    backdrop-filter: blur(100px)
}

.whats .icon,
.color .icon {
    color: #00dc8290;
    zoom: 1;
}
.subscriberOk {
    background-color: #00dc82;
    text-shadow: 2px 2px 2px #111;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px 20px 20px 20px;
    padding: 15px;
    border-radius: 4px;
    position: fixed;
    bottom: 10px;
    width: 80%;
    left: 50%;
    color: #fff;
    margin-left: -40%;
    font-weight: 900;
    border: solid 1px #00dc8210;
    z-index: 10000;
}
#customers {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

#customers th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #00dc8280;
font-weight: bolder;
}

#customers td,
#customers th {
    border: 1px solid #00dc8240;
    padding: 8px;
    color: white;
    font-weight: bolder;
}

#customers tr:nth-child(1) {
    background-color: #00dc8230;
    }
#customers tr:nth-child(2n) {
    background-color: #00dc8230;
    }

    #customers tr:hover {
        background-color: #00dc8250 ;
    }

input[type="radio"] {
  accent-color: #00dc82; /* Muda a cor do botão de rádio */
  transform: scale(1); /* Diminui o tamanho do botão de rádio */
  width: 15px; /* Ajusta a largura do botão de rádio */
  height: 15px; /* Ajusta a altura do botão de rádio */
}
.row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 1rem;
    position: sticky;
    top: 0px;
}

.row:nth-child(1) {
    position: sticky;
    top: 90px;
    font-size: 1.1rem;
    font-weight: bolder;
}

.header {
    font-weight: bold;
}

.cell {
    flex: 1;
    overflow: hidden;
    border-right: 1px solid #00dc8240;
}

.cell:nth-child(1) {
    flex: .17;
}



.cell:nth-child(2),
.cell:nth-child(3),
.cell:nth-child(4),
.cell:nth-child(6),
.cell:nth-child(7),
.cell:nth-child(8),
.cell:nth-child(9),
.cell:nth-child(10),
.cell:nth-child(11) {
    flex: 2;
}


.cell-two {
    flex: 1;
    overflow: hidden;
    border-right: 1px solid #00dc8240;
}

.cell-two:nth-child(1) {
    flex: 1;
}

.cell-two:nth-child(2),
.cell-two:nth-child(3),
.cell-two:nth-child(4),
.cell-two:nth-child(6),
.cell-two:nth-child(7),
.cell-two:nth-child(8),
.cell-two:nth-child(9),
.cell-two:nth-child(10) {
    flex: .4;
}

.cell-two:nth-child(10) {
    flex: .2;
}

.main {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
}

.nav-top {
    position: sticky;
    top: 0px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
    z-index: 1;
    height: 50px;
    font-weight: bolder;
    border-bottom: solid 1px #00dc8240;
    border-right: solid 1px #00dc8240;
    backdrop-filter: blur(45px);
}

.clients {
    margin: 11px;
}

.clients span {
    border: 1px solid #00dc8240;
    padding: 3px 6px;
    border-radius: 4px;
    color: #00dc82;
    background-color: #00dc8240;
    margin-left: 3px;
}

.add-client {
    border: solid 1px #00dc8290;
    background-color: #00dc82;
    padding: 5px 7px;
    margin: 5px;
    border-radius: 4px;
    cursor: pointer;
    color: #fff;
}

.add-client:hover {
    border: solid 1px #00dc8290 ;
    border-radius: 4px;
    color: #00dc82;
    background-color: #fff;
}

.edit-client {
    border: solid 1px #fadb4090;
    background-color: #fadb4080;
    padding: 5px 7px;
    margin: 1.5px 6px;
    border-radius: 4px;
    cursor: pointer;
    color: #fff;
}

.edit-client:hover {
    border: solid 1px #fadb4090 ;
    border-radius: 4px;
    color: #000;
    background-color: #fadb40;
}

.close-client {
    border: solid 1px #00dc82;
    background-color: #00dc82;
    padding: 5px 42px;
        margin: 1.5px 6px;
    border-radius: 4px;
    cursor: pointer;
    color: #fff;
}

.close-client:hover {
    border: solid 1px #00dc8290 ;
    border-radius: 4px;
    color: #00dc82;
    background-color: #fff;
}
.close-edit-client {
    border: solid 1px #fadb40;
    background-color: #fadb40;
    padding: 5px 42px;
        margin: 1.5px 6px;
    border-radius: 4px;
    cursor: pointer;
    color: #fff;
}

.close-edit-client:hover {
    border: solid 1px #00dc8290 ;
    border-radius: 4px;
    color: #00dc82;
    background-color: #fff;
}

.nav-users {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        align-items: flex-start;
        flex-wrap: wrap;
        width: 100%;
        z-index: 1;
        height: 46px;
        font-weight: bolder;
        backdrop-filter: blur(45px);
        margin-right: 1.5rem;
        border-bottom: solid .1px #00dc8230;
}

.users-conf .filter {
 color: #777;
}
.dark-mode .filter {
  color: #ddd;
}

.users-conf {
    margin: 6px 0;
    padding: 7px;
    border-radius: 6px;
}


.filter {
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 10px;
}

.filter:hover {
    color: #00dc82;
    background-color: #00dc8220;
}
.filter-two {
    padding: 8px 12px;
    border-radius: 8px;
    cursor: pointer;
    color: #000;
    background-color: #00d4ff;
}

.filter-two:hover {
    opacity: .8;
}

a {
  text-decoration: none
}

.nav-users a.router-link-exact-active {
  color: #00dc82;
}


.filter.router-link-exact-active {
    border-bottom: solid 2px #00dc8270;
    border-radius: 0;
}

.users-list {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    z-index: 1;
    width: 100%;
    overflow-y:auto;
}


.line-end {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: flex-start;
    margin:20px 1%;
    padding: 10px 0 20px 0;
}
.line p {
    margin-top: 5px;
}

.line select {
    margin-right: 2rem;
}

.thed {
    position: sticky;
    top: 90px;
}

.title-user {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    height: 120px;
    width: 120px;
    margin: 2px;
    border-radius: 4px;
    border: solid 2px #00dc8260;
    text-align: center;
}

.title-user:hover {
    background-color: #00dc8260;
    color: #fff;
}

.title-user img {
    width: 60px;
    background-color: #00dc8260;
    border: 3px solid #00dc82;
    border-radius: 4px;
}

.title-user h4 {
    text-align: center;
    font-size:.6rem;
    margin: 4px 1px 0px 1px;
}


.form-cliente {
    border-radius: 50%;
    border: solid 3px #00dc82;
}

.cliente {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    color: #00dc82;
}


.file-cliente {
    margin-top: -20px;
    margin-left: 20px;
    zoom: .8;
}



.close {
    zoom: 1.6;
}


.length-full {
    color: #fff;
}

.users-full h1 {
    font-size: 3rem;
    margin-bottom: -1rem;
}

.users-full-status {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
    color: #00dc82;
}

.green {
    color: #00ff00;
}

.red {
    color: #cf0000;
}

.users-full-status h1 {
    font-size: 1.3rem;
}

.users-full-status h2 {
    font-size: 1.2rem;
}


.center {
    display: flex;
    justify-content: space-evenly;
    flex-direction: row;
    align-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    padding-top: 5px;
    margin-bottom: 1rem;
}

.center-start{
    display: flex;
        justify-content: flex-start;
        flex-direction: row;
        align-content: flex-start;
        align-items: center;
        flex-wrap: nowrap;
        width: 100%;
        margin-bottom: 4rem;
}

@media (max-width: 650px) {
    .center-start-one {
        display: none;
    }
}
.center-start-one {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
}
.center-start-two {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    margin-top: -20px;
}
.center-start-tree {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    margin: -60px 0 -50px 10px;
}
.center-start-tree span{
    margin: 5px 0px -10px 12px;
    font-weight: bolder ;
}

.center-start div a {
    margin: 0 20px;
}

.center-start input {
    margin: 10px ;
}

.others {
    z-index: 1;
}

.table-clients {
    width: 100%;
    z-index: 1;
    margin-top: -2rem;
}

.others-full {
    z-index: 1;
    background-color: #00dc8250;
}

.others-details {
    margin: 0 .5%;
    z-index: 1;
    background-color: #00dc8230;
    border: solid 3px #00dc8240;
    border-radius: 3px;
}

.list {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
    height: 100%;
}


.head-logo {
    z-index: 1;
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
}

.logo {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    background: linear-gradient(90deg, #00dc82 0%, #00d4ff 35%, #04be7a 100%);
    height: 98px;
    width: 98px;
    color: #718096;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 50px;
    margin-left: 1rem;
    z-index: 10;
}

.logo img {
        height: 98px;
    width: 98px;
    border-radius: 50px;
    /* border: #00dc82 2px solid; */
    z-index: 100;
    margin-right: 1.2rem;
    padding: 4px;
    opacity: 1;
    -o-object-fit: cover;
    object-fit: cover;
}

.nav-bar {
    z-index: 200;
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
    height: calc(100% - 0px);
    width: 100%;
    background: linear-gradient(to bottom right, #00dc8290 0%, #00d4ff90 50%, #04be7a90 100%);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    z-index: 1134004;
}

.logo .nav-bar img{
    height: 300px;
    width: 300px;
    border-radius: 200px;
    border: #00dc82 2px solid;
    margin-right: 1.2rem;
    padding: 4px;
    opacity: 1;
}

.head-name {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: nowrap;
    width: 250px;
}

.head-name span {
    font-size: .9rem;
    margin: 5px 0 7px 0;
}

.head-name h3 {
    color: #00dc82;
    text-transform: uppercase;
}

.status {
    border: solid 2px #00dc8240;
    Background: #00e900;
    border-radius: 8px;
    padding: 1px 20px;
    color: #fff;;
}
.statusOff {
    border: solid 2px #00dc8240;
    Background: #e70000;
    border-radius: 8px;
    padding: 1px 20px;
    color: #fff;
}


table {
    overflow-y:auto;
}


/* Container da tabela */
.table-container {
    height: 280px;
    overflow-y:auto;
    margin: 0px;
    padding: 10px 0;
    background-color: #00dc8210;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    max-width: 990px;
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

.styled-table tr{
  border-radius: 90px;
}
.styled-table thead tr {
  border-radius: 2px;
  background-color: #00dc8290;
  border-bottom: 2px solid #00dc8290;
}

.styled-table tbody tr:nth-child(even) {
  background-color: #00dc8210;
}

.styled-table tbody tr:hover {
  background-color: #00dc8220;
}

.styled-table th {
  font-weight: bold;
  color: #d1d5db;
  color:#fff;
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
  background-color: #000;
  color: #fff;
  transition: background-color 0.2s;
}

button:hover {
    opacity: .8;
}

button:disabled {
  background-color: #666;
  cursor: not-allowed;
}


.conec div button {
    margin: 0 5px;
    cursor: pointer;
    padding: 9px 16px 5px 16px;
}
button {
    background: #00d4ff;
    border-radius: 4px;
    color: #000;
    padding: 7px 10px;
}

button:hover {
    opacity:.8;
}

.actionss {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;
    height:100%;
}

.conec div button {
    margin: 0 5px;
    cursor: pointer;
    padding: 4px 16px 0px 16px;
}


.title {
    margin:.3rem .2rem 1.5rem .2rem;
    color: #999;
    cursor: pointer;
    border-bottom: solid 2px transparent;
transition: all .4s linear;

}

.title:hover {
  cursor: pointer;
  color: #999;
  border-bottom: solid 2px #999;
}

.dark-mode .title:hover {
  color: #ccc;
  border-bottom: solid 2px #ccc;
}
.form-div {
  height: 445px;
  overflow-y: scroll;
}
.title.active {
  border-bottom: solid 2px var(--player-color);
  color: var(--player-color);
}
.title:focus.active{
  color: #000;
} 


label {
    font-weight: bolder;
}

.plus {
    margin:0 .3rem;
}
.conec div button:hover {
    opacity: .8;
}

.conec span {
    font-size: .85rem;
}

.conec .icon {
    zoom: 1;
    padding-right: 3px;
    border-radius: 6px;
}

table tbody tr td:nth-child(2){
    width: 0px;
    padding: 12px 0;
    margin:0;
}
table tbody tr td:nth-child(3){
    width: 200px;
    padding: 12px 5px;
    margin-left: 0;
}
table tbody tr td:nth-child(5){
    width: 150px;
}
.new-user {
  
}
</style>
