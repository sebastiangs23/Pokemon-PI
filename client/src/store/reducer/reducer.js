const initialState = { pokemons: [], pokemonsfiltrados: [], alltypes: [], detail: []};

function filterAlphab(pokemons, payload) {
    let orden = pokemons;
    const ordenAZ = payload === "asc" ? orden.sort(function (a, b) {  
        if (a.name > b.name) return 1; 
        if (b.name > a.name) return -1;
        return 0;
    }) : orden.sort(function (a, b) { 
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

 
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_POKEMONS":
            return {
                ...state,
                pokemons: action.payload,
                pokemonsfiltrados: action.payload

            }
        case "GET_POKEMONS_AGAIN":
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

        case "GET_FILTER":  
            return {
                ...state
            }

        case "FILTER_BY_TYPE":
            const saveState = state.pokemons
            
            const typeFiltered =
                action.payload === "all" ? saveState : saveState.filter((p) =>
                    p.types.some((t) => t === action.payload || t.name === action.payload) 
                );                                                                         

            return {
                ...state,
                pokemonsfiltrados: typeFiltered,
            }

        case "GET_ONLY_CREATE":
            return {
                ...state,
                pokemonsfiltrados: action.payload
            }

        case "GET_TYPES":
            return {
                ...state,
                alltypes: action.payload
            }

        case 'GET_DETAILS':
            return {
                ...state,
                detail: action.payload
            }  
        
        case "EMPTY_RETURN":
            return {
                ...state,
                detail: [] 
            }

        case "POST_POKEMON":
            return {
                ...state
            }

        default:
            return {
                ...state,
            }
    }
}

export default reducer