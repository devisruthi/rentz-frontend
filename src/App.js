import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import './App.css';
import LayoutRoute from './routes/LayoutRoute';
import HomeScreen from './views/HomeScreen';
import LoginScreen from './views/LoginScreen';
import RegistrationScreen from './views/RegistrationScreen';
import ProductScreen from './views/ProductScreen';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <LayoutRoute path="/" exact={true} component={HomeScreen} />
        <LayoutRoute path="/login" exact={true} component={LoginScreen} />
        <LayoutRoute path="/register" exact={true} component={RegistrationScreen} />
        <LayoutRoute path="/products" exact={true} component={ProductScreen} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;