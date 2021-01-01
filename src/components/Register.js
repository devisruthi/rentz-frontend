import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
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
        backgroundImage: 'url(https://images.unsplash.com/photo-1586023492125-27b2c045efd7)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        marginTop: theme.spacing(8, 4),
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
        marginTop: theme.spacing(2),
        padding: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    progressBar: {
        margin: theme.spacing(3, 0, 2),
    },
}));


function Register() {

    const history = useHistory();

    const [state, setState] = useState(
        {
            showErrors: false,
            loading: false,
            registeredSuccess: false
        }
    )

    let firstNameField;
    let lastNameField;
    let emailField;
    let passwordField;
    let tcsCheckBox;

    const registerUser = () => {

        const errors = [];
        // Validate the user's input
        if (firstNameField.value.length === 0) {
            errors.push("Please enter your first name!");
        }

        if (lastNameField.value.length === 0) {
            errors.push("Please enter your last name!");
        }

        if (emailField.value.length === 0) {
            errors.push("Please enter your email!");
        }

        if (passwordField.value.length === 0) {
            errors.push("Please enter your password!");
        }

        if (tcsCheckBox.checked === false) {
            errors.push("You need to accept terms & conditions.");
        }

        // If there are errors
        if (errors.length > 0) {

            setState(
                {
                    loading: false,
                    showErrors: true,
                    errors: errors,
                    registeredSuccess: false
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
                    registeredSuccess: false
                }
            );

            // Capture all of user's response
            // 1. Create an object called formData
            // 2. For every field, add index and value to formData
            const formData = {
                firstName: firstNameField.value,
                lastName: lastNameField.value,
                email: emailField.value,
                password: passwordField.value
            };

            // 4. Send to backend
            fetch(
                `${process.env.REACT_APP_BACKEND}/users/register`,
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
                    (backendResponse) => backendResponse.json()
                )
                // Then, we can read the json from backend
                .then(
                    (json) => {
                        console.log(json);
                        setState(
                            {
                                loading: false,
                                showErrors: false,
                                errors: null,
                                registeredSuccess: true
                            }
                        );
                      
                        history.push('/login');
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
                                registeredSuccess: false
                            }
                        );

                    }
                )

        }
    }

    const classes = useStyles();

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} elevation={6} square>
                <div>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <br />
                        {
                            state.showErrors === true &&
                            <div className=" error-messages alert alert-danger w-75 text-center">
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
                            state.registeredSuccess === true &&
                            <div className="alert alert-success">
                                Account registered succesfully!
                                <Link href="login" className="btn">
                                    Login
                                </Link>
                            </div>
                        }

                        <form className={classes.form} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        inputRef={elem => firstNameField = elem}
                                        autoComplete="fname"
                                        name="firstName"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        inputRef={elem => lastNameField = elem}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="lname"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        inputRef={elem => emailField = elem}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        inputRef={elem => passwordField = elem}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <label>Do you agree to terms &amp; conditions? *</label>
                                    <input
                                        ref={(elem) => tcsCheckBox = elem}
                                        className="checkbox" name="termsConditions" type="checkbox" /> Yes
                                </Grid>
                            </Grid>
                            {
                                !state.loading && !state.registeredSuccess &&
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={registerUser}
                                >
                                    Sign Up
                            </Button>
                            }
                            {
                                state.loading &&
                                <LinearProgress className={classes.progressBar} />
                            }
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link href="login" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </div>
            </Grid>
        </Grid>
    );
}

export default Register