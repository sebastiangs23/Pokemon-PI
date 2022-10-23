import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom"
import Home from './componentes/home/home';
import LandingPage from './componentes/landingPage/landingpage';
import CreatePoke from './componentes/createPoke/createPoke';
import Details from './componentes/details/details';

function App() {
  return ( //Aca deben ir las rutas
    <div className="App">
      <Router>
        <Route exact path="/" render={()=> <LandingPage/>} /> 
        <Route exact path="/home" render={() => <Home />} />
        <Route exact path="/home/create" render={() => <CreatePoke />} />
        <Route exact path='/home/detail/:id' render={() => <Details /> }/>
      </Router>

    </div>
  );
}

export default App;
