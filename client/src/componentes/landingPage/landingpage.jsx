
import "./landingpage.css"
import { Link } from "react-router-dom"
const imagenHelper = import("../../imgift/landinghelper.jpg")


function LandingPage() {

    return (
        <div className="contenedor-landing" >
            <div className="conteiner-grid" >

                <div className="block-top" />

                <div className="div-h1"  >
                    <h1> Landing Page </h1>
                </div>

                <div className="wrap-img">
                    <img src="https://i.pinimg.com/originals/ad/51/5d/ad515d6f12c4bb7fe88a22dd3f143ed5.png" className="image-landing" />
                </div>
                
                <div className="wrap-link">
                    <Link to="/home">
                        <button className="button-ingresar" > <span> Ingresar </span>  </button>
                    </Link>
                </div>

                <div className="contenedor-imagen-helper" >
                    <img src="https://1000logos.net/wp-content/uploads/2017/05/Symbol-Pokemon-Logo.jpg" />
                </div>

                <div className="historia">
                    <p> La franquicia Pokémon originalmente nació como una serie de videojuegos para la consola Nintendo. Su creador es Satoshi Tajiri y el primero de ellos (denominado Pocket Monsters Aka and Midori) salió al mercado el 27 de febrero de 1996 A la fecha se han presentado al mercado alrededor de 50 videojuegos. </p>
                </div>


                



                <div className="block-bot" />

            </div>

        </div>
    )
}

export default LandingPage;