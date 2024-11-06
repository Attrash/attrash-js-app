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
  function addListitem(pokemon) {
      let pokemonList = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.textContent = pokemon.name;
      button.classList.add('button');
      listItem.appendChild(button);
      pokemonList.appendChild(listItem);
      button.addEventListener('click', () => {
        showDetails(pokemon);
      }) 
  }
  function showDetails(pokemon){
    console.log(pokemon);
  }
  return {
    add: add,
    getAll: getAll,
    addListitem: addListitem,
    showDetails: showDetails,
  };
})();
const allPokemon = pokemonRepository.getAll();
  allPokemon.forEach( pokemon => {
    pokemonRepository.addListitem(pokemon);
  })





