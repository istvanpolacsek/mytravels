import { Dialog, Fade, SwipeableDrawer } from '@mui/material';
import { useRouter } from 'next/router';

import * as contents from 'components/ActiveDialog/index';
import { forwardRef } from 'react';
import useRoutes from 'hooks/useRoutes';

const transitionProps = { mountOnEnter: true, unmountOnExit: true };
const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

const TransitionComponent = forwardRef((props, ref) =>
  <Fade ref={ref} {...props} {...transitionProps} />);

function ActiveDialog() {
  const { query, width } = useRouter();
  const { toHomePage } = useRoutes();

  if (typeof navigator !== 'object') {
    return null;
  }

  const { dialog } = query;
  const Content = contents[dialog];
  const i = +!!navigator.maxTouchPoints;
  const DialogComponent = [Dialog, SwipeableDrawer][i];
  const props = [
    { TransitionComponent, maxWidth: width || 'xs', fullWidth: true },
    { anchor: 'bottom', disableBackdropTransition: iOS, disableDiscovery: iOS, onOpen: () => {} },
  ][i];

  return <DialogComponent onClose={toHomePage} open={!!dialog} {...props}>
    {Content && <Content />}
  </DialogComponent>;
}


export default ActiveDialog;
