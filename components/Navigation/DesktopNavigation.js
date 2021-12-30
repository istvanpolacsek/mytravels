import { memo } from 'react';
import { map } from 'lodash';

import AvatarButton from 'components/Navigation/AvatarButton';
import ViewStatsButton from 'components/Navigation/ViewStatsButton';
import AddRecordButton from 'components/Navigation/AddRecordButton';

const actions = [AddRecordButton, ViewStatsButton, AvatarButton];

function DesktopNavigation() {
  return (
    <>
      {map(actions, (Action, i) => <Action key={i} />)}
    </>
  );
}

export default memo(DesktopNavigation);
