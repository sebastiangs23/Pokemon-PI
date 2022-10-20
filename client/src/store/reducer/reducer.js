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


            const filtro = saveState.filter((x) => x.types[0].name === action.payload || //El posteado solo tiene [0]      
                                                   x.types[0] === action.payload || //Si tengo dudas revisar la ruta
                                                   x.types[1] === action.payload ) 
            
            console.log(filtro)
           
                
            return {
                ...state,
                pokemonsfiltrados: filtro,
            }

        case "GET_ONLY_CREATE":
            console.log(action.payload)           
            return {
                ...state,
                pokemonsfiltrados: action.payload
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