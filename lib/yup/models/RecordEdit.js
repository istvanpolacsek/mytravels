import * as yup from 'yup';

import { TRAVEL_DATE, TRAVEL_TYPE } from 'lib/constants';

const RecordEditSchema = yup.object().shape({
  [TRAVEL_DATE]: yup.date().required('Required'),
  [TRAVEL_TYPE]: yup.string().required('Required').nullable(),
});

export default RecordEditSchema;
