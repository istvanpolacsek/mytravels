import { memo } from 'react';
import { IconButton } from '@mui/material';
import { RiBarChartLine } from 'react-icons/ri';

import useRoutes from 'hooks/useRoutes';

function ViewStatsButton() {
  const { toStatsPage } = useRoutes();

  return (
    <IconButton onClick={toStatsPage}>
      <RiBarChartLine />
    </IconButton>
  );
}

export default memo(ViewStatsButton);
