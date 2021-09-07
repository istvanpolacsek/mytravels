import { memo, useContext } from 'react';
import Brightness3 from '@material-ui/icons/Brightness3';
import WbSunny from '@material-ui/icons/WbSunny';

import IconButtonWrapper from 'components/IconButtonWrapper/IconButtonWrapper';
import { DispatchContext, StateContext } from 'components/ContextWrapper/ContextWrapper';
import { TOGGLE_DARK_MODE } from 'utils/constants';

const ColorModeButton = (props) => {
  const { isDarkMode } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  return (
    <IconButtonWrapper
      title="Toggle Dark Mode"
      onClick={() => dispatch({ type: TOGGLE_DARK_MODE })}
      color="primary"
      {...props}
    >
      {isDarkMode ? <WbSunny fontSize="large" /> : <Brightness3 fontSize="large"/>}
    </IconButtonWrapper>
  );
};

export default memo(ColorModeButton);
