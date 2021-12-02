import "./App.css";
import "./style2.css";
import OurNavbar from "./components/Navbar";
import Home from "./components/Home";
import Foodfusion from "./components/Foodfusion";
import HathawayFoods from "./components/HathawayFoods";
import SugarbeeKitchen from "./components/SugarbeeKitchen";
import Areachops from "./components/Areachops";
import Basket from "./components/Basket";
import Receipt from "./components/Receipt";
import facade from "./facade";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import { render } from "@testing-library/react";

const initialRestaurantState = {
  foodfusion: null,
  hathawayFoods: null,
  sugarbeeKitchen: null,
  areachops: null,
};

const initialMenuState = {
  foodfusion: null,
  hathawayFoods: null,
  sugarbeeKitchen: null,
  areachops: null,
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
          foodfusion: { ...data[0], price: 200, totalPrice: 0 },
          hathawayFoods: { ...data[1], price: 400, totalPrice: 0 },
          sugarbeeKitchen: { ...data[2], price: 600, totalPrice: 0 },
          areachops: { ...data[3], price: 600, totalPrice: 0 },
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
          areachops: data[3],
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
            basket.totalPrice = basket.price * basket.amount;
            console.log(basket.totalPrice);
          }
          return basket;
        })
      );
    }
    localStorage.setItem("basketToken", JSON.stringify(basket));
  }

  function removeFromBasket(basketItem) {
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
            if (basket.amount > 1) {
              basket.amount = basket.amount - 1;
              basket.totalPrice = basket.price * basket.amount;
            } else if (basket.amount === 1) {
              updateBasket(basket);
            }
          }
          return basket;
        })
      );
    }
    localStorage.setItem("basketToken", JSON.stringify(basket));
  }

  function updateBasket(basketItem) {
    const filteredBasket = basket.filter((item) => item !== basketItem);
    console.log(filteredBasket);
    setBasket(filteredBasket);
    localStorage.setItem("basketToken", JSON.stringify(basket));
    //TODO: Cant remove the last item?
  }

  function calcTotalPrice(basket) {
    var total = 0;
    basket.forEach((element) => {
      total += element.totalPrice;
    });
    return total;
  }

  function makeReceipt(basket) {
    const receiptObject = {
      menuname: basket.menuname,
      amount: basket.amount,
      price: basket.price,
      totalPrice: basket.totalPrice,
    };

    //console.log(receiptObject);

    const options = facade.makeOptions("POST", true, receiptObject);

    fetch(`http://localhost:8080/Restaurant/api/receipt`, options)
      .then(facade.handleHttpErrors)
      .then((data) => {})
      .catch(facade.errorHandling);
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
            <Route path="/Areachops">
              <Areachops
                restaurantAPI={restaurants.areachops}
                menuAPI={menus.areachops}
                addToBasket={addToBasket}
              />
            </Route>
            <Route path="/Basket">
              <Basket
                basket={basket}
                updateBasket={updateBasket}
                calcTotalPrice={calcTotalPrice}
                addToBasket={addToBasket}
                removeFromBasket={removeFromBasket}
              />
            </Route>
            <Route path="/Receipt">
              <Receipt
                basket={basket}
                calcTotalPrice={calcTotalPrice}
                makeReceipt={makeReceipt}
              />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}
