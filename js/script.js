const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toString().toLowerCase()}`);
	if (apiResponse.status === 200) {
		const data = await apiResponse.json();
		return data;
	}
}

const renderPokemon = async (pokemon) => {
	pokemonImage.style.display = 'none';
	pokemonName.innerHTML = 'Loading...';
	pokemonNumber.innerHTML = '';
	const data = await fetchPokemon(pokemon);

	if (data) {
		pokemonName.innerHTML = data.name;
		pokemonNumber.innerHTML = data.id;
		searchPokemon = data.id;

		pokemonImage.style.display = 'block';
		pokemonImage.src = data.sprites.versions['generation-v']['black-white'].animated.front_default;
	}	else {
		searchPokemon = 0
		pokemonImage.style.display = 'none';
		pokemonName.innerHTML = 'Not Found :(';
		pokemonNumber.innerHTML = '';
	}
		
	input.value = '';
}

form.addEventListener('submit', (evt) => {
	evt.preventDefault();
	renderPokemon(input.value);
});

btnNext.addEventListener('click', (evt) => {
	searchPokemon += 1;
	renderPokemon(searchPokemon);
});

btnPrev.addEventListener('click', (evt) => {
	if (searchPokemon <= 1) return;
	searchPokemon -= 1;
	renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/6.gif
