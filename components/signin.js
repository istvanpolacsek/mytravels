import { Fragment } from 'react';
import { useSession, signIn } from 'next-auth/client';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Search, Facebook } from '@material-ui/icons';

const SignIn = () => {
  const [session, loading] = useSession();

  const handleSignIn = (provider) => {
    signIn(provider);
  }

  return (
    <Fragment>
      {!loading && !session && (
        <Grid container direction="column" style={{width: '100vw', height: '100vh'}} alignItems="center" justify="center" >
          <Box m={.5}>
            <Typography variant="h5" >Sign In Using</Typography>
          </Box>
          <Box m={.5} width={150}>
            <Button
              onClick={() => handleSignIn('google')}
              startIcon={<Search/>}
              color="primary"
              variant="contained"
              fullWidth
              >
              google
            </Button>
          </Box>
          <Box m={.5} width={150}>
            <Button
              startIcon={<Facebook/>}
              color="primary"
              variant="contained"
              fullWidth
              disabled={true}
            >
              facebook
            </Button>
          </Box>
        </Grid>
      )}
    </Fragment>
  );
}

export default SignIn;