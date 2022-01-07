import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { map } from 'lodash';
import { ButtonGroup, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { RiCloseLine, RiDeleteBin7Line } from 'react-icons/ri';

import { recordsApi } from 'redux/services/recordsService';
import { selectIsMobile } from 'redux/slices/settings';
import useRoutes from 'hooks/useRoutes';

const { useDeleteRecordMutation } = recordsApi;

function RecordDelete() {
  const { toHomePage } = useRoutes();
  const { query: { id } } = useRouter();
  const isMobile = useSelector(selectIsMobile);
  const [deleteRecord] = useDeleteRecordMutation();
  const { formState: { isSubmitting }, handleSubmit } = useForm({ mode: 'onChange' });

  const handleFormSubmit = () => {
    deleteRecord(id);
    toHomePage();
  };

  const actions = [
    { title: 'Cancel', onClick: () => toHomePage(), disabled: isSubmitting, startIcon: <RiCloseLine /> },
    {
      title: 'Delete',
      type: 'submit',
      color: 'error',
      disabled: isSubmitting,
      loading: isSubmitting,
      startIcon: <RiDeleteBin7Line />,
    },
  ];

  return (
    <DialogContent>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogActions disableSpacing>
          <ButtonGroup fullWidth={isMobile}>
            {map(actions, ({ title, ...rest }, i) => (
              <LoadingButton key={i} variant="outlined" {...rest}>{title}</LoadingButton>))}
          </ButtonGroup>
        </DialogActions>
      </form>
    </DialogContent>
  );
}

export default memo(RecordDelete);
