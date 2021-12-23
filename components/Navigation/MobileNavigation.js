import { Container, IconButton } from '@mui/material';
import { RiAddCircleLine, RiBarChartLine } from 'react-icons/ri';

import AvatarButton from 'components/Navigation/AvatarButton';
import { MobileToolbar } from 'components/Navigation/styled';

function MobileNavigation() {
  return (
    <Container disableGutters>
      <MobileToolbar>
        <IconButton><RiBarChartLine /></IconButton>
        <IconButton><RiAddCircleLine /></IconButton>
        <AvatarButton />
      </MobileToolbar>
    </Container>
  );
}

export default MobileNavigation;
