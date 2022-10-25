
import "./landingpage.css"
import { Link } from "react-router-dom"


function LandingPage() {

    return (
        <div className="contenedor-landing" >
            <div className="block-top" />

            <h1> Landing Page </h1>

            <div className="historia">
                <l> La franquicia Pokémon originalmente nació como una serie de videojuegos para la consola Nintendo. Su creador es Satoshi Tajiri y el primero de ellos (denominado Pocket Monsters Aka and Midori) salió al mercado el 27 de febrero de 1996 A la fecha se han presentado al mercado alrededor de 50 videojuegos. </l>

            </div>


            <Link to="/home">
                <button > Ingresar </button>
            </Link>

            <img src="https://i.pinimg.com/originals/ad/51/5d/ad515d6f12c4bb7fe88a22dd3f143ed5.png" className="image-landing" />

            <div className="block-bot" />
        </div>
    )
}

export default LandingPage;