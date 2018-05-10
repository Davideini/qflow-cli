# Config JavaScript into Custom JavaScript or Custom Page

[Link to Custom JavaScript]([IIS Host]:3000/Admin/CustomJavaScripts.aspx)

[Link to Custom Page JavaScript]([IIS Host]:3000/Admin/CustomJavaScripts.aspx)

```js
$(document).ready(function() {
  $('body')
    .find('[id*=pnlTabBody]')
    .append($('<div>').load('[IIS Storage]/index.html', function() {}));
});
```
