export default defineEventHandler((event) => {
  return {
    "nome": "Cristina",
    "nomeCompleto": "Cristina",
    "email": "",
    "senha": "",
    "foto": "https://api.nexwod.app/img/camilladimas.jpeg",
    "servico": "Personal Trainer",
    "objetivo": "Hipertrofia",
    "tempo": "60 min.",
    "dias": "5 dias",
    "treinoA": "Quadríceps/peito/tríceps",
    "treinoB": "Posterior/gluteo/costas",
    "treinoC": "",

    // Dados Menu Global
    "periodo": "01/03/24 - 01/04/24", // Dia do pagamento Mensal
    // 0 = bloqueado; 1 = pendente; 2 = Verificado
    "status": 2,
    // Treino atual
    "treinoActual": "02/03/24 - 01/04/24",
    // Próxima Treino 
    "treinoNext": "02/04/24",
    // Avaliação atual
    "valuationActual": "",
    // Próxima avaliação 
    "valuationNext": ""
  }
})
