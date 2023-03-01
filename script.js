// Define constantes para referenciar elementos do DOM
const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.imagem_pokemon');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

// Initialize variable to hold current search Pokemon ID
let searchPokemon = 1;

 
const fetchPokemon = async (pokemon) => { 
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status == 200){
    const data = await APIResponse.json();
    return data;
    }
}

// Define uma função assíncrona para exibir os dados do Pokémon na página
const renderPokemon = async (pokemon) => {

  // Exibe mensagem de carregamento enquanto espera pelos dados serem carregados
    pokemonName.innerHTML = 'Loading...';

  // Busca os dados do Pokémon na API
    const data = await fetchPokemon(pokemon);

    // Se os dados do Pokémon forem obtidos com sucesso, exibe-os na página
    if(data) { 
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
    } else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not Found';
        pokemonNumber.innerHTML = '';

    }

}

// Adiciona um ouvinte de evento ao elemento de formulário para lidar com a submissão da pesquisa de Pokémon
form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
 
}); 

// Adiciona um ouvinte de evento ao botão "Anterior" para lidar com a navegação até o Pokémon anterior
buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1){
  searchPokemon -= 1;
  renderPokemon(searchPokemon)
  }
}); 

// Adiciona um ouvinte de evento ao botão "Próximo" para lidar com a navegação até o próximo Pokémon
buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
}); 

// Chama a função renderPokemon inicialmente com o ID de Pokémon de pesquisa padrão
renderPokemon(searchPokemon);