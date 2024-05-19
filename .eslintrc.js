// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: 'expo',
  parser: 'babel-eslint',
  settings: {
    'import/resolver': {
      node: {
        extensions: [".js", ".jsx", ".json", ".native.js"]
      }
    }
  }
};
