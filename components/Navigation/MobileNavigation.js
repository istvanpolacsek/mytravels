import { memo } from 'react';
import { useSelector } from 'react-redux';
import { map } from 'lodash';
import { BottomNavigation, BottomNavigationAction, SvgIcon } from '@mui/material';
import { RiAddCircleLine, RiBarChartLine } from 'react-icons/ri';

import ComposedLink from 'components/Navigation/ComposedLink';
import { selectShowLabels } from 'redux/slices/settings';
import useRoutes from 'hooks/useRoutes';
import useAvatar from 'hooks/useAvatar';

function MobileNavigation() {
  const showLabels = useSelector(selectShowLabels);
  const { statsPageQuery, editRecordQuery, profileQuery } = useRoutes();
  const { component: Avatar, props } = useAvatar();

  const actions = [
    { icon: <SvgIcon><RiBarChartLine /></SvgIcon>, to: statsPageQuery, label: 'Stats' },
    { icon: <SvgIcon><RiAddCircleLine /></SvgIcon>, to: editRecordQuery, label: 'New Travel' },
    { icon: <Avatar {...props} />, to: profileQuery, label: 'Settings' },
  ];

  return (
    <BottomNavigation showLabels={showLabels}>
      {map(actions, (props, i) => (
        <BottomNavigationAction key={i} component={ComposedLink} linkAs="/" shallow={true} {...props} />))}
    </BottomNavigation>
  );
}

export default memo(MobileNavigation);
