import { memo } from 'react';
import { useSelector } from 'react-redux';
import { map } from 'lodash';
import { IconButton } from '@mui/material';
import { RiAddCircleLine, RiBarChartLine } from 'react-icons/ri';

import { selectAuthIsLoading } from 'redux/slices/auth';
import useRoutes from 'hooks/useRoutes';
import useAvatar from 'hooks/useAvatar';

function DesktopNavigation() {
  const { component, props } = useAvatar();
  const isAuthDataLoading = useSelector(selectAuthIsLoading);
  const { toEditRecord, toStatsPage, toProfilePage } = useRoutes();

  const actions = [
    { onClick: toEditRecord, icon: RiAddCircleLine },
    { onClick: toStatsPage, icon: RiBarChartLine },
    { onClick: toProfilePage, icon: component, props, disabled: isAuthDataLoading },
  ];

  return (
    <>
      {map(actions, ({ icon: Icon, props, ...rest }, i) => (
        <IconButton key={i} {...rest}>
          <Icon {...props} />
        </IconButton>
      ))}
    </>
  );
}

export default memo(DesktopNavigation);
