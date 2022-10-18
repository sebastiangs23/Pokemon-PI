import axios from "axios";
const initialState = { pokemons: [] , pokemonsfiltrados: []};   

function filterAlphab(pokemons, payload) {
    let orden = pokemons;
    const ordenAZ = payload === "asc" ? orden.sort(function (a, b) {  //ordenAZ no es indispensable
        if (a.name > b.name) return 1; //de menor a mayor
        if (b.name > a.name) return -1;
        return 0;
    }) : orden.sort(function (a, b) { //De mayor a menor
        if (a.name > b.name) return -1;
        if (b.name > a.name) return 1;
        return 0;
    })
    return orden
}

function filterStrongest(pokemons, payload) {
    let moreless = pokemons;
    const ordenSW = payload === "less" ? moreless.sort(function (a, b) {
        if (a.attack > b.attack) return 1;
        if (b.attack > a.attack) return -1;
        return 0
    }) : moreless.sort(function (a, b) {
        if (a.attack > b.attack) return -1;
        if (b.attack > a.attack) return 1;
        return 0
    })
    return moreless
}

//REPASAR ESTA MIERDA Y REVISAR 
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_POKEMONS":
            return {
                ...state,
                pokemons: action.payload,
                pokemonsfiltrados: action.payload

            }
        case "GET_POKEMONS_AGAIN": //Para volver a cargar todo
            console.log(action.payload)
            return {
                ...state,
                pokemonsfiltrados: action.payload
            }

        case "GET_BY_NAME":
            return {
                ...state,
                pokemonsfiltrados: action.payload
            }

        case "FILTER_ALPHABETIC":
            const aOz = filterAlphab(state.pokemons, action.payload)
            return {
                ...state,
                pokemonsfiltrados: aOz,
            }

        case "FILTER_ATACK":
            const masOmenos = filterStrongest(state.pokemons, action.payload);
            return {
                ...state,
                pokemonsfiltrados: masOmenos,
            }

        case "GET_FILTER":  //Esto va dentro del useEffect y evita que el estado se setee por lo filtrado
            return {
                ...state
            }    

        case "FILTER_BY_TYPE":
            const saveState = state.pokemons

            var respuesta = saveState;
            let orden = action.payload;
            if (action.payload === "grass") respuesta = saveState.filter((x) => x.types[0] === "grass" || x.types[1] === "grass")
            else if (action.payload === "fire") respuesta = saveState.filter((x) => x.types[0] === "fire" || x.types[1] === "fire")
            else if (action.payload === "water") respuesta = saveState.filter((x) => x.types[0] === "water" || x.types[1] === "water")
            else if (action.payload === "bug") respuesta = saveState.filter((x) => x.types[0] === "bug" || x.types[1] === "bug")
            else if (action.payload === "normal") respuesta = saveState.filter((x) => x.types[0] === "normal" || x.types[1] === "normal")
            else if (action.payload === "poison") respuesta = saveState.filter((x) => x.types[0] === "poison" || x.types[1] === "poison")
            else if (action.payload === "electric") respuesta = saveState.filter((x) => x.types[0] === "electric" || x.types[1] === "electric")
            else if (action.payload === "ground") respuesta = saveState.filter((x) => x.types[0] === "ground" || x.types[1] === "ground")
            else if (action.payload === "fairy") respuesta = saveState.filter((x) => x.types[0] === "fairy" || x.types[1] === "fairy")
            console.log(respuesta)
                
            return {
                ...state,
                pokemonsfiltrados: respuesta,
            }

        case "GET_ONLY_CREATE":
            console.log(action.payload)           
            return {
                ...state,
                pokemonsfiltrados: action.payload
            } 

        default:
            return {
                ...state,
            }
    }
}

export default reducer