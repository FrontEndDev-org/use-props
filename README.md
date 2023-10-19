# use-props
react useProps 方法，用于智能合并组件入参，方便组件开发


## 特点
1. `Props` 类型自动添加 children、style、className 和 HTMLAttributes 入参
2. 自动合并 style、className
3. 自动忽略 undefined 入参


## 使用
### 组件开发
```tsx
import {type Props, useProps} from 'use-props';

// 1. 定义组件入参
export type MyCompProps = Props<{
  abc: number;
  def?: number;
  opq?: number;
  xyz?: number;
}>;

// 2. 定义组件默认值
export const myCompDefaults = {
  def: 1,
  opq: 1,
} satisfies Partial<MyCompProps>;

// 3. 实现组件
export default function MyComp(props: MyCompProps) {
  // 4. 合并入参
  const {children, abc, def, opq, xyz, ...attrs} = useProps(props, myCompDefaults);
  // abc 类型为 number
  // def 类型为 number
  // opq 类型为 number
  // xyz 类型为 number | undefined

  return (
    <div ...attrs>
      abc = {abc}
      def = {def}
      opq = {opq}
      xyz = {xyz}
    </div>
  );
}
```

### 组件使用
```tsx
// abc 必填
<MyComp abc={2}/>
// 渲染 abc=2 def=1 opq=1 xyz=undefined

// abc 必填，传入可选 def
<MyComp abc={2} def={2}/>
// 渲染 abc=2 def=2 opq=1 xyz=undefined

// abc 必填，传入可选 def，传入 opq 为 undefined
<MyComp abc={2} def={2} opq={undefined}/>
// 渲染 abc=2 def=2 opq=1 xyz=undefined

// abc 必填，传入可选 def，传入 opq 为 undefined，传入 xyz
<MyComp abc={2} def={2} opq={undefined} xyz={2}/>
// 渲染 abc=2 def=2 opq=1 xyz=2
```
