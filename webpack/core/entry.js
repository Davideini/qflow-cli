const {
  defaultSourcePath,
  defaultStylesPath
} = require('../../settings/settings.development.json');

module.exports = {
  main: arr => ({
    main: arr.map(val => `./${defaultSourcePath}/${val}.ts`)
  }),
  polyfills: () => ({
    polyfills: `./${defaultSourcePath}/polyfills.ts`
  }),
  styles: arr => ({
    styles: arr.map(
      val => `./${defaultSourcePath}/${defaultStylesPath}/${val}.scss`
    )
  })
};
