import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import axios from "axios";

const ProductModalComponent = (props) => {
  const [Name, setName] = useState("");
  const [price, setprice] = useState(0);
  const [Name1, setName1] = useState("");
  const [price1, setprice1] = useState(0);
  const [edit, setedit] = useState(false);
  // const [customerUpdate, setCustomerUpdate] = useState({
  //   name: "",
  //   address: ""
  // })

  // const updateCustomer = (field, value) => {
  //   setCustomerUpdate({
  //     ...customerUpdate,
  //     [field]: value
  //   })
  // }

  const {
    open,
    toggleCreateModal,
    fetchProduct,
    component,
    deleteProduct,
    product,
    editProduct,
  } = props;

  useEffect(() => {
    if (component === "edit") setName1(product.name);
    setprice1(product.price);
    return () => {
      setName1("");
      setprice1(0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addProduct = () => {
    axios
      .post("/Products/PostProduct", {
        name: Name,
        price: price,
      })
      .then((res) => {
        console.log(res.data);
        toggleCreateModal(false);
        fetchProduct();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (productId, name, price) => {
    if (!edit) {
      setedit(true);
    
    }
  };

  useEffect(() => {
    if(open && component === "edit") {
      setName1(product.name);
      setprice1(product.price);
    }
      
  }, [open])

  useEffect(() => {
    if (edit) {
        editProduct(product.id, Name1, price1);
      setedit(false);
    }
  }, [edit]);

  return component === "delete" ? (
    <Modal open={open}>
      <Modal.Header>Delete Customer </Modal.Header>
      <Modal.Content>Are you sure?</Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => toggleCreateModal(false, "", "")}>
          cancel
        </Button>

        <Button
          color="red"
          content="delete"
          labelPosition="right"
          icon="remove"
          onClick={() => deleteProduct(product.id)}
        />
      </Modal.Actions>
    </Modal>
  ) : component === "create" ? (
    <Modal open={open}>
      <Modal.Header>Create Product </Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>NAME</label>
            <input
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>PRICE</label>
            <input
              placeholder="Price"
              onChange={(e) => setprice(parseFloat(e.target.value))}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => toggleCreateModal(false, "", "")}>
          cancel
        </Button>
        <Button
          content="create"
          labelPosition="right"
          icon="checkmark"
          onClick={addProduct}
          positive
        />
      </Modal.Actions>
    </Modal>
  ) : component === "edit" ? (
    <Modal open={open}>
      <Modal.Header>Edit Product </Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>NAME</label>
            <input
              name="name"
              defaultValue={product.name}
              onChange={(e) => setName1(e.target.value)}
              
            />
            
          </Form.Field>
          <Form.Field>
            <label>PRICE</label>
            <input
              defaultValue={product.price}
              onChange={(e) => setprice1(parseFloat(e.target.value))}
            />
            
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => toggleCreateModal(false, "", "")}>
          cancel
        </Button>
        <Button
          content="edit"
          labelPosition="right"
          icon="checkmark"
          onClick={() => handleEdit(product.id, Name1, price1)}
          positive
        />
      </Modal.Actions>
    </Modal>
  ) : (
    <div></div>
  );
};
export default ProductModalComponent;
