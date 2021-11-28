export default function Basket(props) {
  //   const handleSubmit = () => {
  //     console.log(props.basket);
  //     //updateBasket();
  //   };
  return (
    <div key={props.basket}>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Menu Name</th>
            <th scope="col">Amount</th>
            <th scope="col">Price</th>
            <th scope="col"></th>
            <th scope="col"></th>
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
                <i class="fas fa-plus"></i>
              </td>
              <td>
                <i class="fas fa-minus"></i>
              </td>
              <td>
                <i
                  className="fas fa-trash"
                  onClick={() => props.updateBasket(basket)}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1>Total Price: {props.calcTotalPrice(props.basket)}</h1>
      <a href="http://localhost:3000/Receipt">Make Order</a>
    </div>
  );
}
