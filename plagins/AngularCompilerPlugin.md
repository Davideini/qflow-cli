# Angular Ahead-of-Time Webpack Plugin

Webpack plugin that AoT compiles your Angular components and modules.

## Usage

Angular version 5 and up, use AngularCompilerPlugin:

```ts
import { AngularCompilerPlugin } from "@ngtools/webpack";

exports = {
  module: {
    rules: [
      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        loader: "@ngtools/webpack"
      }
    ]
  },
  plugins: [
    new AngularCompilerPlugin({
      tsConfigPath: "path/to/tsconfig.json",
      entryModule: "path/to/app.module#AppModule",
      sourceMap: true
    })
  ]
};
```

Angular version 2 and 4, use AotPlugin:

```ts
import { AotPlugin } from "@ngtools/webpack";

exports = {
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "@ngtools/webpack"
      }
    ]
  },
  plugins: [
    new AotPlugin({
      tsConfigPath: "path/to/tsconfig.json",
      entryModule: "path/to/app.module#AppModule",
      sourceMap: true
    })
  ]
};
```

## Options

https://github.com/angular/angular-cli/tree/master/packages/%40ngtools/webpack
