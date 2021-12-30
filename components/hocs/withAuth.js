import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSession } from 'next-auth/react';

import { setUser } from 'redux/slices/auth';
import useRoutes from 'hooks/useRoutes';

function withAuth(WrappedComponent) {
  function WrapperComponent(props) {
    const dispatch = useDispatch();
    const { toLoginPage: onUnauthenticated } = useRoutes();
    const { data, status } = useSession({ required: true, onUnauthenticated });

    useEffect(() => {
      dispatch(setUser({ data: data?.user, loading: status === 'loading' }));
    }, [status]);

    return data ? <WrappedComponent {...props} /> : null;
  }

  return WrapperComponent;
}

export default withAuth;
