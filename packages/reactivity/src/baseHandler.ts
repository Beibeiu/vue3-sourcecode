/*
 * @Description: 基础拦截器
 * @Author: Bei
 * @Date: 2026-06-15 20:01:53
 * @LastEditTime: 2026-07-15 17:31:10
 * @LastEditors: Bei
 */
import { activeEffect } from "./effect";
import { track } from "./reactiveEffect";
// 响应式对象标志位
export enum ReactiveFlags {
  IS_REACTIVE = "__v_isReactive",
}
// 最简版Proxy拦截器，用于拦截对象的[读取]和[赋值]操作
export const mutableHandlers: ProxyHandler<any> = {
  /**
   * 读取属性值
   * @param {*} target 被代理的原始对象
   * @param {*} key 要读取的属性名
   * @param {*} receiver 接收者，用于调用原始对象的方法
   * @returns
   */
  get(target, key, receiver) {
    // 读取响应式对象标志位，直接返回标志位
    if (key === ReactiveFlags.IS_REACTIVE) {
      return true;
    }

    // 实现依赖收集

    console.log("baseHandler-get依赖收集", activeEffect, key);
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    console.log("赋值", target, key, value);
    // todo: 实现触发依赖更新

    // 赋值的时候将effct和响应式对象映射起来
    return Reflect.set(target, key, value, receiver);
  },
};
