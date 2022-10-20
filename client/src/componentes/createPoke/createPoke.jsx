import "./createPoke.css"
import { Link } from "react-router-dom"
import {useState, useEffect} from "react"
import { useDispatch } from "react-redux"
import { getPokemonsBack, getPokemonType, postPokemon} from "../../store/actions/actionsPoke" //De momento no son indispensables



function CreatePoke() {  //Anotar como hacer para crear
    const dispatch = useDispatch()

    const [inputs, setInputs] = useState([{name: "",hp: "",attack: "",defense: "",speed: "",height: "",weight: "",image: "",types: [] }])

    const handleChange = (e) => {
        console.log(e.target.value)
        setInputs({
            ...inputs,
            [e.target.name] : e.target.value 
        })
    }

    const handleSubmit = (e) => {  //Esto sera lo ultimo que aprende antes de que el pokemon se cree
        e.preventDefault()
        dispatch(postPokemon(inputs))
        alert("Pokemon creado CONAHTUMADRE  !!")
        setInputs({name: "",hp: "",attack: "",defense: "",speed: "",height: "",weight: "",image: "",types:[] }) //blank again
    }

    // useEffect(() => {  //De momento no es indispensable
    //     dispatch(getPokemonsBack())
    // }, [])

    return (
        <div className="contenedor-componente">

            <h1> Create Pokemon  </h1>

            <Link to="/home">
                <button className="boton-back"> Back </button>
            </Link>

            <form onSubmit={(e)=> handleSubmit(e)}  className="contenedor-form-createpokemon" >
                <div className="contenedor-rellenar">
                    <h4>Nombre</h4>
                    <input  onChange={(e) => handleChange(e)}  value={inputs.name} name="name" />
                </div>

                <div className="contenedor-rellenar">
                    <h4>Hp</h4>
                    <input onChange={(e) => handleChange(e)} value={inputs.hp} name="hp" />
                </div>

                <div className="contenedor-rellenar">
                    <h4>Attack</h4>
                    <input onChange={(e) => handleChange(e)} value={inputs.attack} name="attack" />
                </div>

                <div className="contenedor-rellenar">
                    <h4>Defense</h4>
                    <input onChange={(e) => handleChange(e)} value={inputs.defense} name="defense" />
                </div>

                <div className="contenedor-rellenar">
                    <h4>Speed</h4>
                    <input onChange={(e) => handleChange(e)} value={inputs.speed} name="speed" />
                </div>

                <div className="contenedor-rellenar">
                    <h4>Height</h4>
                    <input onChange={(e) => handleChange(e)} value={inputs.height} name="height" />
                </div>

                <div className="contenedor-rellenar">
                    <h4>Weight</h4>
                    <input onChange={(e) => handleChange(e)} value={inputs.weight} name="weight" />
                </div>

                <div className="contenedor-rellenar">
                    <h4>Image</h4>
                    <input  onChange={(e) => handleChange(e)} value={inputs.image} name="image" />
                </div>

                <div className="contenedor-rellenar">
                    <h4>Type</h4>
                    <select onChange={(e) => handleChange(e)} value={inputs.types} name="types" >
                        <option> Type </option>
                        <option> grass </option>
                        <option> fire </option>
                        <option> water </option>
                        <option> bug </option>
                        <option> normal </option>
                        <option> poison </option>
                        <option> electric </option>
                        <option> ground </option>
                        <option> fairy </option>
                        
                    </select>
                </div>

                <button  type="submit" > Send </button>

            </form>

            <img className="imagen-component-create" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/447.png" />

        </div>
    )
}

export default CreatePoke;

