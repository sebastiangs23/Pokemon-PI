import axios from "axios";


export function getPokemonsBack() { //action que trae todos los pokemones del back para renderizarlos en el back
    return function (dispatch) {
        axios.get("http://localhost:3001/home/pokemons").then((p) => {
            return dispatch({
                type: "GET_POKEMONS",
                payload: p.data
            })
        })
    }
}

export function getPokemonsBackAgain() { //action que trae todos los pokemones del back para renderizarlos en el back
    return function (dispatch) {
        axios.get("http://localhost:3001/home/pokemons").then((p) => {
            return dispatch({
                type: "GET_POKEMONS_AGAIN",
                payload: p.data
            })
        })
    }
}


export function getPokemonByName(name) { //estas aun estoy en duda quizas hay que cambiar algo
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

export function getPokemonsAlphabetic(payload){
    return {
        type: "FILTER_ALPHABETIC",
        payload: payload
    }
}

export function getPokemonAtack(payload){
    return {
        type: "FILTER_ATACK",
        payload: payload
    }
}

export function getFilter(){ //Linea 21 del componente //Lo que hace es actualizar el estado e instantaneamente el estado vuelve a tener todo y
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




