import { Fragment, memo } from 'react';
import { useSelector } from 'react-redux';
import { signOut } from 'next-auth/react';
import { map } from 'lodash';
import { Avatar, Box, Button, DialogContent, Grid, Skeleton, Typography } from '@mui/material';

import { selectAuthData, selectAuthIsLoading } from 'redux/slices/auth';
import DarkModeSwitch from 'components/Switches/DarkModeSwitch';
import ShowLabelsSwitch from 'components/Switches/ShowLabelsSwitch';

function Profile() {
  const authData = useSelector(selectAuthData);
  const isAuthDataLoading = useSelector(selectAuthIsLoading);

  const settings = [
    { label: 'Dark Mode', component: DarkModeSwitch },
    { label: 'Show Navigation Labels', component: ShowLabelsSwitch },
  ];

  return (
    <DialogContent>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
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
      </Grid>
      <Box my={3}>
        <Grid container justifyContent="space-between" alignItems="center">
          {map(settings, ({ label, component: Component }, i) => (
            <Fragment key={i}>
              <Grid item xs={8}>{label}</Grid>
              <Grid item><Component /></Grid>
            </Fragment>
          ))}
        </Grid>
      </Box>
      <Box m={3}>
        <Button fullWidth color="error" variant="outlined" onClick={signOut}>Sign Out</Button>
      </Box>
    </DialogContent>
  );
}

export default memo(Profile);
