import { useState, useEffect } from "react"
import { connect } from "react-redux"; //Ya no necesito el connect 
import { useDispatch, useSelector } from "react-redux";
import { getPokemonsBack, getPokemonsAlphabetic, getPokemonAtack, getPokemonsBackAgain, getPokemonType, getFilter} from "../store/actions/actionsPoke"
import SearchBar from "./searchbar";
import "./home.css"


function Home() {
    const dispatch = useDispatch();
    const [orden, setOrden] = useState([])

    const saveState = useSelector(state => state.pokemonsfiltrados) //Ya no necesito el mapState pq con useSelector guardo el estado en una variable
    // console.log(saveState)
    
    useEffect(() => {
        dispatch(getPokemonsBack()) 
        dispatch(getPokemonsBackAgain()) 
        dispatch(getPokemonType()) 
        dispatch(getFilter())
    }, [])

    function handleClick(e){
        e.preventDefault()
        dispatch(getPokemonsBackAgain())
    }

    function handleSortName(e) { // Filtro 1
        e.preventDefault();
        dispatch(getPokemonsAlphabetic(e.target.value))
        setOrden(e.target.value)
    }

    function handleStronger(e) {  // Filtro 2
        e.preventDefault()
        dispatch(getPokemonAtack(e.target.value))
        setOrden(e.target.value)
    }

    function handleFilterType(e) {  //Filtro 3
        e.preventDefault();
        dispatch(getPokemonType(e.target.value));
    }




    return (
        <div className="all-conteiner">

            <header>
                <SearchBar /> {/* Como esta dentro del componente Home se le mapea el estado */}
            </header>

            <button className="intento-intento" onClick={e => { handleClick(e) }}> Volver a cargar </button>

            <div className="filtros-conteiner">
                <select onChange={(e) => handleSortName(e)} className="contenedor-filtros-alfabetico">
                    <option value="all" > Attack </option>
                    <option value="asc" > A-Z </option>
                    <option value="des" > Z-A </option>
                </select>

                <select onChange={(e) => handleStronger(e)} className="contenedor-filtros-fuerza" >
                    <option value="all" > Strength </option>
                    <option value="more"> Stronger </option>
                    <option value="less" > Weaker </option>
                </select>


                <select onChange={(e) => {handleFilterType(e)}} className="contenedor-tipos">
                    <option value="all" > - </option>
                    <option value="grass" > Grass </option>
                    <option value="fire" > Fire </option>
                    <option value="water" > Water </option>
                    <option value="bug" > Bug </option>
                    <option value="normal" > Normal </option>
                    <option value="poison" > Poison </option>
                    <option value="electric" > Electric </option>
                    <option value="ground" > Ground </option>
                    <option value="fairy" > Fairy </option>
                </select>

            </div>


            <div className="contenedor-cards">
                {saveState.map((p) => {
                    return (
                        <div className="individual-cards">
                            <h2> {p.name} </h2>
                            <h3> {p.types.map((cadauno) => { return <p>{cadauno}</p> })} </h3>
                            <img src={p.image} />
                        </div>
                    )
                })}
            </div>

        </div>
    )
}


//Ya no necesito el mapState y mapStateToProps pq ahora mapeo el estado al componente mediante useSelector

export default Home;
