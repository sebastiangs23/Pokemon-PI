const {Router} = require("express")

const route = Router()
const {getAllPokemons ,getPokemonByName, getTypePokemon,getPokemonsById,createPokemonBd} = require("../controllers/indexController")

route.get("/", getAllPokemons) 
route.get("/query", getPokemonByName) 
route.get("/codigo/:id",getPokemonsById)
route.get("/types",getTypePokemon )
route.post("/",createPokemonBd)

module.exports = route