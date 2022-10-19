
import "./landingpage.css"
import { Link } from "react-router-dom"


function LandingPage() {

    return (
        <div className="contenedor-landing" >
            <div className="block-top" />

            <h1> Landing Page </h1>

            <Link to="/home">
                <button > Ingresar </button>
            </Link>

            <img src="https://i.pinimg.com/originals/ad/51/5d/ad515d6f12c4bb7fe88a22dd3f143ed5.png" />

            <div className="block-bot" />
        </div>
    )
}

export default LandingPage;