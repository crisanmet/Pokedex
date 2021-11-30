const $links = document.querySelector(".links");
const URL = "https://pokeapi.co/api/v2/pokemon/";
const $main = document.querySelector(".main");
const $template = document.querySelector(".template-pokemon").content;
const $fragment = document.createDocumentFragment();

const obtenerListadoPokemons = async () => {
  try {
    let respuestaUrl = await fetch(URL);
    let jsonRespuesta = await respuestaUrl.json();

    $main.innerHTML = `<div class="animate__animated animate__pulse animate__infinite">
                          <img src="src/svg/pikachu.svg" alt="pikachu" class="block m-auto h-40"/>
                       </div>`;

    obtenerUrlPokemons(jsonRespuesta);
    if (!respuestaUrl.ok)
      throw {
        status: respuestaUrl.status,
      };
  } catch (err) {
    console.log(err);
    $main.innerHTML = `<p>Error: ${err.status}</p>`;
  }
};

const obtenerUrlPokemons = async (pokemons) => {
  for (let i = 0; i < pokemons.results.length; i++) {
    try {
      let respuestaPokemon = await fetch(pokemons.results[i].url);
      let pokemon = await respuestaPokemon.json();

      if (!respuestaPokemon.ok)
        throw {
          status: respuestaPokemon.status,
        };
      renderizarCardPokemon(pokemon);
    } catch (err) {
      console.log(err);
      $main.innerHTML = `<p>Error: ${err.status}</p>`;
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

document.addEventListener("DOMContentLoaded", () => {
  obtenerListadoPokemons();
});
