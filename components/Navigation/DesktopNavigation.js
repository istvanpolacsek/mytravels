import { memo } from 'react';
import { IconButton } from '@mui/material';
import { RiAddCircleLine, RiBarChartLine } from 'react-icons/ri';

import AvatarButton from 'components/Navigation/AvatarButton';

function DesktopNavigation() {
  return (
    <>
      <IconButton><RiAddCircleLine /></IconButton>
      <IconButton><RiBarChartLine /></IconButton>
      <AvatarButton />
    </>
  );
}

export default memo(DesktopNavigation);
