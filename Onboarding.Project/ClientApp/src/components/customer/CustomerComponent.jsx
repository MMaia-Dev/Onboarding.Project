import React, { Component } from "react";
import axios from "axios";
import { Button, Table, Icon, Container, Dropdown, Menu, Pagination } from "semantic-ui-react";
import CreateModalComponent from "./CreateModalComponent";

export class CustomerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      open: false,
      component: "",
      customer: {},
      page:1,
      itemsPerPage:5,
      
      
      
    };
  }

  componentDidMount() {
    this.fetchCustomer();
   
  }

  setPageNum = (event, { activePage }) => {
		this.setState({ page: activePage });
	};

  


  

  
  fetchCustomer = () => {
    axios
      .get("/Customers/GetCustomer")
      .then(({ data }) => {
        this.setState({
          customers: data,
        });
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteCustomer = (id) => {
    axios
      .delete(`/Customers/DeleteCustomer/${id}`)
      .then((res) => {
        console.log(res.data);
        this.fetchCustomer();
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({
      open: false,
    });
  };


 
  editCustomer = (id, name, address) => {
    axios
      .put(`/Customers/PutCustomer/${id}`, {
        id: id,
        name: name,
        address: address,
      })
      .then((res) => {
        console.log(res.data);
        this.fetchCustomer();
      })
      .catch((err) => {
        console.log(err);
      });
      
    this.setState({
      open: false,

      
    });
  };

  

  toggleCreateModal = (value, component, customer) => {
    this.setState({
      open: value,
      component: component,
      customer: customer,
    });
  };

  



  render() {

    const { page, itemsPerPage,} = this.state;
		const totalPages = this.state.customers.length / itemsPerPage;
		const items = this.state.customers.slice(
			(page - 1) * itemsPerPage,
			(page - 1) * itemsPerPage + itemsPerPage
		);

		const options = [
			{
				key: 1,
				text: 5,
				value: 5,
			},
			{
				key: 2,
				text: 10,
				value: 10,
			},
			{
				key: 3,
				text: 15,
				value: 15,
			},
		];
		const findDefaultItemsPerPage = () => {
			const option = options.find((x) => x.value === this.state.itemsPerPage);
			return option.value;
		};

    return (
      <div >
        <Container>
        <CreateModalComponent
          toggleCreateModal={this.toggleCreateModal}
          open={this.state.open}
          fetchCustomer={this.fetchCustomer}
          deleteCustomer={this.deleteCustomer}
          component={this.state.component}
          customer={this.state.customer}
          editCustomer={this.editCustomer}
         
        />
        <Button
          color="blue"
          onClick={() => this.toggleCreateModal(true, "create")}
        >
          New Customer
        </Button>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Customer</Table.HeaderCell>
              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {items.map((customer) => {
              return (
                <Table.Row key={customer.id}>
                  <Table.Cell>{customer.name}</Table.Cell>
                  <Table.Cell>{customer.address}</Table.Cell>
                  <Table.Cell>
                    <Button
                      color="yellow"
                      onClick={() =>
                        this.toggleCreateModal(true, "edit", customer)
                      }
                    >
                      <Icon name="edit" />
                      EDIT
                    </Button>
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      color="red"
                      onClick={() =>
                        this.toggleCreateModal(true, "delete", customer)
                      }
                    >
                      <Icon name="trash" />
                      DELETE
                    </Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
        <Menu compact>
        <Dropdown
						compact
						selection
						options={options}
						onChange={(e, data) => {
							const { value } = data;
							const { text } = data.options.find((x) => x.value === value);
							this.setState({ itemsPerPage: text, page: 1 });
						}}
						defaultValue={findDefaultItemsPerPage()}
					/>

          </Menu>
          <Pagination
            boundaryRange={0}
            defaultActivePage={page}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            siblingRange={1}
            totalPages={totalPages}
            onPageChange={this.setPageNum}
            floated="right"

          />
        </Container>
      </div>
    );
  }
}

export default CustomerComponent;
