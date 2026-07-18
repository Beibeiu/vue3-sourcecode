/*
 * @Description: 响应式对象
 * @Author: Bei
 * @Date: 2026-06-03 10:34:49
 * @LastEditTime: 2026-07-15 17:38:48
 * @LastEditors: Bei
 */
import { isObject } from "@vue/shared";

import { mutableHandlers } from "./baseHandler";

const reactiveMap = new WeakMap(); // 用于记录代理后的结果，避免重复创建代理对象，提高性能
// 响应式对象标志位
enum ReactiveFlags {
  IS_REACTIVE = "__v_isReactive",
}

/**
 * 创建响应式对象
 * @param {*} target
 * @returns
 */
function createReactiveObject(target) {
  console.log("创建响应式对象", target);
  // 非对象类型直接返回（响应式对象只能是对象类型）
  if (!isObject(target)) {
    console.log("isObject判断-非对象类型直接返回", target);
    return target;
  }
  // 已存在响应式对象标志位，直接返回
  if (target[ReactiveFlags.IS_REACTIVE]) {
    console.log("已存在响应式对象标志位", target);

    return target;
  }
  // 已存在代理直接返回(缓存中有，直接返回)
  const existingProxy = reactiveMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  // 创建代理对象
  const proxy = new Proxy(target, mutableHandlers);
  // 缓存代理对象
  reactiveMap.set(target, proxy);
  return proxy;
}

/**
 * 导出响应式对象
 * @param {*} target
 * @returns
 */
export function reactive(target) {
  return createReactiveObject(target);
}
