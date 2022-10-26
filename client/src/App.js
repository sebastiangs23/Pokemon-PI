import './App.css';
import React, { Suspense, lazy } from 'react'; 
import { BrowserRouter as Router, Route } from "react-router-dom"
import Loader from './componentes/loader/loader';

//LAZY
const CreatePoke = lazy(() => import("./componentes/createPoke/createPoke"))
const LandingPage = lazy(() => import("./componentes/landingPage/landingpage"))
const Home = lazy(() => import("./componentes/home/home"))
const Details = lazy(() => import("./componentes/details/details"))

function App() {
  return ( 

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
