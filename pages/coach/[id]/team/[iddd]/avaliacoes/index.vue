<script setup>
import { computed, ref } from 'vue'
const config = useRuntimeConfig()
// import './cal'
const route = useRoute()
const layout = "duo"
const data = await useFetch('config.apiSecret')
const dataConf = await useFetch(`/api/${route.params.id}`)
const notify = await useFetch(`/api/notifications`)

const Users = await useFetch(`https://api.leandrocesar.com/users/${route.params.id}`);
const Treinos = await useFetch(`https://api.leandrocesar.com/users/${route.params.id}/avaliacoes`);
const item = Users.data.value;


const subscriberOk = ref(false)

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



const dTorax = data.data.value?.dtorax
const triceps = data.data.value?.tricipital
const supraespinhal = data.data.value?.supraEspinhal

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


const reg = route.params.id
const logon = useCookie('logon')
// const logon = useCookie('logon', { maxAge: 4800})
logon.value = reg
// logon.value = reg + route.params.id.length + (Math.round(Math.random() * 1000))
console.log(logon.value);

console.log(reg);

// const { data, pending, error, refresh } = await useFetch(`https://professorleandrocesar.com/usuarios/`, {})

const status = data.data.value?.status

const navbarOpen = ref(false);
function openNavbar() {
    navbarOpen.value = !navbarOpen.value;
}

const notification = notify.data.value?.status
const notifyOpen = ref(false);
function openNotify() {
    notifyOpen.value = !notifyOpen.value;

}
const photoOpen = ref(false);
function openPhoto() {
    photoOpen.value = !photoOpen.value;
}

// talvez não precise do código abaixo
const logOff = () => {
    logon.value = null
}

const tag = useCookie('tag')
tag.value = tag.value


const plusYes = ref(false)
const buttonPlus = ref(true)
function plusButton() {
    buttonPlus.value = !buttonPlus.value,
        plusYes.value = !plusYes.value
}



const bodyOne = ref(true)
function menu() {
    bodyOne.value = !bodyOne.value

}

const newForm = ref(true)
const addCloseTrainning = ref(true)
const newTrainning = () => {
    newForm.value = !newForm.value
    addCloseTrainning.value = !addCloseTrainning.value
}

useHead({
    titleTemplate: `Treinos - ${dataConf.data.value?.name} ${dataConf.data.value?.lastName} | Clientes | NEX_WOD`,
})

const dataNascimento = ref('');
const idad = computed(() => {
  if (dataNascimento.value) {
    return calcularIdade(dataNascimento.value);
  }
  return '';
});

function calcularIdade(dataNascimento) {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  let idad = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();
  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idad--;
  }
  return idad.toString();
}

async function submitAvaliacao() {
  try {
    const response = await fetch(`https://api.leandrocesar.com/user/${route.params.id}/avaliacoes`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
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
            }),
        });
        if (response.ok) {
            console.log('Create Valuation successfully');
            subscriberOk.value = true;
            setTimeout(() => {
                subscriberOk.value = false;
                // reloadNuxtApp({
                //     path: `/admin/clientes/${item.username}/treinos`,
                //     ttl: 1500, // default 10000
                // });
                return navigateTo(`/admin/clientes/${route.params.id}/avaliacao/${date.value}`);
            }, 1500);
        } else {
            console.error('Failed to Create Valuation');
        }
    } catch (error) {
        console.error('Error Create Valuation:', error);
    }
}

const { data: dataRes } = await useFetch(`https://api.leandrocesar.com/users/${route.params.id}/avaliacoes`)
const aval = dataRes.value




// Logar os índices e os valores
if (aval) {
  aval.forEach((item, index) => {
    // console.log(`Index: ${index}, Value:`, item);

    // Convertendo strings para números
    const sexo = item.sexo
    const idade = parseFloat(item.idade)
    const dTorax = parseFloat(item.dtorax)
    const abdominal = parseFloat(item.abdominal)
    const coxa = parseFloat(item.coxa)
    const triceps = parseFloat(item.tricipital)
    const supraespinhal = parseFloat(item.supraEspinhal)

    const homens = dTorax + abdominal + coxa
    const mulheres = triceps + supraespinhal + coxa

    const dcHomens = 1.109380 - (0.0008267 * (homens)) + (0.0000016 * (homens * homens)) - (0.0002574 * (idade))
    const dcMulheres = 1.0994921 - (0.0009929 * (mulheres)) + (0.0000023 * (mulheres * mulheres)) - (0.0001392 * (idade))

    const percGHomens = (((4.95 / dcHomens) - 4.50) * 100).toFixed(1)
    const percGMulheres = (((4.95 / dcMulheres) - 4.50) * 100).toFixed(1)

    const percentualFat = sexo === "feminino" ? percGMulheres : percGHomens

    // Adicionando o percentual de gordura ao item
    item.percentualFat = percentualFat

    // console.log(`Percentual de Gordura: ${item.percentualFat} %`);

    // Convertendo a data para o formato yyyy-mm-dd
    const dateParts = item.date.split('-')  // Dividindo a data em partes
    const reversedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`  // Reorganizando as partes
    item.reversedDate = reversedDate  // Salvando a data invertida no item

    // console.log(`Data Original: ${item.date}, Data Invertida: ${item.reversedDate}`);

  });
}
</script>
<template>
<div v-if="subscriberOk" class="deleteOk top">
    <div>
        Avaliação deletada com Sucesso!
    </div>
</div>
    <div id="grid">
        <div id="areaA">
            <div class="nav-users">
                <div class='reward'>
                    <!-- <a @click="$router.go(-1)">
                        <Icon name="tabler:arrow-big-left-lines-filled" />
                    </a> -->

                    <NuxtLink :to="`/admin/clientes/${item.username}`">
                        <div class="reward-button">
                            <Icon name='material-symbols:shield-person' />
                        </div>
                    </NuxtLink>
                    <NuxtLink :to="`/admin/clientes/${item.username}/treinos`">
                        <div class="reward-button">
                            <Icon name='solar:dumbbell-large-bold' />
                        </div>
                    </NuxtLink>
                    <NuxtLink :to="`/admin/clientes/${item.username}/avaliacoes`">
                        <div class="reward-button">
                            <Icon name='solar:clipboard-heart-bold' />
                        </div>
                    </NuxtLink>



                    <div v-if="addCloseTrainning" class="new-user" @click="newTrainning">
                        <Icon name='material-symbols:add-notes' />
                    </div>
                    <div v-else class="new-user" @click="newTrainning">
                        <Icon name='material-symbols:cancel-rounded' />
                    </div>

                </div>
                <div class='actions'>
                    <NuxtLink :to="`/admin/clientes/${item.username}`">
                        <div class="actions-button">
                            <Icon name='material-symbols:shield-person' /> Resumo
                        </div>
                    </NuxtLink>
                    <NuxtLink :to="`/admin/clientes/${item.username}/treinos`">
                        <div class="actions-button">
                            <Icon name='solar:dumbbell-large-bold' /> Treinos
                        </div>
                    </NuxtLink>
                    <NuxtLink :to="`/admin/clientes/${item.username}/avaliacoes`">
                        <div class="actions-button">
                            <Icon name='solar:clipboard-heart-bold' /> Avaliações
                        </div>
                    </NuxtLink>
                </div>
                <div class='actions-user'>

                    <div v-if="addCloseTrainning" class="new-user" @click="newTrainning">
                        <Icon name='material-symbols:add-notes' /> Nova avaliação
                    </div>
                    <div v-else class="new-user" @click="newTrainning">
                        <Icon name='material-symbols:cancel-rounded' /> Fechar
                    </div>
                </div>
            </div>

            <div v-if="newForm">
            <div v-if="aval">
              
              <div class="main-div-two">
                  <h3>
                  <Icon name='solar:clipboard-heart-bold' /> AVALIAÇÕES
                  </h3>
              </div>
              
              <div class="main-div-two" v-for='(item, index) in aval' :key='index'>
                  
                  <nuxt-link class="main-square" :to="`/admin/clientes/${route.params.id}/avaliacao/${item.date}`">
                      <div>
                      <h4>
                          <Icon name='material-symbols:event' />
                      </h4>
                      <h4>
                          {{ item.reversedDate }}
                      </h4>
                      </div>
                      
                      <div>
                          <h4>
                              <Icon name="fa6-solid:weight-scale" />
                          </h4>
                          <h4>
                          {{ item.massa }} kg
                          </h4>                                  
                      </div>
                      <div>
                                          
                          <h4 style="font-weight: 900;color: #00dc82; zoom: 1.6; margin-bottom: -5px;">
                              %G
                          </h4>
                          <h4>
                              {{ item.percentualFat }} %
                          </h4>
          
                      </div>
                  </nuxt-link>
          </div>
          </div>

            </div>
            <div v-else class="new-form">
                <div class="new-form-squared">
                    <form @submit.prevent="submitAvaliacao">
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
                                        <option value="Outro">Outro</option>
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
                        <br>
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
                        <br>
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
                        <br>
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
                        <br>
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
                        <br>
                        <h3>
                            Postura
                        </h3>
                        <div class="inputs">
            
                            <div>
                                <span>Observaçoes</span>
                                <textarea type="text" id="posturaObs" v-model="posturaObs" autofocus></textarea>
                                
                            </div>

                        </div>

                        <div class="inputs">
                            <button class="login" type="submit">
                                Criar
                                <Icon name="material-symbols:add-notes" />
                            </button>
                        </div>
                        <br>
                        <br>
                        <br>
                    </form>

                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>

.login {
    transition: all .4s linear;
    border: solid 2px #00dc82;
    cursor: pointer;
    width: 140px;
    text-align: center;
    line-height: 18px;
    border-radius: 88px;
    font-weight: 600;
    transition: all 0.2s ease-in-out 0s;
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
    transition: transform .3s linear;
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
input {
    transition: all .4s linear;
    border-bottom: solid 2px #00dc82;
    text-align: left;
    width: 160px;
    font-weight: 600;
    border-radius: 4px;
    transition: all 0.2s ease-in-out 0s;
    height: 30px;
    font-size: 14px;
}
.select {
    transition: all .4s linear;
    border: 0;
    color: inherit;
    background-color: transparent;
    border-bottom: solid 2px #00dc82;
    border-radius: 5px;
    cursor: pointer;
    width: 160px;
    text-align: left;
    transition: all 0.2s ease-in-out 0s;
    height: 30px;
    font-size: 14px;
}

.select:focus {
    border: 0 none;
    border-bottom: solid 2px #00dc82;
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
textarea {
    transition: all .4s linear;
    border: 0;
    color: inherit;
    background-color: transparent;
    border-bottom: solid 2px #00dc82;
    border-radius: 5px;
    cursor: pointer;
    width: 800px;
    text-align: left;
    transition: all 0.2s ease-in-out 0s;
    height: 30px;
    font-size: 14px;
    font-weight: bolder;
}

textarea:focus {
    border: 0 none;
    border-bottom: solid 2px #00dc82;
    outline: 0;
}

textarea:focus-visible {
    background-color: #00dc8210;
}

textarea:active {
    background-color: #00dc8210;
}

textarea:hover {
    background-color: #00dc8210;
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
/* 
input:hover {
} */


input:focus {
    background-color: #00dc8210;
    border: 0 none;
    border-bottom: solid 2px #00dc82;
    outline: 0;
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

.inputs-lign {
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    margin: .5rem
}
.inputs-lign div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: flex-start;
    margin: .5rem
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
    margin: 30px 30px 15px 30px;
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
.none,
.nav-users .reward {
    display: none;
}

@media (max-width: 650px) {

    .none,
    .nav-users .actions-user {
        display: none;
    }


}

@media (max-width: 1020px) {

    .nav-users .actions,
    .nav-users .actions-user,
    .actions-user .update-button,
    .actions-user .delete-button {
        display: none;
    }

    .nav-users .reward {
        display: inherit;
    }
    #posturaObs {
        width: 340px;
    }

}

.new-user {
    border: solid 1px #04be7a90;
    background-color: #04be7a;
    padding: 4px 15px;
    margin: 2.5px 10px;
    border-radius: 8px;
    transition: all .3s linear;
    cursor: pointer;
}

.new-user:hover {
    border: solid 1px #04be7a90;
    border-radius: 8px;
    color: #04be7a;
    background-color: #fff;
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

.subscriberOk {
    background-color: #00dc82;
    color: #fff;
    text-shadow: 2px 2px 2px #111;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px 20px 20px 20px;
    padding: 15px;
    border-radius: 8px;
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

.deleteOk {
    background-color: #ff190080;
    color: #fff;
    text-shadow: 2px 2px 2px #111;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px 20px 20px 20px;
    padding: 15px;
    border-radius: 8px;
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

.clients {
    margin: 11px;
}

.clients span {
    border: 1px solid #00dc8290;
    padding: 3px 6px;
    border-radius: 8px;
    color: #00dc82;
    background-color: #00dc8230;
    margin-left: 3px;
}

.notifications {
    border: solid 1px transparent;
    padding: 4px 5px;
    margin: 6px;
    border-radius: 8px;
    transition: all .3s linear;
    cursor: pointer;
}

.notifications:hover {
    padding: 4px 5px;
    border-radius: 8px;
    color: #00dc82;
    background-color: #fff;
}

.nav-users {
    position: sticky;
    top: 40px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
    z-index: 1;
    height: 35px;
    font-weight: bolder;
    margin-bottom: 1rem;
    border-bottom: .10px solid #00dc8240;
    backdrop-filter: blur(45px);
    border-bottom: solid 1px #00dc8240;
    border-right: solid 1px #00dc8240;
}

.reward {
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
    font-weight: bolder;
}


.users-conf {
    margin: 16px;
}

.users-conf span {
    border: 1px solid #00dc8290;
    padding: 8px;
    border-radius: 8px;
    color: #00dc82;
    background-color: #00dc8230;
    margin-left: 3px;
}

.actions {
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    align-content: baseline;
    margin: 0;
}

.actions a {
    border: solid 1px #00dc8210;
    background-color: transparent;
    padding: 4px 35px;
    margin: 2.5px 10px;
    border-radius: 8px;
    transition: all .3s linear;
    cursor: pointer;
}


.actions a:hover {
    border: solid 1px #00dc8260;
    background-color: #00dc8260;
}

.actions a.router-link-exact-active {
    background: #00dc8290;
    border: solid 1px #00dc82;
    color: #fff;
    text-decoration: none;
    cursor: pointer;
}

.actions-button a.router-link-exact-active:hover {
    background: #00dc8290;
    ;
    color: #fff;
    text-decoration: none;
    cursor: pointer;
}

.actions-button a.router-link-exact-active:hover::after {
    background-color: var(--color-background);
    color: #00dc82;
    text-decoration: none;
    cursor: pointer;
}

.nav-users .reward div {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    align-content: baseline;
}

.reward a {
    border: solid 1px #00dc8210;
    background-color: transparent;
    padding: 4px 15px;
    margin: 2.5px 7px;
    border-radius: 8px;
    transition: all .3s linear;
    cursor: pointer;
}


.reward a:hover {
    border: solid 1px #00dc8260;
    background-color: #00dc8260;
}

.reward a.router-link-exact-active {
    background: #00dc8290;
    border: solid 1px #00dc82;
    color: #fff;
    text-decoration: none;
    cursor: pointer;
}

.reward-button a.router-link-exact-active:hover {
    background: #00dc8290;
    ;
    color: #fff;
    text-decoration: none;
    cursor: pointer;
}

.reward-button a.router-link-exact-active:hover::after {
    background-color: var(--color-background);
    color: #00dc82;
    text-decoration: none;
    cursor: pointer;
}

.update-button {
    border: solid 1px #fadb4080;
    background-color: #fadb4080;
    padding: 4px 15px;
    margin: 2.5px 0px;
    border-radius: 8px;
    transition: all .3s linear;
    cursor: pointer;
}

.update-button:hover {
    border: solid 1px #fadb40;
    border-radius: 8px;
    color: #000;
    background-color: #fadb40;
}

.delete-button {
    border: solid 1px #ff190080;
    background-color: #ff190080;
    padding: 4px 15px;
    margin: 2.5px 10px;
    border-radius: 8px;
    transition: all .3s linear;
    cursor: pointer;
}

.delete-button:hover {
    border: solid 1px #ff1900;
    border-radius: 8px;
    color: #fff;
    background-color: #ff1900;
}

.reward-update {
    border: solid 1px #fadb4080;
    background-color: #fadb4080;
    padding: 4px 15px;
    margin: 2.5px 7px;
    border-radius: 8px;
    transition: all .3s linear;
    cursor: pointer;
}

.reward-update:hover {
    border: solid 1px #fadb40;
    border-radius: 8px;
    color: #000;
    background-color: #fadb40;
}

.reward-delete {
    border: solid 1px #ff190080;
    background-color: #ff190080;
    padding: 4px 15px;
    margin: 2.5px 7px;
    border-radius: 8px;
    transition: all .3s linear;
    cursor: pointer;
}

.reward-delete:hover {
    border: solid 1px #ff1900;
    border-radius: 8px;
    color: #fff;
    background-color: #ff1900;
}

.users-list {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
    z-index: 1;
    margin-bottom: 1rem;
    overflow-y: auto;
    overflow-x: hidden;
}
.head-logo {
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    align-items: flex-start;
    z-index: 1;
    flex-wrap: wrap;

}

.logo {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    background-color: #edf2f7;
    height: 60px;
    width: 60px;
    color: #718096;
    box-shadow: 1px 7px 20px #00dc82;
    margin: 1.5rem;
    border-radius: 7px;
    z-index: 10;
}

.logo img {
    height: 60px;
    width: 60px;
    border-radius: 7px;
    border: #00dc82 2px solid;
    z-index: 100;
    opacity: 1;

}

.nav-bar {
    z-index: 1004;
    transform: translateX(0%);
    position: fixed;
    height: calc(100% - 0px);
    bottom: 0px;
    width: 100%;
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
    z-index: 1004;
    transform: translateX(0%);
    position: fixed;
    height: calc(100% - 0px);
    bottom: 0px;
    width: 100%;
    backdrop-filter: blur(5px);
    background-color: #ffffff50;

}

.logo-nav-bar img {
    box-shadow: 1px 7px 20px #00dc82;
    height: 300px;
    width: 300px;
    border-radius: 7px;
    border: #00dc82 2px solid;
    z-index: 100;
    opacity: 1;

}

.button-client {
    margin: 1.2rem 1.5rem;
    transition: all .4s linear;
    border-radius: 8px;
    cursor: pointer;
    color: var(--color-text);
    font-weight: 600;
    transition: all 0.2s ease-in-out 0s;
    zoom: 1.3;
}

.button-client:hover {
    color: #00dc8280;
}

.button-client .icon {
    margin-top: -5px;
    margin-right: 5px;
    color: var(--color-text);
    transition: all 0.2s ease-in-out 0s;
}

.button-client:hover .icon {
    color: #00dc8280;
}

.head-name {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
}

.new-form h3{
    margin:0 5% 10px 5%;
}
.new-form h4{
    margin:0 5% 10px 5%;
}


.name {
    font-size: 1.6rem;
    line-height: 1.5rem;
    margin: .2rem 1.5rem;
    font-weight: 700;
    letter-spacing: 1.5px;
    color: #00dc82;

}

.email {
    font-size: .8rem;
    line-height: 1.5rem;
    margin: .2rem 1.6rem;
    font-weight: 700;
    letter-spacing: 1.1px;
    color: var(--color-text);

}

.whats {
    position: fixed;
    bottom: 4.5rem;
    right: .1rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    background-color: #edf2f7;
    height: 40px;
    width: 40px;
    color: #718096;
    box-shadow: 1px 1px 15px #00dc8250;
    transition: all 0.2s ease-in-out 0s;
    margin: 0rem 1.5rem;
    border-radius: 50%;
    cursor: pointer;
}

.whats:hover {
    background-color: #00dc8210;
    color: #00dc8280;
    box-shadow: 1px 1px 15px #00dc8280;
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
    background-color: #edf2f7;
    height: 100px;
    width: 100px;
    color: #718096;
    box-shadow: 1px 7px 20px #00dc82;
    margin: 1.5rem;
    border-radius: 7px;
}

.main-logo img {
    height: 100px;
    width: 100px;
    border-radius: 7px;
    border: #00dc82 2px solid;
    opacity: 1;

}

.body-timeline p {
    text-align: left;
    margin: 0 10px 20px 20px;
    color: var(--color-text);
}

.link {
    text-decoration: underline;
}

.link:hover {
    color: #00dc82;
}

.section-title {
    color: var(--color-text);
    text-align: left;
    margin: 10px 1.5rem;
    font-weight: 800;
}

.section-subtitle {
    color: #00dc82;
    text-align: left;
    margin: -10px 1.5rem 15px;
    font-weight: 800;
    font-size: .9em;
}

.section-option {
    text-align: left;
    margin: -10px 1.5rem 15px;
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

}

.menu-square {
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-weight: 800;
    width: 49.6%;
    padding: 5px;
    border-radius: 8px;
    margin: 1px auto;
    color: #00dc82;
    background-color: #00dc8210;
    border: solid .2px #00dc8210;
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
    color: var(--color-text);
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
    padding: 5px;
    margin: 1px auto;
    border: solid 1px #00dc8210;
    color: var(--color-text);
    background-color: #fff;
    border-bottom: solid .2px #00dc8230;
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
    margin: 2px 0px 0px 26px;
    transition: transform .3s linear;
    transform: translateX(-15px);
}

.menu-button .icon:nth-child(2) {
    margin: 5px 0px 0px 26px;
    transition: transform .3s linear;
    transform: translateX(-25px);
}

.menu-button:hover {
    background-color: #00dc8210;
    color: #00dc8280;
    cursor: pointer;
    border-bottom: solid .2px #00dc8250;
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
    border: solid 1px #00dc8210;
    color: var(--color-text);
    box-shadow: 0 0px 5px #00dc8210;
    border-radius: 8px;
    cursor: pointer;
    text-align: center;
    line-height: 18px;
    border-radius: 8px;
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
    background-color: #00dc8210;
    color: #00dc8280;
    cursor: pointer;
}

.logout:hover .icon {
    margin: 1px 0px 0px 6px;
    transform: translateX(0px);
}



.main-div-two {
    margin-top: 1rem;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: left;
}

.main-div-two .icon {
    color: #00dc82;
    zoom: 1.3;
}

.main-square {
    color: var(--color-text);
    background-color: #00dc8210;
    backdrop-filter: blur(5px);
    overflow-x: auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: .1rem 5%;
    border-radius: 8px;
    border: .1px solid #00dc8210;
    line-height: 1.4;
    transition: all .4s;
    border: 2px solid #00dc8210;
}

.main-square:hover {
    background-color: #00dc8230;
    border-right: 1px solid #00dc8230;

    border: 2px solid #00dc8220;
    border-top: 2px solid #00dc8240;
    border-bottom: 2px solid #00dc8240;
}

.main-square div:nth-child(1) {
    padding-right: 20px;

}

.main-square div:nth-child(2),
.main-square div:nth-child(3) {
    margin: auto;
    border: none;
}

.main-div-two H3 {
    margin-left: 20px;
    margin-top: 10px;
}

.main-div-two h4 {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.main-div-two a div {
    border-right: 2px solid #00dc8210;
    margin-left: 15px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.main-div-two h4 .icon {
    margin-left: 1px;
}

.main-div-two div .icon {
    margin-top: 0px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    zoom: 1.2;
}

.main-div-one {
    overflow-x: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 90px;
    width: 100%;
}

.main-div-one .icon {
    zoom: 1.3;
    color: #00dc82;
    margin-top: -2.5px;
}


.main-div-tree {
    margin-top: 1rem;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: left;
}

.main-div-tree H3 {
    margin-left: 20px;
    color: var(--color-text);
}

.main-div-tree .icon {
    color: #00dc82;
    margin-top: -4px;
}

.main-div-tree h4 {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.main-div-tree a div {
    margin: auto;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.main-div-tree h4 .icon {
    margin-left: 1px;
    zoom: 1.4;
}

.main-div-tree div .icon {
    margin-top: 0px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}


@media only screen and (max-width: 370px) {
    .head-logo {
        display: flex;
        justify-content: center;
        flex-direction: row-reverse;
        align-items: center;
        flex-wrap: wrap;
    }
    
    #posturaObs {
        width: 340px;
    }

    .logo {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }

    .logo img {
        height: 100px;
        width: 100px;
        border-radius: 7px;
        border: #00dc82 2px solid;

    }

    .button-client {
        margin: 2rem 1.5rem 1rem 1.5rem;
    }

    .head-name {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }


    .name {
        font-size: 1.6rem;
        line-height: 1.5rem;
        margin: .2rem 1.5rem;
        font-weight: 700;
        letter-spacing: 1.5px;
        text-align: center;
    }

    .whats {
        margin: 1rem 1.5rem;
    }

    .category {
        display: flex;
        justify-content: space-around;
        align-items: flex-start;
    }

    .category-plus {
        display: flex;
        flex-direction: column-reverse;
    }

    .button-plus a {
        margin: 1.5rem auto;
        cursor: pointer;
        transition: all .4s linear;
        border: solid 1px #00dc8210;
        box-shadow: 0 0px 5px #00dc8210;
        background-color: #fff;
        cursor: pointer;
        text-align: center;
        color: var(--color-text);
        line-height: 18px;
        border-radius: 8px;
        font-weight: 600;
        transition: all 0.2s ease-in-out 0s;
        font-size: 14px;
        padding: 8px 20px;
        text-align: center;
    }

    .button-plus a .icon {
        margin: 0 -8px 0 -5px;
    }

    .button-plus a:hover {
        margin: 0rem auto;
        transition: all .4s linear;
        border: solid 1px #00dc8210;
        box-shadow: 0 0px 5px #00dc8210;
        background-color: #edf2f7;
        cursor: pointer;
        width: 100px;
        text-align: center;
        color: #00dc8280;
        line-height: 18px;
        border-radius: 8px;
        transition: all 0.2s ease-in-out 0s;
        height: 34px;
        padding-top: 8px;
        padding-bottom: 8px;
    }

}
</style>
