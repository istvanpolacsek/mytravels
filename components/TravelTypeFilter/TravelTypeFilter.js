import { memo, useContext } from 'react';
import { map } from 'lodash';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import AllInclusive from '@material-ui/icons/AllInclusive';

import { TravelTypes } from 'utils/TravelTypes';
import StateContext from 'utils/StateContext';

const TraveTypeFilter = ({ value, handleChange }) => {
  const {
    state: { mobile },
  } = useContext(StateContext);

  const FilterControl = () => {
    return (
      <FormControl>
        <RadioGroup row value={value} onChange={handleChange}>
          <FormControlLabel
            labelPlacement="top"
            value=""
            control={<Radio color="primary" />}
            label={<AllInclusive color="secondary" />}
          />
          {map(TravelTypes, (props) => (
            <FormControlLabel
              {...props}
              labelPlacement="top"
              control={<Radio color="primary" />}
            />
          ))}
        </RadioGroup>
      </FormControl>
    );
  };

  return mobile ? (
    <FilterControl />
  ) : (
    <AppBar fixed="true" style={{ top: 'auto', bottom: 0 }}>
      <Paper
        elevation={5}
        style={{ position: 'absolute', top: 'auto', bottom: 45, left: 60 }}
      >
        <Box m={1}>
          <FilterControl />
        </Box>
      </Paper>
    </AppBar>
  );
};

export default memo(TraveTypeFilter);
