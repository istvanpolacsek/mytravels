import { memo } from 'react';
import { signIn } from 'next-auth/react';
import { Button, DialogContent, Grid, Typography } from '@mui/material';

const options = {
  callbackUrl: process.env.NEXTAUTH_URL,
  display: 'touch',
};

function SignIn() {
  const handleSignIn = () => signIn('google', options);

  return (
    <DialogContent>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Typography align="center" variant="h5">Welcome to My Travels</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography align="center">Please login using:</Typography>
        </Grid>
        <Grid item xs={8}>
          <Button fullWidth variant="outlined" onClick={handleSignIn}>
            Google
          </Button>
        </Grid>
      </Grid>
    </DialogContent>
  );
}

export default memo(SignIn);
