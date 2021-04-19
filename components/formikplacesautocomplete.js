import { useMemo, useEffect, useState, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import throttle from 'lodash/throttle';
import { useField, useFormikContext } from 'formik';

const autocompleteService = { current: null };

const FormikPlacesAutocomplete = ({ label, error, disabled, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [values, setValues] = useState([]);
  const loaded = useRef(false);

  if (typeof window !== 'undefined' && !loaded.current) {
    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('id', 'google-maps');
    script.src = process.env.NEXT_PUBLIC_MAPS_SRC;
    if (!document.querySelector('#google-maps')) {
      document.querySelector('head').appendChild(script);
    }
    loaded.current = true;
  }

  const fetchPlacePredictions = useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 500),
    [],
  );

  useEffect(() => {
    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }

    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setValues(field.value ? [field.value] : []);
      return undefined;
    }

    fetchPlacePredictions({ input: inputValue, types: ['(cities)'] }, (results) => {
      let newOptions = [];
      let newValues = [field.value];

      if (field.value) {
        newValues = [field.value];
      }

      if (results) {
        newOptions = [...newOptions, ...results];
        newOptions.map(option => {
          newValues.push(option.place_id);
        })
      }

      setOptions(newOptions);
      setValues(newValues);
    });

  }, [field.value, inputValue, fetchPlacePredictions]);

  return (
    <Autocomplete
      options={values}
      value={field.value || null}
      getOptionLabel={(value) => (options[options.findIndex(e => e.place_id === value)]
        ? options[options.findIndex(e => e.place_id === value)].structured_formatting.main_text
        : '')}
      filterSelectedOptions
      disabled={disabled}
      onChange={(event, value) => {
        setValues([value]);
        setFieldValue(field.name, value);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          variant="outlined"
          label={error ? `${label} | ${error}` : label}
          error={!!error}
          placeholder="Budapest..."
        />
      )}
      renderOption={(value) => {
        return (
          <Grid container alignItems="center">
            {options[options.findIndex(e => e.place_id === value)] && (
              <Grid item xs>
                {options[options.findIndex(e => e.place_id === value)].structured_formatting.main_text}
                <Typography variant="body2" color="textSecondary">
                  {options[options.findIndex(e => e.place_id === value)].structured_formatting.secondary_text}
                </Typography>
              </Grid>
            )}
          </Grid>
        );
      }}
    />
  );
}

export default FormikPlacesAutocomplete;