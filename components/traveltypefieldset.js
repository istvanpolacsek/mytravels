import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import { TravelTypes } from '../utils/traveltypes';
import { AllInclusive } from '@material-ui/icons'

const TraveTypeFieldset = ({ value, handleChange }) => {
  return (
    <Paper elevation={5} style={{ position: 'absolute', top: 'auto', bottom: 45, left: 60 }} >
      <Box m={1}>
        <FormControl>
          <RadioGroup value={value} onChange={handleChange} row >
            <FormControlLabel labelPlacement="top" value="All" control={<Radio color="primary" />} label={<AllInclusive color="secondary" />} />
            {TravelTypes.map((type) => (
              <FormControlLabel key={type.type} value={type.displayName} label={type.icon} labelPlacement="top" control={<Radio color="primary" />} />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>
    </Paper>
  );
}

export default TraveTypeFieldset;