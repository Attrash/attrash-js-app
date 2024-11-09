let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=20";
  let pokemonContainer = document.querySelector("#pokemon-container");

  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon entery not correct");
    }
  }
  function getAll() {
    return pokemonList;
  }
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function addListitem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener("click", () => {
      showDetails(pokemon);
    });
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
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon.name, "Height:" + pokemon.height, pokemon.imageUrl);
    });
  }
  function showModal(title, text, img) {
    pokemonContainer.innerHTML = "";
    let modal = document.createElement("div");
    modal.classList.add("modal");

    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";
    closeButtonElement.addEventListener("click", hideModal);

    let pokemonName = document.createElement("h1");
    pokemonName.innerText = title;

    let pokemonHeight = document.createElement("p");
    pokemonHeight.innerText = text;

    let pokemonImage = document.createElement("img");
    pokemonImage.setAttribute("src", img);
    pokemonImage.setAttribute("width", "100%");
    pokemonImage.setAttribute("height", "100%");

    modal.appendChild(closeButtonElement);
    modal.appendChild(pokemonName);
    modal.appendChild(pokemonHeight);
    modal.appendChild(pokemonImage);
    pokemonContainer.appendChild(modal);

    pokemonContainer.classList.add("is-visible");
  }
  function hideModal() {
    pokemonContainer.classList.remove("is-visible");
  }
  window.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      pokemonContainer.classList.contains("is-visible")
    ) {
      hideModal();
    }
  });
  pokemonContainer.addEventListener("click", (e) => {
    let target = e.target;
    if (target === pokemonContainer) {
      hideModal();
    }
  });

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
