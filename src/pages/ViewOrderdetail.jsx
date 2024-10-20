import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const ViewOrderdetails = () => {
  const params = useParams();
  const [orders, setOrders] = useState([]);
  const firebase = useFirebase();
  useEffect(() => {
    firebase.getOrders(params.bookID).then((orders) => setOrders(orders.docs));
  }, []);
  return (
    <div  className="container">
      <h1>Orders</h1>
      {orders.map((order) => {
        const data = order.data();
        return (
          <div key={order.id}
            className="container mt-5"
            style={{ border: "1px solid", padding: "10px" }}
          >
            <h5>Order by: {data.displayName}</h5>
            <h3>Qty : {data.qty}</h3>
            <p>Email: {data.userEmail}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ViewOrderdetails;
