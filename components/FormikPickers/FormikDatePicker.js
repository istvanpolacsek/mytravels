import { useField, useFormikContext } from 'formik';
import { DatePicker } from '@material-ui/pickers';

const FormikDatePicker = (props) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  const { name, value } = field;

  const setDate = (value) => {
    const date = new Date(value);
    date.setUTCHours(0, 0, 0, 0);
    setFieldValue(name, date);
  }

  return (
    <DatePicker
      disableToolbar
      fullWidth
      autoOk
      variant="inline"
      inputVariant="outlined"
      format="MMMM dd, yyyy"
      value={value || null}
      onChange={setDate}
      {...props}
    />
  );
}

export default FormikDatePicker;