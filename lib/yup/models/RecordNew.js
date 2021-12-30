import * as yup from 'yup';

import { ARRIVAL_ID, DEPARTURE_ID, TRAVEL_DATE, TRAVEL_TYPE } from 'lib/constants';

const RecordNewSchema = yup.object().shape({
  [TRAVEL_DATE]: yup.date().required('Required'),
  [TRAVEL_TYPE]: yup.string().required('Required').nullable(),
  [DEPARTURE_ID]: yup.string().required('Required').nullable(),
  [ARRIVAL_ID]: yup.string().required('Required').nullable(),
});

export default RecordNewSchema;
