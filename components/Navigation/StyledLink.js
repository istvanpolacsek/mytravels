import { Link as MuiLink } from '@mui/material';
import ComposedLink from 'components/Navigation/ComposedLink';
import { forwardRef } from 'react';

function StyledLink(props, ref) {
  const { linkAs, href, ...rest } = props;

  return (
    <MuiLink
      ref={ref}
      linkAs={linkAs}
      to={href}
      component={ComposedLink}
      {...rest}
    />
  );
}

export default forwardRef(StyledLink);
