import { useEffect } from "react";
export default function Receipt(props) {
  useEffect(() => {
    buy();
  }, []);
  async function buy() {
    for (let element of props.basket) {
      await props.makeReceipt(element);
    }
  }
  return (
    <div>
      <h1>
        You have ordered the following dishes:{" "}
        {props.basket
          .map((item) => item.amount + "x " + item.menuname)
          .join(", ")}
      </h1>
      <p>
        The total price of the order is: {props.calcTotalPrice(props.basket)}
      </p>
      <p>The estimated time of delivery is aproximately 4 working days...</p>
    </div>
  );
}
