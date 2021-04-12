import * as yup from 'yup';

const RecordNewSchema = yup.object().shape({
  userid: yup.string(),
  traveldate: yup.date().required('Required'),
  traveltype: yup.string().required('Required').nullable(),
  departureid: yup.string().required('Required').nullable(),
  arrivalid: yup.string().required('Required').nullable()
})

export default RecordNewSchema;