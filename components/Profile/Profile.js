import { memo } from 'react';
import { useSelector } from 'react-redux';
import { signOut } from 'next-auth/react';
import { Avatar, Button, DialogContent, Grid, Skeleton, Typography } from '@mui/material';

import { selectAuthData, selectAuthIsLoading } from 'redux/slices/auth';

function Profile() {
  const authData = useSelector(selectAuthData);
  const isAuthDataLoading = useSelector(selectAuthIsLoading);

  return (
    <DialogContent>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={3}>
          {isAuthDataLoading
            ? <Skeleton widht={56} height={56} variant="circular" />
            : <Avatar sx={{ width: 56, height: 56 }} alt={authData.name} src={authData.image} />}
        </Grid>
        <Grid item>
          <Typography variant="h6">
            {isAuthDataLoading ? <Skeleton /> : authData.name}
          </Typography>
          <Typography variant="subtitle2">
            {isAuthDataLoading ? <Skeleton /> : authData.email}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Button fullWidth color="error" variant="outlined" onClick={signOut}>Sign Out</Button>
        </Grid>
      </Grid>
    </DialogContent>
  );
}

export default memo(Profile);
