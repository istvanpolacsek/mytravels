import { memo } from 'react';
import Link from 'next/Link';
import { AppBar, Container, Typography } from '@mui/material';

import DarkModeSwitch from 'components/Navigation/DarkModeSwitch';
import DesktopNavigation from 'components/Navigation/DesktopNavigation';
import MobileNavigation from 'components/Navigation/MobileNavigation';
import { ToolbarStyled } from 'components/Navigation/styled';

function Navigation({ isMobile }) {
  return (
    <>
      <AppBar position="fixed" color="transparent">
        <Container disableGutters maxWidth="md">
          <ToolbarStyled>
            <Typography sx={{ flexGrow: 1 }} variant="h5">
              <Link href="/">My Travels</Link>
            </Typography>
            <DarkModeSwitch />
            {!isMobile && <DesktopNavigation />}
          </ToolbarStyled>
        </Container>
      </AppBar>
      <AppBar component="footer" position="fixed" color="transparent" sx={{ top: 'auto', bottom: 0 }}>
        {isMobile && <MobileNavigation />}
      </AppBar>
    </>
  );
}

export default memo(Navigation);
