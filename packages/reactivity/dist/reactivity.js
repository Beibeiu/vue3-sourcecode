// reactivity 3.0.0

// node_modules/.pnpm/@vue+shared@3.5.35/node_modules/@vue/shared/dist/shared.esm-bundler.js
// @__NO_SIDE_EFFECTS__
function makeMap(str) {
  const map = /* @__PURE__ */ Object.create(null);
  for (const key of str.split(",")) map[key] = 1;
  return (val) => val in map;
}
var EMPTY_OBJ = true ? Object.freeze({}) : {};
var EMPTY_ARR = true ? Object.freeze([]) : [];
var isObject = (val) => val !== null && typeof val === "object";
var cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return ((str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  });
};
var camelizeRE = /-\w/g;
var camelize = cacheStringFunction(
  (str) => {
    return str.replace(camelizeRE, (c) => c.slice(1).toUpperCase());
  }
);
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
var capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
var toHandlerKey = cacheStringFunction(
  (str) => {
    const s = str ? `on${capitalize(str)}` : ``;
    return s;
  }
);
var specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
var isBooleanAttr = /* @__PURE__ */ makeMap(
  specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`
);

// packages/reactivity/src/effect.ts
function effect(fn, options) {
  const _effct = new ReactiveEffect(fn, () => {
    _effct.run();
  });
  _effct.run();
  return _effct;
}
var activeEffect;
var ReactiveEffect = class {
  constructor(fn, scheduler) {
    this.fn = fn;
    this.scheduler = scheduler;
  }
  fn;
  scheduler;
  active = true;
  // run: 执行fn函数，更新视图
  run() {
    if (!this.active) {
      return this.fn();
    }
    let lastEffect = activeEffect;
    try {
      activeEffect = this;
      return this.fn();
    } finally {
      activeEffect = lastEffect;
    }
  }
};

// packages/reactivity/src/baseHandler.ts
var ReactiveFlags = /* @__PURE__ */ ((ReactiveFlags2) => {
  ReactiveFlags2["IS_REACTIVE"] = "__v_isReactive";
  return ReactiveFlags2;
})(ReactiveFlags || {});
var mutableHandlers = {
  /**
   * 读取属性值
   * @param {*} target 被代理的原始对象
   * @param {*} key 要读取的属性名
   * @param {*} receiver 接收者，用于调用原始对象的方法
   * @returns
   */
  get(target, key, receiver) {
    if (key === "__v_isReactive" /* IS_REACTIVE */) {
      return true;
    }
    console.log("baseHandler-get\u4F9D\u8D56\u6536\u96C6", activeEffect, key);
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    console.log("\u8D4B\u503C", target, key, value);
    return Reflect.set(target, key, value, receiver);
  }
};

// packages/reactivity/src/reactive.ts
var reactiveMap = /* @__PURE__ */ new WeakMap();
function createReactiveObject(target) {
  console.log("\u521B\u5EFA\u54CD\u5E94\u5F0F\u5BF9\u8C61", target);
  if (!isObject(target)) {
    console.log("isObject\u5224\u65AD-\u975E\u5BF9\u8C61\u7C7B\u578B\u76F4\u63A5\u8FD4\u56DE", target);
    return target;
  }
  if (target["__v_isReactive" /* IS_REACTIVE */]) {
    console.log("\u5DF2\u5B58\u5728\u54CD\u5E94\u5F0F\u5BF9\u8C61\u6807\u5FD7\u4F4D", target);
    return target;
  }
  const existingProxy = reactiveMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const proxy = new Proxy(target, mutableHandlers);
  reactiveMap.set(target, proxy);
  return proxy;
}
function reactive(target) {
  return createReactiveObject(target);
}
export {
  ReactiveFlags,
  activeEffect,
  effect,
  mutableHandlers,
  reactive
};
/*! Bundled license information:

@vue/shared/dist/shared.esm-bundler.js:
  (**
  * @vue/shared v3.5.35
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)
*/
//# sourceMappingURL=reactivity.js.map
