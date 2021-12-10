export default function History(props) {
  return (
    // <div key={props.orderAPI}>
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Menu Name</th>
          <th scope="col">Amount</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody>
        {/* {props.orderAPI.map((order) => (
          <tr key={order.menuname}>
            <td>{order.menuname}</td>
            <td>{order.amount}</td>
            <td>{order.totalPrice}</td>
          </tr>
        ))} */}
        <tr>
          <td>{props.orderAPI.menuname}</td>
          <td>{props.orderAPI.amount}</td>
          <td>{props.orderAPI.totalPrice}</td>
        </tr>
      </tbody>
    </table>
    // </div>
  );
}
