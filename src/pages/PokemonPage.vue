<template>
<h1 v-if="!pokemon"> Espere por favor...</h1>

  <div v-else>

  <h1>¿ Quién es este Pokémon ?</h1>

  <PokemonPicture 
            :pokemonId="pokemon.id" 
            :showPokemon="showPokemon" 
            />
  
  <PokemonOptions 
            :pokemons="pokemonArr" 
            @selection="checkAnswer" />

  </div>

  <template v-if="showAnswer">
            <h2 class="fade-in">{{ message }}</h2>
            <button @click="newGame">
                Nuevo Juego
            </button>
  </template>

  
</template>

<script>
import PokemonOptions from '@/components/PokemonOptions'
import PokemonPicture from '@/components/PokemonPicture'

import getPokemonOptions from '@/helpers/getPokemonOptions'


export default {

  components: { PokemonOptions, PokemonPicture },
    data() {
        return {
            pokemonArr: [],
            pokemon: null,
            showPokemon: false,
            showAnswer: false,
            message: ''
        }
    },

  methods:{

    async mixPokemonArray(){
      this.pokemonArr = await getPokemonOptions()

      const randomInt = Math.floor(Math.random()*4)

      this.pokemon = this.pokemonArr[randomInt]
    },
    checkAnswer(pokemonId){

      this.showPokemon = true
      this.showAnswer  = true


      if(pokemonId === this.pokemon.id ){
        this.message = `Correcto, ${this.pokemon.name}`
      }else{
        this.message = `Error, era ${this.pokemon.name} `
      }
      
    },
    newGame() {

            this.showPokemon = false
            this.showAnswer  = false
            this.pokemonArr  = []
            this.pokemon     = null
            this.mixPokemonArray()            

        }
  },

  // lifecycle hook, se ejecuta cuando el componente se ha montado
  mounted(){
    this.mixPokemonArray()
  }

}
</script>

<style>

</style>