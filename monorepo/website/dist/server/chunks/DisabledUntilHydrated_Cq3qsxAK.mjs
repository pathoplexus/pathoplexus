import { Children, cloneElement } from 'react';
import { u as useClientFlag } from './isClient_EhWp56WR.mjs';

const DisabledUntilHydrated = ({ children, alsoDisabledIf = false }) => {
  const isClient = useClientFlag();
  const child = Children.only(children);
  if (child.props.disabled !== void 0) {
    throw new Error(
      "DisabledUntilHydrated: child element should not set its own `disabled` prop—it will be overridden."
    );
  }
  return cloneElement(child, { disabled: !isClient || alsoDisabledIf });
};

export { DisabledUntilHydrated as D };
