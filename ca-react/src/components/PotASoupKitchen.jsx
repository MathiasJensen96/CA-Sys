import React, { useState, useEffect } from "react";

function PotASoupKitchen() {
  const [id, setId] = useState("");
  const [businessname, setBusinessname] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [menu, setMenu] = useState("");

  fetch(`http://localhost:8080/Restaurant/api/info`)
    .then((res) => res.json())
    .then((data) => {
      const restaurant = data[3];
      //console.log(data[3])
      setId(restaurant.id);
      setBusinessname(restaurant.businessname);
      setImage(restaurant.image);
      setLocation(restaurant.location);
      setPhone(restaurant.phone);
      setAddress(restaurant.address);
      setMenu(restaurant.menu);
    });

  return (
    <div class="col-xs-1" align="center">
      <h2>Pot a Soup Kitchen</h2>
      <img class="picture" src={image} height="250px;"></img>
      <p>
        <b>City:</b> {location}
      </p>
      <p>
        <b>Contact:</b> {phone}
      </p>
      <p>
        <b>Address:</b> {address}
      </p>
    </div>
  );
}

export default PotASoupKitchen;
