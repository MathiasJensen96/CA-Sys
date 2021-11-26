export default function Basket(props) {
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
          </tr>
        ))}
      </tbody>
    </table>
  );
}
