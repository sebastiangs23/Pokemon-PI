const initialState = {pokemons:[]};

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

        //Faltan las otras actions patience  

        default:
            return {
                ...state,
            }
    }
}

export default reducer