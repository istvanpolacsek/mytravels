import { memo } from 'react';
import { map } from 'lodash';
import { Container } from '@mui/material';

import AvatarButton from 'components/Navigation/AvatarButton';
import ViewStatsButton from 'components/Navigation/ViewStatsButton';
import AddRecordButton from 'components/Navigation/AddRecordButton';
import { MobileToolbar } from 'components/Navigation/styled';

const actions = [ViewStatsButton, AddRecordButton, AvatarButton];

function MobileNavigation() {
  return (
    <Container disableGutters maxWidth="sm">
      <MobileToolbar>
        {map(actions, (Action, i) => <Action key={i} />)}
      </MobileToolbar>
    </Container>
  );
}

export default memo(MobileNavigation);
