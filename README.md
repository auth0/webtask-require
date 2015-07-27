# webtask

Create a webtask

```bash
$ echo "module.exports = function (cb) {cb(null, 'Hello');}" > hello.js
$ wt create hello.js
```

Call it

```js
var wt = require('webtask')('<your-webtask-account>');
wt('hello').then(function(result) {
  console.log(result);
});
```
