import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";

const AdminDashboard = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [changedStatusItem, setChangedStatusItem] = useState({});

  useEffect(() => {
    fetch("http://localhost:4001/products/getAllProducts", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setAllProducts(
          data.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                {product.isActive ? (
                  <Button
                    onClick={() => changeStatusHandler(product)}
                    variant="danger"
                    className="mx-2"
                  >
                    Archive
                  </Button>
                ) : (
                  <Button
                    onClick={() => changeStatusHandler(product)}
                    variant="success"
                    className="mx-2"
                  >
                    Active
                  </Button>
                )}
                
              </td>
            </tr>
          ))
        );
      });
    console.log(changedStatusItem);
  }, [changedStatusItem]);

  const changeStatusHandler = (activateStatus) => {
    fetch(`http://localhost:4001/products/changeStatus/${activateStatus._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setChangedStatusItem(data);
      });
  };

  return (
    <>
      <h1 className="my-5 text-center">Admin Dashboard</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>idSample</td>
            <td>nameSample</td>
            <td>priceSample</td>
            <td>statusSample</td>
          </tr>
          {allProducts}
        </tbody>
      </Table>
    </>
  );
};

export default AdminDashboard;
