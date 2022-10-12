const {Router} = require("express")


const route = Router()
const {getPokemonApi,getAllPokemons ,getPokemonByName, getTypePokemon,getPokemonsById,createPokemonBd} = require("../controllers/indexController")



route.get("/", getAllPokemons) //fn que solo trae datos de la API
route.get("/query", getPokemonByName) 
route.get("/codigo/:id",getPokemonsById)
route.get("/types",getTypePokemon )
route.post("/",createPokemonBd)

//aca ira la que crea los pokemons

module.exports = route