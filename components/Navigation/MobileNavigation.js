import { Fragment, memo } from 'react';
import dynamic from 'next/dynamic';
import AppBar from '@material-ui/core/AppBar';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import AddRecord from 'components/Navigation/AddRecord';
import AppTitle from 'components/Navigation/AppTitle';
import ColorModeButton from 'components/Navigation/ColorModeButton';
import SignOut from 'components/Navigation/SignOut';
import ToRecordStats from 'components/Navigation/ToRecordStats';

const ProfileAvatar = dynamic(() => import('../ProfileAvatar/ProfileAvatar'), {
  ssr: false,
});

const MobileNavigation = () => {
  const trigger = useScrollTrigger();

  return (
    <Fragment>
      <Slide
        appear={false}
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
      <AppBar
        position="fixed"
        color="inherit"
        style={{ top: 'auto', bottom: 0 }}
      >
        <Toolbar style={{ margin: '0 3vw' }}>
          <AddRecord style={{
            position: 'absolute',
            zIndex: 1,
            left: 0,
            right: 0,
            top: -30,
            margin: '0 auto',
          }} />
          <ToRecordStats style={{ margin: '0 1vw' }} />
          <ColorModeButton style={{ margin: '0 1vw' }} />
          <div style={{ flexGrow: 1 }} />
          <SignOut style={{ margin: '0 1vw' }} />
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default memo(MobileNavigation);
