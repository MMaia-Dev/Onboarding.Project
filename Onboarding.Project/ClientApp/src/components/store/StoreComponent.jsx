import React, { Component } from "react";
import axios from "axios";
import { Button, Table, Icon, Container, Menu, Pagination, Dropdown } from "semantic-ui-react";
import StoresModalComponent from "./StoresModalComponent";

export class StoreComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: [],
      open: false,
      component: "",
      store: {},
      page:1,
      itemsPerPage:5,
      
    };
  }

  componentDidMount() {
    this.fetchStore();
   
  }


  setPageNum = (event, { activePage }) => {
		this.setState({ page: activePage });
	};

  
  fetchStore = () => {
    axios
      .get("/Stores/GetStore")
      .then(({ data }) => {
        this.setState({
          stores: data,
        });
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteStore = (id) => {
    axios
      .delete(`/Stores/DeleteStore/${id}`)
      .then((res) => {
        console.log(res.data);
        this.fetchStore();
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({
      open: false,
    });
  };


 
  editStore = (id, name, address) => {
    axios
      .put(`/Stores/PutStore/${id}`, {
        id: id,
        name: name,
        address: address,
      })
      .then((res) => {
        console.log(res.data);
        this.fetchStore();
      })
      .catch((err) => {
        console.log(err);
      });
      
    this.setState({
      open: false,

      
    });
  };

  

  toggleCreateModal = (value, component, store) => {
    this.setState({
      open: value,
      component: component,
      store: store,
    });
  };

  



  render() {

    const { page, itemsPerPage,} = this.state;
		const totalPages = this.state.stores.length / itemsPerPage;
		const items = this.state.stores.slice(
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
        <StoresModalComponent
          toggleCreateModal={this.toggleCreateModal}
          open={this.state.open}
          fetchStore={this.fetchStore}
          deleteStore={this.deleteStore}
          component={this.state.component}
          store={this.state.store}
          editStore={this.editStore}
         
        />
        <Button
          color="blue"
          onClick={() => this.toggleCreateModal(true, "create")}
        >
          New Store
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
            {items.map((store) => {
              return (
                <Table.Row key={store.id}>
                  <Table.Cell>{store.name}</Table.Cell>
                  <Table.Cell>{store.address}</Table.Cell>
                  <Table.Cell>
                    <Button
                      color="yellow"
                      onClick={() =>
                        this.toggleCreateModal(true, "edit", store)
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
                        this.toggleCreateModal(true, "delete", store)
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

export default StoreComponent;

