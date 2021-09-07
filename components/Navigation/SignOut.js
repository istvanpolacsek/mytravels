import withAuth from 'components/hocs/withAuth';
import { memo } from 'react';
import IconButtonWrapper from 'components/IconButtonWrapper/IconButtonWrapper';
import { signOut } from 'next-auth/client';
import ExitToApp from '@material-ui/icons/ExitToApp';

const SignOut = ({ isAuthLoading, ...props }) => {
  return (
    <IconButtonWrapper
      color="primary"
      title="Log Out"
      onClick={signOut}
      {...props}
    >
      <ExitToApp fontSize="large" />
    </IconButtonWrapper>
  );
};

export default memo(withAuth(SignOut));
