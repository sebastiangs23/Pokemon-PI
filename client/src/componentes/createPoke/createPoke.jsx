import "./createPoke.css"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllTypes, postPokemon } from "../../store/actions/actionsPoke"



function CreatePoke() {  //Anotar como hacer para crear
  const dispatch = useDispatch()
  var types = useSelector((state) => state.alltypes) //ya tiene todos

  const [inputs, setInputs] = useState({ name: "", hp: "", attack: "", defense: "", speed: "", height: "", weight: "", image: "", types: [] })

  const handleChange = (e) => {
    console.log(e.target.value)
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  function handleSelect(e) {
    setInputs({
      ...inputs,
      types: [...inputs.types, e.target.value]
    });
    console.log(inputs.types)
  }

  const handleSubmit = (e) => {  //Esto sera lo ultimo que aprende antes de que el pokemon se cree
    e.preventDefault()
    dispatch(postPokemon(inputs))
    alert("Pokemon creado correctamente !!!")
    setInputs({ name: "", hp: "", attack: "", defense: "", speed: "", height: "", weight: "", image: "", types: [] }) //blank again
  }



  useEffect(() => {
    dispatch(getAllTypes())  //Para renderizar los tipos de pokemones
  }, [])



  return (
    <div className="contenedor-componente">

      <h1> Create Pokemon  </h1>

      <Link to="/home">
        <button className="boton-back"> Back </button>
      </Link>

      <form onSubmit={(e) => handleSubmit(e)} className="contenedor-form-createpokemon" >
        <div className="contenedor-rellenar">
          <h4>Nombre</h4>
          <input onChange={(e) => handleChange(e)} value={inputs.name} name="name" />
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
          <input onChange={(e) => handleChange(e)} value={inputs.image} name="image" />
        </div>

        <div className="contenedor-rellenar">
          <h4>Type</h4>
          <select onChange={(e) => handleSelect(e)} name="types" > {/*Necesito mi estado global*/}
            {types.map((t) => (
              <option value={t.name} > {t.name} </option>
            ))}


          </select>
        </div>


        {/* <div className="borrador" >  //primero tengo q resolver lo de arriba
                  {inputs.types.map((c) => (
                    <ul>
                    <li>{c}</li>
                    <button >x</button>
                  </ul>
                  ))} 
                </div> */}


        <button type="submit" > Send </button>

      </form>

      <img className="imagen-component-create" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/447.png" />

    </div>
  )
}

export default CreatePoke;

