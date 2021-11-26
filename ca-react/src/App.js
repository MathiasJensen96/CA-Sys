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
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const initialRestaurantState = {
  foodfusion: null,
  hathawayFoods: null,
  sugarbeeKitchen: null,
  potASoupKitchen: null,
};

const initialMenuState = {
  foodfusion: null,
  hathawayFoods: null,
  sugarbeeKitchen: null,
  potASoupKitchen: null,
};

export default function BasicExample() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("All is good ... so far");
  const [restaurants, setRestaurants] = useState(initialRestaurantState);
  const [menus, setMenus] = useState(initialMenuState);
  const [basket, setBasket] = useState(() => {
    if (!localStorage.getItem("basketToken")) {
      return new Array();
    } else {
      return JSON.parse(localStorage.getItem("basketToken"));
    }
  });
  const logout = () => {
    facade.logout();
    setLoggedIn(false);
    setErrorMessage("Logged out.");
  };

  useEffect(() => {
    fetch(`http://localhost:8080/Restaurant/api/info/menu`)
      .then((res) => res.json())
      .then((data) => {
        const newMenus = {
          foodfusion: { ...data[0], price: 200 },
          hathawayFoods: { ...data[1], price: 400 },
          sugarbeeKitchen: { ...data[2], price: 600 },
          potASoupKitchen: { ...data[3], price: 600 },
        };
        setMenus(newMenus);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8080/Restaurant/api/info`)
      .then((res) => res.json())
      .then((data) => {
        const newRestaurants = {
          foodfusion: data[0],
          hathawayFoods: data[1],
          sugarbeeKitchen: data[2],
          potASoupKitchen: data[3],
        };
        setRestaurants(newRestaurants);
      });
  }, []);

  function addToBasket(basketItem) {
    let ourBasket = basket.find((basket) => {
      return basket.menuname === basketItem.menuname;
    });
    if (!ourBasket) {
      basket.push(basketItem);
      setBasket(basket);
    } else {
      setBasket(
        basket.map((basket) => {
          if (basket.menuname === basketItem.menuname) {
            basket.amount++;
            basket.price = basket.price + basketItem.price;
          }
          return basket;
        })
      );
    }
    localStorage.setItem("basketToken", JSON.stringify(basket));
  }

  return (
    <Router>
      <div>
        <OurNavbar />
        <div className="content">
          {/* {JSON.stringify(restaurants, null, 2)} */}
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
              <Foodfusion
                restaurantAPI={restaurants.foodfusion}
                menuAPI={menus.foodfusion}
                addToBasket={addToBasket}
              />
            </Route>
            <Route path="/HathawayFoods">
              <HathawayFoods
                restaurantAPI={restaurants.hathawayFoods}
                menuAPI={menus.hathawayFoods}
                addToBasket={addToBasket}
              />
            </Route>
            <Route path="/SugarbeeKitchen">
              <SugarbeeKitchen
                restaurantAPI={restaurants.sugarbeeKitchen}
                menuAPI={menus.sugarbeeKitchen}
                addToBasket={addToBasket}
              />
            </Route>
            <Route path="/PotASoupKitchen">
              <PotASoupKitchen
                restaurantAPI={restaurants.potASoupKitchen}
                menuAPI={menus.potASoupKitchen}
                addToBasket={addToBasket}
              />
            </Route>
            <Route path="/Basket">
              <Basket basket={basket} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}
