import { Fragment } from 'react';
import { useField, useFormikContext } from 'formik';
import { map } from 'lodash';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { TravelTypes } from 'utils/TravelTypes';

const FormikTypePicker = (props) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  const handleChange = ({ target: { value } }) => {
    setFieldValue(field.name, value);
  };

  return (
    <Fragment>
      <TextField
        variant="outlined"
        fullWidth
        select
        value={field.value || ''}
        onChange={handleChange}
        {...props}
      >
        {map(TravelTypes, ({ key, value }) => (
          <MenuItem value={value} key={key}>
            <Typography variant="inherit">{value}</Typography>
          </MenuItem>
        ))}
      </TextField>
    </Fragment>
  );
};

export default FormikTypePicker;
