import { Link } from "react-router-dom"
import "./createPoke.css"

function CreatePoke() {
    return (
        <div className="contenedor-componente">

            <h1> Create Pokemon  </h1>

            <Link to="/home">
                <button className="boton-back"> Back </button>
            </Link>

            <form className="contenedor-form-createpokemon" >
                <div className="contenedor-rellenar">
                    <h4>Nombre</h4>
                    <input />
                </div>

                <div className="contenedor-rellenar">
                    <h4>Hp</h4>
                    <input />
                </div>

                <div className="contenedor-rellenar">
                    <h4>Attack</h4>
                    <input />
                </div>

                <div className="contenedor-rellenar">
                    <h4>Defense</h4>
                    <input />
                </div>

                <div className="contenedor-rellenar">
                    <h4>Speed</h4>
                    <input />
                </div>

                <div className="contenedor-rellenar">
                    <h4>Height</h4>
                    <input />
                </div>

                <div className="contenedor-rellenar">
                    <h4>Weight</h4>
                    <input />
                </div>

                <div className="contenedor-rellenar">
                    <h4>Image</h4>
                    <input />
                </div>

                <button> Send </button>

            </form>

            <img className="imagen-component-create" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/144.png" />



        </div>
    )
}

export default CreatePoke;