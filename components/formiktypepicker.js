import { Fragment } from 'react';
import { useField, useFormikContext } from 'formik';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { TravelTypes } from '../utils/traveltypes';

const FormikTypePicker = ({ label, error, disabled, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  const handleChange = (event) => {
    setFieldValue(field.name, event.target.value)
  }

  return (
    <Fragment>
      <TextField
        variant="outlined"
        fullWidth
        select
        label={label}
        error={error}
        value={field.value || ''}
        onChange={handleChange}
        disabled={disabled}
      >
        {TravelTypes.map(type => (
          <MenuItem value={type.displayName} key={type.type}>
            <Typography variant="inherit">
              {type.displayName}
            </Typography>
          </MenuItem>
        ))}
      </TextField>
    </Fragment>
  );
}

export default FormikTypePicker;