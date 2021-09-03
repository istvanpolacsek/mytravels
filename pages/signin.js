import { Button, Grid } from '@material-ui/core';
import useRoutes from 'hooks/useRoutes';
import { signIn, useSession } from 'next-auth/client';

const SignIn = () => {
  const [session] = useSession();
  const { toHomePage } = useRoutes();

  if (typeof window !== 'undefined' && session) {
    toHomePage();
    return null;
  }

  return (
    <Grid
      container
      style={{ height: '100vh' }}
      alignItems="center"
      justify="center"
    >
      <Button
        color="primary"
        size="large"
        variant="outlined"
        onClick={() => signIn('google')}
      >
        google
      </Button>
    </Grid>
  );
};

export default SignIn;
