const expense = document.querySelector("#expense");
const category = document.querySelector("#category");
const form = document.querySelector("form");

//Seleciona os elementos da lista.
const expenseList = document.querySelector("ul");

//Tirando as Letras Do input,É deixando apenas números.
const amount = document.querySelector("#amount");
amount.oninput = () => {
  let value = amount.value.replace(/\D/g, "");
  //trasforma o valor em centavos (exemplo: 150/100 = 1.5 que é equivalente a R$1,50).
  value = Number(value) / 100;

  amount.value = fomatCurrencyBRL(value);
};

function fomatCurrencyBRL(value) {
  //Formata o valor padrão BRL (Real Brasileiro)
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  //Retorna o valor Formatado
  return value;
}

//Captura o evento de submit do formulário para obter os valores.
form.onsubmit = (event) => {
  //Previne o compotamento padrão de recarregar a página.
  event.preventDefault();

  //cria um objeto com os detalhes na nova despesa
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  };
  //chama a função que irá adicionar o item na lista.
  expenseAdd(newExpense);
};

function expenseAdd(newExpense) {
  try {
    //cria o o elemento para adicionar o item (li) na lista (ul).
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    // Cria o ícone da categoria.
    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name);

    //Criar a info da despesa.
    const expensedeInfo = document.createElement("div");
    expensedeInfo.classList.add("expense-info");

    //Cria o nome da despesa.
    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense;

    //Cria a categoria da despesa.
    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name;

    //Adiciona nome e categoria na div das informações da despesa.
    expensedeInfo.append(expenseName, expenseCategory);

    //Cria o valor da despesa
    
    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount");
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", " ")}`;

    //Adiciona as informações no item
    expenseItem.append(expenseIcon, expensedeInfo, expenseAmount);

    //Adiciona o item na lista.
    expenseList.append(expenseItem);
  } catch (error) {
    alert("Não Foi possível atualizar a lista de despesas");
    console.log(error);
  }
}
