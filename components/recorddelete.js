import { Fragment, useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { Delete, CheckCircle, Cancel } from '@material-ui/icons';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useMutation, useQueryClient } from 'react-query';

const performMutation = async (id) => {
  const response = await fetch(`/api/travelrecords/${id}`, {
    method: 'DELETE',
  });
  if (!response) {
    throw new Error('Network Error while performing mutation');
  }
  return response.json();
}

const RecordDelete = ({ handleMenuClose, record: { _id, userid } }) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError } = useMutation(performMutation, {
    onSuccess: () => {
      handleClose();
      queryClient.refetchQueries(userid);
    }
  });

  const [open, setOpen] = useState(false);
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    handleMenuClose()
    setOpen(false);
  };

  const handleDelete = async () => {
    mutate(_id);
  }

  return (
    <Fragment>
      <MenuItem onClick={handleOpen}>
        <Delete fontSize="large" color="secondary" />
      </MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        {isLoading && (<LinearProgress />)}
        {isError && <Typography variant="h5" color="error" >Error deleting record</Typography>}
        <DialogActions>
          <ButtonGroup>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDelete}
              startIcon={<CheckCircle />}
              disabled={isLoading}
            >
              Delete
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
      </Dialog>
    </Fragment>
  );
}

export default RecordDelete;