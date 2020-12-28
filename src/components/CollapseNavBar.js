import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import AppContext from '../context/AppContext';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },

}));


function CollapseNavBar() {
  const classes = useStyles();

  const [globalState, setGlobalState] = useContext(AppContext);

  const handleLogOut = () => {
    localStorage.removeItem('jwt');
    setGlobalState(
      {
        ...globalState,
        loggedIn: false
      }
    )
  }

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            RENTZ
          </Typography>
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="home">Home <span className="sr-only">(current)</span></a>
            </li>

            {globalState.loggedIn &&
              <nav>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dashboard
              </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="dashboard">View my Products</a>
                    <a className="dropdown-item" href="addProduct">Add new product</a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item" href="profile">Edit Profile</a>
                  </div>
                </li>
              </nav>
            }
          </ul>
          
          <ul className="navbar-nav ml-auto">
            {globalState.loggedIn ?
              <React.Fragment>
                <nav>
                  <Button onClick={handleLogOut} color="default" variant="contained"  >
                    LogOut
                </Button>
                </nav>
              </React.Fragment> :

              <React.Fragment>
                
                <li className="nav-item" >
                  <Button href="register" color="default" variant="outlined" className="nav-link">
                    Register
                  </Button>
                </li>
                <li className="nav-item">
                  <Button href="login" color="default" variant="outlined" className="nav-link" >
                    Login
                 </Button>
                </li>
                
              </React.Fragment>
            
            }
            </ul>
          {/* </form> */}
        </div>
      </nav>

    </React.Fragment>

  );
}

export default CollapseNavBar;