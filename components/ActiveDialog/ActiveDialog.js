import { forwardRef, useContext } from 'react';
import { useRouter } from 'next/router';
import Dialog from '@material-ui/core/Dialog';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';

import * as dialogs from 'components/ActiveDialog/index';
import useRoutes from 'hooks/useRoutes';
import { StateContext } from 'components/ContextWrapper/ContextWrapper';

const transitionProps = {
  mountOnEnter: true,
  unmountOnExit: true,
};

const Transition = forwardRef((props, ref) => {
  const { isMobile } = useContext(StateContext);

  return isMobile ? (
    <Slide direction="up" ref={ref} {...props} {...transitionProps} />
  ) : (
    <Fade ref={ref} {...props} {...transitionProps} />
  );
});

const ActiveDialog = () => {
  const { toHomePage } = useRoutes();
  const router = useRouter();
  const dialog = router.query?.dialogName;
  const maxWidth = router.query.dialogWidth ?? 'xs';

  const { isMobile } = useContext(StateContext);

  const Content = dialogs[dialog];

  return (
    <Dialog
      fullWidth
      maxWidth={maxWidth}
      open={!!dialog}
      fullScreen={isMobile}
      onClose={toHomePage}
      TransitionComponent={Transition}
    >
      {Content && <Content />}
    </Dialog>
  );
};

export default ActiveDialog;
