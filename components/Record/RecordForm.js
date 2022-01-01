import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import { find, map } from 'lodash';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ButtonGroup, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, TextField } from '@mui/material';
import { DatePicker, LoadingButton } from '@mui/lab';
import { RiCloseLine, RiSaveLine } from 'react-icons/ri';

import useRoutes from 'hooks/useRoutes';
import { recordsApi } from 'redux/services/recordsService';
import { selectFilter } from 'redux/slices/records';
import RecordNewSchema from 'lib/yup/models/RecordNew';
import RecordEditSchema from 'lib/yup/models/RecordEdit';
import { ARRIVAL_ID, CREATE_DEFAULTS, DEPARTURE_ID, TRAVEL_DATE, TRAVEL_TYPE, TRAVEL_TYPES } from 'lib/constants';
import PlacesAutocomplete from 'components/Pickers/PlacesAutocomplete';

const { useCreateRecordMutation, useUpdateRecordMutation, useRetrieveRecordsQuery } = recordsApi;

function RecordForm() {
  const { query } = useRouter();
  const { toHomePage } = useRoutes();
  const filter = useSelector(selectFilter);
  const id = query?.id;

  const [createRecord] = useCreateRecordMutation();
  const [updateRecord] = useUpdateRecordMutation();

  const selectRecord = useMemo(() => createSelector(
    (res) => res.data,
    (res, recordId) => recordId,
    (data, recordId) => find(data, { _id: recordId }),
  ), []);

  const { selectedRecord } = useRetrieveRecordsQuery({ filter }, {
    selectFromResult: (res) => ({ selectedRecord: selectRecord(res, id) }),
  });

  const { control, formState: { isSubmitting, isValid }, getValues, handleSubmit, watch } = useForm({
    mode: 'onChange',
    resolver: yupResolver(id ? RecordEditSchema : RecordNewSchema),
    defaultValues: id ? selectedRecord : CREATE_DEFAULTS,
  });

  const actions = [
    { title: 'Cancel', onClick: () => toHomePage(), disabled: isSubmitting, startIcon: <RiCloseLine /> },
    {
      title: id ? 'Save' : 'Create',
      type: 'submit',
      disabled: !isValid || isSubmitting,
      loading: isSubmitting,
      startIcon: <RiSaveLine />,
    },
  ];

  const handleFormSubmit = () => {
    const submitAction = [createRecord, updateRecord][+!!id];

    submitAction(getValues());
    toHomePage();
  };

  const fields = [
    {
      name: TRAVEL_DATE,
      render: ({ field }) => (<DatePicker {...field} renderInput={(params) =>
        (<TextField fullWidth size="small" {...params} />)} label="Travel Date" />),
    },
    {
      name: TRAVEL_TYPE,
      render: ({ field }) => (<TextField select fullWidth size="small" label="Travel Type" {...field} >
        {map(TRAVEL_TYPES, ({ key }) => <MenuItem value={key} key={key}>{key}</MenuItem>)}
      </TextField>),
    },
    ...(id ? [] : [{
      name: DEPARTURE_ID,
      render: ({ field: { value, onChange } }) => (
        <PlacesAutocomplete label="Departure City" value={value} onChange={onChange} />),
    }]),
    ...(id ? [] : [{
      name: ARRIVAL_ID,
      render: ({ field: { value, onChange } }) => (
        <PlacesAutocomplete label="Arrival City" value={value} onChange={onChange} />),
    }]),
  ];

  return (
    <DialogContent>
      <DialogTitle>{`${id ? 'Edit' : 'New'} Travel`}</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container spacing={2} my={1}>
          {map(fields, (props, i) => (
            <Grid key={i} item xs={12} sm={6}>
              <Controller control={control} {...props} />
            </Grid>))}
        </Grid>
        <DialogActions>
          <ButtonGroup fullWidth>
            {map(actions, ({ title, ...rest }, i) => (
              <LoadingButton key={i} {...rest}>{title}</LoadingButton>))}
          </ButtonGroup>
        </DialogActions>
      </form>
    </DialogContent>
  );
}

export default memo(RecordForm);
