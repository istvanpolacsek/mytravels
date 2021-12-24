import { memo } from 'react';
import { Container, IconButton } from '@mui/material';
import { RiAddCircleLine, RiBarChartLine } from 'react-icons/ri';

import AvatarButton from 'components/Navigation/AvatarButton';
import { MobileToolbar } from 'components/Navigation/styled';

function MobileNavigation() {
  return (
    <Container disableGutters maxWidth="sm">
      <MobileToolbar>
        <IconButton><RiBarChartLine /></IconButton>
        <IconButton><RiAddCircleLine /></IconButton>
        <AvatarButton />
      </MobileToolbar>
    </Container>
  );
}

export default memo(MobileNavigation);
