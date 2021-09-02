import { Fragment, memo, useState } from 'react';
import { useSession } from 'next-auth/client';
import dynamic from 'next/dynamic';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Add from '@material-ui/icons/Add';
import BarChart from '@material-ui/icons/BarChart';
import MoreVert from '@material-ui/icons/MoreVert';

import AppTitle from 'components/Navigation/AppTitle';
import ColorModeButton from 'components/Navigation/ColorModeButton';
import IconButtonWrapper from 'components/IconButtonWrapper/IconButtonWrapper';
import useRoutes from 'hooks/useRoutes';

const ProfileAvatar = dynamic(() => import('../ProfileAvatar/ProfileAvatar'), {
  ssr: false,
});

const MobileNavigation = () => {
  const [session] = useSession();
  const trigger = useScrollTrigger();
  const { toRecordForm, toRecordStats } = useRoutes();
  const [anchor, setAnchor] = useState();

  return (
    <Fragment>
      <Slide
        appear={false}
        direction="down"
        in={!trigger}
        direction="down"
        in={!trigger}
      >
        <AppBar color="inherit">
          <Toolbar>
            <AppTitle />
            <ProfileAvatar />
          </Toolbar>
        </AppBar>
      </Slide>
      {session && (
        <AppBar
          position="fixed"
          color="inherit"
          style={{ top: 'auto', bottom: 0 }}
        >
          <Toolbar>
            <IconButtonWrapper
              color="primary"
              style={{ margin: '0 5vw' }}
              onClick={toRecordStats}
            >
              <BarChart fontSize="large" />
            </IconButtonWrapper>
            <div style={{ flexGrow: 1 }} />
            <Fab
              color="secondary"
              style={{
                position: 'absolute',
                zIndex: 1,
                left: 0,
                right: 0,
                top: -30,
                margin: '0 auto',
              }}
              onClick={() => toRecordForm()}
            >
              <Add fontSize="large" />
            </Fab>
            <IconButtonWrapper
              color="primary"
              style={{ margin: '0 5vw' }}
              onClick={({ currentTarget }) => setAnchor(currentTarget)}
            >
              <MoreVert fontSize="large" />
            </IconButtonWrapper>
          </Toolbar>
        </AppBar>
      )}
      <Menu anchorEl={anchor} open={!!anchor} onClose={() => setAnchor(null)}>
        <MenuItem>
          <Box>
            <IconButtonWrapper color="primary" onClick={toRecordStats}>
              <BarChart fontSize="large" />
            </IconButtonWrapper>
          </Box>
        </MenuItem>
        <MenuItem>
          <Box>
            <ColorModeButton fontSize="large" />
          </Box>
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default memo(MobileNavigation);
