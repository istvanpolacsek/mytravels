import { useRouter } from 'next/router';

import { DELETE_RECORD, EDIT_RECORD, PROFILE, SIGN_IN, STATS } from 'components/ActiveDialog/constants';
import { merge } from 'lodash';

export const pathname = '/';
const homePageQuery = { pathname };
const signInQuery = { pathname, query: { dialog: SIGN_IN } };
const profileQuery = { pathname, query: { dialog: PROFILE } };
const editRecordQuery = { pathname, query: { dialog: EDIT_RECORD, width: 'sm' } };
const deleteRecordQuery = { pathname, query: { dialog: DELETE_RECORD } };
const statsPageQuery = { pathname, query: { dialog: STATS } };

const useRoutes = () => {
  const router = useRouter();

  const toHomePage = () => router.push(homePageQuery);
  const toLoginPage = (query) => router.push(merge({ query }, signInQuery), '/', { shallow: true });
  const toProfilePage = (query) => router.push(merge({ query }, profileQuery), '/', { shallow: true });
  const toEditRecord = (query) => router.push(merge({ query }, editRecordQuery), '/', { shallow: true });
  const toDeleteRecord = (query) => router.push(merge({ query }, deleteRecordQuery), '/', { shallow: true });
  const toStatsPage = (query) => router.push(merge({ query }, statsPageQuery), '/', { shallow: true });

  return {
    homePageQuery,
    profileQuery,
    editRecordQuery,
    statsPageQuery,
    toHomePage,
    toLoginPage,
    toProfilePage,
    toEditRecord,
    toDeleteRecord,
    toStatsPage,
  };
};

export default useRoutes;
