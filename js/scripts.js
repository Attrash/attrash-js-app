let pokemonRepository = (function () {
  let pokemonList = [
    { name: "Evee", height: 1, types: ["normal"] },
    { name: "Jolteon", height: 2.07, types: ["electric"] },
    { name: "Vaporeon", height: 3.03, types: ["water"] },
  ];

  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  function getAll() {
    return pokemonList;
  }
  return {
    add: add,
    getAll: getAll,
  };
})();
const allPokemon = pokemonRepository.getAll();
allPokemon.forEach(displayPokemon);

function displayPokemon(pokemon) {
  document.write(`${pokemon.name} ${pokemon.height} ${pokemon.types} <br>`);
}
