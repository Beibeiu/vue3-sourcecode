/*
 * @Description: 效果函数
 * @Author: Bei
 * @Date: 2026-06-03 10:35:51
 * @LastEditTime: 2026-06-30 15:30:47
 * @LastEditors: Bei
 */

/**
 * 创建一个响应式副作用函数
 * @param fn - 副作用函数，当依赖的响应式数据变化时会重新执行
 * @param options - 配置项（预留，非必填）
 * @returns 返回 ReactiveEffect 实例，可通过实例的 run() 方法手动执行，或通过 active 属性控制是否激活
 */
export function effect(fn, options?) {
  const _effct = new ReactiveEffect(fn, () => {
    _effct.run();
  });
  _effct.run();
  return _effct;
}

/**
 * 标记当前正在执行的那个需要自动更新的函数
 */
export let activeEffect;

/**
 * 传给effect的回调函数，会被这个类包装成一个[可响应的任务]
 * fn: 用户传入的回调函数
 * scheduler: 数据变化时，要怎么执行这个函数，默认是直接执行fn函数
 * active: 是否激活/是否是响应式，true表示需要执行fn函数，false表示不需要执行fn函数
 * run: 手动执行fn函数，更新视图
 *      执行前：把当前任务赋值给全局变量activeEffect，（告诉系统：当前正在执行的是这个任务，里面用到的数据都要收集依赖）
 *      执行后：把全局变量activeEffect赋值为上一个激活的响应式副作用函数实例，解决嵌套effect错乱问题，也可以用栈解决
*/
class ReactiveEffect {
  public active = true;
  constructor(
    public fn,
    public scheduler,
  ) {}
  // run: 执行fn函数，更新视图
  run() {
    if (!this.active) {
      return this.fn();
    }
    // 保存上一个激活的响应式副作用函数实例
    let lastEffect = activeEffect;
    try {
      activeEffect = this;
      return this.fn();
    } finally {
      activeEffect = lastEffect;
    }
  }
}
