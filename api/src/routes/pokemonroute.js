const {Router} = require("express")

const route = Router()
const {getPokemonApiSend ,getAllPokemonsSend ,getPokemonByName, getTypePokemon,
       getPokemonsById,createPokemonBd, getPokemonsCratedByMyself} = require("../controllers/indexController")

route.get("/", getAllPokemonsSend) 
route.get("/mypokemons", getPokemonsCratedByMyself) 
route.get("/apipokemons", getPokemonApiSend)  
route.get("/query", getPokemonByName) 
route.get("/codigo/:id",getPokemonsById)
route.get("/types",getTypePokemon )
route.post("/",createPokemonBd)


module.exports = route