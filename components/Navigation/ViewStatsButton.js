import { memo } from 'react';
import { IconButton } from '@mui/material';
import { RiBarChartLine } from 'react-icons/ri';

function ViewStatsButton() {
  return (
    <IconButton>
      <RiBarChartLine />
    </IconButton>
  );
}

export default memo(ViewStatsButton);
