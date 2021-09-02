import { useSession } from 'next-auth/client';
import useSWR from 'swr';

const useUserData = () => {
  const [session] = useSession();
  const url = '/api/travelrecords?' + new URLSearchParams({ userid: session?.user.id });

  const { data, error } = useSWR(() => url);

  return {
    url,
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useUserData;
