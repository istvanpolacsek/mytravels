import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { map } from 'lodash';
import { Container, Slide, ToggleButton, ToggleButtonGroup, useScrollTrigger } from '@mui/material';
import { CgInfinity } from 'react-icons/cg';

import { selectFilter, setFilter } from 'redux/slices/records';
import { TRAVEL_TYPES } from 'lib/constants';
import { CenteredToolbarStyled, TravelTypeFilterStyled } from 'components/TravelTypeFilter/styled';

function TravelTypeFilter() {
  const dispatch = useDispatch();
  const trigger = useScrollTrigger();
  const filter = useSelector(selectFilter);

  const handleFilterChange = (event, newFilter) => {
    dispatch(setFilter({ filter: newFilter }));
  };

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <TravelTypeFilterStyled component="div" color="transparent">
        <Container>
          <CenteredToolbarStyled>
            <ToggleButtonGroup exclusive value={filter} onChange={handleFilterChange}>
              <ToggleButton value="all">
                <CgInfinity />
              </ToggleButton>
              {map(TRAVEL_TYPES, ({ key, activeIcon: ActiveIcon, passiveIcon: PassiveIcon }) => (
                <ToggleButton value={key} key={key}>
                  {filter === key ? <ActiveIcon /> : <PassiveIcon />}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </CenteredToolbarStyled>
        </Container>
      </TravelTypeFilterStyled>
    </Slide>
  );
}

export default memo(TravelTypeFilter);
