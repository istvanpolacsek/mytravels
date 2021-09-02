import { Fragment } from 'react';
import { signOut, useSession } from 'next-auth/client';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ExitToApp from '@material-ui/icons/ExitToApp';

import ColorModeButton from 'components/Navigation/ColorModeButton';

const DesktopButtons = () => {
  const [session] = useSession();

  return session ? (
    <Fragment>
      <ColorModeButton />
      <Tooltip title="Sign Out">
        <IconButton color="primary" onClick={signOut}>
          <ExitToApp />
        </IconButton>
      </Tooltip>
    </Fragment>
  ) : null;
};

export default DesktopButtons;
