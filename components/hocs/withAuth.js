import { useSession } from 'next-auth/client';

const withAuth = (WrappedComponent) => (props) => {
  const [session, loading] = useSession();

  return session
    ? <WrappedComponent
      user={session.user}
      isAuthLoading={loading}
      {...props}
    />
    : null;
};

export default withAuth;
