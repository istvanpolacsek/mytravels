import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Avatar, IconButton, Skeleton } from '@mui/material';

import { selectAuthData, selectAuthIsLoading } from 'redux/slices/auth';
import useRoutes from 'hooks/useRoutes';

function AvatarButton() {
  const authData = useSelector(selectAuthData);
  const isAuthDataLoading = useSelector(selectAuthIsLoading);
  const { toProfilePage } = useRoutes();

  return (
    <IconButton disabled={isAuthDataLoading} onClick={toProfilePage}>
      {isAuthDataLoading
        ? <Skeleton variant="circular" width={24} height={24} />
        : <Avatar alt={authData.name} src={authData.image} sx={{ width: 24, height: 24 }} />}
    </IconButton>
  );
}

export default memo(AvatarButton);
