import { useEffect, useState } from 'react';
import { isEmpty, map } from 'lodash';
import { useField, useFormikContext } from 'formik';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';

import usePlacesPrediction from 'hooks/usePlacesPrediction';

const FormikPlacesAutocomplete = (props) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  const { name } = field;
  const { fetchPlacesPredictions } = usePlacesPrediction();

  const [input, setInput] = useState('');
  const [value, setValue] = useState({});
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetchPlacesPredictions({ input, types: ['(cities)'] }, (results) => {
      const options = map(
        results,
        ({
          place_id,
          structured_formatting: { main_text, secondary_text },
        }) => {
          return { place_id, main_text, secondary_text };
        },
      );
      setOptions([...(value ? [value] : []), ...options]);
    });
  }, [input, value, fetchPlacesPredictions]);

  useEffect(() => {
    if (!isEmpty(value)) {
      setFieldValue(name, value.place_id);
    }
  }, [value, name, setFieldValue]);

  return (
    <Autocomplete
      autoComplete
      includeInputInList
      filterSelectedOptions
      renderInput={(params) => (
        <TextField {...params} fullWidth variant="outlined" {...props} />
      )}
      value={value || null}
      options={options}
      getOptionLabel={({ main_text }) => (main_text ? main_text : '')}
      onChange={(event, value) => {
        setValue(value);
      }}
      onInputChange={(event, value) => setInput(value)}
      renderOption={({ main_text, secondary_text }) => {
        return (
          <Grid container alignItems="center">
            <Grid item xs>
              {main_text}
              <Typography variant="body2" color="textSecondary">
                {secondary_text}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
};

export default FormikPlacesAutocomplete;
