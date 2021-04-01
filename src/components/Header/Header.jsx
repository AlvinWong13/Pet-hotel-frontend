import React from 'react';
import { Link } from 'react-router-dom';

// set up for styling
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Typography from '@material-ui/core/Typography';
import { pink } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
}));

function Header() {
const classes = useStyles();
// handle menu button in local state
const [open, setOpen] = React.useState(false);
const anchorRef = React.useRef(null);

// handle menu button open
const handleToggle = () => {
  setOpen((prevOpen) => !prevOpen);
};

// handle menu button close
const handleClose = (event) => {
  if (anchorRef.current && anchorRef.current.contains(event.target)) {
    return;
  }

  setOpen(false);
};

// menu button drop down
function handleListKeyDown(event) {
  if (event.key === 'Tab') {
    event.preventDefault();
    setOpen(false);
  }
}

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton 
            edge="start" 
            ref={anchorRef}
            className={classes.menuButton} 
            color="inherit" 
            aria-label= "menu" 
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}>
            <MenuIcon />
          </IconButton>
          <Popper placement="bottom-start" open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClose}><Link to ='/'>Dashboard</Link></MenuItem>
                    <MenuItem onClick={handleClose}><Link to ='/owners'>Owners</Link></MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        <Typography 
            variant="h4" 
            className={classes.title}>
            <Box textAlign="center" fontWeight="fontWeightBold">
              Pet Hotel
            </Box>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;