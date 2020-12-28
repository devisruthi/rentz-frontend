import React, { useState, useEffect, useContext } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import AppContext from '../context/AppContext';

function SideBar() {
    const [globalState, setGlobalState] = useContext(AppContext);

    useEffect(
        () => {
            // if there is a token and globalState.profile is null
            if (localStorage.getItem('jwt') && globalState.profile === null) {
                // fetch GET to get profile details
                fetch(
                    `${process.env.REACT_APP_BACKEND}/users/profile`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                        }
                    }
                )
                    .then(
                        (backendResponse) => backendResponse.json()
                    )
                    .then(
                        (json) => {
                            console.log('user\'s profile', json)

                            // update the globalState.profile
                            setGlobalState(
                                {
                                    ...globalState,
                                    profile: json
                                }
                            )
                            console.log('GS', globalState.profile)
                        }
                    ).catch(
                        error => console.log(error)
                    )
            }
        },
        [globalState.loggedIn, globalState.profile]
    )


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
            height: '100%',
        },
        // avatar: {
        //     height: 50,
        //     width: 50,

        // }
    }));


    const classes = useStyles();

    return (



        <React.Fragment>
            {/* <CssBaseline /> */}

            <ProSidebar className={classes.root}>
                <SidebarHeader>
                    <Menu></Menu>
                    <Menu>
                        <MenuItem> WELCOME {globalState.profile && (globalState.profile.firstName).toString().toUpperCase()} </MenuItem>
                        <MenuItem>
                            <Avatar
                                className={classes.avatar}
                                src={globalState.profile && globalState.profile.photoUrl && globalState.profile.photoUrl.length > 0 && globalState.profile.photoUrl[0]}
                            />
                        </MenuItem>

                    </Menu>
                    <Menu></Menu>
                </SidebarHeader>
                <SidebarContent>
                    <Menu iconShape="square">
                        <MenuItem>Home
                        <Link to="/home" />
                        </MenuItem>

                        <MenuItem>Edit Profile
                        <Link to="/profile" />
                        </MenuItem>

                        <MenuItem>Add a Product
                        <Link to="/addProduct" />
                        </MenuItem>
                    </Menu>
                </SidebarContent>
                <SidebarFooter>
                    <Menu></Menu>
                    Rentz
                    <Menu></Menu>
                </SidebarFooter>
            </ProSidebar>;

        </React.Fragment>
    );
}

export default SideBar;
