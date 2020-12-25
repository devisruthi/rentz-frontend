import React from 'react';
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

const products = [
    {
        "images": ["https://images.unsplash.com/photo-1589834390005-5d4fb9bf3d32?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"],
        "_id": "5fe58db79464df477838ea04",
        "category": "Home Furniture,",
        "title": " dining table",
        "description": "{age:less than one year, dimension:100cmx90cmx70cm, comments:elegant, foldable design}",
        "monthlyRent": 100,
        "sellerEmail": "pp@gmail.com",
        "__v": 0
    },
    {
        "images": ["https://source.unsplash.com/random", "https://source.unsplash.com/random"],
        "_id": "5fe58db79464df477838ea04",
        "category": "Home Furniture,",
        "title": " Watch",
        "description": "{age:less than one year, dimension:100cmx90cmx70cm, comments:elegant, foldable design}",
        "monthlyRent": 100,
        "sellerEmail": "pp@gmail.com",
        "__v": 0
    },
    {
        "images": ["https://source.unsplash.com/random", "https://source.unsplash.com/random"],
        "_id": "5fe58db79464df477838ea04",
        "category": "Home Furniture,",
        "title": " dining table Q",
        "description": "{age:less than one year, dimension:100cmx90cmx70cm, comments:elegant, foldable design}",
        "monthlyRent": 100,
        "sellerEmail": "pp@gmail.com",
        "__v": 0
    },
    {
        "images": ["https://source.unsplash.com/random", "https://source.unsplash.com/random"],
        "_id": "5fe58db79464df477838ea04",
        "category": "Home Furniture,",
        "title": " Dining Table",
        "description": "{age:less than one year, dimension:100cmx90cmx70cm, comments:elegant, foldable design}",
        "monthlyRent": 100,
        "sellerEmail": "pp@gmail.com",
        "__v": 0
    }
]


function ProuctGrid(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    {products.map((product) => (
                        <Grid item key={product} xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={product.images[0]}
                                    title={product.title}
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {product.title}
                                    </Typography>
                                    <Typography>
                                        {product.description}
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