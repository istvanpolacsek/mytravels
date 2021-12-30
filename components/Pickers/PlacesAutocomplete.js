import { memo, useEffect, useMemo, useState } from 'react';
import { throttle } from 'lodash';
import { Autocomplete, TextField } from '@mui/material';

const autocompleteService = { current: null };

function PlacesAutocomplete({ value, onChange, label }) {
  const [selected, setSelected] = useState(null);
  const [input, setInput] = useState('');
  const [options, setOptions] = useState([]);

  const fetchOptions = useMemo(() => throttle((request, callback) => {
    autocompleteService.current.getPlacePredictions(request, callback);
  }, 500), []);

  const handleInputChange = (event, newInput) =>
    setInput(newInput);

  const handleValueChange = (event, newValue) => {
    setSelected(newValue);
    setOptions(newValue ? [newValue, ...options] : options);
    onChange(newValue?.place_id || '');
  };

  useEffect(() => {
    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }

    if (!autocompleteService.current) {
      return;
    }

    if (input === '') {
      setOptions(value ? [value] : []);
      return;
    }

    fetchOptions({ input, types: ['(cities)'] }, (results) => {
      setOptions(results ? [...(selected ? [selected] : []), ...results] : []);
    });
  }, [input, selected]);

  return (
    <Autocomplete
      autoComplete
      includeInputInList
      filterSelectedOptions
      size="small"
      renderInput={(params) => <TextField fullWidth label={label} {...params} />}
      options={options}
      onInputChange={handleInputChange}
      onChange={handleValueChange}
      getOptionLabel={({ description }) => description}
      filterOptions={(options) => options}
      renderOption={(props, { description }) => <li {...props}>{description}</li>}
    />
  );
}

export default memo(PlacesAutocomplete);
