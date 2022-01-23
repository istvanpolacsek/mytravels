import { memo } from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Container, Toolbar, Typography } from '@mui/material';

import MobileNavigation from 'components/Navigation/MobileNavigation';
import TravelTypeFilter from 'components/TravelTypeFilter/TravelTypeFilter';
import DarkModeSwitch from 'components/Switches/DarkModeSwitch';
import DesktopNavigation from 'components/Navigation/DesktopNavigation';
import StyledLink from 'components/Navigation/StyledLink';
import { selectIsMobile } from 'redux/slices/settings';
import useRoutes from 'hooks/useRoutes';

function Navigation() {
  const isMobile = useSelector(selectIsMobile);
  const { homePageQuery } = useRoutes();

  return (
    <>
      <AppBar position="fixed" variant="blur" color="transparent">
        <Container disableGutters maxWidth="md">
          <Toolbar variant="extended">
            <Typography sx={{ flexGrow: 1 }} variant="h5">
              <StyledLink color="inherit" underline="none" to={homePageQuery} linkAs="/">My Travels</StyledLink>
            </Typography>
            <DarkModeSwitch />
            {!isMobile && <DesktopNavigation />}
          </Toolbar>
        </Container>
        <TravelTypeFilter />
      </AppBar>
      <AppBar component="footer" position="fixed" color="transparent" sx={{ top: 'auto', bottom: 0 }}>
        {isMobile && <MobileNavigation />}
      </AppBar>
    </>
  );
}

export default memo(Navigation);
