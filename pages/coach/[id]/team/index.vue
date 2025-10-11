<script setup>
import { ref, watch } from 'vue'
const route = useRoute();
useHead({
    titleTemplate: 'Team | app.leandrocesar.com',
});

const Users = await useFetch(`https://api.leandrocesar.com/usersnw/${route.params.id}/team`);
const item = Users.data.value;

const team = [...item] ;
console.log(team)

const newDate = ref();
const name = ref('');
const lastName = ref('');
const sex = ref('feminino');
const foto = ref('');
const birthday = ref('');
const whatsapp = ref('');
const service = ref('');
const target = ref('');
const email = ref('');
const username = ref('');
const password = ref('');
const day = ref('');
const time = ref('');
const payDay = ref('');
const periodEnd = newDate;
const terms = ref('');
const status = ref('');
const creationUser = ref('');
const _id = ref('');


const addCloseClient = ref(true);
const closeAddClient = ref(false);
const editCloseClient = ref(true);
const closeEditClient = ref(false);
const add = ref(true);
const updt = ref(true);

const state = useCookie('state')
const list = ref();
const switList = ref(state.value === 'list' || state.value === undefined)
const switBlock = ref(state.value === 'block');
const block = ref();

function switchButtonBlock() {
    switBlock.value = true;
    switList.value = false;
    state.value = 'block';
}

function switchButtonList() {
    switBlock.value = false;
    switList.value = true;
    state.value = 'list';
}

function addClient() {
    add.value = false;
    addCloseClient.value = false;
    closeAddClient.value = true;
    switBlock.value = false;
    switList.value = false;
    block.value = true;
    state.value = 'block';
}

function closeClient() {
    add.value = true;
    addCloseClient.value = true;
    closeAddClient.value = false;
    switBlock.value = true;
    switList.value = false;
    block.value = false;
    state.value = 'list';
}

function editClient() {
    updt.value = true;
    add.value = false;
    addCloseClient.value = false;
    closeAddClient.value = false;
    switBlock.value = false;
    switList.value = false;
    block.value = false;
    editCloseClient.value = false;
    closeEditClient.value = true;
    state.value = 'edit';
}

function cEditClient() {
    add.value = false;
    addCloseClient.value = true;
    closeAddClient.value = false;
    editCloseClient.value = true;
    closeEditClient.value = false;
    switBlock.value = true;
    switList.value = false;
    block.value = false;
    state.value = 'list';
}
const user = {
  creationUser: team.creationUser
};

const creationDate = new Date(user.creationUser);

// Exemplo de formatação
const formattedDate = creationDate.toLocaleDateString("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const formattedTime = creationDate.toLocaleTimeString("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
});


async function submitForm() {
    try {
        // Requisição para cadastrar os dados
        const response = await fetch(`https://api.leandrocesar.com/usernw/${route.params.id}/team`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                name: name.value,
                lastName: lastName.value,
                sex: sex.value,
                birthday: birthday.value,
                whatsapp: whatsapp.value,
                foto: foto.value,
                service: service.value,
                target: target.value,
                email: email.value,
                username: username.value.replace(/\s/g, '').toLowerCase(),
                password: password.value.replace(/\s/g, ''),
                day: day.value,
                time: time.value,
                payDay: payDay.value,
                periodStart: periodStart.value,
                periodEnd: periodEnd.value,
                terms: terms.value,
                status: status.value,  
                creationUser: new Date().toISOString(),  
                _id: _id.value,  
            }),
        });

        if (response.ok) {
            console.log('Data sent successfully');
            

            // Segunda requisição para verificar o _id
            const responseTwo = await fetch(`https://api.leandrocesar.com/usersnw/${route.params.id}/team`);
            if (!responseTwo.ok) {
                console.error('Failed to fetch team data');
                return;
            }

            const responseData = await responseTwo.json();
            const createdTeam = responseData.find(item => item.username === username.value); // Ajuste conforme a estrutura da resposta
            if (createdTeam && createdTeam._id) {
                console.log(`_id found: ${createdTeam._id}`);
                setTimeout(() => {
                    navigateTo(`/coach/${route.params.id}/atleta/${createdTeam._id}`);
                }, 1500);
            } else {
                console.error('No matching team found in the response');
            }
        } else {
            console.error('Failed to send data');
        }
    } catch (error) {
        console.error('Error sending data:', error);
    }
}

async function submitUpdate() {
    try {
        const response = await fetch('https://api.leandrocesar.com/usernw', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                name: name.value,
                lastName: lastName.value,
                sex: sex.value,
                birthday: birthday.value.replace(),
                whatsapp: whatsapp.value,
                foto: foto.value,
                service: service.value,
                target: target.value,
                email: email.value,
                username: username.value.replace(/\s/g, '').toLowerCase(),
                password: password.value.replace(/\s/g, ''),
                day: day.value,
                time: time.value,
                payDay: payDay.value,
                periodStart: periodStart.value,
                periodEnd: periodEnd.value,
                terms: terms.value,
                status: status.value,  
            }),
        });
        
        if (response.ok) {
            console.log('Data sent successfully');
            setTimeout(() => {
                // reloadNuxtApp({
                // path: "/admin/clientes",
                // ttl: 1000, // default 10000
                // });
                return navigateTo(`/admin/clientes/${username.value.toLowerCase() }`);
            }, 1500);
        } else {
            console.error('Failed to send data');
        }
    } catch (error) {
        console.error('Error sending data:', error);
    }
}


const periodStart = ref('')
const monthsToAdd = ref(0)
const calculateNewDate = () => {
  if (!periodStart.value || !monthsToAdd.value) {
    newDate.value = ''
    return
  }

  const start = new Date(periodStart.value)
  const months = parseInt(monthsToAdd.value)

  start.setMonth(start.getMonth() + months)

  newDate.value = start.toISOString().split('T')[0]
}

watch([periodStart, monthsToAdd], calculateNewDate)


const updateStatus = () => {
  if (!periodStart.value || !periodEnd.value) {
    status.value = '';
    return;
  }

  const today = new Date();
  const start = new Date(periodStart.value);
  const end = new Date(periodEnd.value);

  const daysSinceStart = Math.floor((today - start) / (1000 * 60 * 60 * 24));
  const daysUntilEnd = Math.floor((end - today) / (1000 * 60 * 60 * 24));

  if (daysSinceStart >= 1 && daysUntilEnd >= 0) {
    status.value = 2; // Dentro do período
  } else if (daysSinceStart > 3) {
    status.value = 0; // Fora do período após 3 dias
  } else if (daysSinceStart >= 1) {
    status.value = 1; // Dentro do período, mas mais de 1 dia passou
  } else {
    status.value = ''; // Caso padrão, pode ajustar conforme necessário
  }
}
watch([periodStart, periodEnd], updateStatus);

const searchQuery = ref('');
const searchInputRef = ref(null);

// Busca os atletas da API corretamente
const { data: atletas } = await useFetch(`https://api.leandrocesar.com/usersnw/${route.params.id}/team`);
const allUsers = computed(() => atletas.value || []);

const filteredUsers = computed(() => {
  return allUsers.value.filter(user => 
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user._id.toLowerCase().includes(searchQuery.value.toLowerCase()) 
  );
});

// Garante que o campo de pesquisa recebe o foco ao carregar
onMounted(() => {
  if (searchInputRef.value) {
    searchInputRef.value.focus();
  }
});

// Função para atualizar a pesquisa (opcional, pois `v-model` já faz isso)
const updateSearchQuery = (event) => {
  searchQuery.value = event.target.value;
};
const pressedKeys = new Set(); // Armazena as teclas pressionadas


function handleKeydown(event) {
  pressedKeys.add(event.key);

  // Combinação "g" e "h"
  if (pressedKeys.has("/") && pressedKeys.has("f")) {
    searchInputRef.value.focus();
    event.preventDefault(); // Evita comportamentos padrão, como abrir a barra de pesquisa.
  
  }

}

function handleKeyup(event) {
  pressedKeys.delete(event.key); // Remove a tecla liberada
}

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("keyup", handleKeyup);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
  window.removeEventListener("keyup", handleKeyup);
});



// Definindo os formatos de imagem possíveis
const formatss = ['jpeg', 'jpg', 'png', 'webp']; 

// Variável reativa para armazenar as imagens mais recentes de cada usuário
const images = ref({});

// Variável para controlar o estado de carregamento
const loading = ref(true);

// Função para verificar se a imagem existe e retornar a data de modificação
const imageExistsss = async (src) => {
  try {
    const response = await fetch(src, { method: "HEAD" });
    if (response.ok) {
      const lastModified = response.headers.get('Last-Modified');
      return lastModified;
    }
    return null;
  } catch (error) {
    return null;
  }
};

// Função que percorre os formatos e retorna a imagem mais recente
const getImageSrcc = async (username) => {
  let mostRecentImage = '';
  let mostRecentDate = null;

  for (const formato of formatss) {
    const src = `https://api.leandrocesar.com/uploads/${username}.${formato}`;
    const lastModified = await imageExistsss(src);

    if (lastModified) {
      const imageDate = new Date(lastModified);
      if (!mostRecentDate || imageDate > mostRecentDate) {
        mostRecentDate = imageDate;
        mostRecentImage = src;
      }
    }
  }

  return mostRecentImage;
};

// Função principal para carregar os dados dos usuários e buscar as imagens
const loadTeamImages = async () => {
  try {
    const { data } = await useFetch('https://api.leandrocesar.com/usersnw/6784f3e80c23ff230251716a/team');
    
    // Verifique o formato dos dados que você está recebendo
    console.log('Dados recebidos:', data.value);

    // Verifica se os dados são um array válido
    const itemmm = Array.isArray(data.value) ? data.value : [];

    if (itemmm.length === 0) {
      console.error('Nenhum usuário encontrado ou dados mal formatados.');
      loading.value = false;
      return;
    }

    // Para cada usuário, busca a imagem mais recente
    const userImages = {};
    for (const user of itemmm) {
      const username = user.username; // Supondo que 'username' seja uma propriedade de cada membro
      const recentImage = await getImageSrcc(username);
      userImages[username] = recentImage;  // Armazena a imagem mais recente para cada usuário
    }

    // Atualiza a variável reativa 'images' com as imagens mais recentes
    images.value = userImages;
    loading.value = false;  // Define o estado de carregamento como falso quando as imagens estiverem carregadas
  } catch (error) {
    console.error('Erro ao carregar os dados do time:', error);
    loading.value = false;
  }
};

// Chama a função de carregamento assim que o componente for criado
loadTeamImages();
</script>

<template>
    <div class="layout-no-sidebar">
      <!-- Barra fixa no topo -->
      <header class="topbar">
          <div>
              <h3>Team</h3>
              <h4 v-if='item.length === 1'>{{item.length}} atleta</h4>
              <h4 v-else>{{item.length}} atletas</h4>
          </div>
          <div>
            <Icon class='filt' name='heroicons-outline:search' />
            <div class="nav-users">
                    <input
                        type="text"
                        ref="searchInputRef"
                        v-model="searchQuery"
                        placeholder="Procurar..."
                        @input="updateSearchQuery"
                        class="search-input"
                        name="q"
                    />
            </div>
            <div class="nav-users">
                    <div v-if="addCloseClient" class="add-client add-client-mini" @click="addClient">
                        Novo Atleta <Icon name='heroicons:plus-small' />
                    </div>
                    <div v-else-if="closeAddClient" class="close-client" @click="closeClient">
                        <Icon name='material-symbols:cancel-rounded' /> Fechar
                    </div>
            </div>
          </div>
      </header>
            <div class="nav-users">
                <div class="users-conf">
                    <div v-if="switList" class="filter" @click="switchButtonBlock">
                        <Icon name='solar:widget-linear' /> Blocos
                    </div>
                    <div v-else-if="switBlock" class="filter" @click="switchButtonList">
                        <Icon name='material-symbols:view-list-outline' /> Lista
                    </div>
                </div>
            </div>
      <div class="content">
          <!-- Conteúdo com scroll -->

            <div v-if="add">
                <div  v-if="state === 'block'" class="users-list">
                    <div v-for="(image, username) in images" :key="username">

                        <NuxtLink :to="`/coach/${route.params.id}/atleta/${user._id}`">

                            <div class="title-user">
                                <div class="user-bd">
<h3>{{ username }}</h3>
        <img :src="image" :alt="`${username}`" />                                </div>
                                        <h4>
                                            {{ item.name }} {{ item.lastName }}
                                        </h4>
                            </div>

                        </NuxtLink>
                    </div>
                </div>
                <div  v-else="state === 'list'" class="users-list">
                
                <table class="styled-table" v-if="filteredUsers.length">
                  <thead>
                    <tr class="header-row">
                      <th>#</th>
                      <th></th>
                      <th>Nome</th>
                      <th class="none">Serviço</th>
                      <th class="none">Venc.</th>
                      <th class="none">Nascimento</th>
                      <th class="none">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr 
                      v-for="(item, index) in filteredUsers" 
                      :key="index" 
                      @click="navigateTo(`/coach/${route.params.id}/atleta/${item._id}`)"
                      class="clickable-row"
                    >
                      <td>{{ index + 1 }}</td>
                      <td>

                          <img :src="item.foto" alt="Foto do Atleta" class="user-photo" />
                        </td>
                      <td>
                        <span class="user-name">
                          {{ item.name }}
                          {{ item.lastName }}
                        </span>
                      </td>
                      <td class="none">
                        <span class="due-date">{{ item.service }}</span>
                      </td>
                      <td class="none">
                        <span class="due-date">{{ item.payDay }}</span>
                      </td>
                      <td class="none">
                        {{ item.birthday.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3-$2-$1') }}
                      </td>
                      <td class="none">
                        <span 
                          :class="['status-badge', item.status !== 0 ? 'active' : 'inactive']"
                        >
                          {{ item.status === 0 ? "Inativo" : "Ativo" }}
                        </span>
                      </td>
                    </tr>
                </tbody>
            </table>
            <div v-else class='no-user'>Atleta não encontrado !!</div>



                </div>
            </div>
            <div v-else-if="updt" class="main">
                <form @submit.prevent="submitForm" class="form-container">
                    <div>
                    <div class="inputs">

                        <div>

                            <span>Nome</span>
                            <input type="text" id="name" autofocus v-model="name" required autocomplete="nome">

                        </div>
                        <div>

                            <span>Sobrenome</span>
                            <input type="text" id="sobrenome" v-model="lastName" required autocomplete="sobrenome">

                        </div>
                    </div> 

                    <div class="inputs">
                        <div>

                            <span>Gênero?</span>
                            <select name="sex" id="sex" class="select" placeholder='' required v-model="sex" autocomplete="sexo">
                                <option disabled value="">Selecione uma opção</option>
                                <option value="feminino">Feminino</option>
                                <option value="masculino">Masculino</option>
                                <option value="Outro">Outro</option>
                            </select>
                        </div>


                    </div>
                    <div class="inputs">

                        <div>
                            <span>Data de nascimento</span>
                            <input type="date" name="" id="nascimento" autofocus v-model="birthday" required
                                autocomplete="nascimento">
                        </div>
                        <div>
                            <span>WhatsApp</span>
                            <input type="tel" name="" id="whatsapp" placeholder="(xx)xxxxx-xxxx" required
                                v-model="whatsapp" autocomplete="whatsapp">
                        </div>

                    </div>
                    <div class="inputs">

                        <div>
                            <span>Qual Serviço?</span>
                            <select name="service" id="servico" required class="select" placeholder=''
                                v-model="service">
                                <option disabled value="">Selecione uma opção</option>
                                <option value="Personal">Personal</option>
                                <option value="Consultoria">Consultoria</option>
                            </select>
                        </div>

                        <div>

                            <span>Qual objetivo?</span>
                            <select name="target" id="target" class="select" placeholder='' required v-model="target">
                                <option disabled value="">Selecione uma opção</option>
                                <option value="Hipertrofia">Hipertrofia</option>
                                <option value="Emagrecimento">Emagrecimento</option>
                                <option value="Acompanhamento">Só acompanhamento</option>
                                <option value="Outro">Outro</option>
                            </select>
                        </div>

                    </div>
                    <div class="inputs">
                        <div>

                            <span>E-mail</span>
                            <input type="text" name="" id="email" v-model="email" autocomplete="email">

                        </div>
                    </div>
                    <div class="inputs senha">
                        <div>
                            <span>Usuário</span>
                            <input type="text" required name="" id="usuario" v-model.trim="username"
                                autocomplete="usuario">
                        </div>
                        <input type="hidden" :value="foto = `https://app.leandrocesar.com/img/${username}.jpeg`">

                        <div class="senhaPs">
                            <span>Senha</span>
                            <input type="pass" required name="" id="password" v-model="password" autocomplete="off">
                        </div>

                    </div>
                    <div class="inputs">
                        <div>

                            <span>Dias/semana</span>
                            <input type="number" name="" required id="servico" v-model="day" autocomplete="servico">

                        </div>
                        <div>

                            <span>Minutos/treino</span>
                            <input type="number" name="" required id="vencimento" v-model="time"
                                autocomplete="vencimento">

                        </div>

                    </div>
                    <div class="inputs">
                        <div>

                            <span>Dia do Vencimento</span>
                            <input type="number" name="" required id="vencimento" v-model="payDay"
                                autocomplete="vencimento">

                        </div>
                        <div>

                            <span>Início dos treinos</span>
                              <input type="date" v-model="periodStart" id="periodStart" />

                        </div>
                    </div>
                    <div class="inputs">
                        <div>

                            <span>Qual plano?</span>
                            <select name="monthsToAdd" id="monthsToAdd" class="select" placeholder='' required v-model="monthsToAdd">
                                <option disabled value="">Selecione uma opção</option>
                                <option value="1">Mensal</option>
                                <option value="3">Trimestral</option>
                                <option value="6">Semestral</option>
                                <option value="12">Anual</option>
                            </select>
                        </div>
                           
                    </div>
                    <div class="inputs">
                            <div>
                              <label for="newDate">Fim do treino</label>
                              <input type="date" id="newDate" v-model="periodEnd" @input="updateNewDate" />
                            </div>
                          </div>
                    </div>
                    <div>

                    <div class="inputs">
                        <button class="menu-button" type="submit">
                            Criar
                            <Icon name="material-symbols:person-add-rounded" />
                        </button>
                    </div>
                    </div>
                    <br>
                    <br>
                    <br>
                </form>
                <br>
                <br>
                <br>

                <div v-if="subscriberOk" class="subscriberOk top">
                    <div>
                        Usuário Criado com Sucesso!
                    </div>
                </div>
            </div>
            <div v-else class="main">
                <div class="barTop center">

                </div>
                <form @submit.prevent="submitForm">
                    <div class="inputs">

                        <div>

                            <span>Nome</span>
                            <input type="text" id="name" autofocus v-model="name" required autocomplete="nome">

                        </div>
                        <div>

                            <span>Sobrenome</span>
                            <input type="text" id="sobrenome" v-model="lastName" required autocomplete="sobrenome">

                        </div>
                    </div>

                    <div class="inputs">
                        <div class="radio">

                            <input type="radio" name='sex' id="feminino" class="check" v-model="sex" required
                                value=feminino autocomplete="sexo" checked>
                            <label for="feminino">Feminino</label>

                        </div>
                        <div class="radio">

                            <input type="radio" name='sex' id="masculino" class="check" v-model="sex" required
                                value="masculino" autocomplete="sexo">
                            <label for="masculino">Masculino</label>

                        </div>


                    </div>
                    <div class="inputs">

                        <div>
                            <span>Data de nascimento</span>
                            <input type="date" name="" id="nascimento" autofocus v-model="birthday" required
                                autocomplete="nascimento">
                        </div>
                        <div>
                            <span>WhatsApp</span>
                            <input type="tel" name="" id="whatsapp" placeholder="(xx)xxxxx-xxxx" required
                                v-model="whatsapp" autocomplete="whatsapp">
                        </div>

                    </div>
                    <div class="inputs">

                        <div>
                            <span>Qual Serviço?</span>
                            <select name="service" id="servico" required class="select" placeholder=''
                                v-model="service">
                                <option disabled value="">Selecione uma opção</option>
                                <option value="Personal">Personal</option>
                                <option value="Consultoria">Consultoria</option>
                            </select>
                        </div>

                        <div>

                            <span>Qual objetivo?</span>
                            <select name="target" id="target" class="select" placeholder='' required v-model="target">
                                <option disabled value="">Selecione uma opção</option>
                                <option value="Hipertrofia">Hipertrofia</option>
                                <option value="Emagrecimento">Emagrecimento</option>
                                <option value="Acompanhamento">Só acompanhamento</option>
                                <option value="Outro">Outro</option>
                            </select>
                        </div>

                    </div>
                    <div class="inputs">
                        <div>

                            <span>E-mail</span>
                            <input type="text" name="" id="email" v-model="email" autocomplete="email">

                        </div>
                    </div>
                    <div class="inputs senha">
                        <div>
                            <span>Usuário</span>
                            <input type="text" required name="" id="usuario" v-model.trim="username"
                                autocomplete="usuario">
                            <input type="hidden" :value="foto = `https://app.leandrocesar.com/img/${username}.jpeg`">       
                        </div>
                        <div class="senhaPs">
                            <span>Senha</span>
                            <input type="pass" required name="" id="password" v-model="password" autocomplete="off">
                        </div>

                    </div>
                    <div class="inputs">
                        <div>

                            <span>Dias/semana</span>
                            <input type="number" name="" required id="servico" v-model="day" autocomplete="servico">

                        </div>
                        <div>

                            <span>Minutos/treino</span>
                            <input type="number" name="" required id="vencimento" v-model="time"
                                autocomplete="vencimento">

                        </div>

                    </div>
                    <div class="inputs">
                        <div>

                            <span>Dia do Vencimento</span>
                            <input type="number" name="" required id="vencimento" v-model="payDay"
                                autocomplete="vencimento">

                        </div>
                        <div>

                            <span>Início dos treinos</span>
                            <input type="date" name="" required id="servico" placeholder="Tempo/treino"
                                v-model="periodStart" autocomplete="servico">

                        </div>
                    </div>
                    <div>

                    </div>
                    <div>

                    </div>

                    <div class="inputs">
                        <button class="login" type="submit">
                            Criar
                            <Icon name="material-symbols:person-add-rounded" />
                        </button>
                    </div>
                    <br>
                    <br>
                    <br>
                </form>
                <br>
                <br>
                <br>

                <div v-if="subscriberOk" class="subscriberOk top">
                    <div>
                        Usuário Criado com Sucesso!
                    </div>
                </div>
            </div>
            </div>
            </div>
</template>
<style scoped>
.no-user {
    color: #00dc82;
    font-weight: bolder;
    line-height: 100px;
    text-transform: uppercase;
    margin: auto;
    border-top: 1px solid #00dc8240;
    width: 100%;
    text-align: center;
}
/* Tabela geral */
.styled-table {
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  font-size: 16px;
  margin: 0px 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* Cabeçalho */
.styled-table thead {
  background-color: #00dc8270;
  color: white;
  text-align: left;
}

.styled-table th {
  padding: 12px 15px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: bold;
}

/* Linhas do corpo */
.styled-table tbody tr {
  border-bottom: 1px solid #00dc8240;
  transition: background-color 0.3s ease;
}
.styled-table tbody tr:nth-child(2n) {
    background-color: #00dc8220;
  border-bottom: 1px solid #00dc8240;
  transition: background-color 0.3s ease;
}

.styled-table tbody tr:hover {
  background-color: #00dc8250;
  cursor: pointer;
}

.styled-table td {
  vertical-align: middle;
}

/* Linhas clicáveis */
.clickable-row {
  cursor: pointer;
}

.clickable-row:hover {
  background-color: #eef2f7;
}

/* Imagens de perfil */
.user-photo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  vertical-align: middle;
}

.user-name {
  vertical-align: middle;
  font-weight: bold;
}

/* Status */
.status-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  color: white;
  text-align: center;
}

.status-badge.active {
  background-color: #4CAF50;
}

.status-badge.inactive {
  background-color: #FF5252;
}

/* Ocultar colunas em telas menores */
@media (max-width: 768px) {
  .none {
    display: none;
  }
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
  z-index: 10; /* Garante que a barra fique visível acima do conteúdo */
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
    border-radius: 4px;
    background: #00dc8280;
    color: #fff;
}

.topbar .filt {
    padding-left: -40px;
    zoom:2;
    z-index: 10;
    color: #555;
}

.dark-mode .topbar .filt {
    color: #fff;
}

.topbar input {
    width: 200px;
    margin-left: -25px;
    padding-left: 30px;
}

.dark-mode .topbar h4 {
    color: #fff;
}

.content {
  overflow-y: auto; /* Adiciona scroll vertical no conteúdo */
}

.status {
    border: solid 2px #00dc8240;
    Background: #00e900;
    border-radius: 8px;
    padding: 1px 25px;
    color: #fff;;
}
.statusOff {
    border: solid 2px #00dc8240;
    Background: #e70000;
    border-radius: 8px;
    padding: 1px 20px;
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

.login .icon {
    margin: -2px 0px 2px 4px;
}

.login:hover {
    cursor: pointer;
    background-color: #00dc82;
    color: #fff;
}

.login:hover .icon {
    margin: -2px 0px 2px 4px;
    transform: translateX(6px);
}

.form-container {
    width: 95%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: flex-start;
}
.form-container div{
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
}

.menu-button {
  background-color: #007bff;
  color: white;
  padding: 0.4rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.3s ease;
  margin: 1rem;
}

.menu-button:hover {
  background-color: #0056b3;
}

.inputs {
    display: flex;
    justify-content: center;
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
    margin: .5rem
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
    background-color: #00dc8210;
    font-weight: 600;
    border-radius: 8px;
    height: 30px;
    font-size: 14px;
border: solid 2px #00dc82;
width: 265px;
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

input:hover {
    background-color: #00dc8210;
}
input::placeholder {
    color: #aaa;
}
.dark-mode input::placeholder {
    color: #aaa;
}


input:focus {
    border: 0 none;
    border: solid 2px #00dc82;
    color: #fff;
    color: #888;
    outline: 0;
}
.dark-mode input:focus {
    color: #ddd;
}

img {
    height: 30px;
    padding:0;
    margin:0;
    border-radius: 50%;
}



h4 {
    margin: 0 0 0 10px;
    text-align: left;
}

h4:nth-child(1) {
    margin: 20px 0 0 10px;
}


.select {
    border: 0;
    color: inherit;
    background-color: #00dc8220;
    border: solid 2px #00dc82;
    border-radius: 8px;
    cursor: pointer;
    width: 265px;
    text-align: left;
    height: 30px;
    font-size: 14px;
}

.dark-mode option {
    background-color: #111832;
    color: #fff;  
}

.select:focus {
    border: 0 none;
    border: solid 2px #00dc82;
    outline: 0;
}

.select:focus-visible {
    background-color: #00dc8210;
}

.select:active {
    background-color: #00dc8210;
}

.select:hover {
    background-color: #00dc8210;
}

.login {
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
}

.login .icon {
    margin: -2px 0px 2px 4px;
}

.login:hover {
    cursor: pointer;
    background-color: #00dc82;
    color: #fff;
}

.login:hover .icon {
    margin: -2px 0px 2px 4px;
    transform: translateX(6px);
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

.users-list img{
    margin-right: 5px;
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
    color: white;
    font-weight: bolder;
}

td:nth-child(1){
    width: 5px;    
    padding: 0px 10px;
}

td:nth-child(2){
    display: flex;    
    justify-content: flex-end;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;
}

td:nth-child(3){
    width: 400px;    
    padding: 0px 10px;
}
td:nth-child(4){
    padding: 0px 10px;
}

#customers tr:nth-child(1) {
    background-color: #00dc8210;
    }
#customers tr:nth-child(2n) {
    background-color: #00dc8230;
    }
    
    #customers tr:hover {
        background-color: #00dc8250 ;
    }
    
input {
    padding: 5px 15px;
    font-size: 1rem;
    font-weight: bolder;
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
    border-bottom: 1px solid #00dc8240;
    font-size: 1rem;
}

.row:nth-child(1) {
    position: sticky;
    top: 90px;
    font-size: 1.1rem;
    font-weight: bolder;
}

.row:nth-child(2n) {
    background-color: #00dc82;

}

.header {
    font-weight: bold;
}

.cell {
    flex: 1;
    overflow: hidden;
    border-right: 1px solid #00dc8210;
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
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
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
    padding: 5px 25px;
    margin: 5px;
    border-radius: 8px;
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
}

.users-conf {
    margin: 2px;
}

.users-conf span {
    border: 1px solid #00dc8290;
    padding: 2px;
    border-radius: 4px;
    color: #00dc82;
    background-color: #00dc8230;
    margin-left: 3px;
}

.filter {
    border: solid 1px #00dc8290;
    padding: 4px 12px;
    margin: 5.5px 14px;
    border-radius: 4px;
    cursor: pointer;
    background-color: #00dc8210;
}

.filter:hover {
    color: #fff;
    background-color: #00dc8290;
}

.users-list {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    z-index: 1;
    width: 100%;
    overflow-y:auto;
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
    flex-wrap: nowrap;
    height: 130px;
    width: 130px;
    margin: 2px;
    border-radius: 4px;
    border: solid 2px #00dc8260;
    text-align: center;
}

.title-user:hover {
    background-color: #00dc8260;
    color: #fff;
}

.user-bd {
    background: linear-gradient(90deg, #00dc82 0%, #00d4ff 35%, #04be7a 100%);
    height: 70px;
    width: 70px;
    color: #718096;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 50px;
    z-index: 10;
}

.title-user img {
    height: 70px;
    width: 70px;
    border-radius: 50px;
    /* border: #00dc82 2px solid; */
    z-index: 100;
    padding: 4px;
    opacity: 1;
}

.title-user h4 {
    text-align: left;
    font-size:.7rem;
    margin: 2px 4px ;
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

.button {
    height: 35px;
    width: 55px;
    text-align: center;
    padding-top: 4px;
    border-radius: 4px;
    cursor: pointer;
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
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    background-color: var(--color-background);
    height: 46px;
    width: 46px;
    color: #718096;
    box-shadow: 0px 7px 20px #00dc82;
    border-radius: 4px;
    margin: 1rem;
    z-index: 10;
}

.logo img {
    height: 46px;
    width: 46px;
    border-radius: 4px;
    border: #00dc82 2px solid;
    z-index: 100;
    opacity: 1;
}

.head-name {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    font-family: ' gagalin';
}
.table {
    display: flex;
    flex-direction: column;
}

.row {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #00dc8240;
    font-size: 1rem;
}

.row:nth-child(1) {
    background-color: #00dc8240;
    position: sticky;
    top: 90px;
    font-size: 1.1rem;
    font-weight: bolder;
}

.row:nth-child(2n) {
    background-color: #00dc82;

}

td {
    text-align: left;
    border: none; /* Remove as bordas das células */
    height:45px;
}

th {
    text-align: left;
    border: none; /* Remove as bordas das células */
    padding: 15px 15px; /* Adiciona espaçamento interno para uma melhor aparência */
}

tr {
    padding: 0px; /* Adiciona espaçamento interno para uma melhor aparência */
    border: none; /* Remove as bordas das linhas */
}
</style>
