import "bootstrap/dist/css/bootstrap.css";

function Foodfusion(props) {
  const handleSubmit = () => {
    //console.log(props);
    const newBasketItem = {
      menuname: props.menuAPI.menuname,
      amount: 1,
      price: props.menuAPI.price,
      totalPrice: props.menuAPI.price,
    };
    props.addToBasket(newBasketItem);
    //console.log(newBasketItem);
  };

  //console.log(basketItem);

  return props.restaurantAPI ? (
    <div>
      <div className="col-xs-1" align="center">
        <h2>Foodfusion</h2>
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

      <div className="card" align="center">
        <div className="card-body">
          <b>{props.menuAPI.menuname}</b>
        </div>
        <p>{props.menuAPI.description}</p>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <img
            className="picture"
            src={props.menuAPI.images[0]}
            height="350px;"
            width="400px;"
          ></img>
          <img
            className="picture"
            src={props.menuAPI.images[1]}
            height="350px;"
            width="400px;"
          ></img>
          <img
            className="picture"
            src={props.menuAPI.images[2]}
            height="350px;"
            width="400px;"
          ></img>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onClick={handleSubmit}
          type="button"
          className="btn btn-secondary btn-lg"
        >
          Add to Basket
        </button>
      </div>
    </div>
  ) : (
    <h1>Loading</h1>
  );
}

export default Foodfusion;
