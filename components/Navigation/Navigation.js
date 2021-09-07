import { memo, useContext } from 'react';

import MobileNavigation from 'components/Navigation/MobileNavigation';
import DesktopNavigation from 'components/Navigation/DesktopNavigation';
import { StateContext } from 'components/ContextWrapper/ContextWrapper';

const Navigation = () => {
  const { isMobile } = useContext(StateContext);

  return isMobile ? <MobileNavigation /> : <DesktopNavigation />;
};

export default memo(Navigation);
