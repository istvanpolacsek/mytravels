import { memo, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from '@mui/material';
import { RiMoonLine, RiSunLine } from 'react-icons/ri';

import { selectIsDarkModeActive, toggleColorMode } from 'redux/slices/settings';
import { DarkModeSwitchStyled } from 'components/Navigation/styled';

function DarkModeSwitch() {
  const dispatch = useDispatch();
  const checked = useSelector(selectIsDarkModeActive);

  const props = useMemo(() => ({
    color: 'default',
    checked,
    onChange: ({ target }) => dispatch(toggleColorMode({ darkMode: target.checked })),
  }), [checked]);

  return (
    <DarkModeSwitchStyled direction="row" alignItems="center">
      <RiSunLine />
      <Switch {...props} />
      <RiMoonLine />
    </DarkModeSwitchStyled>
  );
}

export default memo(DarkModeSwitch);
