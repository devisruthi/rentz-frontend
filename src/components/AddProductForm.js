import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Category } from '@material-ui/icons';
import LinearProgress from '@material-ui/core/LinearProgress'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function AddProductForm() {

    const [state, setState] = useState(
        {
            showErrors: false,
            loading: false,
            addedProduct: false
        }
    )

    const formData = new FormData();
    let categoryField;
    let titleField;
    let summaryField;
    let monthlyRentField;
    let imageUrlField;

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

    const addProduct = () => {
        const errors = [];
        // Validate the user's input
        if (categoryField.value.length === 0) {
            errors.push("Please enter category!");
        }

        if (titleField.value.length === 0) {
            errors.push("Please enter title!");
        }

        if (monthlyRentField.value.length === 0) {
            errors.push("Please enter monthly rent!");
        }

        if (summaryField.value.length === 0) {
            errors.push("Please enter summary!");
        }

        // if (tcsCheckBox.checked === false) {
        //     errors.push("You need to accept terms & conditions.");
        // }

        // If there are errors
        if (errors.length > 0) {

            setState(
                {
                    loading: false,
                    showErrors: true,
                    errors: errors,
                    addedProduct: false
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
                    addedProduct: false
                }
            );

            // Capture all of user's response 
            // 1. Create an object called formData
            // 2. For every field, add value to formData
            formData.append('category', categoryField.value)
            formData.append('title', titleField.value)
            formData.append('summary', summaryField.value)
            formData.append('monthlyRent', monthlyRentField.value)
            formData.append('available', true)

            // 4. Send to backend
            fetch(
                `${process.env.REACT_APP_BACKEND}/products`,
                {
                    method: 'POST',
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
                                addedProduct: true
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
                                addedProduct: false
                            }
                        );

                    }
                )

        }
    }

    const classes = useStyles();
    return (
        <React.Fragment>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Add your Product
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
                        state.addedProduct === true &&
                        <div className="alert alert-success">
                            Account registered succesfully!
                                <Link href="products" className="btn">
                                View all products
                                </Link>
                        </div>
                    }

                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    inputRef={elem => categoryField = elem}
                                    name="category"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="category"
                                    label="Category"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    inputRef={elem => titleField = elem}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="title"
                                    label="Title"
                                    name="title"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    inputRef={elem => monthlyRentField = elem}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="monthlyRent"
                                    label="Monthly Rent"
                                    name="monthlyRent"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    inputRef={elem => summaryField = elem}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="summary"
                                    label="Summary"
                                    id="summary"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    accept="image/*"
                                    variant="outlined"
                                    id="contained-button-file"
                                    type="file"
                                    fullWidth
                                    helperText="Product Image"
                                    onChange={attachFile}
                                />
                            </Grid>
                        </Grid>
                        {!state.loading && !state.addedProduct &&
                            <Button
                                onClick={addProduct}
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Add Product
                        </Button>
                        }
                        {
                            state.loading &&
                            <LinearProgress className={classes.progressBar} />
                        }
                        <Grid container justify="flex-end">
                        </Grid>
                    </form>
                </div>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>

        </React.Fragment>
    );
}

export default AddProductForm;