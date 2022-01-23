import { forwardRef } from 'react';
import Link from 'next/link';

function ComposedLink(props, ref) {
  const { to, linkAs, href, replace, scroll, shallow, prefetch, locale, ...rest } = props;

  return (
    <Link
      href={to}
      prefetch={prefetch}
      as={linkAs}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref
      locale={locale}
    >
      <a ref={ref} {...rest} />
    </Link>
  );
}

export default forwardRef(ComposedLink);
