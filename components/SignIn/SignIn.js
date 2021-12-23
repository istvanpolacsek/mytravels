import { memo } from 'react';
import { Button, DialogContent, Grid, Typography } from '@mui/material';
import { signIn } from 'next-auth/react';

function SignIn() {
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
          <Button fullWidth variant="outlined" onClick={() => signIn('google')}>
            Google
          </Button>
        </Grid>
      </Grid>
    </DialogContent>
  );
}

export default memo(SignIn);
