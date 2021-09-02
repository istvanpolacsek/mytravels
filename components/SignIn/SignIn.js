import { Fragment } from 'react';
import { signIn, useSession } from 'next-auth/client';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Close from '@material-ui/icons/Close';
import Search from '@material-ui/icons/Search';

import IconButtonWrapper from 'components/IconButtonWrapper/IconButtonWrapper';
import { useRouter } from 'next/router';

const SignIn = ({ onClose }) => {
  const router = useRouter();
  const [session, loading] = useSession();

  if (!loading && session) router.push('/');

  return (
    <Fragment>
      <DialogTitle>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-between"
        >
          <span>Sign In</span>
          <IconButtonWrapper title="Close" onClick={onClose}>
            <Close />
          </IconButtonWrapper>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container direction="column" alignItems="center" justify="center">
          <Box m={1}>
            <Typography>Sign In Using</Typography>
          </Box>
          <Box m={1}>
            <Button
              color="primary"
              variant="contained"
              startIcon={<Search />}
              onClick={() => signIn('google')}
            >
              google
            </Button>
          </Box>
        </Grid>
      </DialogContent>
    </Fragment>
  );
};

export default SignIn;
