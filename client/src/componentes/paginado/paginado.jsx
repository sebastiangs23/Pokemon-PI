import React from "react"

function Paginado({ pokemonsXPage, saveState, paginadoEstoy }) {  //props
    const pageNumber = []; //El numero total de paginas

    for (let i = 1; i <= Math.ceil(saveState / pokemonsXPage); i++) { //Le manda el saveState.length 
        pageNumber.push(i);
    }

    return (
        <nav>
            <div >
                {pageNumber.map((n) => (
                        <button onClick={() => paginadoEstoy(n)}>
                            {n}
                        </button>
                    ))}
            </div>
        </nav>
    )
}

export default Paginado;