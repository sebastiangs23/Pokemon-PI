
import React from "react";
import { useState } from "react";

function ModoNocturno(){

    const [botonState,setBotonState] = useState(false)

    const handleClickC = () => {
        setBotonState(botonState => !botonState)
    }

    let toggleClass = botonState ? " active" : "";

    return (
        <div>
            <button className={`switch${toggleClass}`} id="switch" onClick={() => {handleClickC()}} >
                <span> <i class="fa-solid fa-sun"></i> </span>
                <span> <i class="fa-solid fa-moon"></i> </span>
            </button>
        </div>
    )
}

export default ModoNocturno;