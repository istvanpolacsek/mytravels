import { forwardRef, memo } from 'react';
import { useRouter } from 'next/router';
import { Dialog, Fade, SwipeableDrawer } from '@mui/material';

import * as contents from 'components/ActiveDialog/index';
import useRoutes from 'hooks/useRoutes';
import { selectIsMobile } from 'redux/slices/settings';
import { useSelector } from 'react-redux';

const transitionProps = { mountOnEnter: true, unmountOnExit: true };
const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

const TransitionComponent = forwardRef(({ children, ...rest }, ref) =>
  <Fade ref={ref} {...rest} {...transitionProps}>{children}</Fade>);

TransitionComponent.displayName = 'TransitionComponent';

function ActiveDialog() {
  const { query } = useRouter();
  const { toHomePage } = useRoutes();
  const isMobile = useSelector(selectIsMobile);

  const { dialog, width } = query;
  const Content = contents[dialog];
  const DialogComponent = [Dialog, SwipeableDrawer][+isMobile];
  const props = [
    { TransitionComponent, maxWidth: width || 'xs', fullWidth: true },
    { anchor: 'bottom', disableBackdropTransition: iOS, disableDiscovery: iOS, onOpen: () => {} },
  ][+isMobile];

  return <DialogComponent onClose={toHomePage} open={!!dialog} {...props}>
    {Content && <Content />}
  </DialogComponent>;
}

export default memo(ActiveDialog);
