import axios from "axios";


export function getPokemonsBack() {
    return function (dispatch) {
        axios.get("http://localhost:3001/home/pokemons").then((p) => {
            return dispatch({
                type: "GET_POKEMONS",
                payload: p.data
            })
        })
    }
}

export function getPokemonsBackAgain() { 
    return function (dispatch) {
        axios.get("http://localhost:3001/home/pokemons").then((p) => {
            return dispatch({
                type: "GET_POKEMONS_AGAIN",
                payload: p.data
            })
        })
    }
}


export function getPokemonByName(name) { 
    return function (dispatch) {
        return axios.get(`http://localhost:3001/home/pokemons/query?name=${name}`)
            .then((response) => {
                console.log(response.data)
                return dispatch({
                    type: "GET_BY_NAME",
                    payload: response.data
                })
            })
            .catch((error) => alert("El pokemon solicitado no existe"))
    }
}

export function getPokemonsAlphabetic(payload) {
    return {
        type: "FILTER_ALPHABETIC",
        payload: payload
    }
}

export function getPokemonAtack(payload) {
    return {
        type: "FILTER_ATACK",
        payload: payload
    }
}

export function getFilter() {//Lo que hace es actualizar el estado e instantaneamente el estado vuelve a tener todo y
    return {                // no se setea por el de pokemones filtrados
        type: "GET_FILTER"
    }
}

export function getPokemonType(payload) { //Toda esta fn cambiada
    return {
        type: "FILTER_BY_TYPE",
        payload,
    };
}

export function getOnlyCreate(payload) {

    if (payload === "us") { 
        return function (dispatch) {
            axios.get("http://localhost:3001/home/pokemons/mypokemons").then((p) => {
                return dispatch({
                    type: "GET_ONLY_CREATE",
                    payload: p.data
                })
            })
        }
    }
    if (payload === "db") { 
        return function (dispatch) {
            axios.get("http://localhost:3001/home/pokemons/apipokemons").then((p) => {
                return dispatch({
                    type: "GET_ONLY_CREATE",
                    payload: p.data
                })
            })
        }
    }

    else {
        return function (dispatch) {
            axios.get("http://localhost:3001/home/pokemons/apipokemons").then((p) => {
                return dispatch({
                    type: "GET_ONLY_CREATE",
                    payload: p.data
                })
            })
        }
    }
}

export function getAllTypes(){
    return async function(dispatch){
        var types = await axios.get("http://localhost:3001/home/pokemons/types");
        return dispatch({
            type: "GET_TYPES",
            payload: types.data
        })
    }
}

export function getAllTypesAgain(){
    return async function(dispatch){
        var types = await axios.get("http://localhost:3001/home/pokemons/types");
        return dispatch({
            type: "GET_TYPES_AGAIN",
            payload: types.data
        })
    }
}

export function postPokemon(payload){
    return async function(dispatch){
        try{
            const upload = await axios.post("http://localhost:3001/home/pokemons", payload) 
            alert("Pokemon creado correctamente !!!")
            return upload 
        }catch(error){
            alert("Error el nombre ya existe u olvidate escogerle types.")
        }
    }
    
}   


export function getDetailsId(id){
    return async function(dispatch){
        try{
            var rutaDetail = await axios.get(`http://localhost:3001/home/pokemons/codigo/${id}`);
            return dispatch({
                type : 'GET_DETAILS',
                payload: rutaDetail.data
            })
        }catch(error){
            console.log(error)
        }
        
    }
}

export function returnOfDetails(){
    return {
        type: "EMPTY_RETURN"
    }
}