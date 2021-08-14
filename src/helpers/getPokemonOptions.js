import pokemonApi from '../api/pokemonApi'

const getPokemons = () => {


    // nuevo del EcmaScript, crear un arreglo de otro arreglo
    const pokemonsArr = Array.from(Array(650))
        // mapear el arreglo para darle un valor a cada posicion
    return pokemonsArr.map((_, index) => index + 1)
}

const getPokemonOptions = async() => {


    //para sacar pokemons de forma aleatoria, el -0,5 es para que saque negativos tambien
    const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5)
        // Aqui cogemos 4 desde la posicion 0 del array
    const pokemons = await getPokemonNames(mixedPokemons.splice(0, 4))

    return pokemons


}


const getPokemonNames = async([pok1, pok2, pok3, pok4] = []) => {

    // const resp = await pokemonApi.get(`/1`)
    // console.log(resp.data.name);

    // console.log(pok1, pok2, pok3, pok4);

    // Para hacer las 4 peticiones

    const arrayPromesas = [
        pokemonApi.get(`/${pok1}`),
        pokemonApi.get(`/${pok2}`),
        pokemonApi.get(`/${pok3}`),
        pokemonApi.get(`/${pok4}`),
    ]

    // Desestructuramos el array
    const [poke1, poke2, poke3, poke4] = await Promise.all(arrayPromesas)

    // lo retornamos con sus parametros

    return [{
            name: poke1.data.name,
            id: poke1.data.id
        },
        {
            name: poke2.data.name,
            id: poke2.data.id
        }, {
            name: poke3.data.name,
            id: poke4.data.id
        }, {
            name: poke4.data.name,
            id: poke4.data.id
        },
    ]
}




export default getPokemonOptions