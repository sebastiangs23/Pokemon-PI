import './App.css';
import React, { Suspense, lazy } from 'react'; //loader

import { BrowserRouter as Router, Route } from "react-router-dom"
// import Home from './componentes/home/home';
// import LandingPage from './componentes/landingPage/landingpage';
// import CreatePoke from './componentes/createPoke/createPoke';
// import Details from './componentes/details/details';

//Loader
import Loader from './componentes/loader/loader';

//LAZY
const CreatePoke = lazy(() => import("./componentes/createPoke/createPoke"))
const LandingPage = lazy(() => import("./componentes/landingPage/landingpage"))
const Home = lazy(() => import("./componentes/home/home"))
const Details = lazy(() => import("./componentes/details/details"))

function App() {
  return ( //Aca deben ir las rutas

    <div className="App">

      <Router>

        <Suspense fallback={<div> {<Loader />}  </div>} >
          <Route exact path="/" render={() => <LandingPage />} />
        </Suspense>

        <Suspense fallback={<div> {<Loader />}  </div>} >
          <Route exact path="/home" render={() => <Home />} />
        </Suspense>

        <Suspense fallback={<div> {<Loader />}  </div>} >
          <Route exact path="/home/create" render={() => <CreatePoke />} />
        </Suspense>

        <Suspense fallback={<div> {<Loader />}  </div>} >
          <Route exact path='/home/detail/:id' render={() => <Details />} />
        </Suspense>


      </Router>



    </div >
  );
}

export default App;
