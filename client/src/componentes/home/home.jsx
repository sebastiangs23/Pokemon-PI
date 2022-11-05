import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import {
    getPokemonsBack, getPokemonsAlphabetic, getPokemonAtack, getPokemonsBackAgain,
    getPokemonType, getFilter, getOnlyCreate, getAllTypes,
} from "../../store/actions/actionsPoke"
import SearchBar from "../searchBar/searchbar";
import Paginado from "../paginado/paginado";
import "./home.css"
import "./nightmode.css"

function Home() {
    const dispatch = useDispatch();
    const [orden, setOrden] = useState([])

    const saveState = useSelector(state => state.pokemonsfiltrados)
    var types = useSelector((state) => state.alltypes)


    //nightmode
    const [botonState, setBotonState] = useState(false)

    const handleClickC = () => {
        setBotonState(botonState => !botonState)
    }

    let toggleClass = botonState ? " active" : "";


    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsXPage] = useState(12)
    const lastPokemon = currentPage * pokemonsXPage;
    const firtsPokemon = lastPokemon - pokemonsXPage;
    let PokeRender = saveState.slice(firtsPokemon, lastPokemon);
    const paginadoEstoy = (numberPage) => {
        setCurrentPage(numberPage)
    }

    useEffect(() => {  //Ms optimizado
        dispatch(getPokemonsBack())
        dispatch(getFilter())
        dispatch(getAllTypes())  //renderiza el select types
    }, [])

    function handleClick(e) {
        e.preventDefault()
        dispatch(getPokemonsBackAgain())
    }

    function handleSortName(e) {
        e.preventDefault();
        dispatch(getPokemonsAlphabetic(e.target.value))
        setOrden(e.target.value)
    }

    function handleStronger(e) {
        e.preventDefault()
        dispatch(getPokemonAtack(e.target.value))
        setOrden(e.target.value)
    }

    function handleFilterType(e) {
        e.preventDefault();
        dispatch(getPokemonType(e.target.value));
    }

    function handleApioCreate(e) {
        e.preventDefault()
        dispatch(getOnlyCreate(e.target.value))
    }


    return (
        <div className={`all-conteiner${toggleClass}`}>

            <header>
                <SearchBar />
                <div>
                    <button className={`switch${toggleClass}`} id="switch" onClick={() => { handleClickC() }} >
                        <span> <i class="fa-solid fa-sun"></i> </span>
                        <span> <i class="fa-solid fa-moon"></i> </span>
                    </button>
                </div>
            </header>



            <div className="contenedor-create-volver" >
                <div className="wrap-back-button">
                    <button className="back-button" onClick={e => { handleClick(e) }}>  Volver a cargar   </button>
                </div>

                <div className="filtros-conteiner">

                    <div className="wrap-contenedor-filtros-alfabetico" >
                        <h4>Alphabetic</h4>
                        <select onChange={(e) => handleSortName(e)} className="contenedor-filtros-alfabetico">
                            <option value="all" > ABC </option>
                            <option value="asc" > A-Z </option>
                            <option value="des" > Z-A </option>
                        </select>
                    </div>

                    <div className="wrap-contenedor-filtros-fuerza" >
                        <h4>The Strongest</h4>
                        <select onChange={(e) => handleStronger(e)} className="contenedor-filtros-fuerza" >
                            <option value="all" > Select </option>
                            <option value="more"> Stronger </option>
                            <option value="less" > Weaker </option>
                        </select>
                    </div>

                    <div className="wrap-contenedor-createdatabase-createforus" >
                        <h4> Db o Api </h4>
                        <select onChange={(e) => handleApioCreate(e)} className="contenedor-createdatabase-createforus" >
                            <option value="all" > Select </option>
                            <option value="db"> Existente </option>
                            <option value="us"> Nuestro </option>
                        </select>
                    </div>

                    <div className="wrap-contenedor-tipos" >
                        <h4> Types </h4>
                        <select onChange={(e) => { handleFilterType(e) }} className="contenedor-tipos">
                            {types.map((t) => (
                                <option value={t.name} > {t.name} </option>))}
                        </select>

                    </div>

                </div>

                <div className="wrap-link" >
                    <Link to="/home/create"  >
                        <button className="button-create" > <span> + Create  </span> </button>
                    </Link>
                </div>
            </div>

            {PokeRender.length === 0 ? <h2 className="waiting-message"> Nothing Yet </h2>
                : (
                    <div className="contenedor-cards">
                        {PokeRender.map((p) => {
                            return (
                                <div className="individual-cards">
                                    <Link to={`home/detail/${p.id}`} className="link-line" >
                                        <div className="wrap-divisor">
                                            <h2> {p.name} </h2>
                                            <div> {typeof p.types[0] === "string" ? p.types.map((cadauno) => { return <h3>{cadauno}</h3> })
                                                : <div> {p.types.map((x) => {
                                                    return <h3> {x.name} </h3>
                                                })}
                                                </div>}
                                            </div>
                                        </div>

                                        
                                        <figure>
                                            <img src={p.image} className="image-individual-card" />
                                        </figure>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                )}



            <div >
                <div>
                    {saveState && (
                        <Paginado
                            pokemonsXPage={pokemonsXPage}
                            saveState={saveState.length}
                            paginadoEstoy={paginadoEstoy} />
                    )}
                </div>
            </div>

        </div>
    )
}


export default Home;
