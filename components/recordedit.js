import { useState, Fragment } from 'react';
import { Formik } from 'formik';
import MenuItem from '@material-ui/core/MenuItem';
import { Edit, Save, Cancel } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import LinearProgress from '@material-ui/core/LinearProgress';
import RecordEditSchema from '../models/yup/recordedit';
import FormikDatePicker from './formikdatepicker';
import FormikTypePicker from './formiktypepicker';
import { useMutation, useQueryClient } from 'react-query';

const appurl = process.env.NEXT_PUBLIC_URL;

const performMutation = async ({ form, id }) => {
  const response = await fetch(`${appurl}/api/travelrecords/${id}`, {
    method: 'PUT',
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

const RecordEdit = ({ handleMenuClose, record: { _id, userid, traveldate, traveltype } }) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(performMutation, {
    onSuccess: () => {
      queryClient.refetchQueries(userid);
    }
  });

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ traveldate, traveltype });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    handleMenuClose();
    setForm({ traveldate, traveltype })
    setOpen(false);
  };

  const handleSubmit = async (form) => {
    mutate({ form, id: _id });
    handleClose();
  }

  return (
    <Fragment>
      <MenuItem onClick={handleOpen} >
        <Edit fontSize="large" color="secondary" />
      </MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Edit Travel Record</DialogTitle>
        {isLoading && (<LinearProgress color="secondary" />)}
        <DialogContent>
          <Formik validationSchema={RecordEditSchema} initialValues={form} onSubmit={handleSubmit} >
            {({
              handleSubmit,
              errors
            }) => (
              <Grid component="form" container direction="column" onSubmit={handleSubmit} noValidate >
                <Box m={1}>
                  <FormikDatePicker
                    name="traveldate"
                    label={errors.traveldate ? `Date | ${errors.traveldate}` : "Date"}
                    error={!!errors.traveldate}
                    disabled={isLoading}
                  />
                </Box>
                <Box m={1}>
                  <FormikTypePicker
                    name="traveltype"
                    label={errors.traveltype ? `Type | ${errors.traveltype}` : "Type"}
                    error={!!errors.traveltype}
                    disabled={isLoading}
                  />
                </Box>
                <DialogActions>
                  <ButtonGroup>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      startIcon={<Save />}
                      disabled={isLoading}
                    >
                      Save
                </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleClose}
                      startIcon={<Cancel />}
                      disabled={isLoading}
                    >
                      Cancel
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

export default RecordEdit;