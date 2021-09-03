import {
  RECORD_DELETE,
  RECORD_FORM,
  RECORD_STATS,
  SIGN_IN,
} from 'components/ActiveDialog/constants';
import { useRouter } from 'next/router';

const useRoutes = () => {
  const router = useRouter();
  const pathname = '/';

  const toHomePage = () => {
    router.push({ pathname });
  };

  const toSignIn = () => {
    router.push({
      pathname,
      query: { dialogName: SIGN_IN },
    });
  };

  const toSignInPage = () => {
    router.push({
      pathname: '/signin',
    });
  };

  const toRecordForm = (recordid) => {
    router.push({
      pathname,
      query: {
        dialogName: RECORD_FORM,
        dialogWidth: 'sm',
        ...(recordid ? { recordid } : {}),
      },
    });
  };

  const toRecordDelete = (recordid) => {
    router.push({
      pathname,
      query: {
        dialogName: RECORD_DELETE,
        recordid,
      },
    });
  };

  const toRecordStats = () => {
    router.push({
      pathname,
      query: {
        dialogName: RECORD_STATS,
      },
    });
  };

  return {
    toHomePage,
    toRecordDelete,
    toRecordForm,
    toRecordStats,
    toSignIn,
    toSignInPage,
  };
};

export default useRoutes;
