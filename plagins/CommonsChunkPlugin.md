# CommonsChunkPlugin

The CommonsChunkPlugin is an opt-in feature that creates a separate file (known as a chunk), consisting of common modules shared between multiple entry points. By separating common modules from bundles, the resulting chunked file can be loaded once initially, and stored in cache for later use. This results in pagespeed optimizations as the browser can quickly serve the shared code from cache, rather than being forced to load a larger bundle whenever a new page is visited.

```js
new webpack.optimize.CommonsChunkPlugin(options);
```

* Snippet : `wpochunk`

## Options

https://webpack.js.org/plugins/commons-chunk-plugin/
