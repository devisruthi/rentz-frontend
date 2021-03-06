import React, { useState, useContext } from 'react';
import AppContext from '../context/AppContext';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function MailDialog(props) {
  const [globalState, setGlobalState] = useContext(AppContext);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function sendMail() {
    var link = GetMailDetails()
    window.location.href = link;
    setOpen(false);
  }

  function GetMailDetails() {
    var linkUrl = "mailto:" + props.sellerEmail + "?subject=Interested in renting the " + props.productName + " ( id - " + props.productId + " ) listed on Rentz. &body= Send me a detailed quote with rental options. ";
    return linkUrl
  }

  return (
    <React.Fragment>
      {globalState.loggedIn && globalState.profile && globalState.profile.email === props.sellerEmail ?
        <React.Fragment>
        </React.Fragment> :
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
            <DialogTitle id="alert-dialog-title">{"Thank You"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Drop in an email to <a href={GetMailDetails()}> {props.sellerEmail}</a> to get a detailed quote.
          </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="contained" color="primary">
                Cancel
          </Button>
              <Button onClick={sendMail} variant="contained" color="primary">
                Send Mail
          </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      }
    </React.Fragment>
  );
}

export default MailDialog