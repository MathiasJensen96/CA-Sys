import React, { useState, useEffect } from "react";

function PotASoupKitchen(props) {
  return props.restaurantAPI ? (
    <div className="col-xs-1" align="center">
      <h2>Pot a Soup Kitchen</h2>
      <img
        className="picture"
        src={props.restaurantAPI.image}
        height="250px;"
      ></img>
      <p>
        <b>City:</b> {props.restaurantAPI.location}
      </p>
      <p>
        <b>Contact:</b> {props.restaurantAPI.phone}
      </p>
      <p>
        <b>Address:</b> {props.restaurantAPI.address}
      </p>
    </div>
  ) : (
    <h1>Loading</h1>
  );
}

export default PotASoupKitchen;
