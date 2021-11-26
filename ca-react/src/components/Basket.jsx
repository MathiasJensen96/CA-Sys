export default function Basket(props) {
  //   const handleSubmit = () => {
  //     console.log(props.basket);
  //     //updateBasket();
  //   };
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Menu Name</th>
          <th scope="col">Amount</th>
          <th scope="col">Price</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {props.basket.map((basket) => (
          <tr key={basket.menuname}>
            <td>{basket.menuname}</td>
            <td>{basket.amount}</td>
            <td>{basket.price}</td>
            <td>
              <i
                // id={basket.menuname}
                className="fas fa-trash"
                // onClick={handleSubmit}
              ></i>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// function updateBasket(basketItem) {
//   //basketItem = this.basket;
//   console.log(basketItem);
//   //basketItem.amount = basketItem.amount - 1;
//   //basket.price = basket.price - basketItem.price;
// }
