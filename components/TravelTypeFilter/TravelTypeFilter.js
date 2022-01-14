import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { map } from 'lodash';
import { Fade, ToggleButton, ToggleButtonGroup, Toolbar, useScrollTrigger } from '@mui/material';
import { CgInfinity } from 'react-icons/cg';

import { selectQuerySettings, setFilter } from 'redux/slices/records';
import { TRAVEL_TYPES } from 'lib/constants';

function TravelTypeFilter() {
  const dispatch = useDispatch();
  const trigger = useScrollTrigger();
  const { filter } = useSelector(selectQuerySettings);

  const handleFilterChange = (event, newFilter) => {
    dispatch(setFilter({ filter: newFilter }));
  };

  return (
    <Fade direction="down" in={!trigger}>
      <Toolbar variant="sticky">
        <ToggleButtonGroup exclusive value={filter} onChange={handleFilterChange}>
          <ToggleButton value="All">
            <CgInfinity />
          </ToggleButton>
          {map(TRAVEL_TYPES, ({ key, activeIcon: ActiveIcon, passiveIcon: PassiveIcon }) => (
            <ToggleButton value={key} key={key}>
              {filter === key ? <ActiveIcon /> : <PassiveIcon />}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Toolbar>
    </Fade>
  );
}

export default memo(TravelTypeFilter);
