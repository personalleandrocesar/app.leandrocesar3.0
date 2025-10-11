<script setup>
import { ref, watch, computed, onMounted } from "vue";
const route = useRoute();

const Users = await useFetch(
    `https://api.leandrocesar.com/usersnw/${route.params.id}/team/${route.params.iddd}`,
);
const item = Users.data.value;
const user = item;
const name = user.name;
const firstName = computed(() => name.split(" ")[0]);

useHead({
  titleTemplate: `${firstName.value} ${user.lastName} - Cliente | Leandro Cesar - App`,
});



async function submitDelete() {
  try {
    const { data, error: fetchError } = await useFetch(`https://api.leandrocesar.com/usersnw/${route.params.id}/team/${route.params.iddd}`, {
      method: 'DELETE',
    });
    if (fetchError.value) {
      error.value = fetchError.value.message || 'Erro ao tentar deletar o atleta.';
      return;
    }
    notificFour.value = true;
    console.log('Atleta removido com sucesso.');
    setTimeout(() => {
        notificTree.value = false;
        notificFour.value = false;
        reloadNuxtApp({ path: `/coach/${route.params.id}/team`, ttl: 1000 });
    }, 1500);
  } catch (err) {
    error.value = 'Erro ao conectar ao servidor.';
    console.error(err);
  }
}

const userId = ref('');
const athleteId = ref('');
const error = ref(null);
const notificTree = ref(false);
const notificFour = ref(false);

function notifConfirm() { notificTree.value = true; }
function notifCancel() { notificTree.value = false; }

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

</script>


<template>
    <!-- <UploadImage /> -->
    <div class="layout-no-sidebar">
        <!-- Barra fixa no topo -->
        <header class="topbar">
        <h3 class='upper'>
            <Icon name='cil:weightlifitng' /> {{ user.name.split(' ')[0] }} {{ user.lastName }}
        </h3>
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
                <div class="users-conf">
                    <NuxtLink  class="filter">
                        <Icon name='material-symbols:person-edit-outline' /> Atualizar
                    </NuxtLink>
                    <NuxtLink @click='notifConfirm()' class="filter" >
                        <Icon name='material-symbols:person-cancel-outline-rounded' /> Deletar
                    </NuxtLink>
                </div>
            </div>
      <div class="content">
          <!-- Conteúdo com scroll -->
           <!-- Dentro do seu template, adicione uma barra de progresso -->
<div v-if="loading" class="progress-bar">
  <div class="progress" :style="{ width: progress + '%' }"></div>
</div>

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
      <h3>{{ user.name }} {{ user.lastName }}</h3>
      <h4>{{ user.username }}</h4>
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
            <div v-else class='alt-image'></div>
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
                                    <h3>{{user.whatsapp}}</h3>
                                </div>
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
                    <h3>Atualizações da conta </h3>
                    <p>Receba atualizações sobre o Next_Wod.</p>
                </div>
                
                <div>
                    <div class='bor'>
                            <div class="theme-switch">
        
                            <div>
                                <h3>Resumo semanal</h3>
                                <p>Receba um resumo semanal de notícias.</p>
                            </div>
                                <label class="switch">
                                    <input type="checkbox">
                                    <span class="slider"></span>
                                </label>
                
                            </div>
                    </div>
                
                </div>
                
            </div>
          </div>
        </div>
    </div>






    






    <div v-if='notificTree' class="float">
            <div class="notific-float zoomOut" >
                <div>
                    <Icon name='material-symbols:person-cancel-outline-rounded' style="color: red; zoom:2.2"/>
                </div>
                <div>
                    <div>
                        <h3>
                        Deletar usuário
                        </h3>
                        <p>
                            Tem certeza que que deseja deletar este usuário? 
                        </p>
                    </div>
                    <div>   
                        <button @click='submitDelete()' class="pill-can ex">Deletar</button>
                        <button @click="notifCancel()" class="pill-can can">Cancelar</button>
                    </div>
                </div>
    
            </div>
    </div>
    <div v-if='notificFour' class="float">
            <div class="notific-float-two zoomOut" >
                <div>
                    <Icon name='line-md:circle-to-confirm-circle-transition' style="color: green; zoom:2.2"/>
                </div>
                <div>
                    <div>
                        <h3>
                        Usuário deletado com sucesso!
                        </h3>
                    </div>
                    
                </div>
    
            </div>
    </div>
</template>
<style scoped>
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
    backdrop-filter: blur(5px);
    z-index: 1134004;

}

.logo-nav-bar img {
    width: 300px;
    border-radius: 200px;
    border: #00dc82 1px solid;
    opacity: 1;
    z-index: 100;

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

.float{
    position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1002;
      background: #ecedf060;
      backdrop-filter: blur(1px); /* Desfoque do fundo */
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* Sombras (opcional) */
      color: #333; /* Cor do texto */
      width: 100%; /* Largura fixa */
      height: 100vh; /* Altura fixa */
      padding: 20px; /* Espaçamento interno */
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


.dark-mode .floating-div{
  background: #111827;
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
.notific-float {
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
    color: #777;
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

.notific-float div {
    margin: 0px 15px 12px 15px;
}

.dark-mode .notific-float {
    color:#fff;
    background: #0f172a;
}

.notific-float button{
    margin: 0 5px 0 0px;
}
.notific-float-two {
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
    color: #777;
    padding:20px; /* Espaço interno */
    border-radius: 10px; /* Cantos arredondados (opcional) */
    text-align: left; /* Alinha o texto centralizado */
    backdrop-filter: blur(10px); /* Desfoque do fundo */
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* Sombras (opcional) */
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
}

.notific-float-two div {
    margin: 0px 15px 0px 15px;
}

.notific-float-two button{
    margin: 0 5px 0 0px;
}

.float{
    position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1002;
      background: #ecedf060;
      backdrop-filter: blur(1px); /* Desfoque do fundo */
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* Sombras (opcional) */
      color: #333; /* Cor do texto */
      width: 100%; /* Largura fixa */
      height: 100vh; /* Altura fixa */
      padding: 20px; /* Espaçamento interno */
      text-align: center;
}

.ex{
    background: red;
    color: #fff;
    width: 100px;
}
.ex:hover{
    background: red;
    opacity:.7;
}
.can{
    background: #00dc8210;
    width: 100px;
  color: #333;
}
.can:hover{
    opacity:.7;
}
.pill-can {
  font-weight: bolder;
  padding: 0.3rem .7rem;
  font-size: 1rem;
  border: 2px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.dark-mode .pill-can {
    color:#fff;
}
    
      /* Container do botão */
      .switch {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
}

notific-float div

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
    margin:20px 1%;
    padding: 10px 0 20px 0;
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
  width: 100%;
}

.theme-switch {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  gap: .5rem;
  margin: 10px;
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
}

.upper {
    text-transform: Capitalize;
    color: #00dc82;
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
    border: solid 2px #00dc82;
    text-align: left;
    width: 500px;
    font-weight: 600;
    border-radius: 8px;
    height: 40px;
    font-size: 14px;
    padding: 5px 33px;
    color:#555;
     
}
textarea {
    border: solid 2px #00dc82;
    text-align: left;
    width: 500px;
    font-weight: 600;
    border-radius: 8px;
    height: 120px;
    background: transparent;
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

input:hover {
    background-color: #00dc8210;
}


input:focus {
    border: 0 none;
    border: solid 2px #00dc82;
    outline: 0;
}



h4 {
    margin: 00px;
    text-align: left;
    color: #999;
}


.select {
    border: 0;
    color: inherit;
    background-color: transparent;
    border: solid 2px #00dc82;
    border-radius: 5px;
    cursor: pointer;
    width: 80px;
    text-align: left;
    height: 30px;
    font-size: 14px;
}
select::selection {
    border: solid 2px #00dc82;
    background: #00dc8240;
}

.select:focus {
    border: 0 none;
    border: solid 2px #fff;
    outline: 0;
}

.dark-mode .select:focus {
    border-color: #00dc8290 ;
}

.select:focus-visible {
    background-color: #00dc8210;
    border: solid 2px #00dc82;
}

.select:active {
    background-color: #00dc8210;
}

.dark-mode select:active {
    background: #111827;
    border: solid 2px #00dc82;
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
    border: 1px solid #00dc8240;
    font-size: 1rem;
}

.row:nth-child(1) {
    position: sticky;
    top: 90px;
    font-size: 1.1rem;
    font-weight: bolder;
}

.row:nth-child(2n) {
    background-color: #00dc8210;

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
    object-fit: cover; /* Preenche o contêiner sem deformar */
}

.logo .nav-bar img {
    height: 300px;
    width: 300px;
    border-radius: 200px;
    /* border: #00dc82 2px solid; */
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
    background-color: #00dc8290;
    position: sticky;
    top: 90px;
    font-size: 1.1rem;
    font-weight: bolder;
}

.row:nth-child(2n) {
    background-color: #00dc8210;

}

td, th {
    text-align: left;
    border: none; /* Remove as bordas das células */
    padding: 20px; /* Adiciona espaçamento interno para uma melhor aparência */
}

tr {
    border: none; /* Remove as bordas das linhas */
}
</style>
