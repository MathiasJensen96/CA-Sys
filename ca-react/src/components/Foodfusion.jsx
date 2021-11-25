import React, {useState, useEffect} from "react";

function Foodfusion (){

  const [id, setId] = useState("");
  const [businessname, setBusinessname] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [menu, setMenu] = useState("");


    fetch(`http://localhost:8080/Restaurant/api/info`)
      .then(res => res.json())
      .then(data => {
        const restaurant = data[0];
        //console.log(data[3])
        setId(restaurant.id)
        setBusinessname(restaurant.businessname)
        setImage(restaurant.image)
        setLocation(restaurant.location)
        setPhone(restaurant.phone)
        setAddress(restaurant.address)
        setMenu(restaurant.menu)
      })
    
    return (
        <div>
          <h2>Foodfusion</h2>
          <p>{businessname}</p>
          <p>{image}</p>
          <p>{location}</p>
          <p>{phone}</p>
          <p>{address}</p>
        </div>
      );
}

export default Foodfusion;