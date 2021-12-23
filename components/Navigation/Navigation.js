import { memo } from 'react';
import Link from 'next/Link';
import { AppBar, Container, Typography } from '@mui/material';

import DarkModeSwitch from 'components/Navigation/DarkModeSwitch';
import { ToolbarStyled } from 'components/Navigation/styled';

function Navigation() {
  return (
    <AppBar position="fixed" color="transparent">
      <Container disableGutters maxWidth="md">
        <ToolbarStyled>
          <Typography sx={{ flexGrow: 1 }} variant="h5">
            <Link href="/">My Travels</Link>
          </Typography>
          <DarkModeSwitch />
        </ToolbarStyled>
      </Container>
    </AppBar>
  );
}

export default memo(Navigation);
