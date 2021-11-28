export default function Receipt(props) {
  return (
    <div>
      {/* TODO: Cant read our info in {}... */}
      <h1>You have ordered the following dishes: {props.basket.menuname}</h1>
      <p>
        The total price of the order is: {props.calcTotalPrice(props.basket)}
      </p>
      <p>The estimated time of delivery is aproximately 4 working days...</p>
    </div>
  );
}
