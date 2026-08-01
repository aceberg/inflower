import { lazy, onMount } from "solid-js";
import { Router, Route } from "@solidjs/router";
import './App.css';

import Body from './pages/Body';
import Header from './components/All/Header';

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { runAtStart } from "./functions/atstart";

function App() {

  onMount(async () => {
    await runAtStart();
  });

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
