export default function History(props) {
  return (
    <div key={props.orderAPI}>
      {console.log(props)}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Menu Name</th>
            <th scope="col">Amount</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {props.orderAPI.map((order) => (
            <tr key={order.menuname}>
              <td>{order.menuname}</td>
              <td>{order.amount}</td>
              <td>{order.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
