import "./App.css";
import "./style2.css";
import OurNavbar from "./components/Navbar";
import Home from "./components/Home";
import Foodfusion from "./components/Foodfusion";
import HathawayFoods from "./components/HathawayFoods";
import SugarbeeKitchen from "./components/SugarbeeKitchen";
import PotASoupKitchen from "./components/PotASoupKitchen";
import Basket from "./components/Basket";
import facade from "./facade";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function BasicExample() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("All is good ... so far");

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
    setErrorMessage("Logged out.");
  };

  return (
    <Router>
      <div>
        <OurNavbar />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home
                logout={logout}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                facade={facade}
                setErrorMessage={setErrorMessage}
              />
            </Route>
            <Route path="/Foodfusion">
              <Foodfusion />
            </Route>
            <Route path="/HathawayFoods">
              <HathawayFoods />
            </Route>
            <Route path="/SugarbeeKitchen">
              <SugarbeeKitchen />
            </Route>
            <Route path="/PotASoupKitchen">
              <PotASoupKitchen />
            </Route>
            <Route path="/Basket">
              <Basket />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}
