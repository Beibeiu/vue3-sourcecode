/*
 * @Description: 依赖收集
 * @Author: Bei
 * @Date: 2026-06-22 16:41:10
 * @LastEditTime: 2026-06-22 17:06:38
 * @LastEditors: Bei
 */
/* 收集结果示例
activeEffect有这个属性，说明这个key是在effect中被访问的
没有这个属性，说明这个key是在effect之外被访问的，不用收集依赖
{
    {name:'A',age:18}:{
        age:{effect,effect},
        name:{effect},
    }
}
*/
import { activeEffect } from "./effect";
export function track(target, key) {
  if (activeEffect) {
    console.log("依赖收集2", activeEffect, key);
  }
}
