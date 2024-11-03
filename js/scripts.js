let pokemonList = [
  { name: 'Evee', height: 1, types: ['normal'] },
  { name: 'Jolteon', height: 2.07, types: ['electric'] },
  { name: 'Vaporeon', height: 3.03, types: ['water'] },
];
pokemonList.forEach(displayPokemon);

  function displayPokemon(pokemon){
  document.write(`${pokemon.name} (height: ${pokemon.height}) ${pokemon.height > 3 ? ' - Wow that\'s big!!' : ''}<br>`)
  }

