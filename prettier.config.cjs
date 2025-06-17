/** @type {import("prettier").Config} */
module.exports = {
  plugins: ['prettier-plugin-sort-imports'],
  importOrder: [
    '^react$',
    '^@?\\w',
    '^@core/(.*)$',
    '^@server/(.*)$',
    '^@ui/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  sortingMethod: 'lineLength',
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,
};
