import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getPokemonsBack, getPokemonsAlphabetic, getPokemonAtack, getPokemonsBackAgain, getPokemonType, getFilter, getOnlyCreate } from "../../store/actions/actionsPoke"
import SearchBar from "../searchBar/searchbar";
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

    function handleClick(e) {
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

    function handleApioCreate(e) {
        e.preventDefault()
        dispatch(getOnlyCreate(e.target.value))
    }




    return (
        <div className="all-conteiner">

            <header>
                <SearchBar /> {/* Como esta dentro del componente Home se le mapea el estado */}
            </header>

            <button className="intento-intento" onClick={e => { handleClick(e) }}> Volver a cargar </button>


            <Link to="/home/create">
                <button className="button-create" > + Create </button>
            </Link>

            <div className="filtros-conteiner">
                <select onChange={(e) => handleSortName(e)} className="contenedor-filtros-alfabetico">
                    <option value="all" > Alphabetic </option>
                    <option value="asc" > A-Z </option>
                    <option value="des" > Z-A </option>
                </select>

                <select onChange={(e) => handleStronger(e)} className="contenedor-filtros-fuerza" >
                    <option value="all" > Strength </option>
                    <option value="more"> Stronger </option>
                    <option value="less" > Weaker </option>
                </select>

                <select onChange={(e) => handleApioCreate(e)} className="contenedor-createdatabase-createforus" >
                    <option value="all" > Found By </option>
                    <option value="us"> Create for us </option>
                    <option value="db"> Data Base </option>
                </select>

                <select onChange={(e) => { handleFilterType(e) }} className="contenedor-tipos">
                    <option value="all" > Pokemon Type </option>
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

                            <h3> {typeof p.types[0] === "string" ? p.types.map((cadauno) => { return <p>{cadauno}</p> })
                                : <p> {p.types[0].name} </p>}</h3>{/*Solo me va renderizar el 1ero,posible error al momento de renderizar 2*/}

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
