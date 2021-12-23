import { useRouter } from 'next/router';
import { SIGN_IN } from 'components/ActiveDialog/constants';

const useRoutes = () => {
  const router = useRouter();

  const toHomePage = async() => {
    await router.push({ pathname: '/' });
  };

  const toLoginPage = async(rest) => {
    await router.push(
      { pathname: '/auth', query: { dialog: SIGN_IN, ...rest } },
      '/',
      { shallow: true },
    );
  };

  return { toHomePage, toLoginPage };
};

export default useRoutes;
