import * as yup from 'yup';

const RecordEditSchema = yup.object().shape({  
  traveldate: yup.date().required('Required'),
  traveltype: yup.string().required('Required').nullable(),
})

export default RecordEditSchema;