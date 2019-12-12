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
import UserSoundboards from "./pages/sound/UserSoundboards";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";

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
            <Route path="/sounds/users/:id" exact>
              <UserSoundboards />
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
