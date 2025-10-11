export default defineEventHandler((event) => {
  return {
    "nome": "Pedro",
    "nomeCompleto": "Pedro Gonçalves",
    "email": "",
    "senha": "",
    "foto": "https://api.nexwod.app/img/pedrogoncalves.png",
    "objetivo": "Hipertrofia",
    "tempo": "60 min.",
    "dias": "6 dias",
    "treinoA": "Peito/Ombro/Tríceps",
    "treinoB": "Costa/Bíceps/abdominal",
    "treinoC": "Perna/abdominal",

    // Dados Menu Global
    "periodo": "04/02/24 - 04/03/24", // Dia do pagamento Mensal
    // 0 = bloqueado; 1 = pendente; 2 = Verificado
    "status": 2,
    // Treino atual
    "treinoActual": "21/02/24 - 20/03/24",
    // Próxima Treino 
    "treinoNext": "21/03/24",
    // Avaliação atual
    "valuationActual": "",
    // Próxima avaliação 
    "valuationNext": ""
  }
})
