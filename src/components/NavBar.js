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


function NavBar() {
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
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            RENTZ
          </Typography>
          <nav>
            <Link variant="button" color="textPrimary" href="home" className={classes.link}>
              Home
            </Link>
          </nav>

          {globalState.loggedIn ?
            <React.Fragment>
              <nav>
                <Link variant="button" color="textPrimary" href="dashboard" className={classes.link}>
                  Dashboard
                </Link>
              </nav>
              <nav>
                <Button onClick={handleLogOut} color="primary" variant="outlined" className={classes.link}>
                  LogOut
                </Button>
              </nav>
            </React.Fragment> :

            <React.Fragment>
              <nav>
                <Link variant="button" color="textPrimary" href="register" className={classes.link}>
                  Register
            </Link>
              </nav>
              <nav>
                <Button href="login" color="primary" variant="outlined" className={classes.link}>
                  Login
                 </Button>
              </nav>
            </React.Fragment>
          }

        </Toolbar>
      </AppBar>

    </React.Fragment>

  );
}

export default NavBar;