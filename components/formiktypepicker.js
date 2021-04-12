import { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { useField, useFormikContext } from 'formik';
import { TravelTypes } from '../utils/traveltypes';

const values = [];

TravelTypes.map(option => {
  values.push(option.displayName);
});

const FormikTypePicker = ({ label, error, disabled, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  return (
    <Fragment>
      <Autocomplete
        options={values}
        value={field.value || null}
        disabled={disabled}
        onChange={(event, value) => {
          setFieldValue(field.name, value)
        }}
        renderOption={(value) => (
          <Fragment>
            <ListItemIcon>
              {TravelTypes[TravelTypes.findIndex(e => e.displayName === value)].icon}
            </ListItemIcon>
            <ListItemText primary={value} />
          </Fragment>
        )}
        renderInput={(params) => (
          <TextField 
            {...params}
            fullWidth
            variant="outlined"
            label={label} 
            error={!!error}
            placeholder="Plane..."
          />
        )

        }
      />
    </Fragment>
  );
}

export default FormikTypePicker;