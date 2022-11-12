import "./searchbar.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName } from "../../store/actions/actionsPoke"

function SearchBar() {
    const dispatch = useDispatch()

    const [buscar, setBuscar] = useState("");

    const handleChange = (e) => {
        e.preventDefault()
        setBuscar(e.target.value)
    }

    const handleSubmit = (s) => {
        s.preventDefault()
        dispatch(getPokemonByName(buscar))
        setBuscar("")
    }

    return (
        <div className="contenedor-searchbar">
            <form>
                <input onChange={handleChange} value={buscar} placeholder="Inserte una busqueda" className="input-searchbar" />

                <button onClick={(c) => handleSubmit(c)} type="submit" className="practicahover" >
                    <span>
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </span>
                </button>
            </form>
        </div>
    )
}

export default SearchBar;