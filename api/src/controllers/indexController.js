const { Pokemon, Types } = require("../db")
const axios = require("axios")
const POKEMON_URL = "https://pokeapi.co/api/v2/pokemon"

const getPokemonApi = async (req, res) => {
    try {
        const primeros20 = await axios.get(POKEMON_URL)
        const segundos20 = await axios.get(primeros20.data.next)

        const pokedata1 = primeros20.data.results.map((e) => axios.get(e.url))
        const pokedata2 = segundos20.data.results.map((e) => axios.get(e.url))

        const fusion = pokedata1.concat(pokedata2)

        const promisePokemon = await Promise.all(fusion).then((e) => {
            let pokemon = e.map((e) => e.data)

            let almacenamiento = []
            pokemon.map((e) => {
                let saveurlimg = e.sprites.other["official-artwork"].front_default
                almacenamiento.push({
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
            return almacenamiento
        })
        return promisePokemon
    } catch (error) {
        res.status(400).send(error)
    }
}

const getPokemonApiSend = async (req, res) => {
    const send = await getPokemonApi()
    res.send(send)
}

const getAllPokemonsReturn = async (req, res) => {
    try {
        const allPokeApi = await getPokemonApi()
        const allPokeDb = await Pokemon.findAll({
            include: [{
                model: Types,
                attributes: ["name"]
            }]
        })
        const fullPokemons = allPokeDb.concat(allPokeApi)
        return fullPokemons

    } catch (error) {
        res.status(400).send(error)
    }
}

const getAllPokemonsSend = async (req, res) => {
    try {
        const allPokeApi = await getPokemonApi()
        const allPokeDb = await Pokemon.findAll({
            include: [{
                model: Types,
                attributes: ["name"]
            }]
        })
        const fullPokemons = allPokeDb.concat(allPokeApi)
        res.send(fullPokemons)

    } catch (error) {
        res.status(400).send(error)
    }
}

const getPokemonsById = async (req, res) => {

    const { id } = req.params
    try {
        if (id.length > 4) {
            let busquedaDb = await Pokemon.findByPk(id, { include: { model: Types } })
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
            var wrap = []
            wrap.push(ordenarPokeDb)
            res.send(wrap)
        } else {
            const pokeApiName = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)

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
    } catch (error) {
        res.status(400).send("No se encontro ningun pokemon con ese ID")
    }
}

const getPokemonByName = async (req, res) => {
    try {
        const { name } = req.query

        const pokeDb = await Pokemon.findAll({
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

        const pokeApiName = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)

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
        res.status(400).send(error)
    }
}

const createPokemonBd = async (req, res) => { //necestio cambiar esto //findOrCreate
    try {
        const { name, types, hp, attack, defense, speed, height, weight, image } = req.body

        let allPokes = await getAllPokemonsReturn()

        let seRepite = allPokes.filter((e) => e.name.toLowerCase() === name.toLowerCase())

        if (seRepite.length) {
            res.status(400).send("El nombre del Pokemon ya existe")
        } else if (types.length <= 0) {
            res.status(400).send("Olvidaste escoger un tipo de pokemon")
        } else {

            const nuevoPoke = await Pokemon.create({ name, hp, attack, defense, speed, height, weight, image })

            types.map(async (t) => {
                const newType = await Types.findAll({
                    where: { name: t, },
                })
                nuevoPoke.addTypes(newType[0])
            })
            res.status(200).send('Pokemon agregado de manera exitosa.')
        }

    } catch (error) {
        res.status(404).send(error)
    }
}

// const createPokemonDb = async (req, res) => {
//     try {

//         const { name, types, hp, attack, defense, speed, height, weight, image } = req.body

//     } catch (error) {
//         res.status(400).send(error)
//     }
// }


















//BEFORE
// const getTypePokemon = async (req, res) => {  
//     const pokemones = await getPokemonApi();
//     const allcontenedor = [];

//     pokemones.map(t => allcontenedor.push((t.types[0] || t.types[1])))
//     const noRepeat = [...new Set(allcontenedor)] //Aca tengo los 9 types

//     noRepeat.forEach((e) => { //Me llegan 5 o 7 aveces
//         Types.findOrCreate({
//             where:{name: e}
//         })
//     })

//     const alltypes = await Types.findAll()
//     res.status(200).send(alltypes)
//     // return alltypes
// }


const getTypePokemon = async (req, res) => {
    try {
        const typeURL = await axios.get("https://pokeapi.co/api/v2/type")
        const types = typeURL.data.results

        types.forEach((e) => {
            Types.findOrCreate({
                where: { name: e.name }
            })
        })
        const allhere = await Types.findAll()
        res.status(200).send(allhere)

    } catch (error) {
        res.status(400).send(error)
    }
}

const getPokemonsCratedByMyself = async (req, res) => {
    try {
        const myPokes = await Pokemon.findAll({
            include: [{
                model: Types,
                attributes: ["name"]
            }]
        })
        res.status(200).send(myPokes)
    } catch (error) {
        res.status(200).send(error)
    }
}

module.exports = {
    getPokemonApiSend, getAllPokemonsSend, getPokemonByName,
    getTypePokemon, getPokemonsById, getPokemonsCratedByMyself, createPokemonBd
}