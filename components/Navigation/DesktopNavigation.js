import { Fragment, memo } from 'react';
import dynamic from 'next/dynamic';
import { signOut, useSession } from 'next-auth/client';
import AppBar from '@material-ui/core/AppBar';
import Fab from '@material-ui/core/Fab';
import Toolbar from '@material-ui/core/Toolbar';
import Add from '@material-ui/icons/Add';
import ExitToApp from '@material-ui/icons/ExitToApp';
import BarChart from '@material-ui/icons/BarChart';

import AppTitle from 'components/Navigation/AppTitle';
import ColorModeButton from 'components/Navigation/ColorModeButton';
import IconButtonWrapper from 'components/IconButtonWrapper/IconButtonWrapper';
import useRoutes from 'hooks/useRoutes';

const ProfileAvatar = dynamic(() => import('../ProfileAvatar/ProfileAvatar'), {
  ssr: false,
});

const DesktopNavigation = () => {
  const [session] = useSession();
  const { toRecordForm, toRecordStats } = useRoutes();

  return (
    <Fragment>
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <AppTitle />
          <ProfileAvatar />
          {session && (
            <Fragment>
              <ColorModeButton />
              <IconButtonWrapper
                color="primary"
                title="Show Stats"
                onClick={toRecordStats}
              >
                <BarChart />
              </IconButtonWrapper>
              <IconButtonWrapper
                color="primary"
                title="Log Out"
                onClick={signOut}
              >
                <ExitToApp />
              </IconButtonWrapper>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
      {session && (
        <Fab
          color="secondary"
          style={{ position: 'absolute', zIndex: 1, right: 50, bottom: 50 }}
          onClick={() => toRecordForm()}
        >
          <Add fontSize="large" />
        </Fab>
      )}
    </Fragment>
  );
};

export default memo(DesktopNavigation);
