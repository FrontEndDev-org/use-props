import classNames, { type Argument as ClassName } from 'classnames';
import type { CSSProperties, HTMLAttributes } from 'react';

export * from './const.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyObject = Record<keyof any, any>;
type NormalProps = {
  className?: ClassName | undefined;
  style?: (CSSProperties | Record<string, string | number>) | undefined;
};
type NormalKeys = keyof NormalProps;

export type Props<P extends AnyObject = AnyObject, E = HTMLAttributes<HTMLElement>> =
  // html 属性里包含 children、className、style
  Omit<E, keyof P | NormalKeys> &
    // 普通属性里包含 className、style
    Omit<NormalProps, keyof P> &
    P;

type NormalRuntimeProps = {
  className?: string | undefined;
  style?: CSSProperties | undefined;
};
export type RuntimeProps<P extends AnyObject, D extends Partial<P>> = Omit<P, keyof D | NormalKeys> &
  Required<Pick<P, keyof D | NormalKeys>> &
  NormalRuntimeProps;

export default function useProps<P extends Props, D extends Partial<P>>(props: P, defaults: D): RuntimeProps<P, D> {
  const target = Object.assign({}, props) as RuntimeProps<P, D>;

  Object.keys(defaults).forEach((key) => {
    switch (key) {
      case 'className':
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        target[key] = classNames(defaults[key], props[key]);
        break;

      case 'style':
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        target[key] = Object.assign({}, defaults[key], props[key]);
        break;

      default:
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (typeof props[key] === 'undefined') target[key] = defaults[key];
    }
  });

  return target;
}
