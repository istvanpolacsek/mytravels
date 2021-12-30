import { useRouter } from 'next/router';

import { DELETE_RECORD, EDIT_RECORD, PROFILE, SIGN_IN } from 'components/ActiveDialog/constants';

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
    await router.push({ pathname: '/', query: { dialog: PROFILE, ...rest } }, '/', { shallow: true },
    );
  };

  const toEditRecord = async(rest) => {
    await router.push({ pathname: '/', query: { dialog: EDIT_RECORD, width: 'sm', ...rest } }, '/', { shallow: true });
  };

  const toDeleteRecord = async(rest) => {
    await router.push({ pathname: '/', query: { dialog: DELETE_RECORD, ...rest } }, '/', { shallow: true });
  };

  return { toHomePage, toLoginPage, toProfilePage, toEditRecord, toDeleteRecord };
};

export default useRoutes;
