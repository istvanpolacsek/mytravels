import { memo } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

import withAuth from 'components/hocs/withAuth';

const ProfileAvatar = ({ user, isAuthLoading }) => {
  if (isAuthLoading) return <CircularProgress color="primary" />;

  return (
    <Box m={1}>
      <Avatar alt="avatar" src={user?.image}>
        {user.name.substring(0, 1)}
      </Avatar>
    </Box>
  );
};

export default memo(withAuth(ProfileAvatar));
