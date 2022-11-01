import React from "react"
import "./paginado.css"

function Paginado({ pokemonsXPage, saveState, paginadoEstoy }) {  
    const pageNumber = []; 

    for (let i = 1; i <= Math.ceil(saveState / pokemonsXPage); i++) {
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