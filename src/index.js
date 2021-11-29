const $links = document.querySelector(".links");
const URL = "https://pokeapi.co/api/v2/pokemon/";
const $main = document.querySelector(".main");

const obtenerListadoPokemons = async () => {
  try {
    let respuestaUrl = await fetch(URL);
    let jsonRespuesta = await respuestaUrl.json();

    console.log(jsonRespuesta);

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
    //console.log(pokemon.results[i]);
    try {
      let respuestaPokemon = await fetch(pokemons.results[i].url);
      let pokemon = await respuestaPokemon.json();
      if (!respuestaPokemon.ok)
        throw {
          status: respuestaPokemon.status,
        };
      console.log(pokemon);
    } catch (err) {
      console.log(err);
      $main.innerHTML = `<p>Error: ${err.status}</p>`;
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  obtenerListadoPokemons();
});
