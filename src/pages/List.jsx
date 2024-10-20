import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {useFirebase} from "../context/Firebase"

const ListingPage = () => {
  const [name, setName] = useState("");
  const [isbnNumber, setIsbnNumber] = useState("");
  const [price, setPrice] = useState("");
  const [picture, setPicture] = useState("");

  const firebase = useFirebase()

  const handleSubmit = async (e) => {
    e.preventDefault();
    firebase.handleCreateNewList(name, isbnNumber, price, picture)

  };
  return (
    <div className="container mt-3">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter Book Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Book"
          />
          
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>ISBN Number</Form.Label>
          <Form.Control
            value={isbnNumber}
            onChange={(e) => setIsbnNumber(e.target.value)}
            type="text"
            placeholder="ISBN Number"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Price</Form.Label>
          <Form.Control
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="text"
            placeholder="Price of the Book"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Upload Picture</Form.Label>
          <Form.Control
            onChange={(e) => setPicture(e.target.files[0])}
            type="file"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create List
        </Button>
      </Form>
    </div>
  );
};

export default ListingPage;
