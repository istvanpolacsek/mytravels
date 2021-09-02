import { Fragment } from 'react';
import { CheckCircle, Cancel, Close } from '@material-ui/icons';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButtonWrapper from 'components/IconButtonWrapper/IconButtonWrapper';
import useRoutes from 'hooks/useRoutes';
import { DialogContent, Grid, Typography } from '@material-ui/core';
import { useSWRConfig } from 'swr';
import { useRouter } from 'next/router';
import { Formik } from 'formik';
import useUserData from 'hooks/useUserData';
import { filter } from 'lodash';

const performMutation = async (id) => {
  const response = await fetch(`/api/travelrecords/${id}`, {
    method: 'DELETE',
  });
  if (!response) {
    throw new Error('Network Error while performing mutation');
  }
  return response.json();
};

const RecordDelete = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { data, url } = useUserData();
  const { toHomePage } = useRoutes();

  const recordid = router.query?.recordid;

  const handleFormSubmit = async () => {
    const updatedData = filter(data, ({ _id }) => {
      return _id !== recordid;
    });

    mutate(url, updatedData, false);

    await performMutation(recordid);

    mutate(url);

    toHomePage();
  };

  return (
    <Fragment>
      <DialogTitle>
        <Grid container alignItems="center" justify="space-between">
          <span>Delete Record</span>
          <IconButtonWrapper title="close" onClick={toHomePage}>
            <Close />
          </IconButtonWrapper>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Formik onSubmit={handleFormSubmit} initialValues={{}}>
          {({ handleSubmit, isSubmitting }) => (
            <Grid
              container
              direction="column"
              component="form"
              noValidate
              onSubmit={handleSubmit}
            >
              <Typography>Confirm Delete</Typography>
              {isSubmitting && <LinearProgress />}
              <DialogActions>
                <ButtonGroup>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<CheckCircle />}
                    disabled={isSubmitting}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={toHomePage}
                    startIcon={<Cancel />}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </ButtonGroup>
              </DialogActions>
            </Grid>
          )}
        </Formik>
      </DialogContent>
    </Fragment>
  );
};

export default RecordDelete;
