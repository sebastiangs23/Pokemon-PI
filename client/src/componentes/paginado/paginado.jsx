import React from "react"
import "./paginado.css"

function Paginado({ pokemonsXPage, saveState, paginadoEstoy }) {  //props
    const pageNumber = []; //El numero total de paginas

    for (let i = 1; i <= Math.ceil(saveState / pokemonsXPage); i++) { //Le manda el saveState.length 
        pageNumber.push(i);
    }

    return (
        <nav className="wrap-paginado" >
            <div className="border-paginado">
                {pageNumber.map((n) => (
                        <button  className="botones-pag-individuales" onClick={() => paginadoEstoy(n) }>
                            {n}
                        </button>
                    ))}
            </div>
        </nav>
    )
}

export default Paginado;