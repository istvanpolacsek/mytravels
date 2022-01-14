import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Skeleton } from '@mui/material';

import { selectAuthData, selectAuthIsLoading } from 'redux/slices/auth';

const useAvatar = () => {
  const authData = useSelector(selectAuthData);
  const isAuthDataLoading = useSelector(selectAuthIsLoading);

  const sx = { width: 24, height: 24 };
  const skeletonProps = useMemo(() => ({ variant: 'circular', ...sx }), []);
  const avatarProps = useMemo(() => ({ alt: authData?.name, src: authData?.image, sx }), [authData]);

  return isAuthDataLoading ? { component: Skeleton, props: skeletonProps } : { component: Avatar, props: avatarProps };
};

export default useAvatar;
