import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import Navbar from "./components/navigation/Navbar";
import SoundList from "./components/sound/SoundList";
import New from "./pages/sound/new";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/signup";

import "./App.css";

const App = () => {
  return (
    <>
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route path="/sounds" exact>
              <SoundList />
            </Route>
            <Route path="/sounds/new" exact>
              <New />
            </Route>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/signup" exact>
              <SignUp />
            </Route>
            <Redirect to="/sounds" />
          </Switch>
        </Router>
      </div>
    </>
  );
};

export default App;
