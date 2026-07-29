import { lazy } from "solid-js";
import { Router, Route } from "@solidjs/router";
import './App.css';

import Body from './pages/Body';
import Header from './components/Header';

import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {

  const Config = lazy(() => import("./pages/Config"));
  const History = lazy(() => import("./pages/History"));
  const Months = lazy(() => import("./pages/Months"));

  return (
    <>
    <Header></Header>
    <div class="container-lg">
      <Router>
        <Route path="/" component={Body}/>
        <Route path="/config" component={Config}/>
        <Route path="/history" component={History}/>
        <Route path="/months" component={Months}/>
      </Router>
    </div>
    </>
  )
}

export default App
