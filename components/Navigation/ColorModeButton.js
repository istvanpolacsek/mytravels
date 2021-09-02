import { memo, useContext } from 'react';
import Brightness3 from '@material-ui/icons/Brightness3';
import WbSunny from '@material-ui/icons/WbSunny';

import IconButtonWrapper from 'components/IconButtonWrapper/IconButtonWrapper';
import StateContext from 'utils/StateContext';

const ColorModeButton = (props) => {
  const { state, setState } = useContext(StateContext);

  const handleThemeChange = () => {
    localStorage.setItem('darkState', state.darkState ? 'off' : 'on');
    setState({ ...state, darkState: !state.darkState });
  };

  return (
    <IconButtonWrapper
      title="Toogle Dark Mode"
      onClick={handleThemeChange}
      color="primary"
    >
      {state.darkState ? <WbSunny {...props} /> : <Brightness3 {...props} />}
    </IconButtonWrapper>
  );
};

export default memo(ColorModeButton);
