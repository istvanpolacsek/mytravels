import { useRouter } from 'next/router';
import { PROFILE, SIGN_IN } from 'components/ActiveDialog/constants';

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

  const toProfilePage = async(rest) => {
    await router.push({ pathname: '/', query: { dialog: PROFILE, ...rest } }, { shallow: true },
    );
  };

  return { toHomePage, toLoginPage, toProfilePage };
};

export default useRoutes;
