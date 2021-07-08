import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

export class NavbarComponent extends Component {
  render() {
    return (
      <Menu inverted>
        <Menu.Item>
          <h1> React</h1>
        </Menu.Item>
        <Menu.Item>
          <Link to="/customers">Customers</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/products">Products</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/sales">Sales</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/stores">Stores</Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default NavbarComponent;
