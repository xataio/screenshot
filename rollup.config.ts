import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "umd",
    name: "XataScreenshot",
  },
  plugins: [typescript(), commonjs(), resolve()],
};
