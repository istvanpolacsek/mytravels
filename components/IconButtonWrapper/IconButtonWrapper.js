import { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import StateContext from 'utils/statecontext';

const IconButtonWrapper = ({ title, children, ...props }) => {
  const {
    state: { mobile },
  } = useContext(StateContext);

  return mobile ? (
    <IconButton {...props}>{children}</IconButton>
  ) : (
    <Tooltip title={title}>
      <IconButton {...props}>{children}</IconButton>
    </Tooltip>
  );
};

export default IconButtonWrapper;
