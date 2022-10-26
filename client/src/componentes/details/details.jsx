import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailsId, returnOfDetails } from "../../store/actions/actionsPoke";
import './details.css'

function Details() {
    const dispatch = useDispatch();
    let { id } = useParams();

    useEffect(() => {
        dispatch(getDetailsId(id))
        dispatch(returnOfDetails())
    }, [dispatch, id])

    const pokemonDetalle = useSelector((s) => s.detail)

    function handleClickReturn(e) {
        dispatch(returnOfDetails())
    }

    return (

        <div >
            <div className="wrap-all" >

                {pokemonDetalle.map((p) => {
                    return (
                        <div className="wrap-card-detail">

                            <div className="name-types" >
                                <h2> {p.name} </h2>

                                <div> {typeof p.types[0] === "string" ? p.types.map((cadauno) => { return <h3>{cadauno}</h3> })
                                    : <div> {p.types.map((x) => {
                                        return <h3> {x.name} </h3>
                                    })}
                                    </div>}
                                </div>
                            </div>


                            <img src={p.image} className="imagen-detalle" />
                            <div className="wrap-letters" >

                                <div className="primera-fila" >
                                    <h3> Hp: </h3> <h4> {p.hp} </h4>
                                    <h3> Attack: </h3> <h4> {p.attack} </h4>
                                </div>

                                <div className="segunda-fila" >
                                    <h3> Defense: </h3> <h4> {p.defense} </h4>
                                    <h3> Speed: </h3> <h4> {p.speed} </h4>
                                </div>

                                <div className="tercera-fila" >
                                    <h3> Height: </h3> <h4> {p.height} </h4>
                                    <h3> Weight: </h3> <h4> {p.weight} </h4>
                                    <h3> ID: </h3> <h4> {p.id} </h4>
                                </div>




                            </div>

                        </div>
                    )
                })}

                <Link to="/home">
                    <button onClick={(e) => { handleClickReturn(e) }} className="button-details-back" > <span> Volver </span> </button>
                </Link>
            </div>
        </div>
    );

}

export default Details;