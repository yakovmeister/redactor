import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

const base = {
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json"
    }),
    terser({
      output: {
        comments: false
      }
    })
  ]
};

export default [
  {
    ...base,
    input: "src/index.ts",
    output: {
      file: "dist/index.js",
      format: "cjs"
    }
  }
];
