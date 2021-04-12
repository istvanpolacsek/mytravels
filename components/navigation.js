import { Fragment, useContext, useState } from 'react';
import { useSession, signOut } from 'next-auth/client';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import Backdrop from '@material-ui/core/Backdrop';
import Slide from '@material-ui/core/Slide';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { WbSunny, Brightness3, ExitToApp, BarChart, MoreVert, Close } from '@material-ui/icons';
import RecordNew from './recordnew';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import RecordStats from './recordstats';
import StateContext from '../utils/statecontext';

const Navigation = () => {
  const [session, loading] = useSession();
  const [anchor, setAnchor] = useState(null);

  const { state: { darkState }, state, setState } = useContext(StateContext);

  const trigger = useScrollTrigger();

  const handleMenuOpen = (event) => {
    setAnchor(event.currentTarget);
  }

  const handleMenuClose = (event) => {
    setAnchor(null);
  }

  const handleThemeChange = () => {
    localStorage.setItem('darkState', darkState ? 'off' : 'on');
    setState({ ...state, darkState: !darkState });
  }

  return (
    <Fragment>
      <Backdrop open={loading}>
        <CircularProgress color="secondary" size={40} />
      </Backdrop>
      {session && navigator.maxTouchPoints == 0 && (
        <Fragment>
          <AppBar position="fixed" color="inherit" >
            <Toolbar>
              <Avatar alt={session.user.name} src={session.user.image} />
              <Typography variant="h6" style={{ flexGrow: 1, paddingLeft: 10 }} >My Travels</Typography>
              <RecordStats />
              <Tooltip title="Toggle Dark Mode">
                <IconButton color="primary" onClick={handleThemeChange}>
                  {darkState ? <WbSunny /> : <Brightness3 />}
                </IconButton>
              </Tooltip>
              <Tooltip title="Sign Out">
                <IconButton color="primary" onClick={signOut}><ExitToApp /></IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>
          <AppBar position="fixed" style={{ top: 'auto', bottom: 0 }}>
            <RecordNew
              userid={session.user.id}
              style={{ position: 'absolute', zIndex: 1, right: 50, bottom: 50 }}
            />
          </AppBar>
        </Fragment>
      )}
      {session && navigator.maxTouchPoints > 0 && (
        <Fragment>
          <Slide appear={false} direction="down" in={!trigger} >
            <AppBar color="inherit">
              <Toolbar>
                <Typography variant="h6">My Travels</Typography>
                <div style={{ flexGrow: 1 }} />
                <Avatar alt={session.user.name} src={session.user.image} />
              </Toolbar>
            </AppBar>
          </Slide>
          <AppBar position="fixed" color="inherit" style={{ top: 'auto', bottom: 0 }} >
            <Toolbar>
              <RecordNew
                userid={session.user.id}
                style={{ position: 'absolute', zIndex: 1, left: 0, right: 0, top: -30, margin: '0 auto' }}
              />
              <RecordStats />
              <div style={{ flexGrow: 1 }} />
              <IconButton size="small" color="primary" onClick={handleMenuOpen}>
                <MoreVert fontSize="large" />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Menu
            anchorEl={anchor}
            keepMounted
            open={Boolean(anchor)}
            onClose={handleMenuClose}
          >
            <Box m={1}>
              <MenuItem
                onClick={() => {
                  handleThemeChange();
                  handleMenuClose();
                }}
              >
                {darkState
                  ? <WbSunny fontSize="large" color="primary" />
                  : <Brightness3 fontSize="large" color="primary" />}
              </MenuItem>
            </Box>
            <Divider variant="middle" />
            <MenuItem
              onClick={() => {
                signOut();
                handleMenuClose();
              }}
            >
              <Box m={1}>
                <ExitToApp fontSize="large" color="primary" />
              </Box>
            </MenuItem>
            <Divider variant="middle" />
            <MenuItem onClick={handleMenuClose}>
              <Box m={1}>
                <Close fontSize="large" color="primary" />
              </Box>
            </MenuItem>
          </Menu>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Navigation;