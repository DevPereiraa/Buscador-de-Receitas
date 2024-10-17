/* 
    Logica

    [x] Pegar infromação do Input, quando o botão for clicado
    [x] Ir até a API, e trazer as receitas 
    [x] Colocar as receitas na tela
    [x] Saber quando o usuário cliclou na receita
    [x] Buscar informações da receita individual na API
    [x] Colocar a receita individual na tela
*/

const input = document.querySelector(".search-Input");
const form = document.querySelector(".search-form");
const recipelist = document.querySelector(".recipe-list");
const recipedetails = document.querySelector(".recipe-details");

//Pegar informação do input

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const inputValue = event.target[0].value;

    searchReceita(inputValue);
});

// Pegar receita da API

async function searchReceita(receita) {
    recipelist.innerHTML = `<p>Carregando Receita...</p>`
    try {
        const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${receita}`
        );

        const data = await response.json();

        mostrarReceita(data.meals);
        }   catch(err){
            recipelist.innerHTML = `<p>Nenhuma receita encontrada</p>`
        }
}


// Mostrar receita na tela

function mostrarReceita(receita) {
    recipelist.innerHTML = receita.map(
    (item) => ` 
        <div class="recipe-card" onclick="pegarDetalhes(${item.idMeal})">
            <img src="${item.strMealThumb}" alt="receita-foto"></img>
            <h3>${item.strMeal}</h3>
            
        </div>
        `
    ).join('')
}


//

async function pegarDetalhes(id){
    const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    )

    const data = await response.json();
    const receita = data.meals[0]

    let ingredient = ''

    for(let i = 1; i <= 20; i++){
        if(receita[`strIngredient${i}`]){
            ingredient += `<li>${receita[`strIngredient${i}`]} - ${receita[`strMeasure${i}`]}</li>`

        } else{
            break;
        }
    }

    recipedetails.innerHTML = `
    <h2>${receita.strMeal}</h2>
    <img src="${receita.strMealThumb}" alt=${receita.strMeal} class="receita-img">
    <h3>Categoria: ${receita.strCategory}</h3>
    <h3>Origem: ${receita.strArea}</h3>
    <h3>Ingredientes: ${ingredient}</h3>
    <h3>Instruções:</h3>
    <p>${receita.strInstructions}</p>
    <p>Tags: ${receita.strTags}</p>
    <p>Vídeo: <a href="${receita.strYoutube}" target="_blank">Assita no Youtube</p>
    `
}