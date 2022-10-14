import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom"
import Home from "./componentes/home"
import LandingPage from './componentes/landingpage';

function App() {
  return ( //Aca deben ir las rutas
    <div className="App">
      <Router>
        <Route exact path="/" render={()=> <LandingPage/>} /> 
        <Route exact path="/home" render={() => <Home />} />
        
      </Router>

    </div>
  );
}

export default App;
