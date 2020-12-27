import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PhoneIcon from '@material-ui/icons/Phone';
import MailDialog from './MailDialog';
import CollectionsIcon from '@material-ui/icons/Collections';


const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        marginBottom: theme.spacing(5),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
}));

function ProuctGrid(props) {

    const classes = useStyles();
    const [state, setState] = useState({
        products: [], errors: []
    });


    async function GetProducts() {
        const fetchData = () => fetch(
            `${process.env.REACT_APP_BACKEND}/products`,
        )
            .then(
                (backendResponse) => backendResponse.json()
            )
            .then(
                (json) => {
                    console.log("logging json : " , json);
                    setState({ products: json, errors: [] })
                }
            )
            .catch(
                (errorObj) => {
                    console.log(errorObj)
                    setState({ ...state, errors: ["Sorry! No products available at this moment. Try again later"] })
                }
            )

        if (state.products.length === 0) {
            await fetchData();
        }
    }

    // Get data from backend server and populate state.products
    GetProducts();

    return (
        <React.Fragment>
            <CssBaseline />
            {
                // Error if no products found
                state.errors.length > 0 &&
                <Container className={classes.cardGrid} maxWidth="md">
                    <div className="alert alert-danger text-center">
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
                </Container>
            }
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    {state.products !== [] && state.products.map((product) => (
                        <Grid key={product._id} item xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={product.images.length > 0 && product.images[0] || "https://images.unsplash.com/photo-1605882174908-4bfbb907e3cd?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjB8fGNhbWVyYSUyMGljb258ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"}
                                    title={product.title}
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {product.title}
                                    </Typography>
                                    <Typography>
                                        {product.summary}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button href="#" size="small" color="primary">
                                        {product.monthlyRent} AED / month
                                </Button>

                                    <MailDialog sellerEmail={product.sellerEmail} productName={product.title} productId={product._id}>
                                        <PhoneIcon />
                                    </MailDialog>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </React.Fragment>
    );
}

export default ProuctGrid;