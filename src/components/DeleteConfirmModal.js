import React, { useState, useContext } from 'react';
import AppContext from '../context/AppContext';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from '@material-ui/core/Link';
import { render } from '@testing-library/react';

function DeleteConfirmModal(props) {
  const [open, setOpen] = React.useState(false);
  const [globalState, setGlobalState] = useContext(AppContext);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let fetchStatus;
  function deleteProduct() {
    let fetchUrl = `${process.env.REACT_APP_BACKEND}/products/sold/` + props.productId
    fetch(
      fetchUrl,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          "Content-Type": "application/json"
        }
      }
    )
      // First, convert string from backend to json
      .then(
        (backendResponse) => {
          fetchStatus = backendResponse.status;
          return backendResponse.json();
        }
      )
      // Then, we can read the json from backend
      .then(
        (json) => {
          console.log(json);
          if (fetchStatus === 200) {
            console.log("Product marked as sold out")
          }
          else {
            alert(json.message)
          }
          window.location.href = "/dashboard"
        }
      )
      // If promise did not resolve
      .catch(
        (error) => {
          console.log('An error occured ', error);
        }
      );

    setOpen(false);

  }

  return (
    <React.Fragment>
      {globalState.loggedIn && globalState.profile && globalState.profile.email === props.sellerEmail ?
        <React.Fragment>
          <Button color="primary" onClick={handleClickOpen}>
            {props.children}
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Confirm Delete?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to mark the product as sold?
          </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="contained" color="primary">
                Cancel
          </Button>
              <Button onClick={deleteProduct} variant="contained" color="primary">
                Sold Out
          </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment> :
        <React.Fragment>
        </React.Fragment>
      }
    </React.Fragment>
  );
}

export default DeleteConfirmModal