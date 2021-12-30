import { memo } from 'react';
import { IconButton } from '@mui/material';
import { RiAddCircleLine } from 'react-icons/ri';

import useRoutes from 'hooks/useRoutes';

function AddRecordButton() {
  const { toEditRecord } = useRoutes();

  return (
    <IconButton onClick={toEditRecord}>
      <RiAddCircleLine />
    </IconButton>
  );
}

export default memo(AddRecordButton);
