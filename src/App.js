
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, params } from "react-router-dom";
import Register from "./components/authentication/Register"
import Login from "./components/authentication/Login"
import ForgotPassword from "./components/authentication/ForgotPassword"
import ResetPassword from "./components/authentication/ResetPassword"
import GetRooms from "./components/rooms/GetRooms"
import "bulma";





function App() {
  return (
    <div className="App">
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav> */}

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/forgotpassword">
            <ForgotPassword />
          </Route>
          <Route
            exact
            path="/passwordreset/:resetToken"
            component={ResetPassword}
          />
          <Route
            exact
            path="/rooms"
            component={GetRooms}
          />
          {/* <Route path="/">
            <Home />
          </Route> */}
        </Switch>
      </div>
    </Router>
    </div>
  );
}

export default App;


