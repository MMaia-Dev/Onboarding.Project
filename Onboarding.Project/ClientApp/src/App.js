import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import CustomerComponent from './components/customer/CustomerComponent';
import ProductComponent from './components/product/ProductComponent';
import StoreComponent from './components/store/StoreComponent';
import SalesComponent from './components/sales/SalesComponent';


export class App extends Component {
  render() {
    return (
     <Router>
       <NavbarComponent/>
       <Route path='/customers' component={CustomerComponent} />
       <Route path='/products' component={ProductComponent} />
       <Route path='/stores' component={StoreComponent} />
       <Route path='/sales' component={SalesComponent} />
     </Router>
    )
  }
}

export default App

