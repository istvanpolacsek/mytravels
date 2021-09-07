import { memo } from 'react';
import withAuth from 'components/hocs/withAuth';
import useRoutes from 'hooks/useRoutes';
import IconButtonWrapper from 'components/IconButtonWrapper/IconButtonWrapper';
import Equalizer from '@material-ui/icons/Equalizer';

const ToRecordStats = ({ isAuthLoading, ...props }) => {
  const { toRecordStats } = useRoutes();

  return (
    <IconButtonWrapper
      color="primary"
      title="Show Stats"
      onClick={toRecordStats}
      {...props}
    >
      <Equalizer fontSize="large" />
    </IconButtonWrapper>
  );
};

export default memo(withAuth(ToRecordStats));
