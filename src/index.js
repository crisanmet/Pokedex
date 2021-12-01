const $links = document.querySelector(".links");
const API = "https://pokeapi.co/api/v2/pokemon/";
const $main = document.querySelector(".main");
const $template = document.querySelector(".template-pokemon").content;
const $fragment = document.createDocumentFragment();

const obtenerListadoPokemons = async (URL) => {
  try {
    let respuestaUrl = await fetch(URL);
    let jsonRespuesta = await respuestaUrl.json();

    obtenerUrlPokemons(jsonRespuesta);
    paginacionPokemon(jsonRespuesta);
  } catch (err) {
    console.log(err);
    $main.innerHTML = `<p>Error al cargar los pokemones</p>`;
  }
};

const obtenerUrlPokemons = async (pokemons) => {
  for (let i = 0; i < pokemons.results.length; i++) {
    try {
      let respuestaPokemon = await fetch(pokemons.results[i].url);
      let pokemon = await respuestaPokemon.json();

      renderizarCardPokemon(pokemon);
    } catch (err) {
      console.log(err);
      $main.innerHTML = `<p>Error al cargar los pokemones</p>`;
    }
  }
  $main.innerHTML = ``;
  $main.appendChild($fragment);
};

const renderizarCardPokemon = (pokemon) => {
  $template
    .querySelector(".img-pokemon")
    .setAttribute("src", pokemon.sprites.other.dream_world.front_default);

  $template.querySelector(".nombre").textContent = pokemon.name;
  $template.querySelector(".tipo1").textContent = pokemon.types[0].type.name;
  $template.querySelector("#color-tipo").className = pokemon.types[0].type.name;
  $template.querySelector(".ataque").textContent = pokemon.stats[1].base_stat;
  $template.querySelector(".defensa").textContent = pokemon.stats[2].base_stat;
  $template.querySelector(".exp").textContent = pokemon.base_experience;
  const clone = $template.cloneNode(true);

  $fragment.appendChild(clone);
};

const paginacionPokemon = (link) => {
  let $siguientePagina = link.next;
  let $anteriorPagina = link.previuos;

  if ($siguientePagina) {
    let anchor = document.createElement("a");
    anchor.setAttribute("href", $siguientePagina);
    anchor.className = "paginador";
    anchor.innerHTML = `⏭️`;
    $links.appendChild(anchor);
  }
  if ($anteriorPagina) {
    let anchor = document.createElement("a");
    anchor.setAttribute("href", $anteriorPagina);
    anchor.className = "paginador";
    anchor.innerHTML = `⏭️`;
    $links.appendChild(anchor);
  }
};
document.addEventListener("DOMContentLoaded", () => {
  obtenerListadoPokemons(API);
});
document.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("paginador")) {
    let $pagina = e.target.getAttribute("href");
    obtenerListadoPokemons($pagina);
    console.log($pagina);
  }
});
