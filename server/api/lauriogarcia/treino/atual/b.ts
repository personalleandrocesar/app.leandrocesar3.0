export default defineEventHandler((event) => {
  return [
    // Série Atual
    { id: 1, num: 'Exercício 1', nome: 'Remada hammer', sets: 3, reps: '8 +8" +8', rest: '50"', grupo: '', obs: 'Fazer 8 repetições + 10" de isometria +8; fazer peg. pronada.', img: 'https://api.nexwod.app/exe/remadaAparelhoNeutra.png' },
    { id: 2, num: 'Exercício 2', nome: 'Puxada hammer', sets: 3, reps: '10', rest: '50"', grupo: '', obs: '', img: 'https://api.nexwod.app/exe/puxadaNeutraFechada.jpg' },
    { id: 3, num: 'Exercício 3', nome: 'Remada na polia baixa', sets: 3, reps: '12 c/2"', rest: '50"', grupo: '', obs: 'Pegada neutra, segurando 2 segundos a cada repetição.', img: 'https://api.nexwod.app/exe/remadaPoliaBaixa.gif' },
    { id: 4, num: 'Exercício 4', nome: 'Puxada pronada aberta', sets: 3, reps: '20', rest: '50"', grupo: '', obs: '', img: 'https://api.nexwod.app/exe/puxadaFrente.gif' },
    { id: 5, num: 'Exercício 5', nome: 'Crucifixo inverso aparelho', sets: 3, reps: '10', rest: '50"', grupo: '', obs: '', img: 'https://api.nexwod.app/exe/crucifixoDorsal.gif' },
    { id: 6, num: 'Exercício 6', nome: 'Remada alta na polia baixa', sets: 3, reps: '10 c/1"', rest: '50"', grupo: '', obs: 'Segurar 1 segundo a cada repetição.', img: 'https://api.nexwod.app/exe/remadaAlta.gif' },
    { id: 7, num: 'Exercício 7', nome: 'Bíceps invertido + bíceps normal', sets: 3, reps: '10 +10', rest: '50"', grupo: '', obs: 'Fazer na polia baixa.', img: 'https://api.nexwod.app/exe/bicepsPolia.gif' },
    { id: 8, num: 'Exercício 8', nome: 'Bíceps aparelho', sets: 3, reps: '12', rest: '50"', grupo: '', obs: 'Fazer 2 tempos.', img: 'https://api.nexwod.app/exe/bicepsAparelho.gif' },
    { id: 9, num: 'Exercício 9', nome: 'Bíceps barra reta', sets: 3, reps: '8', rest: '50"', grupo: '', obs: 'Colocar a mão na barra na direção do ombro.', img: 'https://api.nexwod.app/exe/bicepsBarra.gif' },
    { id: 10, num: 'Exercício 10', nome: 'Abdominal infra na paralela', sets: 3, reps: '20', rest: '50"', grupo: '', obs: '', img: 'https://api.nexwod.app/exe/abdominalInfraParalela.png' },


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
