module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: "vue-eslint-parser",
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "eslint-config-prettier",
    // "plugin:@typescript-eslint/eslint-recommended",
    // "plugin:@typescript-eslint/recommended",
    "@vue/typescript",
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
  ],
  "parserOptions": {
    "parser": "@typescript-eslint/parser"
  },
  plugins: [
    // 'prettier',
    // '@typescript-eslint'
  ],
  globals: {
  },
  // add your custom rules here
  rules: {
    "vue/no-v-html": ["off"],
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/html-self-closing': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off'
  }
}
