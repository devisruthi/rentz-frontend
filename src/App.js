import React, { useState } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import './App.css';
import LayoutRoute from './routes/LayoutRoute';
import PrivateRoute from './routes/PrivateRoute';
import HomeScreen from './views/HomeScreen';
import LoginScreen from './views/LoginScreen';
import RegistrationScreen from './views/RegistrationScreen';
import ProductScreen from './views/ProductScreen';
import ProfileScreen from './views/ProfileScreen';
import AddProductScreen from './views/AddProductScreen';
import AppContext from './context/AppContext';

const App = () => {

  const [globalState, setGlobalState] = useState(
    {
      loggedIn: localStorage.getItem('jwt') ? true : false,
      profile: null
    }
  )

  return (
    <AppContext.Provider value={[globalState, setGlobalState]}>
      <BrowserRouter>
        <Switch>
          <LayoutRoute path="/" exact={true} component={HomeScreen} />
          <LayoutRoute path="/login" exact={true} component={LoginScreen} />
          <LayoutRoute path="/register" exact={true} component={RegistrationScreen} />
          <LayoutRoute path="/products" exact={true} component={ProductScreen} />
          <PrivateRoute path="/profile" exact={true} component={ProfileScreen} />
          <PrivateRoute path="/addProduct" exact={true} component={AddProductScreen} />
        </Switch>
      </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App;