import "./searchbar.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName } from "../../store/actions/actionsPoke"

function SearchBar() {
    const dispatch = useDispatch()

    const [buscar, setBuscar] = useState("");//Va ir actualizando el estado en cada minimo cambio

    const handleChange = (e) => { //Para saber cuando se realizar cualquier cambio en el input
        e.preventDefault()
        setBuscar(e.target.value)
        console.log(e.target.value)
    } 
    
    const handleSubmit = (s) => {//Para saber cuando hace el submit
        s.preventDefault()
        dispatch(getPokemonByName(buscar))
    }

    return (
        <div className="contenedor-searchbar">
            <form>  
                <input onChange={handleChange} value={buscar} placeholder="Inserte una busqueda" className="input-searchbar" />
                <button onClick={(c) => handleSubmit(c)} type="submit" > Aceptar </button>
            </form>
        </div>
    )
}

export default SearchBar;