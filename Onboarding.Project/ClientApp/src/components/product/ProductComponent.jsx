import React, { Component } from "react";
import axios from "axios";
import { Button, Table, Icon, Container,Dropdown, Menu, Pagination } from "semantic-ui-react";
import ProductModalComponent from "./ProductModalComponent";
import CurrencyFormat from 'react-currency-format';

export class ProductComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      open: false,
      component: "",
      product: {},
      page:1,
      itemsPerPage:5,
      
      
    };
  }

  componentDidMount() {
    this.fetchProduct();
   
  }


  setPageNum = (event, { activePage }) => {
		this.setState({ page: activePage });
	};
  
  fetchProduct = () => {
    axios
      .get("/Products/GetProduct")
      .then(({ data }) => {
        this.setState({
          products: data,
        });
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteProduct = (id) => {
    axios
      .delete(`/Products/DeleteProduct/${id}`)
      .then((res) => {
        console.log(res.data);
        this.fetchProduct();
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({
      open: false,
    });
  };


 
  editProduct = (id, name, price) => {
    axios
      .put(`/Products/PutProduct/${id}`, {
        id: id,
        name: name,
        price: price,
      })
      .then((res) => {
        console.log(res.data);
        this.fetchProduct();
      })
      .catch((err) => {
        console.log(err);
      });
      
    this.setState({
      open: false,

      
    });
  };

  

  toggleCreateModal = (value, component, product) => {
    this.setState({
      open: value,
      component: component,
      product: product,
    });
  };





  render() {
    var CurrencyFormat = require('react-currency-format');
    const { page, itemsPerPage,} = this.state;
		const totalPages = this.state.products.length / itemsPerPage;
		const items = this.state.products.slice(
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
        <ProductModalComponent
          toggleCreateModal={this.toggleCreateModal}
          open={this.state.open}
          fetchProduct={this.fetchProduct}
          deleteProduct={this.deleteProduct}
          component={this.state.component}
          product={this.state.product}
          editProduct={this.editProduct}
         
        />
        <Button
          color="blue"
          onClick={() => this.toggleCreateModal(true, "create")}
        >
          New Product
        </Button>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Customer</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {items.map((product) => {
              return (
                <Table.Row key={product.id}>
                  <Table.Cell>{product.name}</Table.Cell>
                  <Table.Cell ><CurrencyFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} /></Table.Cell>
                  <Table.Cell>
                    <Button
                      color="yellow"
                      onClick={() =>
                        this.toggleCreateModal(true, "edit", product)
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
                        this.toggleCreateModal(true, "delete", product)
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

export default ProductComponent;

