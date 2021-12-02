const $links = document.querySelector(".links");
const API = "https://pokeapi.co/api/v2/pokemon/";
const $main = document.querySelector(".main");
const $template = document.querySelector(".template-pokemon").content;
const $fragment = document.createDocumentFragment();
const $loader = document.querySelector(".loader");
const $buscador = document.querySelector(".buscador");
const $templatePokemonBuscado = document.querySelector(
  ".template-pokemon-buscado"
).content;

const obtenerListadoPokemons = async (URL) => {
  try {
    let respuestaUrl = await fetch(URL);
    let jsonRespuesta = await respuestaUrl.json();

    activarLoader();
    obtenerUrlPokemons(jsonRespuesta);
    paginadorPokemon(jsonRespuesta);
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

const paginadorPokemon = (link) => {
  let $siguientePagina = link.next;
  let $anteriorPagina = link.previous;
  let $div = document.createElement("div");
  $div.className = "contenedor-links";

  if ($anteriorPagina) {
    $links.innerHTML = ``;
    let anchor = document.createElement("a");
    let imgFlecha = document.createElement("img");
    anchor.setAttribute("href", $anteriorPagina);
    imgFlecha.className = "paginador";
    imgFlecha.setAttribute("src", "src/svg/previous.png");

    anchor.appendChild(imgFlecha);
    $div.appendChild(anchor);
  }
  if ($siguientePagina) {
    $links.innerHTML = ``;
    let anchor = document.createElement("a");
    let imgFlecha = document.createElement("img");
    anchor.setAttribute("href", $siguientePagina);
    imgFlecha.className = "paginador";
    imgFlecha.setAttribute("src", "src/svg/next.png");

    anchor.appendChild(imgFlecha);
    $div.appendChild(anchor);
  }
  $links.appendChild($div);
};

const renderizarCardPokemonBuscado = (pokemon) => {
  $templatePokemonBuscado
    .querySelector(".img-pokemon")
    .setAttribute("src", pokemon.sprites.other.dream_world.front_default);

  $templatePokemonBuscado.querySelector(".nombre").textContent = pokemon.name;
  $templatePokemonBuscado.querySelector(".id").textContent = `ID:${pokemon.id}`;
  $templatePokemonBuscado.querySelector(".tipo1").textContent =
    pokemon.types[0].type.name;
  $templatePokemonBuscado.querySelector("#color-tipo").className =
    pokemon.types[0].type.name;
  $templatePokemonBuscado.querySelector(".altura").textContent = pokemon.height;
  $templatePokemonBuscado.querySelector(".peso").textContent = pokemon.weight;
  $templatePokemonBuscado.querySelector(".habilidad").textContent =
    pokemon.abilities[0].ability.name;
  const clone = $templatePokemonBuscado.cloneNode(true);
  $main.innerHTML = "";
  $main.appendChild(clone);
};

$buscador.addEventListener("click", (e) => {
  const $inputBuscador = document.querySelector(".input-buscador");
  fetch(
    `https://pokeapi.co/api/v2/pokemon/${$inputBuscador.value.toLowerCase()}`
  )
    .then((res) => res.json())
    .then((pokemon) => renderizarCardPokemonBuscado(pokemon))
    .catch(
      (err) =>
        ($main.innerHTML = `<p class="p-3">No se encontró el Pokemon...Probá con Charmander.</p>`)
    );
  $inputBuscador.value = "";
});

const activarLoader = () => {
  $main.innerHTML = `
                  <div class="animate__animated animate__pulse animate__infinite loader p-4">
                      <img src="src/svg/pikachu.svg" alt="pikachu" class="block m-auto h-40"/>
                  </div>
`;
};

document.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("paginador")) {
    let $pagina = e.target.parentElement.getAttribute("href");
    obtenerListadoPokemons($pagina);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  obtenerListadoPokemons(API);
});
