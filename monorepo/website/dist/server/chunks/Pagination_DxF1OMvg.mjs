import { _ as _objectWithoutPropertiesLoose, a as _extends, u as useThemeProps, s as styled, b as useTheme, B as ButtonBase } from './useTheme_CIvg4FAM.mjs';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_generateUtilityClass, unstable_generateUtilityClasses, unstable_useControlled, unstable_capitalize, unstable_composeClasses, integerPropType } from '@mui/utils';
import { jsxs, jsx } from 'react/jsx-runtime';
import { alpha } from '@mui/system';

function getPaginationUtilityClass(slot) {
  return unstable_generateUtilityClass('MuiPagination', slot);
}
unstable_generateUtilityClasses('MuiPagination', ['root', 'ul', 'outlined', 'text']);

const _excluded$3 = ["boundaryCount", "componentName", "count", "defaultPage", "disabled", "hideNextButton", "hidePrevButton", "onChange", "page", "showFirstButton", "showLastButton", "siblingCount"];
function usePagination(props = {}) {
  // keep default values in sync with @default tags in Pagination.propTypes
  const {
      boundaryCount = 1,
      componentName = 'usePagination',
      count = 1,
      defaultPage = 1,
      disabled = false,
      hideNextButton = false,
      hidePrevButton = false,
      onChange: handleChange,
      page: pageProp,
      showFirstButton = false,
      showLastButton = false,
      siblingCount = 1
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded$3);
  const [page, setPageState] = unstable_useControlled({
    controlled: pageProp,
    default: defaultPage,
    name: componentName,
    state: 'page'
  });
  const handleClick = (event, value) => {
    if (!pageProp) {
      setPageState(value);
    }
    if (handleChange) {
      handleChange(event, value);
    }
  };

  // https://dev.to/namirsab/comment/2050
  const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({
      length
    }, (_, i) => start + i);
  };
  const startPages = range(1, Math.min(boundaryCount, count));
  const endPages = range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count);
  const siblingsStart = Math.max(Math.min(
  // Natural start
  page - siblingCount,
  // Lower boundary when page is high
  count - boundaryCount - siblingCount * 2 - 1),
  // Greater than startPages
  boundaryCount + 2);
  const siblingsEnd = Math.min(Math.max(
  // Natural end
  page + siblingCount,
  // Upper boundary when page is low
  boundaryCount + siblingCount * 2 + 2),
  // Less than endPages
  endPages.length > 0 ? endPages[0] - 2 : count - 1);

  // Basic list of items to render
  // e.g. itemList = ['first', 'previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next', 'last']
  const itemList = [...(showFirstButton ? ['first'] : []), ...(hidePrevButton ? [] : ['previous']), ...startPages,
  // Start ellipsis
  // eslint-disable-next-line no-nested-ternary
  ...(siblingsStart > boundaryCount + 2 ? ['start-ellipsis'] : boundaryCount + 1 < count - boundaryCount ? [boundaryCount + 1] : []),
  // Sibling pages
  ...range(siblingsStart, siblingsEnd),
  // End ellipsis
  // eslint-disable-next-line no-nested-ternary
  ...(siblingsEnd < count - boundaryCount - 1 ? ['end-ellipsis'] : count - boundaryCount > boundaryCount ? [count - boundaryCount] : []), ...endPages, ...(hideNextButton ? [] : ['next']), ...(showLastButton ? ['last'] : [])];

  // Map the button type to its page number
  const buttonPage = type => {
    switch (type) {
      case 'first':
        return 1;
      case 'previous':
        return page - 1;
      case 'next':
        return page + 1;
      case 'last':
        return count;
      default:
        return null;
    }
  };

  // Convert the basic item list to PaginationItem props objects
  const items = itemList.map(item => {
    return typeof item === 'number' ? {
      onClick: event => {
        handleClick(event, item);
      },
      type: 'page',
      page: item,
      selected: item === page,
      disabled,
      'aria-current': item === page ? 'true' : undefined
    } : {
      onClick: event => {
        handleClick(event, buttonPage(item));
      },
      type: item,
      page: buttonPage(item),
      selected: false,
      disabled: disabled || item.indexOf('ellipsis') === -1 && (item === 'next' || item === 'last' ? page >= count : page <= 1)
    };
  });
  return _extends({
    items
  }, other);
}

function getPaginationItemUtilityClass(slot) {
  return unstable_generateUtilityClass('MuiPaginationItem', slot);
}
const paginationItemClasses = unstable_generateUtilityClasses('MuiPaginationItem', ['root', 'page', 'sizeSmall', 'sizeLarge', 'text', 'textPrimary', 'textSecondary', 'outlined', 'outlinedPrimary', 'outlinedSecondary', 'rounded', 'ellipsis', 'firstLast', 'previousNext', 'focusVisible', 'disabled', 'selected', 'icon']);

function getSvgIconUtilityClass(slot) {
  return unstable_generateUtilityClass('MuiSvgIcon', slot);
}
unstable_generateUtilityClasses('MuiSvgIcon', ['root', 'colorPrimary', 'colorSecondary', 'colorAction', 'colorError', 'colorDisabled', 'fontSizeInherit', 'fontSizeSmall', 'fontSizeMedium', 'fontSizeLarge']);

const _excluded$2 = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"];
const useUtilityClasses$2 = ownerState => {
  const {
    color,
    fontSize,
    classes
  } = ownerState;
  const slots = {
    root: ['root', color !== 'inherit' && `color${unstable_capitalize(color)}`, `fontSize${unstable_capitalize(fontSize)}`]
  };
  return unstable_composeClasses(slots, getSvgIconUtilityClass, classes);
};
const SvgIconRoot = styled('svg', {
  name: 'MuiSvgIcon',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.color !== 'inherit' && styles[`color${unstable_capitalize(ownerState.color)}`], styles[`fontSize${unstable_capitalize(ownerState.fontSize)}`]];
  }
})(({
  theme,
  ownerState
}) => {
  var _theme$transitions, _theme$transitions$cr, _theme$transitions2, _theme$typography, _theme$typography$pxT, _theme$typography2, _theme$typography2$px, _theme$typography3, _theme$typography3$px, _palette$ownerState$c, _palette, _palette2, _palette3;
  return {
    userSelect: 'none',
    width: '1em',
    height: '1em',
    display: 'inline-block',
    // the <svg> will define the property that has `currentColor`
    // e.g. heroicons uses fill="none" and stroke="currentColor"
    fill: ownerState.hasSvgAsChild ? undefined : 'currentColor',
    flexShrink: 0,
    transition: (_theme$transitions = theme.transitions) == null || (_theme$transitions$cr = _theme$transitions.create) == null ? void 0 : _theme$transitions$cr.call(_theme$transitions, 'fill', {
      duration: (_theme$transitions2 = theme.transitions) == null || (_theme$transitions2 = _theme$transitions2.duration) == null ? void 0 : _theme$transitions2.shorter
    }),
    fontSize: {
      inherit: 'inherit',
      small: ((_theme$typography = theme.typography) == null || (_theme$typography$pxT = _theme$typography.pxToRem) == null ? void 0 : _theme$typography$pxT.call(_theme$typography, 20)) || '1.25rem',
      medium: ((_theme$typography2 = theme.typography) == null || (_theme$typography2$px = _theme$typography2.pxToRem) == null ? void 0 : _theme$typography2$px.call(_theme$typography2, 24)) || '1.5rem',
      large: ((_theme$typography3 = theme.typography) == null || (_theme$typography3$px = _theme$typography3.pxToRem) == null ? void 0 : _theme$typography3$px.call(_theme$typography3, 35)) || '2.1875rem'
    }[ownerState.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (_palette$ownerState$c = (_palette = (theme.vars || theme).palette) == null || (_palette = _palette[ownerState.color]) == null ? void 0 : _palette.main) != null ? _palette$ownerState$c : {
      action: (_palette2 = (theme.vars || theme).palette) == null || (_palette2 = _palette2.action) == null ? void 0 : _palette2.active,
      disabled: (_palette3 = (theme.vars || theme).palette) == null || (_palette3 = _palette3.action) == null ? void 0 : _palette3.disabled,
      inherit: undefined
    }[ownerState.color]
  };
});
const SvgIcon = /*#__PURE__*/React.forwardRef(function SvgIcon(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiSvgIcon'
  });
  const {
      children,
      className,
      color = 'inherit',
      component = 'svg',
      fontSize = 'medium',
      htmlColor,
      inheritViewBox = false,
      titleAccess,
      viewBox = '0 0 24 24'
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded$2);
  const hasSvgAsChild = /*#__PURE__*/React.isValidElement(children) && children.type === 'svg';
  const ownerState = _extends({}, props, {
    color,
    component,
    fontSize,
    instanceFontSize: inProps.fontSize,
    inheritViewBox,
    viewBox,
    hasSvgAsChild
  });
  const more = {};
  if (!inheritViewBox) {
    more.viewBox = viewBox;
  }
  const classes = useUtilityClasses$2(ownerState);
  return /*#__PURE__*/jsxs(SvgIconRoot, _extends({
    as: component,
    className: clsx(classes.root, className),
    focusable: "false",
    color: htmlColor,
    "aria-hidden": titleAccess ? undefined : true,
    role: titleAccess ? 'img' : undefined,
    ref: ref
  }, more, other, hasSvgAsChild && children.props, {
    ownerState: ownerState,
    children: [hasSvgAsChild ? children.props.children : children, titleAccess ? /*#__PURE__*/jsx("title", {
      children: titleAccess
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" ? SvgIcon.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Node passed into the SVG element.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['inherit', 'action', 'disabled', 'primary', 'secondary', 'error', 'info', 'success', 'warning']), PropTypes.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['inherit', 'large', 'medium', 'small']), PropTypes.string]),
  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: PropTypes.string,
  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: PropTypes.bool,
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: PropTypes.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: PropTypes.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: PropTypes.string
} : void 0;
SvgIcon.muiName = 'SvgIcon';

function createSvgIcon(path, displayName) {
  function Component(props, ref) {
    return /*#__PURE__*/jsx(SvgIcon, _extends({
      "data-testid": `${displayName}Icon`,
      ref: ref
    }, props, {
      children: path
    }));
  }
  if (process.env.NODE_ENV !== 'production') {
    // Need to set `displayName` on the inner component for React.memo.
    // React prior to 16.14 ignores `displayName` on the wrapper.
    Component.displayName = `${displayName}Icon`;
  }
  Component.muiName = SvgIcon.muiName;
  return /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(Component));
}

const FirstPageIcon = createSvgIcon( /*#__PURE__*/jsx("path", {
  d: "M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"
}), 'FirstPage');

const LastPageIcon = createSvgIcon( /*#__PURE__*/jsx("path", {
  d: "M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"
}), 'LastPage');

const NavigateBeforeIcon = createSvgIcon( /*#__PURE__*/jsx("path", {
  d: "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
}), 'NavigateBefore');

const NavigateNextIcon = createSvgIcon( /*#__PURE__*/jsx("path", {
  d: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
}), 'NavigateNext');

const _excluded$1 = ["className", "color", "component", "components", "disabled", "page", "selected", "shape", "size", "slots", "type", "variant"];
const overridesResolver = (props, styles) => {
  const {
    ownerState
  } = props;
  return [styles.root, styles[ownerState.variant], styles[`size${unstable_capitalize(ownerState.size)}`], ownerState.variant === 'text' && styles[`text${unstable_capitalize(ownerState.color)}`], ownerState.variant === 'outlined' && styles[`outlined${unstable_capitalize(ownerState.color)}`], ownerState.shape === 'rounded' && styles.rounded, ownerState.type === 'page' && styles.page, (ownerState.type === 'start-ellipsis' || ownerState.type === 'end-ellipsis') && styles.ellipsis, (ownerState.type === 'previous' || ownerState.type === 'next') && styles.previousNext, (ownerState.type === 'first' || ownerState.type === 'last') && styles.firstLast];
};
const useUtilityClasses$1 = ownerState => {
  const {
    classes,
    color,
    disabled,
    selected,
    size,
    shape,
    type,
    variant
  } = ownerState;
  const slots = {
    root: ['root', `size${unstable_capitalize(size)}`, variant, shape, color !== 'standard' && `${variant}${unstable_capitalize(color)}`, disabled && 'disabled', selected && 'selected', {
      page: 'page',
      first: 'firstLast',
      last: 'firstLast',
      'start-ellipsis': 'ellipsis',
      'end-ellipsis': 'ellipsis',
      previous: 'previousNext',
      next: 'previousNext'
    }[type]],
    icon: ['icon']
  };
  return unstable_composeClasses(slots, getPaginationItemUtilityClass, classes);
};
const PaginationItemEllipsis = styled('div', {
  name: 'MuiPaginationItem',
  slot: 'Root',
  overridesResolver
})(({
  theme,
  ownerState
}) => _extends({}, theme.typography.body2, {
  borderRadius: 32 / 2,
  textAlign: 'center',
  boxSizing: 'border-box',
  minWidth: 32,
  padding: '0 6px',
  margin: '0 3px',
  color: (theme.vars || theme).palette.text.primary,
  height: 'auto',
  [`&.${paginationItemClasses.disabled}`]: {
    opacity: (theme.vars || theme).palette.action.disabledOpacity
  }
}, ownerState.size === 'small' && {
  minWidth: 26,
  borderRadius: 26 / 2,
  margin: '0 1px',
  padding: '0 4px'
}, ownerState.size === 'large' && {
  minWidth: 40,
  borderRadius: 40 / 2,
  padding: '0 10px',
  fontSize: theme.typography.pxToRem(15)
}));
const PaginationItemPage = styled(ButtonBase, {
  name: 'MuiPaginationItem',
  slot: 'Root',
  overridesResolver
})(({
  theme,
  ownerState
}) => _extends({}, theme.typography.body2, {
  borderRadius: 32 / 2,
  textAlign: 'center',
  boxSizing: 'border-box',
  minWidth: 32,
  height: 32,
  padding: '0 6px',
  margin: '0 3px',
  color: (theme.vars || theme).palette.text.primary,
  [`&.${paginationItemClasses.focusVisible}`]: {
    backgroundColor: (theme.vars || theme).palette.action.focus
  },
  [`&.${paginationItemClasses.disabled}`]: {
    opacity: (theme.vars || theme).palette.action.disabledOpacity
  },
  transition: theme.transitions.create(['color', 'background-color'], {
    duration: theme.transitions.duration.short
  }),
  '&:hover': {
    backgroundColor: (theme.vars || theme).palette.action.hover,
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  },
  [`&.${paginationItemClasses.selected}`]: {
    backgroundColor: (theme.vars || theme).palette.action.selected,
    '&:hover': {
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette.action.selectedChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.hoverOpacity}))` : alpha(theme.palette.action.selected, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: (theme.vars || theme).palette.action.selected
      }
    },
    [`&.${paginationItemClasses.focusVisible}`]: {
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette.action.selectedChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.focusOpacity}))` : alpha(theme.palette.action.selected, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
    },
    [`&.${paginationItemClasses.disabled}`]: {
      opacity: 1,
      color: (theme.vars || theme).palette.action.disabled,
      backgroundColor: (theme.vars || theme).palette.action.selected
    }
  }
}, ownerState.size === 'small' && {
  minWidth: 26,
  height: 26,
  borderRadius: 26 / 2,
  margin: '0 1px',
  padding: '0 4px'
}, ownerState.size === 'large' && {
  minWidth: 40,
  height: 40,
  borderRadius: 40 / 2,
  padding: '0 10px',
  fontSize: theme.typography.pxToRem(15)
}, ownerState.shape === 'rounded' && {
  borderRadius: (theme.vars || theme).shape.borderRadius
}), ({
  theme,
  ownerState
}) => _extends({}, ownerState.variant === 'text' && {
  [`&.${paginationItemClasses.selected}`]: _extends({}, ownerState.color !== 'standard' && {
    color: (theme.vars || theme).palette[ownerState.color].contrastText,
    backgroundColor: (theme.vars || theme).palette[ownerState.color].main,
    '&:hover': {
      backgroundColor: (theme.vars || theme).palette[ownerState.color].dark,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: (theme.vars || theme).palette[ownerState.color].main
      }
    },
    [`&.${paginationItemClasses.focusVisible}`]: {
      backgroundColor: (theme.vars || theme).palette[ownerState.color].dark
    }
  }, {
    [`&.${paginationItemClasses.disabled}`]: {
      color: (theme.vars || theme).palette.action.disabled
    }
  })
}, ownerState.variant === 'outlined' && {
  border: theme.vars ? `1px solid rgba(${theme.vars.palette.common.onBackgroundChannel} / 0.23)` : `1px solid ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'}`,
  [`&.${paginationItemClasses.selected}`]: _extends({}, ownerState.color !== 'standard' && {
    color: (theme.vars || theme).palette[ownerState.color].main,
    border: `1px solid ${theme.vars ? `rgba(${theme.vars.palette[ownerState.color].mainChannel} / 0.5)` : alpha(theme.palette[ownerState.color].main, 0.5)}`,
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette[ownerState.color].mainChannel} / ${theme.vars.palette.action.activatedOpacity})` : alpha(theme.palette[ownerState.color].main, theme.palette.action.activatedOpacity),
    '&:hover': {
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette[ownerState.color].mainChannel} / calc(${theme.vars.palette.action.activatedOpacity} + ${theme.vars.palette.action.focusOpacity}))` : alpha(theme.palette[ownerState.color].main, theme.palette.action.activatedOpacity + theme.palette.action.focusOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    },
    [`&.${paginationItemClasses.focusVisible}`]: {
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette[ownerState.color].mainChannel} / calc(${theme.vars.palette.action.activatedOpacity} + ${theme.vars.palette.action.focusOpacity}))` : alpha(theme.palette[ownerState.color].main, theme.palette.action.activatedOpacity + theme.palette.action.focusOpacity)
    }
  }, {
    [`&.${paginationItemClasses.disabled}`]: {
      borderColor: (theme.vars || theme).palette.action.disabledBackground,
      color: (theme.vars || theme).palette.action.disabled
    }
  })
}));
const PaginationItemPageIcon = styled('div', {
  name: 'MuiPaginationItem',
  slot: 'Icon',
  overridesResolver: (props, styles) => styles.icon
})(({
  theme,
  ownerState
}) => _extends({
  fontSize: theme.typography.pxToRem(20),
  margin: '0 -8px'
}, ownerState.size === 'small' && {
  fontSize: theme.typography.pxToRem(18)
}, ownerState.size === 'large' && {
  fontSize: theme.typography.pxToRem(22)
}));
const PaginationItem = /*#__PURE__*/React.forwardRef(function PaginationItem(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiPaginationItem'
  });
  const {
      className,
      color = 'standard',
      component,
      components = {},
      disabled = false,
      page,
      selected = false,
      shape = 'circular',
      size = 'medium',
      slots = {},
      type = 'page',
      variant = 'text'
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded$1);
  const ownerState = _extends({}, props, {
    color,
    disabled,
    selected,
    shape,
    size,
    type,
    variant
  });
  const theme = useTheme();
  const classes = useUtilityClasses$1(ownerState);
  const normalizedIcons = theme.direction === 'rtl' ? {
    previous: slots.next || components.next || NavigateNextIcon,
    next: slots.previous || components.previous || NavigateBeforeIcon,
    last: slots.first || components.first || FirstPageIcon,
    first: slots.last || components.last || LastPageIcon
  } : {
    previous: slots.previous || components.previous || NavigateBeforeIcon,
    next: slots.next || components.next || NavigateNextIcon,
    first: slots.first || components.first || FirstPageIcon,
    last: slots.last || components.last || LastPageIcon
  };
  const Icon = normalizedIcons[type];
  return type === 'start-ellipsis' || type === 'end-ellipsis' ? /*#__PURE__*/jsx(PaginationItemEllipsis, {
    ref: ref,
    ownerState: ownerState,
    className: clsx(classes.root, className),
    children: "\u2026"
  }) : /*#__PURE__*/jsxs(PaginationItemPage, _extends({
    ref: ref,
    ownerState: ownerState,
    component: component,
    disabled: disabled,
    className: clsx(classes.root, className)
  }, other, {
    children: [type === 'page' && page, Icon ? /*#__PURE__*/jsx(PaginationItemPageIcon, {
      as: Icon,
      ownerState: ownerState,
      className: classes.icon
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" ? PaginationItem.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The active color.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'standard'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['primary', 'secondary', 'standard']), PropTypes.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: PropTypes.shape({
    first: PropTypes.elementType,
    last: PropTypes.elementType,
    next: PropTypes.elementType,
    previous: PropTypes.elementType
  }),
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * The current page number.
   */
  page: PropTypes.node,
  /**
   * If `true` the pagination item is selected.
   * @default false
   */
  selected: PropTypes.bool,
  /**
   * The shape of the pagination item.
   * @default 'circular'
   */
  shape: PropTypes.oneOf(['circular', 'rounded']),
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['small', 'medium', 'large']), PropTypes.string]),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: PropTypes.shape({
    first: PropTypes.elementType,
    last: PropTypes.elementType,
    next: PropTypes.elementType,
    previous: PropTypes.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The type of pagination item.
   * @default 'page'
   */
  type: PropTypes.oneOf(['end-ellipsis', 'first', 'last', 'next', 'page', 'previous', 'start-ellipsis']),
  /**
   * The variant to use.
   * @default 'text'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['outlined', 'text']), PropTypes.string])
} : void 0;

const _excluded = ["boundaryCount", "className", "color", "count", "defaultPage", "disabled", "getItemAriaLabel", "hideNextButton", "hidePrevButton", "onChange", "page", "renderItem", "shape", "showFirstButton", "showLastButton", "siblingCount", "size", "variant"];
const useUtilityClasses = ownerState => {
  const {
    classes,
    variant
  } = ownerState;
  const slots = {
    root: ['root', variant],
    ul: ['ul']
  };
  return unstable_composeClasses(slots, getPaginationUtilityClass, classes);
};
const PaginationRoot = styled('nav', {
  name: 'MuiPagination',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.variant]];
  }
})({});
const PaginationUl = styled('ul', {
  name: 'MuiPagination',
  slot: 'Ul',
  overridesResolver: (props, styles) => styles.ul
})({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  padding: 0,
  margin: 0,
  listStyle: 'none'
});
function defaultGetAriaLabel(type, page, selected) {
  if (type === 'page') {
    return `${selected ? '' : 'Go to '}page ${page}`;
  }
  return `Go to ${type} page`;
}
const Pagination = /*#__PURE__*/React.forwardRef(function Pagination(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiPagination'
  });
  const {
      boundaryCount = 1,
      className,
      color = 'standard',
      count = 1,
      defaultPage = 1,
      disabled = false,
      getItemAriaLabel = defaultGetAriaLabel,
      hideNextButton = false,
      hidePrevButton = false,
      renderItem = item => /*#__PURE__*/jsx(PaginationItem, _extends({}, item)),
      shape = 'circular',
      showFirstButton = false,
      showLastButton = false,
      siblingCount = 1,
      size = 'medium',
      variant = 'text'
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const {
    items
  } = usePagination(_extends({}, props, {
    componentName: 'Pagination'
  }));
  const ownerState = _extends({}, props, {
    boundaryCount,
    color,
    count,
    defaultPage,
    disabled,
    getItemAriaLabel,
    hideNextButton,
    hidePrevButton,
    renderItem,
    shape,
    showFirstButton,
    showLastButton,
    siblingCount,
    size,
    variant
  });
  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/jsx(PaginationRoot, _extends({
    "aria-label": "pagination navigation",
    className: clsx(classes.root, className),
    ownerState: ownerState,
    ref: ref
  }, other, {
    children: /*#__PURE__*/jsx(PaginationUl, {
      className: classes.ul,
      ownerState: ownerState,
      children: items.map((item, index) => /*#__PURE__*/jsx("li", {
        children: renderItem(_extends({}, item, {
          color,
          'aria-label': getItemAriaLabel(item.type, item.page, item.selected),
          shape,
          size,
          variant
        }))
      }, index))
    })
  }));
});

// @default tags synced with default values from usePagination

process.env.NODE_ENV !== "production" ? Pagination.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Number of always visible pages at the beginning and end.
   * @default 1
   */
  boundaryCount: integerPropType,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The active color.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'standard'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['primary', 'secondary', 'standard']), PropTypes.string]),
  /**
   * The total number of pages.
   * @default 1
   */
  count: integerPropType,
  /**
   * The page selected by default when the component is uncontrolled.
   * @default 1
   */
  defaultPage: integerPropType,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current page.
   * This is important for screen reader users.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @param {string} type The link or button type to format ('page' | 'first' | 'last' | 'next' | 'previous' | 'start-ellipsis' | 'end-ellipsis'). Defaults to 'page'.
   * @param {number} page The page number to format.
   * @param {bool} selected If true, the current page is selected.
   * @returns {string}
   */
  getItemAriaLabel: PropTypes.func,
  /**
   * If `true`, hide the next-page button.
   * @default false
   */
  hideNextButton: PropTypes.bool,
  /**
   * If `true`, hide the previous-page button.
   * @default false
   */
  hidePrevButton: PropTypes.bool,
  /**
   * Callback fired when the page is changed.
   *
   * @param {React.ChangeEvent<unknown>} event The event source of the callback.
   * @param {number} page The page selected.
   */
  onChange: PropTypes.func,
  /**
   * The current page.
   */
  page: integerPropType,
  /**
   * Render the item.
   * @param {PaginationRenderItemParams} params The props to spread on a PaginationItem.
   * @returns {ReactNode}
   * @default (item) => <PaginationItem {...item} />
   */
  renderItem: PropTypes.func,
  /**
   * The shape of the pagination items.
   * @default 'circular'
   */
  shape: PropTypes.oneOf(['circular', 'rounded']),
  /**
   * If `true`, show the first-page button.
   * @default false
   */
  showFirstButton: PropTypes.bool,
  /**
   * If `true`, show the last-page button.
   * @default false
   */
  showLastButton: PropTypes.bool,
  /**
   * Number of always visible pages before and after the current page.
   * @default 1
   */
  siblingCount: integerPropType,
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['small', 'medium', 'large']), PropTypes.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The variant to use.
   * @default 'text'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['outlined', 'text']), PropTypes.string])
} : void 0;

export { Pagination as P };
