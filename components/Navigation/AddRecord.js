import { memo } from 'react';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';

import withAuth from 'components/hocs/withAuth';
import useRoutes from 'hooks/useRoutes';

const AddRecord = ({ style }) => {
  const { toRecordForm } = useRoutes();

  return <Fab
    color="secondary"
    style={style}
    onClick={() => toRecordForm()}
  >
    <Add fontSize="large" />
  </Fab>;
};

export default memo(withAuth(AddRecord));
