import next from "eslint-config-next";

// Next 16 ships a native flat-config array, so no FlatCompat shim is needed.
// `next` bundles core-web-vitals + the TypeScript rules.
const eslintConfig = [
  { ignores: [".next/**", "out/**", "node_modules/**", "scripts/**"] },
  ...next,
];

export default eslintConfig;
