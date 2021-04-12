import { Fragment, useState } from 'react';
import { Formik } from 'formik';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Save, Cancel, Add } from '@material-ui/icons';
import RecordNewSchema from '../models/yup/recordnew';
import FormikDatePicker from './formikdatepicker';
import FormikPlacesAutocomplete from './formikplacesautocomplete';
import FormikTypePicker from './formiktypepicker';
import withWidth from '@material-ui/core/withWidth';
import { useMutation, useQueryClient } from 'react-query';

const appurl = process.env.NEXT_PUBLIC_URL;

const performMutation = async (form) => {
  const response = await fetch(`${appurl}/api/travelrecords/`, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(form)
  });
  if (!response) {
    throw new Error('Network Error while performing mutation');
  }
  return response.json();
}

const RecordNew = ({ userid, style, width }) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(performMutation, {
    onSuccess: () => {
      queryClient.refetchQueries(userid);
    }
  });

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ userid: userid });

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setForm({ userid: userid });
    setOpen(false);
  }

  const handleSubmit = (form) => {
    mutate(form);
    handleClose();
  }

  return (
    <Fragment>
      <Tooltip
        title={navigator.maxTouchPoints === 0 ? 'Add New Record' : ''}
        placement="top"
      >
        <Fab color="secondary" style={style} onClick={handleOpen} >
          <Add fontSize="large" />
        </Fab>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth >
        <DialogTitle>
          New Travel Record
        </DialogTitle>
        {open && isLoading && <LinearProgress />}
        <DialogContent>
          <Formik validationSchema={RecordNewSchema} onSubmit={handleSubmit} initialValues={form} >
            {({
              handleSubmit,
              errors
            }) => (
              <Grid component="form" container direction="column" onSubmit={handleSubmit} noValidate  >
                <Grid container direction="row" justify="space-between" >
                  <Box m={1} maxWidth="100%" width={width === "xs" ? '100%' : '49%'} style={{ marginInline: 0 }} >
                    <FormikDatePicker
                      name="traveldate"
                      label={errors.traveldate ? `Date | ${errors.traveldate}` : "Date"}
                      error={!!errors.traveldate}
                      disabled={isLoading}
                    />
                  </Box>
                  <Box m={1} maxWidth="100%" width={width === "xs" ? '100%' : '49%'} style={{ marginInline: 0 }}>
                    <FormikTypePicker
                      name="traveltype"
                      label={errors.traveltype ? `Type | ${errors.traveltype}` : "Type"}
                      error={!!errors.traveltype}
                      disabled={isLoading}
                    />
                  </Box>
                </Grid>
                <Box m={1} width="100%" style={{ marginInline: 0 }} >
                  <FormikPlacesAutocomplete
                    name="departureid"
                    label="Departure"
                    error={errors.departureid}
                    disabled={isLoading}
                  />
                </Box>
                <Box m={1} width="100%" style={{ marginInline: 0 }}>
                  <FormikPlacesAutocomplete
                    name="arrivalid"
                    label="Arrival"
                    error={errors.arrivalid}
                    disabled={isLoading}
                  />
                </Box>
                <DialogActions>
                  <ButtonGroup>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Save />}
                      type="submit"
                      disabled={isLoading}
                    >
                      save
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Cancel />}
                      onClick={handleClose}
                      disabled={isLoading}
                    >
                      cancel
                    </Button>
                  </ButtonGroup>
                </DialogActions>
              </Grid>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default withWidth()(RecordNew);