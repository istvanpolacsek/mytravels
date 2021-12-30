import { useSelector } from 'react-redux';

import { selectIsGlobalLoading } from 'redux/slices/settings';
import { GlobalLoaderStyled } from 'components/GlobalLoader/styled';

function GlobalLoader() {
  const isLoading = useSelector(selectIsGlobalLoading);

  return isLoading ? <GlobalLoaderStyled color="secondary" /> : null;
}

export default GlobalLoader;
