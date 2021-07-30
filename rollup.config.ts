import typescript from "@rollup/plugin-typescript";

const base = {
  plugins: [
    typescript()
  ]
};

export default {
  input: "src/index.ts",
  output: {
    file: "dist/index.js",
    format: "cjs"
  }
};
