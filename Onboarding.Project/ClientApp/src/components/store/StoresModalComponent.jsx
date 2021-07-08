import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import axios from "axios";

const CreateModalComponent = (props) => {
  const [Name, setName] = useState("");
  const [Address, setAddress] = useState("");
  const [Name1, setName1] = useState("");
  const [Address1, setAddress1] = useState("");
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
    fetchStore,
    component,
    deleteStore,
    store,
    editStore,
  } = props;

  useEffect(() => {
    if (component === "edit") setName1(store.name);
    setAddress1(store.address);
    return () => {
      setName1("");
      setAddress1("");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addStore = () => {
    axios
      .post("/Stores/PostStore", {
        name: Name,
        address: Address,
      })
      .then((res) => {
        console.log(res.data);
        toggleCreateModal(false);
        fetchStore();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (storeId, name, address) => {
    if (!edit) {
      setedit(true);
    
    }
  };

  useEffect(() => {
    if(open && component === "edit") {
      setName1(store.name);
      setAddress1(store.address);
    }
      
  }, [open])

  useEffect(() => {
    if (edit) {
        editStore(store.id, Name1, Address1);
      setedit(false);
    }
  }, [edit]);

  return component === "delete" ? (
    <Modal open={open}>
      <Modal.Header>Delete Store </Modal.Header>
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
          onClick={() => deleteStore(store.id)}
        />
      </Modal.Actions>
    </Modal>
  ) : component === "create" ? (
    <Modal open={open}>
      <Modal.Header>Create Store </Modal.Header>
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
            <label>ADDRESS</label>
            <input
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
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
          onClick={addStore}
          positive
        />
      </Modal.Actions>
    </Modal>
  ) : component === "edit" ? (
    <Modal open={open}>
      <Modal.Header>Edit Store </Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>NAME</label>
            <input
              name="name"
              defaultValue={store.name}
              onChange={(e) => setName1(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>ADDRESS</label>
            <input
              defaultValue={store.address}
              onChange={(e) => setAddress1(e.target.value)}
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
          onClick={() => handleEdit(store.id, Name1, Address1)}
          positive
        />
      </Modal.Actions>
    </Modal>
  ) : (
    <div></div>
  );
};
export default CreateModalComponent;
