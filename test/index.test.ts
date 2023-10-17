import useProps, { type Props } from '../src/index.js';
import { isNumberOrUndefinedType, isNumberType } from './helpers.js';

type TestProps = Props<{
  abc: number;
  def?: number;
  xyz?: number;
  www?: number;
}>;

test('没有默认值', () => {
  const props1: TestProps = { abc: 2 };
  const props2 = useProps(props1, {});
  const { abc, def, xyz, www, children, style, className } = props2;

  isNumberType(abc);
  isNumberOrUndefinedType(def);
  isNumberOrUndefinedType(xyz);
  isNumberOrUndefinedType(www);

  expect(props2).not.toBe(props1);
  expect(props2).toEqual(props1);
});

test('有默认值，未覆盖', () => {
  const defaults = { abc: 1, def: 1 } satisfies Partial<TestProps>;
  const props1: TestProps = { abc: 2 };
  const props2 = useProps(props1, defaults);
  const { abc, def, xyz, www, children, style, className } = props2;

  isNumberType(abc);
  isNumberType(def);
  isNumberOrUndefinedType(xyz);
  isNumberOrUndefinedType(www);

  expect(props2).not.toBe(props1);
  expect(props2).toEqual({
    abc: 2,
    def: 1,
  });
});

test('有默认值，已覆盖', () => {
  const props1: TestProps = { abc: 1, xyz: undefined };
  const defaults = { abc: 2, def: 2, xyz: 2 } satisfies Partial<TestProps>;
  const props2 = useProps(props1, defaults);
  const { abc, def, xyz, www, children, style, className } = props2;

  isNumberType(abc);
  isNumberType(def);
  isNumberType(xyz);
  isNumberOrUndefinedType(www);

  expect(props2).not.toBe(props1);
  expect(props2).toEqual({
    abc: 1,
    def: 2,
    xyz: 2,
  });
});
