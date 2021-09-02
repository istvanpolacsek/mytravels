import { memo, useContext } from 'react';

import MobileNavigation from 'components/Navigation/MobileNavigation';
import DesktopNavigation from 'components/Navigation/DesktopNavigation';
import StateContext from 'utils/StateContext';

const Navigation = () => {
  const { state } = useContext(StateContext);

  return state.mobile ? <MobileNavigation /> : <DesktopNavigation />;
};

export default memo(Navigation);
