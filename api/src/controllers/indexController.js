//Aca iran las fn que me traeran las datos de la API y luego lo imporare en routes

const { Pokemon, Types } = require("../db")
const axios = require("axios")
const POKEMON_URL = "https://pokeapi.co/api/v2/pokemon"

const getPokemonApi = async (req, res) => { //Fn que trae los datos necesarios de la API
    try {
        const primeros20 = await axios.get(POKEMON_URL)  //En el readme indica que solo 40
        const segundos20 = await axios.get(primeros20.data.next) //Arriba 20 y aca 20 = 40

        const pokedata1 = primeros20.data.results.map((e) => axios.get(e.url))
        const pokedata2 = segundos20.data.results.map((e) => axios.get(e.url))

        const concatPokemon = pokedata1.concat(pokedata2)

        const promisePokemon = await Promise.all(concatPokemon).then((e) => {
            let pokemon = e.map((e) => e.data)

            let pokemonsApi = []
            pokemon.map((e) => {
                let saveurlimg = e.sprites.other["official-artwork"].front_default

                pokemonsApi.push({
                    id: e.id,
                    name: e.name,
                    types: e.types.map((e) => e.type.name),
                    hp: e.stats[0].base_stat,
                    attack: e.stats[1].base_stat,
                    defense: e.stats[2].base_stat,
                    speed: e.stats[5].base_stat,
                    height: e.height,
                    weight: e.weight,
                    image: saveurlimg,

                })
            })
            return pokemonsApi
        })
        return promisePokemon
    } catch (error) {
        console.log(error)
        res.status(400).send("Hubo un error al cargar los pokemones de la API")
    }
}

const getPokemonApiSend = async (req,res) => {//fn exclusiva para saber en el filtro los pokemones que no hemos creado nosotros 
    const send = await getPokemonApi()
    res.send(send)
} 

const getAllPokemons = async (req, res) => {
    try {
        const allPokeApi = await getPokemonApi() //De la API
        const allPokeDb = await Pokemon.findAll({ //De la Db
            include: [{
                model: Types,
                attributes: ["name"]
            }]
        })
        const fullPokemons = allPokeDb.concat(allPokeApi)
        res.send(fullPokemons)

    } catch (error) {
        console.log(error)
        res.status(400).send("Error al cargar todos los pokemones")
    }   
}

const getAllPokemonsBug = async (req, res) => {
    try {
        const allPokeApi = await getPokemonApi() //De la API
        const allPokeDb = await Pokemon.findAll({ //De la Db
            include: [{
                model: Types,
                attributes: ["name"]
            }]
        })
        const fullPokemons = allPokeDb.concat(allPokeApi)
        return fullPokemons

    } catch (error) {
        console.log(error)
        res.status(400).send("Error al cargar todos los pokemones")
    }   
}

const getPokemonsById = async (req, res) => {

    const { id } = req.params
    try{
        if (id.length > 4) {
            let busquedaDb = await Pokemon.findByPk(id, { include: { model: Types } }) //En caso este en la DB
            let ordenarPokeDb = {
                id: busquedaDb.id,
                image: busquedaDb.image,
                name: busquedaDb.name,
                types: busquedaDb.types.map((t) => t.name),
                hp: busquedaDb.hp,
                attack: busquedaDb.attack,
                defense: busquedaDb.defense,
                speed: busquedaDb.speed,
                height: busquedaDb.height,
                weight: busquedaDb.weight,
            }
            var wrap = []  //Lo necesito en un array por la fn que tengo al momento de renderizar los details
            wrap.push(ordenarPokeDb)
            res.send(wrap)
        } else {
            const pokeApiName = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`) //En caso este en la API
    
            let saveImageUrl = pokeApiName.data.sprites.other["official-artwork"].front_default
            const pokeApiFiltrado = [{
                id: pokeApiName.data.id,
                name: pokeApiName.data.forms[0].name,
                types: pokeApiName.data.types.map((e) => e.type.name),
                hp: pokeApiName.data.stats[0].base_stat,
                attack: pokeApiName.data.stats[1].base_stat,
                defense: pokeApiName.data.stats[2].base_stat,
                speed: pokeApiName.data.stats[5].base_stat,
                height: pokeApiName.data.height,
                weight: pokeApiName.data.weight,
                image: saveImageUrl
            }]
    
            if (pokeApiFiltrado.length) {
                res.send(pokeApiFiltrado)
                return "Se encontro en la API"
            }
        }
    }catch(error){
        res.status(400).send("No se encontro ningun pokemon con ese ID")
    }
    

}

const getPokemonByName = async (req, res) => {
    try {
        const { name } = req.query //

        const pokeDb = await Pokemon.findAll({  //1ero buscamos en la DB
            include: [{
                model: Types,
                attributes: ["name"]
            }],
            where: { name: name }
        })

        if (pokeDb.length) {
            res.send(pokeDb)
            return "Se encontro en la DB"
        }

        const pokeApiName = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`) //2do buscamos en la API

        let saveImageUrl = pokeApiName.data.sprites.other["official-artwork"].front_default
        const pokeApiFiltrado = [{
            id: pokeApiName.data.id,
            name: pokeApiName.data.forms[0].name,
            types: pokeApiName.data.types.map((e) => e.type.name),
            hp: pokeApiName.data.stats[0].base_stat,
            attack: pokeApiName.data.stats[1].base_stat,
            defense: pokeApiName.data.stats[2].base_stat,
            speed: pokeApiName.data.stats[5].base_stat,
            height: pokeApiName.data.height,
            weight: pokeApiName.data.weight,
            image: saveImageUrl
        }]


        if (pokeApiFiltrado.length) {
            res.send(pokeApiFiltrado)
        }

    } catch (error) {
        res.status(400).send("No se encontro el pokemon mediante el nombre")
    }
}

const createPokemonBd = async (req, res) => {
    try {
        const { name, types, hp, attack, defense, speed, height, weight, image } = req.body //pq aca te va estar llegando un array
        

        let allPokes = await getAllPokemonsBug()

        let seRepite = allPokes.filter((e) => e.name.toLowerCase() ===  name.toLowerCase())

        if(seRepite.length){
            res.status(400).send("El nombre del Pokemon ya existe")
        }else{

            const nuevoPoke = await Pokemon.create({ name, hp, attack, defense, speed, height, weight, image }) 

            types.map(async (t) => {
                const newType = await Types.findAll({ 
                  where: {name: t,},})
                nuevoPoke.addTypes(newType[0])
              })
            res.status(200).send('Pokemon agregado de manera exitosa.') //pequeno bug
        }
        
    } catch (error) {
        console.log('error al postear',error)
        res.status(404).send("Error al agregar tu pokemon")
    }
}

const getTypePokemon = async (req, res) => {  //Solo me trae los tipos de los 40 primeros
    const pokemones = await getPokemonApi();
    const allcontenedor = [];
    
    pokemones.map(t => allcontenedor.push((t.types[0] || t.types[1])))
    const noRepeat = [...new Set(allcontenedor)] //No repeat
    noRepeat.forEach((e) => {
        Types.findOrCreate({
            where:{
                name: e
            }
        })
    })

    const alltypes = await Types.findAll()//


    res.status(200).send(alltypes)

}

const getPokemonsCratedByMyself = async(req,res) => {
    try{
        const myPokes = await Pokemon.findAll({
            include:[{
                model: Types,
                attributes: ["name"]
            }]
        })
        res.status(200).send(myPokes)
    }catch(error){
        console.log(error)
    }
}








module.exports = { getPokemonApi,getPokemonApiSend, getAllPokemons, getPokemonByName, getTypePokemon, getPokemonsById,getPokemonsCratedByMyself, createPokemonBd }