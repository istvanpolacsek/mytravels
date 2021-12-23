import { useSession } from 'next-auth/react';
import withAuth from 'components/hocs/withAuth';

function Home() {
  return (
    <div>a</div>
  );
}

export default withAuth(Home);
