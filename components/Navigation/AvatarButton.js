import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Avatar, IconButton, Skeleton } from '@mui/material';

import { selectAuthData, selectAuthIsLoading } from 'redux/slices/auth';

function AvatarButton() {
  const authData = useSelector(selectAuthData);
  const isAuthDataLoading = useSelector(selectAuthIsLoading);

  return (
    <IconButton>
      {isAuthDataLoading
        ? <Skeleton variant="circular" width={24} height={24} />
        : <Avatar alt={authData.name} src={authData.image} sx={{ width: 24, height: 24 }} />}
    </IconButton>
  );
}

export default memo(AvatarButton);
