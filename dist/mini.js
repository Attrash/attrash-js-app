let pokemonRepository=function(){let t=[];function e(){return t}function o(e){"object"==typeof e&&"name"in e?t.push(e):console.log("pokemon entery not correct")}function n(t){pokemonRepository.loadDetails(t).then(function(){var e;let o,n,i,a;e=t,o=$("#pokemonModalLabel"),n=$(".modal-body"),i=$("#pokemonImage"),a=$("#pokemonHeight"),o.text(e.name),a.text("Height: "+e.height),i.attr("src",e.imageUrl),n.empty(),n.append(i),n.append(a),o.append(o),n.append(i),n.append(a),$("#pokemonModal").modal("show")})}return document.querySelector("#pokemon-container"),$('[data-toggle="modal"]').on("click",function(){let t=$(this).attr("button");$(t).modal("show")}),{add:o,getAll:e,addListitem:function t(e){let o=document.querySelector(".pokemon-list"),i=document.createElement("li");i.classList.add("list-group-item");let a=document.createElement("button");a.innerText=e.name,a.classList.add("button-class","btn","btn-primary"),a.setAttribute("data-toggle","modal"),a.setAttribute("data-target","#pokemonModal"),i.appendChild(a),o.appendChild(i),a.addEventListener("click",()=>{n(e)})},loadList:function t(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=20").then(function(t){return t.json()}).then(function(t){t.results.forEach(function(t){o({name:t.name,detailsUrl:t.url})})}).catch(function(t){console.error(t)})},showDetails:n,loadDetails:function t(e){return fetch(e.detailsUrl).then(function(t){return t.json()}).then(function(t){e.imageUrl=t.sprites.front_default,e.height=t.height}).catch(function(t){console.error(t)})}}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(t){pokemonRepository.addListitem(t)})});