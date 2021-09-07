import { Box, Button, Card, CardActions, CardContent, CardHeader, Grid, Typography, useTheme } from '@material-ui/core';
import useRoutes from 'hooks/useRoutes';
import { signIn, useSession } from 'next-auth/client';

const SignIn = () => {
  const [session] = useSession();
  const { toHomePage } = useRoutes();
  const theme = useTheme();

  if (typeof window !== 'undefined' && session) {
    toHomePage();
    return null;
  }

  return (
    <Grid
      container
      style={{
        height: '100vh',
        background: `linear-gradient(${theme.palette.secondary.light}, ${theme.palette.primary.light})`,
      }}
      alignItems="center"
      justify="center"
    >
      <Card style={{ margin: '5vw' }}>
        <CardHeader title="Welcome to My Travels" />
        <CardContent>
          <Typography color="primary">
            Please use one of the available providers to login
          </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: 'flex-end' }}>
          <Box m={1}>
            <Button
              color="secondary"
              size="large"
              variant="contained"
              onClick={() => signIn('google')}
            >
              google
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default SignIn;
