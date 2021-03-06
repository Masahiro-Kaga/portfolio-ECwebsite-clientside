import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateProduct = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");

  const { productId } = useParams();

  // console.log(productId);

  const updateProduct = (e) => {
    e.preventDefault();
    fetch(`https://floating-stream-65303.herokuapp.com/products/updateProductInfo/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: productName,
        description,
        price,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSelectedProduct(
          <Row style={{ margin: "8rem auto" }}>
            <h1 style={{ color: "red" }}>Selected Item</h1>
            <Col xs={12}>
              <Card className="p-3 cardHighlight">
                <Card.Body>
                  <Card.Title>
                    <h2>Product Name : {data.name}</h2>
                    <Card.Text>Description : {data.description}</Card.Text>
                    <Card.Text>Price : {data.price}</Card.Text>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        );
        if (data._id) {
          Swal.fire({
            icon: "success",
            title: "Update Sucecss!",
            text: "Check new Status.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Update Failed",
            text: "Please try to update.",
          });
        }
      });
  };

  useEffect(() => {
    fetch(`https://floating-stream-65303.herokuapp.com/products/retrieveSingleProduct/${productId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSelectedProduct(
          <Row style={{ margin: "8rem auto" }}>
            <h1 style={{ color: "red" }}>Selected Item</h1>
            <Col xs={12}>
              <Card className="p-3 cardHighlight">
                <Card.Body>
                  <Card.Title>
                    <h2>Product Name : {data.name}</h2>
                    <Card.Text>Description : {data.description}</Card.Text>
                    <Card.Text>
                      Price :{" "}
                      {data.price.toLocaleString("ja-JP", {
                        style: "currency",
                        currency: "JPY",
                      })}
                    </Card.Text>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        );
      });
    // console.log(selectedProduct);
  }, [productId]);

  return (
    <>
      <Form onSubmit={(e) => updateProduct(e)}>
        <Form.Group className="m-3">
          {selectedProduct}
          <Form.Label>Product Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Product Name"
            onChange={(e) => setProductName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="m-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="m-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" className="m-3">
          Add Product
        </Button>
      </Form>
    </>
  );
};

export default UpdateProduct;
