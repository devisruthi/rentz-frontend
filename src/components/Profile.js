import React, { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {
    makeStyles,
    Card,
    CardActions,
    CardContent,
    Divider
} from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress'
import AppContext from '../context/AppContext';

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
        height: 100,
        width: 100,
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
    input: {
        display: 'none',
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#e9ecef26',
        //theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        alignItems: 'center',
    },
    cardActions: {
        alignItems: 'center',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
}));

function Profile() {

    const [globalState, setGlobalState] = useContext(AppContext);

    const [state, setState] = useState(
        {
            showErrors: false,
            loading: false,
            updateSuccess: false
        }
    )
    const formData = new FormData();
    let firstNameField;
    let lastNameField;
    let emailField;
    let passwordField;

    const attachFile = (event) => {
        // 1. create an array for file
        const files = Array.from(event.target.files)

        // 2. for every attachment, append file to formData
        files.forEach(
            (file, index) => {
                formData.append(index, file)
            }
        )
    }


    const updateUser = () => {
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

        // If there are errors
        if (errors.length > 0) {

            setState(
                {
                    loading: false,
                    showErrors: true,
                    errors: errors,
                    updateSuccess: false
                }
            )
        }
        // If no errors
        else {
            setState(
                {
                    ...state,
                    loading: true,
                }
            );

            // Capture all of user's response
            // 1. Create an object called formData
            // 2. For every field, add index and value to formData
            formData.append('firstName', firstNameField.value);
            formData.append('lastName', lastNameField.value)
            formData.append('email', emailField.value)
            formData.append('password', passwordField.value)
            let oldPhotoUrl = globalState.profile && globalState.profile.photoUrl && globalState.profile.photoUrl.length > 0 && globalState.profile.photoUrl[0];
            formData.append('photoUrl', oldPhotoUrl)


            // 4. Send to backend
            fetch(
                `${process.env.REACT_APP_BACKEND}/users/update`,
                {
                    method: 'PUT',
                    body: formData,
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                        //"Content-Type": "application/json"
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
                                updateSuccess: true
                            }
                        );
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
                                updateSuccess: false
                            }
                        );

                    }
                )

        }
    }

    const classes = useStyles();


    console.log(globalState);

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} elevation={6}>

                <div>
                    <Card className={`${classes.card} mt-3 ml-5 mr-5 MuiPaper-elevation3`}>
                        <CardContent>
                            <Box
                                alignItems="center"
                                display="flex"
                                flexDirection="column">
                                <Avatar
                                    className={classes.avatar}
                                    src={globalState.profile && globalState.profile.photoUrl && globalState.profile.photoUrl.length > 0 && globalState.profile.photoUrl[0]}
                                />
                                <Typography
                                    color="textPrimary"
                                    gutterBottom
                                    variant="h4"
                                >
                                    {globalState.profile && globalState.profile.firstName}
                                    {" "}
                                    {globalState.profile && globalState.profile.lastName}
                                </Typography>
                                <Typography
                                    color="textSecondary"
                                    variant="body1"
                                >
                                    {globalState.profile && globalState.profile.email}
                                </Typography>
                            </Box>
                        </CardContent>
                        <Divider />
                        <CardActions className={classes.cardActions}>
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                multiple
                                type="file"
                                onChange={attachFile}
                            />
                            <label htmlFor="contained-button-file">
                                <Button
                                    variant="text" color="primary"
                                    component="span"
                                    className="text-center">
                                    Change Picture
                                    </Button>
                            </label>
                        </CardActions>
                    </Card>
                </div>
                <div className={classes.paper}>
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
                        state.updateSuccess === true &&
                        <div className="alert alert-success w-75 text-center">
                            Account updated succesfully!
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
                                    defaultValue={globalState.profile && globalState.profile.firstName}
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
                                    defaultValue={globalState.profile && globalState.profile.lastName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    defaultValue={globalState.profile && globalState.profile.email}
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
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    helperText="Enter new password if you wish to change"
                                />
                            </Grid>

                        </Grid>
                        {
                            !state.loading &&
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={updateUser}
                            >
                                Update
                            </Button>
                        }
                        {
                            state.loading &&
                            <LinearProgress className={classes.progressBar} />
                        }
                        <Grid container justify="flex-end">
                        </Grid>
                    </form>

                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </div>
            </Grid>
        </Grid>
    );
}

export default Profile