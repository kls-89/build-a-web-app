import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import Fire from "./pages/Fire";
import Police from "./pages/Police";
import Homepage from "./pages/Homepage";
import ReferenceList from "./pages/ReferenceList";
import Navbar from "./navigation/Navbar";
import Footer from "./navigation/Footer";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <Homepage />
          </Route>
          <Route path="/references" exact>
            <ReferenceList />
          </Route>
          <Route path="/police" exact>
            <Police title="Police" />
          </Route>
          <Route path="/fire" exact>
            <Fire title="Fire" />
          </Route>
          <Redirect to="/" />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
