import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
// import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Rentz
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  progressBar: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login() {

  const [state, setState] = useState(
    {
      showErrors: false,
      loading: false,
      loginSuccess: false
    }
  )
  const classes = useStyles();

  let emailField;
  let passwordField;

  const loginUser = () => {

    console.log("try log in user");
    const errors = [];
    // Validate the user's input

    if (emailField.value.length === 0) {
      errors.push("Please enter your email!");
    }

    if (passwordField.value.length === 0) {
      errors.push("Please enter your password!");
    }

    // If there are errors
    if (errors.length > 0) {
      console.log(errors)
      setState(
        {
          loading: false,
          showErrors: true,
          errors: errors,
          loginSuccess: false
        }
      )
    }
    // If no errors
    else {
      setState(
        {
          loading: true,
          showErrors: false,
          errors: null,
          loginSuccess: false
        }
      );

      // Capture all of user's response
      // 1. Create an object called formData
      // 2. For every field, add index and value to formData
      const formData = {
        email: emailField.value,
        password: passwordField.value
      };

      // 4. Send to backend
      let fetchStatus;
      fetch(
        'http://localhost:3001/users/login',
        {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
        // First, convert string from backend to json
        .then(
          (backendResponse) => {
            fetchStatus = backendResponse.status;
            return backendResponse.json()
          }
        )
        // Then, we can read the json from backend
        .then(
          (json) => {
            console.log(json)
            // Call and login was successful
            if (fetchStatus === 200) {
              setState(
                {
                  loading: false,
                  showErrors: false,
                  errors: null,
                  loginSuccess: true
                }
              );
            }
            else {
              // Call was succesfull, but login failed, messaged returned from backend
              setState(
                {
                  loading: false,
                  showErrors: true,
                  errors: [json.message],
                  loginSuccess: false
                }
              );
            }

          }
        )
        // If promise did not resolve
        .catch(
          (error) => {
            console.log('An error occured ', error);

            setState(
              {
                loading: false,
                showErrors: true,
                errors: ["Something went wrong. Try again after sometime."],
                loginSuccess: false
              }
            );

          }
        )

    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} elevation={6}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <br />
          {
            state.showErrors === true &&
            <div className=" error-messages alert alert-danger w-75">
              <ul>
                {
                  state.errors.map(
                    (error) =>
                      <li>
                        {error}
                      </li>
                  )
                }
              </ul>
            </div>
          }

          {
            /* Success message and login */
            state.loginSuccess === true &&
            <div className="alert alert-success">
              Welcome to Rentz !
              <Link href="profile" className="btn">
                  View Profile
              </Link>
            </div>
          }
          <form className={classes.form} noValidate>
            <TextField
              inputRef={elem => emailField = elem}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              type="email"
            />
            <TextField
              inputRef={elem => passwordField = elem}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {
              !state.loading && !state.loginSuccess &&
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={loginUser}
              >
                Log In
            </Button>
            }
            {
              state.loading &&
              <LinearProgress className={classes.progressBar} />
            }
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default Login;