import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import LayoutRoute from './routes/LayoutRoute';
import HomeScreen from './views/HomeScreen';
import LoginScreen from './views/LoginScreen';
import RegistrationScreen from './views/RegistrationScreen';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <LayoutRoute path="/" exact={true} component={HomeScreen} />
        <LayoutRoute path="/login" exact={true} component={LoginScreen} />
        <LayoutRoute path="/register" exact={true} component={RegistrationScreen} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;