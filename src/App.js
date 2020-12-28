import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import './App.css';
import LayoutRoute from './routes/LayoutRoute';
import PrivateRoute from './routes/PrivateRoute';
import HomeScreen from './views/HomeScreen';
import LoginScreen from './views/LoginScreen';
import RegistrationScreen from './views/RegistrationScreen';
import DashboardScreen from './views/DashboardScreen';
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

  useEffect(
    () => {
      // if there is a token and globalState.profile is null
      if (localStorage.getItem('jwt') && globalState.profile === null) {
        // fetch GET to get profile details
        fetch(
          `${process.env.REACT_APP_BACKEND}/users/profile`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
          }
        )
          .then(
            (backendResponse) => backendResponse.json()
          )
          .then(
            (json) => {
              console.log('user\'s profile', json)

              // update the globalState.profile
              setGlobalState(
                {
                  ...globalState,
                  profile: json
                }
              )
              console.log('GS', globalState.profile)
            }
          ).catch(
            error => console.log(error)
          )
      }
    },
    [globalState.loggedIn, globalState.profile]
  )

  return (
    <AppContext.Provider value={[globalState, setGlobalState]}>
      <BrowserRouter>
        <Switch>
          {/* Routes */}
          <LayoutRoute path="/" exact={true} component={HomeScreen} />
          <LayoutRoute path="/home" exact={true} component={HomeScreen} />
          <LayoutRoute path="/login" exact={true} component={LoginScreen} />
          <LayoutRoute path="/register" exact={true} component={RegistrationScreen} />
          <LayoutRoute path="/dashboard" exact={true} component={DashboardScreen} />

          {/* Private routes */}
          <PrivateRoute path="/profile" exact={true} component={ProfileScreen} />
          <PrivateRoute path="/addProduct" exact={true} component={AddProductScreen} />

          {/* All other routes */}
          <LayoutRoute path="/*" exact={true} component={HomeScreen} />
        </Switch>
      </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App;