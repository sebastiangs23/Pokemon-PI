import { useState, useEffect } from "react"
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { getPokemonsBack } from "../store/actions/actionsPoke"
import SearchBar from "./searchbar";
import "./home.css"


function Home({ pokemons, getPokemonsBack }) {
    const dispatch = useDispatch();

    useEffect(() => {
        getPokemonsBack()
    }, [])


    return (

        <div className="all-conteiner">

            <header>
                <SearchBar /> {/* Como esta dentro del componente Home se le mapea el estado */}
            </header>

            <select className="contenedor-filtros-alfabetico">
                <option>-</option>
                <option>A-Z</option>
                <option>Z-A</option>
            </select>

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
