//Tirando as Letras Do input,É deixando apenas números.
const amount = document.querySelector('#amount')
amount.oninput= ()=>{
let value=amount.value.replace(/\D/g, "")
//trasforma o valor em centavos (exemplo: 150/100 = 1.5 que é equivalente a R$1,50).
value=Number(value) /100

amount.value= fomatCurrencyBRL(value)
}

function fomatCurrencyBRL(value){
        //Formata o valor padrão BRL (Real Brasileiro)
value=value.toLocaleString('pt-BR', {
        style: "currency",
        currency: "BRL",
})
//Retorna o valor Formatado
return value
}