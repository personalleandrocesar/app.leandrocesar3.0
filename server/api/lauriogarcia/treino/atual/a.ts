export default defineEventHandler((event) => {
  return [
    // Série Atual
    { id: 1, num: 'Exercício 1', nome: 'Supino reto hammer', sets: 3, reps: '8 +8', rest: '50"', grupo: '', obs: 'Rest-pause: Fazer 8 repetições, descansa 10": fazer + 10', img: 'https://api.nexwod.app/exe/supinoRetoHammer.png' },
    { id: 2, num: 'Exercício 2', nome: 'Supino reto (HBC)', sets: 3, reps: '10', rest: '50"', grupo: '', obs: '', img: 'https://api.nexwod.app/exe/supinoReto.gif' },
    { id: 3, num: 'Exercício 3', nome: 'Desenvolvimento de ombros (HBC)', sets: 3, reps: '10 c/2"', rest: '50"', grupo: '', obs: '', img: 'https://api.nexwod.app/exe/desenvolvimentoHalteres.gif' },
    { id: 4, num: 'Exercício 4', nome: 'Elevação Lateral (HBC)', sets: 3, reps: '20', rest: '50"', grupo: '', obs: '', img: 'https://api.nexwod.app/exe/elevacaoLateralHBC.gif' },
    { id: 5, num: 'Exercício 5', nome: 'Supino inclinado (HBL)', sets: 3, reps: '10', rest: '50"', grupo: '', obs: '', img: 'https://api.nexwod.app/exe/supino45HBL.gif' },
    { id: 6, num: 'Exercício 6', nome: 'Elevação Frontal (HBC)', sets: 3, reps: '10', rest: '50"', grupo: '', obs: 'Alternando - peg. neutra.', img: 'https://api.nexwod.app/exe/elevacaoFrontalHBC.gif' },
    { id: 7, num: 'Exercício 7', nome: 'Desenvolvimento de ombros (HBM)', sets: 3, reps: '15 (2T)', rest: '50"', grupo: '', obs: 'Fazer 2 tempos embaixo.', img: 'https://api.nexwod.app/exe/desenvolvimentoHBM.gif' },
    { id: 8, num: 'Exercício 8', nome: 'Tríceps mergulho no graviton', sets: 3, reps: '12', rest: '50"', grupo: '', obs: '', img: 'https://api.nexwod.app/exe/tricepsMergulho.gif' },
    { id: 9, num: 'Exercício 9', nome: 'Tríceps corda na polia alta', sets: 3, reps: '8 / 10 / 12', rest: '50"', grupo: '', obs: 'Pirâmide descrescente.', img: 'https://api.nexwod.app/exe/tricepsCorda.gif' },
    { id: 10, num: 'Exercício 10', nome: 'Tríceps testa HBC', sets: 3, reps: '10', rest: '50"', grupo: '', obs: '', img: 'https://api.nexwod.app/exe/tricepsTesta.gif' },
    { id: 11, num: 'Exercício 11', nome: 'Abdominal oblíquo', sets: 3, reps: '18', rest: '50"', grupo: '', obs: '', img: 'https://api.nexwod.app/exe/abdominalObliquo.gif' }



  //  { num: 'Exercício 1', nome: 'Supino reto', sets: 5, reps: '15 a 20', rest: '50"', grupo: '', obs: '', img: 'https://api.nexwod.app/img/preImagem.png'},
  //  { num: 'Exercício 2', nome: 'Remada cavalo', sets: 3, reps: '8 +10" +8', rest: '40"', grupo: '', obs: 'Pegada Neutra.', img: 'https://api.nexwod.app/img/preImagem.png'},
  //  { num: 'Exercício 3', nome: 'Supino inclinado (HBC)', sets: 3, reps: '8 c/1"', rest: '60"', grupo: '', obs: 'Segurar 1 segundo embaixo a cada repetição.', img: 'https://api.nexwod.app/img/preImagem.png'},
  //  { num: 'Exercício 4', nome: 'Puxada aberta pronada', sets: 3, reps: '8 a 10', rest: '60"', grupo: '', obs: 'Pegada neutra média.', img: 'https://api.nexwod.app/img/preImagem.png'},
  //  { num: 'Exercício 5', nome: 'Remada na polia baixa', sets: 3, reps: '8 +10"', rest: '50"', grupo: '', obs: 'Fazer 8 repetições e segurar 10 segundos no final do movimento na fase excêntrica.', img: 'https://api.nexwod.app/img/preImagem.png'},
  //  { num: 'Exercício 6', nome: 'Fly', sets: 3, reps: '5 / 8', rest: '60"', grupo: '', obs: 'Drop-set: fazer 5 falhando, diminui 2 ou 3 placas: +8.', img: 'https://api.nexwod.app/img/preImagem.png'},
  //  { num: 'Exercício 7', nome: 'Supino no cross-over', sets: 3, reps: '12', rest: '60"', grupo: '', obs: 'Peg. pronada.', img: 'https://api.nexwod.app/img/preImagem.png'},
  //  { num: 'Exercício 8', nome: 'Remada Máquina', sets: 3, reps: '10 2T', rest: '50"', grupo: '', obs: 'Fazer com a pegada pronada, com 2 tempos.', img: 'https://api.nexwod.app/img/preImagem.png'},
  //  { num: 'Exercício 9', nome: 'Puxada aparelho', sets: 3, reps: '15', rest: '40"', grupo: '', obs: '', img: 'https://api.nexwod.app/img/preImagem.png'},
  //  { num: 'Exercício 10', nome: 'Abdominal infra na paralela', sets: 3, reps: 'falha', rest: '40"', grupo: '', obs: 'Colocar caneleira de 2 kg e fazer até a falha.', img: 'https://api.nexwod.app/img/preImagem.png'},

    // Modelo
    // { num: 'Exercício 1', nome: '', sets: 3, reps: '', rest: '40"', grupo: '', obs: '', img: 'https://api.nexwod.app/img/preImagem.png'},
    // { num: 'Exercício 2', nome: '', sets: 3, reps: '', rest: '40"', grupo: '', obs: '', img: 'https://api.nexwod.app/img/preImagem.png'},
    // { num: 'Exercício 3', nome: '', sets: 3, reps: '', rest: '40"', grupo: '', obs: '', img: 'https://api.nexwod.app/img/preImagem.png'},
    // { num: 'Exercício 4', nome: '', sets: 3, reps: '', rest: '40"', grupo: '', obs: '', img: 'https://api.nexwod.app/img/preImagem.png'},
    // { num: 'Exercício 5', nome: '', sets: 3, reps: '', rest: '40"', grupo: '', obs: '', img: 'https://api.nexwod.app/img/preImagem.png'},
    // { num: 'Exercício 6', nome: '', sets: 3, reps: '', rest: '40"', grupo: '', obs: '', img: 'https://api.nexwod.app/img/preImagem.png'},
    // { num: 'Exercício 7', nome: '', sets: 3, reps: '', rest: '40"', grupo: '', obs: '', img: 'https://api.nexwod.app/img/preImagem.png'},
    // { num: 'Exercício 8', nome: '', sets: 3, reps: '', rest: '40"', grupo: '', obs: '', img: 'https://api.nexwod.app/img/preImagem.png'},
    // { num: 'Exercício 9', nome: '', sets: 3, reps: '', rest: '40"', grupo: '', obs: '', img: 'https://api.nexwod.app/img/preImagem.png'},
    // { num: 'Exercício 10', nome: '', sets: 3, reps: '', rest: '40"', grupo: '', obs: '', img: 'https://api.nexwod.app/img/preImagem.png'},
    // { num: 'Exercício 11', nome: '', sets: 3, reps: '', rest: '40"', grupo: '', obs: '', img: 'https://api.nexwod.app/img/preImagem.png'},

  ]
})
