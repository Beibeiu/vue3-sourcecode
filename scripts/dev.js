/*
 * @Description: 开发环境下的打包脚本
 * @Author: Bei
 * @Date: 2026-06-02 10:05:14
 * @LastEditTime: 2026-06-02 20:38:32
 * @LastEditors: Bei
 */
// 这个文件帮我们打包packages目录下的模块，最终打包出js文件
import minimist from "minimist";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import esbuild from "esbuild";
// 解析命令行参数
const args = minimist(process.argv.slice(2));
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, ".."); // 项目根目录

const target = args._[0] || "reactivity"; // 设置打包目标模块，默认打包reactivity模块
const format = args.f || "iife"; // 设置打包格式，默认打包iife格式（生成全局变量）
console.log(target, format);

// es中无法使用import，只能使用require，所以这里使用require
// 打包入口文件
const entry = resolve(rootDir, `packages/${target}/src/index.ts`);
// const pkg = require(resolve(__dirname, `./packages/${target}/package.json`));
console.log(entry);

// 根据需要进行打包
esbuild
  .context({
    entryPoints: [entry],
    format, // 打包格式，默认打包esm格式
    outfile: resolve(rootDir, `packages/${target}/dist/${target}.js`),
    globalName: `Vue${target}`,
    banner: {
      js: `// ${target} 3.0.0`,
    },
    bundle: true, // 打包时是否将所有依赖项打包到一个文件中
    platform: "browser", // 打包平台，默认打包浏览器环境
    sourcemap: true, // 打包时是否生成sourcemap文件:可以调试打包后的代码的来源位置
  })
  .then((context) => {
    console.log("打包完成");
    return context.watch(); // 监听文件变化，自动打包
  });
