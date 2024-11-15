let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=20";
  let pokemonContainer = document.querySelector("#pokemon-container");

  function getAll() {
    return pokemonList;
  }
  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon entery not correct");
    }
  }
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  function addListitem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class", "btn", "btn-primary");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#pokemonModal");
    
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener("click", () => {
      showDetails(pokemon);
    });
  }
  $('[data-toggle="modal"]').on('click', function(){
    let targetSelector = $(this).attr('button');
    $(targetSelector).modal('show');
  });
  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon);
      $('#pokemonModal').modal('show');
    });
  }
  function showModal(pokemon) {
    let modalTitle = $('#pokemonModalLabel');
    let modalBody = $('.modal-body');
    let modalImage = $('#pokemonImage');
    let pokemonHeight = $('#pokemonHeight');
  

    modalTitle.text(pokemon.name);    
    pokemonHeight.text('Height:' + ' ' + pokemon.height);
    modalImage.attr("src", pokemon.imageUrl);
    
    modalBody.empty();
    modalBody.append(modalImage);
    modalBody.append(pokemonHeight);

    modalTitle.append(modalTitle);
    modalBody.append(modalImage);
    modalBody.append(pokemonHeight);
  }

  return {
    add: add,
    getAll: getAll,
    addListitem: addListitem,
    loadList: loadList,
    showDetails: showDetails,
    loadDetails: loadDetails,
  };
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListitem(pokemon);
  });
});
