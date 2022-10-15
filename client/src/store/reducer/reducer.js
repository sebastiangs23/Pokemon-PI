const initialState = { pokemons: [] };

function filterAlphab (pokemons, payload){
    let orden = pokemons;
    const ordenAZ = payload === "asc" ? orden.sort(function (a, b) {
        if (a.name > b.name) return 1; //de menor a mayor
        if (b.name > a.name) return -1;
        return 0;
    }) : orden.sort(function(a,b){ //De mayor a menor
        if (a.name > b.name) return -1;
        if (b.name > a.name) return 1;
        return 0;
    })
    return orden
}

function filterStrongest(pokemons, payload){
    let moreless = pokemons;
    const ordenSW = payload === "less" ? moreless.sort(function(a,b){
        if(a.attack > b.attack) return 1;  
        if(b.attack > a.attack) return -1;
        return 0
    }) : moreless.sort(function(a,b){
        if(a.attack > b.attack) return -1;
        if(b.attack > a.attack) return 1;
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
                pokemons: action.payload
            }

        case "GET_BY_NAME":
            return {
                ...state,
                pokemons: action.payload
            }
  
        case "FILTER_ALPHABETIC": 
            const aOz = filterAlphab(state.pokemons, action.payload)
            return {
                ...state,
                pokemons: aOz,
                // filter:{
                //     ...state,
                //     name: action.payload  //De momento no es indispensable
                // }
            }

        case "FILTER_ATACK":
            const masOmenos = filterStrongest(state.pokemons, action.payload);
            return {
                ...state,
                pokemons: masOmenos,
            }

        default:
            return {
                ...state,
            }
    }
}

export default reducer