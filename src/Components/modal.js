import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
  console.log(props.modal)
  if(props.modal){
    setOpen(true)
  }
  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button> */}
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar} style={{backgroundColor:"#FC615D"}}>
          <Toolbar>
           
            <Typography variant="h6" className={classes.title}>
              Order Now
            </Typography>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            {/* <Button color="inherit" onClick={handleClose}>
              X
            </Button> */}
          </Toolbar>
        </AppBar>
        <List>
          {/* <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem> */}
          <Divider />
          <div className={'imageModal'}><img src={'https://pinchofyum.com/wp-content/uploads/Lo-Mein-Recipe.jpg'} /></div>
          {/* <ListItem button>
            <ListItemText primary="Default notification ringtone" secondary="Tethys" />
          </ListItem> */}
          <div className={'contentModal'}>
            <h1>Karahi</h1>
            <h4>Rs. 400</h4>
            <p>This is karahi full 1K/g. You can order this from any available restaurent we have right now.</p>
            <button>Order Now</button>
            </div>
        </List>
      </Dialog>
    </div>
  );
}