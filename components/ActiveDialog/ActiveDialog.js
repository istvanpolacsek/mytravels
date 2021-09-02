import { forwardRef, useContext } from 'react';
import { useRouter } from 'next/router';
import Dialog from '@material-ui/core/Dialog';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';

import * as dialogs from 'components/ActiveDialog/index';
import useRoutes from 'hooks/useRoutes';
import StateContext from 'utils/StateContext';

const transitionProps = {
  mountOnEnter: true,
  unmountOnExit: true,
};

const Transition = forwardRef((props, ref) => {
  const {
    state: { mobile },
  } = useContext(StateContext);

  return mobile ? (
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

  const {
    state: { mobile },
  } = useContext(StateContext);

  const Content = dialogs[dialog];

  return (
    <Dialog
      fullWidth
      maxWidth={maxWidth}
      open={!!dialog}
      fullScreen={mobile}
      onClose={toHomePage}
      TransitionComponent={Transition}
    >
      {Content && <Content />}
    </Dialog>
  );
};

export default ActiveDialog;
