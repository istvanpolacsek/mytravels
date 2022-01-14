import { memo } from 'react';
import { map } from 'lodash';
import { BottomNavigation, BottomNavigationAction, SvgIcon } from '@mui/material';
import { RiAddCircleLine, RiBarChartLine } from 'react-icons/ri';

import ComposedLink from 'components/Navigation/ComposedLink';
import useRoutes from 'hooks/useRoutes';
import useAvatar from 'hooks/useAvatar';

function MobileNavigation() {
  const { statsPageQuery, editRecordQuery, profileQuery } = useRoutes();
  const { component: Avatar, props } = useAvatar();

  const actions = [
    { icon: <SvgIcon><RiBarChartLine /></SvgIcon>, to: statsPageQuery },
    { icon: <SvgIcon><RiAddCircleLine /></SvgIcon>, to: editRecordQuery },
    { icon: <Avatar {...props} />, to: profileQuery },
  ];

  return (
    <BottomNavigation>
      {map(actions, (props, i) => (
        <BottomNavigationAction key={i} component={ComposedLink} linkAs="/" shallow={true} {...props} />))}
    </BottomNavigation>
  );
}

export default memo(MobileNavigation);
