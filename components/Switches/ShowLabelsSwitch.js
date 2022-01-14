import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from '@mui/material';

import { selectShowLabels, toggleShowLabels } from 'redux/slices/settings';

function ShowLabelsSwitch() {
  const dispatch = useDispatch();
  const checked = useSelector(selectShowLabels);

  const handleChange = ({ target }) => dispatch(toggleShowLabels({ showLabels: target.checked }));

  return <Switch color="default" checked={checked} onChange={handleChange} />;
}

export default memo(ShowLabelsSwitch);
