import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getPokemonsBack, getPokemonsAlphabetic, getPokemonAtack, getPokemonsBackAgain, getPokemonType, getFilter, getOnlyCreate, getAllTypes, getAllTypesAgain } from "../../store/actions/actionsPoke"
import SearchBar from "../searchBar/searchbar";
import Paginado from "../paginado/paginado";
import "./home.css"




function Home() {
    const dispatch = useDispatch();
    const [orden, setOrden] = useState([])


    const saveState = useSelector(state => state.pokemonsfiltrados)


    //Paginado
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsXPage] = useState(12)
    const lastPokemon = currentPage * pokemonsXPage;
    const firtsPokemon = lastPokemon - pokemonsXPage;
    let PokeRender = saveState.slice(firtsPokemon, lastPokemon);
    const paginadoEstoy = (numberPage) => {
        setCurrentPage(numberPage)
    }





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



            <div className="contenedor-create-volver" >
                <div className="wrap-back-button">
                    <button className="back-button" onClick={e => { handleClick(e) }}> Volver a cargar </button>
                </div>

                <div className="wrap-link" >
                    <Link to="/home/create"  >
                        <button className="button-create" > + Create </button>
                    </Link>

                </div>


            </div>

            <div className="filtros-conteiner">

                <div className="wrap-contenedor-filtros-alfabetico" >
                    <select onChange={(e) => handleSortName(e)} className="contenedor-filtros-alfabetico">
                        <option value="all" > Alphabetic </option>
                        <option value="asc" > A-Z </option>
                        <option value="des" > Z-A </option>
                    </select>
                </div>

                <div className="wrap-contenedor-filtros-fuerza" >
                    <select onChange={(e) => handleStronger(e)} className="contenedor-filtros-fuerza" >
                        <option value="all" > Select By </option>
                        <option value="more"> Stronger </option>
                        <option value="less" > Weaker </option>
                    </select>
                </div>

                <div className="wrap-contenedor-createdatabase-createforus" >
                    <select onChange={(e) => handleApioCreate(e)} className="contenedor-createdatabase-createforus" >
                        <option value="all" > Select By </option>
                        <option value="us"> Create for us </option>
                        <option value="db"> Data Base </option>
                    </select>
                </div>

                <div className="wrap-contenedor-tipos" >

                    <select onChange={(e) => { handleFilterType(e) }} className="contenedor-tipos">
                        <option value="all" > Select Type </option>
                        <option value="grass" > grass </option>
                        <option value="fire" > fire </option>
                        <option value="water" > water </option>
                        <option value="bug" > bug </option>
                        <option value="normal" > normal </option>
                        <option value="poison" > poison </option>
                        <option value="electric" > electric </option>
                        <option value="ground" > ground </option>
                        <option value="fairy" > fairy </option>
                    </select>

                </div>

            </div>


            <div className="contenedor-cards">
                {PokeRender.map((p) => { //La variable que permite traer solo 12 pokemons
                    return (
                        <div className="individual-cards">
                            <Link to={`home/detail/${p.id}`} className="link-line" >
                                <h2> {p.name} </h2>
                                <hr></hr>
                                <div> {typeof p.types[0] === "string" ? p.types.map((cadauno) => { return <h3>{cadauno}</h3> })
                                    : <div> {p.types.map((x) => {
                                        return <h3> {x.name} </h3>
                                    })}
                                    </div>}
                                </div>
                                <hr></hr>
                                <figure>
                                    <img src={p.image} className="image-individual-card" />
                                </figure>


                            </Link>

                        </div>
                    )
                })}
            </div>

            <div >
                <div>
                    {saveState && (
                        <Paginado
                            pokemonsXPage={pokemonsXPage} //
                            saveState={saveState.length}
                            paginadoEstoy={paginadoEstoy} />
                    )}
                </div>
            </div>


        </div>
    )
}


//Ya no necesito el mapState y mapStateToProps pq ahora mapeo el estado al componente mediante useSelector
export default Home;
