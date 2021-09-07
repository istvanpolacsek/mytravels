import { Fragment, memo } from 'react';
import dynamic from 'next/dynamic';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import AddRecord from 'components/Navigation/AddRecord';
import AppTitle from 'components/Navigation/AppTitle';
import ColorModeButton from 'components/Navigation/ColorModeButton';
import SignOut from 'components/Navigation/SignOut';
import ToRecordStats from 'components/Navigation/ToRecordStats';

const ProfileAvatar = dynamic(() => import('../ProfileAvatar/ProfileAvatar'), {
  ssr: false,
});

const DesktopNavigation = () => {
  return (
    <Fragment>
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <AppTitle />
          <ProfileAvatar />
          <ToRecordStats />
          <ColorModeButton />
          <SignOut />
        </Toolbar>
      </AppBar>
      <AddRecord style={{ position: 'absolute', zIndex: 1, right: 50, bottom: 50 }} />
    </Fragment>
  );
};

export default memo(DesktopNavigation);
