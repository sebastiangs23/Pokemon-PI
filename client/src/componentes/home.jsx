import { useState, useEffect } from "react"
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { getPokemonsBack, getPokemonsAlphabetic, getPokemonAtack } from "../store/actions/actionsPoke"
import SearchBar from "./searchbar";
import "./home.css"
import axios from "axios";


function Home({ pokemons, getPokemonsBack }) {
    const dispatch = useDispatch();
    const [orden, setOrden] = useState([])

    useEffect(() => {
        getPokemonsBack()
    }, [])

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




    return (
        <div className="all-conteiner">

            <header>
                <SearchBar /> {/* Como esta dentro del componente Home se le mapea el estado */}
            </header>

            <div className="filtros-conteiner">
                <select onChange={(e) => handleSortName(e)} className="contenedor-filtros-alfabetico">
                    <option value="all" > - </option>
                    <option value="asc" > A-Z </option>
                    <option value="des" > Z-A </option>
                </select>

                <select onChange={(e) => handleStronger(e)} className="contenedor-filtros-fuerza" >
                    <option value="all" > - </option>
                    <option value="more"> Stronger </option>
                    <option value="less" > Weaker </option>
                </select>

            </div>


            <div className="contenedor-cards">
                {pokemons.map((p) => {
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


//Mapeo el stado de redux con estado del componente Home y osea dependiendo de lo que me pida renderizar el estado cambia
const mapStateToProps = state => {
    return {
        pokemons: state.pokemons
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPokemonsBack: pokemones => {
            dispatch(getPokemonsBack(pokemones))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
