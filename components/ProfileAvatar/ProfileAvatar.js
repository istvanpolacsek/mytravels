import { memo } from 'react';
import { useSession } from 'next-auth/client';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import AccountCircle from '@material-ui/icons/AccountCircle';

import IconButtonWrapper from 'components/IconButtonWrapper/IconButtonWrapper';
import useRoutes from 'hooks/useRoutes';

const ProfileAvatar = () => {
  const [session, loading] = useSession();
  const { toSignInPage } = useRoutes();

  if (loading && !session) return <CircularProgress color="primary" />;
  if (!loading && !session)
    return (
      <IconButtonWrapper color="primary" title="Sign In" onClick={toSignInPage}>
        <AccountCircle />
      </IconButtonWrapper>
    );

  const { user } = session;

  return (
    <Box m={1}>
      <Avatar alt="avatar" src={user?.image}>
        {user.name.substring(0, 1)}
      </Avatar>
    </Box>
  );
};

export default memo(ProfileAvatar);
