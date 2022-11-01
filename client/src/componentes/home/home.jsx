import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import {
    getPokemonsBack, getPokemonsAlphabetic, getPokemonAtack, getPokemonsBackAgain,
    getPokemonType, getFilter, getOnlyCreate, getAllTypes, getAllTypesAgain
} from "../../store/actions/actionsPoke"
import SearchBar from "../searchBar/searchbar";
import Paginado from "../paginado/paginado";
import "./home.css"

function Home() {
    const dispatch = useDispatch();
    const [orden, setOrden] = useState([])

    const saveState = useSelector(state => state.pokemonsfiltrados)
    var types = useSelector((state) => state.alltypes)


    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsXPage] = useState(12)
    const lastPokemon = currentPage * pokemonsXPage;
    const firtsPokemon = lastPokemon - pokemonsXPage;
    let PokeRender = saveState.slice(firtsPokemon, lastPokemon);
    const paginadoEstoy = (numberPage) => {
        setCurrentPage(numberPage)
    }

    useEffect(() => {  //Este es el mayor de mis problemas creo
        dispatch(getPokemonsBack())
        dispatch(getPokemonsBackAgain())  //soluciona un bug pero no recuerdo cual?? pq puse 2
        // dispatch(getPokemonType())
        dispatch(getFilter())
        dispatch(getAllTypes())  //Hay veces que la 1era vez solo me rendeeriza 5,
        dispatch(getAllTypesAgain()) // nose pq aveces no funciona
    }, [])

    function handleClick(e) {
        e.preventDefault()
        dispatch(getPokemonsBackAgain())  //dispatch(getPokemonsBackAgain())  antes asi
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
        <div className="all-conteiner">

            <header>
                <SearchBar />
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

            <div className="contenedor-cards">
                {PokeRender.map((p) => {
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
