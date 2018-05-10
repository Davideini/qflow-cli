# Config JavaScript into Custom JavaScript or Custom Page

[Link to Custom JavaScript]([IIS Host]/Admin/CustomJavaScripts.aspx)

[Link to Custom Page JavaScript]([IIS Host]/Admin/CustomJavaScripts.aspx)

```js
$(document).ready(function() {
  $('body')
    .find('[id*=pnlTabBody]')
    .append($('<div>').load('[public path]/index.html', function() {}));
});
```
