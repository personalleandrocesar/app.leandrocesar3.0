# leandrocesar.app
### Rota: `/form`


#### Método: POST
> Cadastro de clientes

Definindo o inputs do formulário:

- Nome
- Sobrenome
- Sexo
- Data de nascimento
- WhatsApp
- Serviço
- Usuário
- E-mail
- Senha
- Objetivo
- Dias p/ semana
- Tempo de Treino
- Dia do pagamento
- Início do Período
- Fim do Período

---

### Rota: `/admin`

#### Método: GET
#### Clientes

> Graficos de Cliente já cadastrados
> - Quantidade de clientes total    
> - Quantidade de clientes em cada Serviço
> - Quantidade de clientes em cada Serviço
> - Quantidade de clientes ativos
> - Quantidade de clientes Inativos

#### treinos

> Graficos de Cliente já cadastrados
> - Quantidade de treinos no total    

---

### Rota: `/admin/clientes`

#### Método: GET
> Lista de Cliente já cadastrados

#### Método: POST
> Cria um novo usúario!

Definindo o inputs do formulário:

- Nome
- Sobrenome
- Sexo
- Data de nascimento
- WhatsApp
- Serviço
- Usuário
- E-mail
- Senha
- Objetivo
- Dias p/ semana
- Tempo de Treino
- Início do Período
- Fim do Período
- Dia do vencimento
- Status

---

### Rota: `/admin/clientes/:id`

#### Método: GET
> Pegar os dados do cliente em mostrar na tela

O que aparecerá:

- Nome
- Sobrenome
- Sexo
- Data de nascimento
- WhatsApp
- Idade
- Usuário
- Serviço
- Objetivo
- Dias p/ semana
- Tempo de Treino
- Início do Período
- Fim do Período
- Dia do vencimento
- Status



## Métodos javascript

### Método 'replace()'


Para inverter a ordem de uma data no formato YYYY-MM-DD para DD-MM-YYYY usando o método replace do JavaScript, você pode usar uma expressão regular. Aqui está um exemplo de como fazer isso:

```javascript
const date = '1986-10-08';
const reversedDate = date.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3-$2-$1');
console.log(reversedDate); // Output: 08-10-1986
``` 

eu usei apenas:

```javascript
.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3-$2-$1') 
```


slice(-1).reverse()

slice(0, qtTreinos.length - 1)