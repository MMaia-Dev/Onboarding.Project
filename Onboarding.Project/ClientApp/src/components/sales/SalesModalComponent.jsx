import React, { useState } from "react";
import { Button, Form, Modal, Dropdown } from "semantic-ui-react";
import axios from "axios";

import moment from "moment";

const SalesModalComponent = (props) => {
  const [date, setDate] = useState("");
  const [customerId, setcustomerId] = useState("");
  const [productId, setproductId] = useState("");
  const [storeId, setstoreId] = useState("");
 

  const {
    open,
    toggleCreateModal,
    fetchSales,
    component,
    deleteSales,
    sale,
    customers,
    stores,
    products,
  } = props;


  const addSales = () => {
    axios
      .post("/Sales/PostSales", {
        
        productId: productId,
        customerId: customerId,
        storeId: storeId,
        dateSold: date,
      })
      .then((res) => {
        console.log(res.data);
        toggleCreateModal(false);
        fetchSales();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editSales = (id) => {

    console.log(date)
    axios
      .put(`/Sales/PutSales/${id}`, {
        id: id,
        productId: productId === "" ? sale.productId : productId,
        customerId: customerId === "" ? sale.customerId : customerId,
        storeId: storeId === "" ? sale.storeId : storeId,
        dateSold: date === "" ? sale.dateSold : moment(date).format("MM/DD/YYYY")
      
      })
      .then((res) => {
        console.log(res.data);
        
       
        fetchSales();
      })
      .catch((err) => {
        console.log(err);
      });





    toggleCreateModal(false, "", "");
  };

  const handalCustomerSelect = (event, data) => {
    console.log(data.value);
    setcustomerId(data.value);
  };

  const handalProductSelect = (event, data) => {
    console.log(data.value);
    setproductId(data.value);
  };

  const handalStoreSelect = (event, data) => {
    console.log(data.value);
    setstoreId(data.value);
  };


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
          onClick={() => deleteSales(sale.id)}
        />
      </Modal.Actions>
    </Modal>
  ) : component === "edit" ? (
    <Modal open={open}>
      <Modal.Header>Edit Sales </Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Date Sold</label>
            <input
              
              onChange={(e) => setDate(e.target.value)}
              defaultValue={moment(sale.dateSold).format("MM/DD/YYYY")}
            />
          </Form.Field>
          <Form.Field>
            <label>Customer</label>
            <Dropdown
              placeholder="Select Customer"
              fluid
              selection
              options={customers.map((c) => ({
                key: c.id,
                text: c.name,
                value: c.id,
              }))}
              onChange={handalCustomerSelect}
              defaultValue={sale.customerId}
            />
          </Form.Field>

          <Form.Field>
            <label>Product</label>
            <Dropdown
              placeholder="Select Product"
              fluid
              selection
              options={products.map((c) => ({
                key: c.id,
                text: c.name,
                value: c.id,
              }))}
              onChange={handalProductSelect}
              defaultValue={sale.productId}
            />
          </Form.Field>

          <Form.Field>
            <label>Store</label>
            <Dropdown
              placeholder="Select Store"
              fluid
              selection
              options={stores.map((c) => ({
                key: c.id,
                text: c.name,
                value: c.id,
              }))}
              onChange={handalStoreSelect}
              defaultValue={sale.storeId}
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
          onClick={() => editSales(sale.id)}
          positive
        />
      </Modal.Actions>
    </Modal>
  ) : component === "create" ? (
    <Modal open={open}>
      <Modal.Header>Create Sales </Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Date Sold</label>
            <input
              placeholder="MM/DD/YYYY"
              
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Customer</label>
            <Dropdown
              placeholder="Select Customer"
              fluid
              selection
              options={customers.map((c) => ({
                key: c.id,
                text: c.name,
                value: c.id,
              }))}
              onChange={handalCustomerSelect}
              
            />
          </Form.Field>

          <Form.Field>
            <label>Product</label>
            <Dropdown
              placeholder="Select Product"
              fluid
              selection
              options={products.map((c) => ({
                key: c.id,
                text: c.name,
                value: c.id,
              }))}
              onChange={handalProductSelect}
              
            />
          </Form.Field>

          <Form.Field>
            <label>Store</label>
            <Dropdown
              placeholder="Select Store"
              fluid
              selection
              options={stores.map((c) => ({
                key: c.id,
                text: c.name,
                value: c.id,
              }))}
              onChange={handalStoreSelect}
              
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
          onClick={addSales}
          positive
        />
      </Modal.Actions>
    </Modal>
  ) : (
    <div></div>
  );
};
export default SalesModalComponent;
