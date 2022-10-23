import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailsId, getPokemonsBackAgain } from "../../store/actions/actionsPoke";
import './details.css'

function Details() {
    const dispatch = useDispatch();
    let { id } = useParams();

    useEffect(() => {
        dispatch(getPokemonsBackAgain())
        dispatch(getDetailsId(id))
    }, [dispatch, id])

    const pokemonDetalle  = useSelector((s) => s.detail)

    

    return (

        <div >
            <div>
                <Link to="/home">
                    <button >Volver</button>
                </Link>
                {pokemonDetalle.map((p) => {
                    return (
                        <div className="wrap-card-detail">
                            <h2> {p.name} </h2>

                            <div> {typeof p.types[0] === "string" ? p.types.map((cadauno) => { return <h3>{cadauno}</h3> })
                                : <div> {p.types.map((x) => {
                                    return <h3> {x.name} </h3>})}
                                </div>}
                            </div>

                            <img src={p.image} />
                            
                            <h3> ID: </h3> <h4> {p.id} </h4>
                            <h3> Attack: </h3> <h4> {p.attack} </h4>
                            <h3> Defense: </h3> <h4> {p.defense} </h4>
                            <h3> Speed: </h3> <h4> {p.speed} </h4>
                            <h3> Height: </h3> <h4> {p.height} </h4>
                            <h3> Weight: </h3> <h4> {p.weight} </h4>


                        </div>
                    )
                })}
            </div>
        </div>
    );

}

export default Details;