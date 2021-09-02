import { memo } from 'react';
import { useRouter } from 'next/dist/client/router';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const AppTitle = () => {
  const router = useRouter();

  return (
    <Typography variant="h6" style={{ flexGrow: 1, paddingLeft: 10 }}>
      <span onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>
        My Travels
      </span>
    </Typography>
  );
};

export default memo(AppTitle);
