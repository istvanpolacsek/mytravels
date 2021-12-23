import { useSession } from 'next-auth/react';
import useRoutes from 'hooks/useRoutes';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from 'redux/slices/auth';

const withAuth = (WrappedComponent) => (props) => {
  const dispatch = useDispatch();
  const { toLoginPage: onUnauthenticated } = useRoutes();
  const { data, status } = useSession({ required: true, onUnauthenticated });

  useEffect(() => {
    dispatch(setUser({ data: data?.user, loading: status === 'loading' }));
  }, [status]);

  return data ? <WrappedComponent {...props} /> : null;
};

export default withAuth;
