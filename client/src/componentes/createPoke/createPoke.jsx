import "./createPoke.css"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllTypes, postPokemon, getPokemonsBackAgain } from "../../store/actions/actionsPoke"
import ModoNocturno from "../nightmode/nightmode"



function CreatePoke() {
  const dispatch = useDispatch()
  var types = useSelector((state) => state.alltypes)

  const [inputs, setInputs] = useState({ name: "", hp: "", attack: "", defense: "", speed: "", height: "", weight: "", image: "", types: [] })

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  //validaciones
  const [numberError, setNumberError] = useState(1)
  const handleChangeName = (e) => { //
    const value = e.target.value
    const some = value.length > 0
    const minValue = value.length > 2;
    const maxValue = value.length < 14;
    const onlyLetras = /^[a-zA-Z\s]*$/g.test(value);


    if (some == false) {
      setNumberError(1)
    } else if (onlyLetras == false) {
      setNumberError(2)
    } else if (!minValue) {
      setNumberError(3)
    } else {
      setNumberError(4)
    }

    if (onlyLetras == true && minValue && maxValue && some) {
      setNumberError(0)
    }

    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  const [speedError, setSpeedError] = useState(1)
  const handleChangeSpeed = (e) => {
    const valueSpeed = e.target.value
    const some = valueSpeed.length > 0
    const minValueS = valueSpeed > 10;
    const maxValueS = valueSpeed < 250;

    if (some == false) {
      setSpeedError(1)
    } else if (!minValueS) {
      setSpeedError(2)
    } else {
      setSpeedError(3)
    }

    if (minValueS == true && maxValueS && some) {
      setSpeedError(0)
    }

    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }


  const [heightError, setHeightError] = useState(1)
  const handleChangeHeight = (e) => {
    const valueHeight = e.target.value;
    const some = valueHeight.length > 0
    const minHeight = valueHeight > 2
    const maxHeight = valueHeight < 25

    if (some == false) {
      setHeightError(1)
    } else if (!minHeight) {
      setHeightError(2)
    } else {
      setHeightError(3)
    }

    if (minHeight == true && maxHeight && some) {
      setHeightError(0)
    }

    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }


  const [weightError, setWeightError] = useState(1)
  const handleChangeWeight = (e) => {
    const valueWeight = e.target.value;
    const some = valueWeight.length > 0
    const minWeight = valueWeight > 10
    const maxWeight = valueWeight < 2500

    if (some == false) {
      setWeightError(1)
    } else if (!minWeight) {
      setWeightError(2)
    } else {
      setWeightError(3)
    }

    if (minWeight == true && maxWeight && some) {
      setWeightError(0)
    }

    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  const [hptError, sethpError] = useState(1)
  const handleChangeHp = (e) => {
    const valueHp = e.target.value;
    const some = valueHp.length > 0;
    const minHp = valueHp > 5

    if (some == false) {
      sethpError(1)
    } else {
      sethpError(2)
    }

    if (minHp == true && some) {
      sethpError(0)
    }

    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  const [attacktError, setAttackError] = useState(1)
  const handleChangeAttack = (e) => {
    const valueAttack = e.target.value;
    const some = valueAttack.length > 0;
    const minAttack = valueAttack > 10

    if (some == false) {
      setAttackError(1)
    } else {
      setAttackError(2)
    }

    if (minAttack == true && some) {
      setAttackError(0)
    }


    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  const [defensetError, setDefenseError] = useState(1)
  const handleChangeDefense = (e) => {
    const valueDefense = e.target.value;
    const some = valueDefense.length > 0;
    const minDefense = valueDefense > 10

    if (some == false) {
      setDefenseError(1)
    } else {
      setDefenseError(2)
    }

    if (minDefense == true && some) {
      setDefenseError(0)
    }

    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  const [imagetError, setImageError] = useState(1)
  const handleChangeImage = (e) => {
    const valueImage = e.target.value;
    const some = valueImage.length > 0;
    const minImage = valueImage.length > 10

    if (some == false) {
      setImageError(1)
    } else {
      setImageError(2)
    }

    if (minImage == true && some) {
      setImageError(0)
    }
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }


  //Handle
  function handleSelect(e) {
    setInputs({
      ...inputs,
      types: [...inputs.types, e.target.value]
    });
  }

  const handleDelete = (t, e) => {
    e.preventDefault()
    setInputs({
      ...inputs,
      types: inputs.types.filter((x) => x !== t)
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(postPokemon(inputs))
    setInputs({ name: "", hp: "", attack: "", defense: "", speed: "", height: "", weight: "", image: "", types: [] }) //blank 
  }



  useEffect(() => {
    dispatch(getPokemonsBackAgain()) //the next one witch need to delete or optimizate
    dispatch(getAllTypes())  //i only need to call it 1 time
  }, [])



  return (
    <div className="contenedor-componente">

      <h1> Create Pokemon  </h1>

      <ModoNocturno/>

      <Link to="/home">
        <button className="boton-back"> <span> Back </span> </button>
      </Link>

      <form onSubmit={(e) => handleSubmit(e)} className="contenedor-form-createpokemon" >
        <label className="contenedor-rellenar">
          <h4>Nombre</h4>
          <input onChange={(e) => handleChangeName(e)} value={inputs.name} name="name" type="text" required="" />
          {(numberError == 1) && (
            <p className="form-error-name" > Completar campo. </p>
          )}

          {(numberError == 2) && (
            <p className="form-error-name" > Solo puedes introducir letras. </p>
          )}

          {(numberError == 3) && (
            <p className="form-error-name" > El nombre minimo es de 3 caracteres. </p>
          )}

          {(numberError == 4) && (
            <p className="form-error-name" > El nombre maximo es de 13 caracteres. </p>
          )}


        </label>

        <label className="contenedor-rellenar">
          <h4>Hp</h4>
          <input onChange={(e) => handleChangeHp(e)} value={inputs.hp} name="hp" type="number" required="" />

          {(hptError == 1) && (
            <p className="form-error-name" > Completar campo. </p>
          )}

          {(hptError == 2) && (
            <p className="form-error-name" > El hp minimo debe ser mayor a 5 </p>
          )}

        </label>

        <label className="contenedor-rellenar">
          <h4>Attack</h4>
          <input onChange={(e) => handleChangeAttack(e)} value={inputs.attack} name="attack" type="number" required="" />

          {(attacktError == 1) && (
            <p className="form-error-name" > Completar campo. </p>
          )}

          {(attacktError == 2) && (
            <p className="form-error-name" > El attack minimo debe ser mayor a 10 </p>
          )}
        </label>

        <label className="contenedor-rellenar">
          <h4>Defense</h4>
          <input onChange={(e) => handleChangeDefense(e)} value={inputs.defense} name="defense" type="number" required="" />

          {(defensetError == 1) && (
            <p className="form-error-name" > Completar campo. </p>
          )}

          {(defensetError == 2) && (
            <p className="form-error-name" > La defensa minima debe ser mayor a 10 </p>
          )}

        </label>

        <label className="contenedor-rellenar">
          <h4>Speed</h4>
          <input onChange={(e) => handleChangeSpeed(e)} value={inputs.speed} name="speed" type="number" required="" />

          {(speedError == 1) && (
            <p className="form-error-name" > Completar campo. </p>
          )}

          {(speedError == 2) && (
            <p className="form-error-name" > La minima velocidad debe ser mayor a 10 </p>
          )}

          {(speedError == 3) && (
            <p className="form-error-name" > La maxima velocidad debe ser menor a 250 </p>
          )}

        </label>

        <label className="contenedor-rellenar">
          <h4>Height</h4>
          <input onChange={(e) => handleChangeHeight(e)} value={inputs.height} name="height" type="number" required="" />

          {(heightError == 1) && (
            <p className="form-error-name" > Completar campo. </p>
          )}

          {(heightError == 2) && (
            <p className="form-error-name" > La altura minima debe ser mayor a 2 </p>
          )}

          {(heightError == 3) && (
            <p className="form-error-name" > La altura max debe ser menor a 25 </p>
          )}

        </label>

        <label className="contenedor-rellenar">
          <h4>Weight</h4>
          <input onChange={(e) => handleChangeWeight(e)} value={inputs.weight} name="weight" type="number" required="" />

          {(weightError == 1) && (
            <p className="form-error-name" > Completar campo. </p>
          )}

          {(weightError == 2) && (
            <p className="form-error-name" > El peso min debe ser mayor a 10 </p>
          )}

          {(weightError == 3) && (
            <p className="form-error-name" > El peso max debe ser menor a 2500 </p>
          )}


        </label>

        <label className="contenedor-rellenar">
          <h4>Image</h4>
          <input onChange={(e) => handleChangeImage(e)} value={inputs.image} name="image" type="text" required="" />

          {(imagetError == 1) && (
            <p className="form-error-name" > Completar campo. </p>
          )}

          {(imagetError == 2) && (
            <p className="form-error-name" > La URL debe tener mas de 10 caracteres  </p>
          )}

        </label>

        <div className="contenedor-rellenar">
          <h4>Type</h4>
          <select onChange={(e) => handleSelect(e)} name="types" >
            {types.map((t) => (
              <option value={t.name} > {t.name} </option>))}
          </select>
        </div>

        <div className="contenedor-delete">
          {inputs.types.map((t) => (
            <ul>
              <button className="button-x" onClick={(e) => handleDelete(t, e)} > X </button>
              <p className="button-x-type" >{t}</p>

            </ul>
          ))}
        </div>



        <button disabled={numberError > 0 || speedError > 0 || heightError > 0 ||
          weightError > 0 || hptError > 0 || attacktError > 0 || defensetError > 0 || imagetError > 0} className="button-send" type="submit" >
          Send
        </button>

      </form>

      <img className="imagen-component-create" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/447.png" />

    </div>
  )
}

export default CreatePoke;

