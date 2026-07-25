import { onMount } from "solid-js";
import { Router, Route } from "@solidjs/router";
import './App.css';

import Body from './pages/Body';
import Header from './components/Header';
import { runAtStart } from "./functions/atstart";


function App() {

  onMount(() => {
    runAtStart();
  });

  return (
    <>
    <Header></Header>
    <div class="container-lg">
      
          <Router>
            <Route path="/" component={Body}/>
          </Router>
      
    </div>
    </>
  )
}

export default App
