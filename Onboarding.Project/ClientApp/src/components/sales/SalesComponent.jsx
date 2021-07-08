import React, { Component } from "react";
import axios from "axios";
import { Button, Table, Icon, Container, Dropdown, Pagination, Menu } from "semantic-ui-react";
import moment from "moment";
import SalesModalComponent from "./SalesModalComponent";

export class SalesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sales: [],
      sale: {},
      customer: [],
      product: [],
      store: [],
      page:1,
      itemsPerPage:5,

    };
  }

  componentDidMount() {
    this.fetchSales();
    this.fetchStore();
    this.fetchProduct();
    this.fetchCustomer();
    
  }

  setPageNum = (event, { activePage }) => {
		this.setState({ page: activePage });
	};




  fetchStore = () => {
    axios
      .get("/Stores/GetStore")
      .then(({ data }) => {
        this.setState({
          store: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fetchProduct = () => {
    axios
      .get("/Products/GetProduct")
      .then(({ data }) => {
        this.setState({
          product: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fetchCustomer = () => {
    axios
      .get("/Customers/GetCustomer")
      .then(({ data }) => {
        console.log(data);
        this.setState({
          customer: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fetchSales = () => {
    axios
      .get("/Sales/GetSales")
      .then(({ data }) => {
        console.log(data);
        this.setState({
          sales: data,
        });
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteSales = (id) => {
    axios
      .delete(`/Sales/DeleteSales/${id}`)
      .then((res) => {
        console.log(res.data);
        this.fetchSales();
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({
      open: false,
    });
  };

  toggleCreateModal = (value, component, sale) => {
    this.setState({
      open: value,
      component: component,
      sale: sale,
    });
  };

  render() {

    const { page, itemsPerPage,} = this.state;
		const totalPages = this.state.sales.length / itemsPerPage;
		const items = this.state.sales.slice(
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
      <div>
        <Container>
          <SalesModalComponent
            toggleCreateModal={this.toggleCreateModal}
            open={this.state.open}
            fetchSales={this.fetchSales}
            deleteSales={this.deleteSales}
            component={this.state.component}
            sale={this.state.sale}
            customers={this.state.customer}
            products={this.state.product}
            stores={this.state.store}
          />
          <Button
            color="blue"
            onClick={() => this.toggleCreateModal(true, "create")}
          >
            New Sales
          </Button>
          <Table celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Customer</Table.HeaderCell>
                <Table.HeaderCell>Product</Table.HeaderCell>
                <Table.HeaderCell>Store</Table.HeaderCell>
                <Table.HeaderCell>Date Sold</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {items.map((sale) => {
                return (
                  <Table.Row key={sale.id}>
                    <Table.Cell>{sale.customer.name}</Table.Cell>
                    <Table.Cell>{sale.product.name}</Table.Cell>
                    <Table.Cell>{sale.store.name}</Table.Cell>
                    <Table.Cell>
                      {moment(sale.dateSold).format("DD/MM/YYYY")}
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        color="yellow"
                        onClick={() =>
                          this.toggleCreateModal(true, "edit", sale)
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
                          this.toggleCreateModal(true, "delete", sale)
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

export default SalesComponent;
