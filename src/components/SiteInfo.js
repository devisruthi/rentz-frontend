import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  siteInfo: {
    paddingTop: theme.spacing(4),
  }
}));


function SiteInfo() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline /> 
      <div className={classes.siteInfo}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="Primary" gutterBottom>
              Style your home
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Browse through preloved products and contact seller to rent a product
            </Typography>
          </Container>
        </div>
        
    </React.Fragment>
  );
}

export default SiteInfo;