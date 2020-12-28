import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    siteInfo: {
        paddingTop: theme.spacing(4),
    },
    avatar: {
        height: 100,
        width: 100,
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
}));


function SiteInfo() {
    const classes = useStyles();

    const [globalState, setGlobalState] = useContext(AppContext);

    return (
        <React.Fragment>
            <CssBaseline />
            <div className={classes.siteInfo}>
                <Container maxWidth="sm">
                    <div className="container-fluid">
                        <div className="d-flex flex-grow-1">
                            <Avatar
                                className={classes.avatar}
                                src={globalState.profile && globalState.profile.photoUrl && globalState.profile.photoUrl.length > 0 && globalState.profile.photoUrl[0]}
                            />
                            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                WELCOME {globalState.profile && (globalState.profile.firstName).toString().toUpperCase()}
                            </Typography>
                        </div>
                    </div>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        List your products or delete it when it is sold out.
            </Typography>
                </Container>
            </div>

        </React.Fragment>
    );
}

export default SiteInfo;