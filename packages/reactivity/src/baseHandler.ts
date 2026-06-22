/*
 * @Description: 基础拦截器
 * @Author: Bei
 * @Date: 2026-06-15 20:01:53
 * @LastEditTime: 2026-06-22 14:26:34
 * @LastEditors: Bei
 */
// 响应式对象标志位
export enum ReactiveFlags {
  IS_REACTIVE = "__v_isReactive",
}
// 最简版Proxy拦截器，用于拦截对象的[读取]和[赋值]操作
// proxy 需要搭配 reflect使用，才能正常拦截属性读取和赋值操作
export const mutableHandlers: ProxyHandler<any> = {
  /**
   * 读取属性值
   * @param {*} target 被代理的原始对象
   * @param {*} key 要读取的属性名
   * @returns
   */
  get(target, key, receiver) {
    // 读取响应式对象标志位，直接返回标志位
    if (key === ReactiveFlags.IS_REACTIVE) {
      return true;
    }

    //取值的时候将effct和响应式对象映射起来
    // todo: 实现依赖收集
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    // todo: 实现触发依赖更新

    // 赋值的时候将effct和响应式对象映射起来
    return Reflect.set(target, key, value, receiver);
  },
};
