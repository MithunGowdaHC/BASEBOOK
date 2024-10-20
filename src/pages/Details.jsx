import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useFirebase } from "../context/Firebase";
import { Form } from "react-bootstrap";

const Details = () => {
  const firebase = useFirebase();
  const params = useParams();
  const [details, setDetails] = useState(null);
  const [url, setURL] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    firebase
      .getBookById(params.bookID)
      .then((value) => setDetails(value.data()));
    console.log(details);
  }, []);

  useEffect(() => {
    if (details) {
      const imageURL = details.imageURL;
      firebase.getImageURL(imageURL).then((url) => setURL(url));
    }
  }, [details]);

  const placeOrder = async () => {
    const result = await firebase.placeOrder(params.bookID, qty)
    return result
    console.log("result", result)

  }

  if (details == null) return <h1>Loading..</h1>;
  return (
    <div className="container mt-5">
      <h1>{details.name}</h1>
      <img style={{ borderRadius: "10px" }} src={url} />
      <h1>Details</h1>
      <p>Price : Rs.{details.price}</p>
      <p>ISBN :{details.isbnNumber}</p>

      <h3>Owner Details</h3>
      <p>{details.name}</p>
      <p>Email: {details.userEmail}</p>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          type="number"
          placeholder="Enter the quantity"
        />
      </Form.Group>
      <Button onClick={placeOrder}>Buy Now</Button>
    </div>
  );
};

export default Details;
