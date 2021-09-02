import { Fragment, useContext } from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';
import { Formik } from 'formik';
import {
  Box,
  Button,
  ButtonGroup,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  LinearProgress,
} from '@material-ui/core';
import { Save, Cancel, Close } from '@material-ui/icons';

import IconButtonWrapper from 'components/IconButtonWrapper/IconButtonWrapper';
import FormikDatePicker from 'components/FormikPickers/FormikDatePicker';
import FormikPlacesAutocomplete from 'components/FormikPickers/FormikPlacesAutocomplete';
import FormikTypePicker from 'components/FormikPickers/FormikTypePicker';
import RecordNewSchema from 'models/yup/recordnew';
import StateContext from 'utils/statecontext';
import useRoutes from 'hooks/useRoutes';
import useUserData from 'hooks/useUserData';
import { filter, find } from 'lodash';
import RecordEditSchema from 'models/yup/recordedit';

const fieldStyle = { marginLeft: 0, marginRight: 0 };

const performMutation = async (record, id) => {
  const url = id ? `/api/travelrecords/${id}` : '/api/travelrecords/';
  const method = id ? 'PUT' : 'POST';

  const response = await fetch(url, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(record),
  });
  if (!response) {
    throw new Error('Network Error while performing mutation');
  }

  return response.json();
};

const RecordForm = () => {
  const router = useRouter();
  const [session] = useSession();
  const {
    user: { id },
  } = session;
  const {
    state: { mobile },
  } = useContext(StateContext);
  const { mutate } = useSWRConfig();
  const { data, url } = useUserData();
  const { toHomePage } = useRoutes();

  const recordid = router.query?.recordid;

  const handleFormSubmit = async (values) => {
    if (recordid) {
      const updatedRecord = { ...find(data, { _id: recordid }), ...values };
      const updatedData = [
        updatedRecord,
        ...filter(data, ({ _id }) => {
          return _id !== recordid;
        }),
      ];
      mutate(url, updatedData, false);
      await performMutation(updatedRecord, recordid);
    } else {
      const newRecord = { userid: id, ...values };
      const newData = [newRecord, ...data];
      mutate(url, newData, false);
      await performMutation(newRecord);
    }

    mutate(url);

    toHomePage();
  };

  return (
    <Fragment>
      <DialogTitle>
        <Grid
          container
          alignItems="center"
          justify="space-between"
        >
          <span>{recordid ? 'Edit' : 'New'} Record</span>
          <IconButtonWrapper title="close" onClick={toHomePage}>
            <Close />
          </IconButtonWrapper>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Formik
          onSubmit={handleFormSubmit}
          validationSchema={recordid ? RecordEditSchema : RecordNewSchema}
          initialValues={recordid ? find(data, { _id: recordid }) : {}}
        >
          {({ handleSubmit, errors, isSubmitting }) => (
            <Grid
              container
              direction="column"
              component="form"
              noValidate
              onSubmit={handleSubmit}
            >
              <Grid
                container
                direction={mobile ? 'column' : 'row'}
                justify="space-between"
              >
                <Box m={1} width={mobile ? '100%' : '48%'} style={fieldStyle}>
                  <FormikDatePicker
                    name="traveldate"
                    label={
                      errors.traveldate ? `Date | ${errors.traveldate}` : 'Date'
                    }
                    error={!!errors.traveldate}
                    disabled={isSubmitting}
                  />
                </Box>
                <Box m={1} width={mobile ? '100%' : '48%'} style={fieldStyle}>
                  <FormikTypePicker
                    name="traveltype"
                    label={
                      errors.traveltype ? `Type | ${errors.traveltype}` : 'Type'
                    }
                    error={!!errors.traveltype}
                    disabled={isSubmitting}
                  />
                </Box>
              </Grid>
              {!recordid && (
                <Fragment>
                  <Box m={1} width="100%" style={fieldStyle}>
                    <FormikPlacesAutocomplete
                      name="departureid"
                      label="Departure"
                      placeholder="Budapest..."
                      error={!!errors.departureid}
                      disabled={isSubmitting}
                    />
                  </Box>
                  <Box m={1} width="100%" style={fieldStyle}>
                    <FormikPlacesAutocomplete
                      name="arrivalid"
                      label="Arrival"
                      placeholder="Barcelona..."
                      error={!!errors.arrivalid}
                      disabled={isSubmitting}
                    />
                  </Box>
                </Fragment>
              )}
              {isSubmitting && <LinearProgress />}
              <DialogActions>
                <ButtonGroup>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Save />}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    save
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Cancel />}
                    onClick={toHomePage}
                    disabled={isSubmitting}
                  >
                    cancel
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

export default RecordForm;
