import { useField, useFormikContext } from 'formik';
import { DatePicker } from '@material-ui/pickers';

const FormikDatePicker = ({ label, error, disabled, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  const setDate = (value) => {
    const date = new Date(value);
    date.setUTCHours(0, 0, 0, 0);
    return date;
  }

  return (
    <DatePicker
      disableToolbar
      fullWidth
      variant="inline"
      inputVariant="outlined"
      autoOk
      label={label}
      error={error}
      format="MMMM dd, yyyy"
      value={(field.value && setDate(field.value)) || null}
      onChange={value => {
        setFieldValue(field.name, setDate(value));
      }}
      disabled={disabled}
    />
  );
}

export default FormikDatePicker;