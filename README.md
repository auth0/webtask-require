# webtask-require

Use `webtask-require` to call your webtasks from the browser using a require-like pattern. Run node.js code without a backend. 

```js
var wt = require('webtask-require')('<your-webtask-container>');
wt('hello').then(function(result) {
  console.log(result);
});
```

## Install

From [npm](https://npmjs.org):

```sh
npm install webtask-require
```

Or our CDN:

```html
<script src="http://cdn.auth0.com/js/webtask-1.0.2.min.js"></script>
```

## Usage

If you haven't created a webtask yet, you can create one named `hello` by doing:

```bash
$ npm install -g wt-cli
$ wt init
$ echo "module.exports = function (cb) {cb(null, 'Hello');}" > hello.js
$ wt create hello.js
```

Once created, this is how you call it:

```js
var wt = require('webtask-require')('<your-webtask-container>');
wt('hello').then(function(result) {
  console.log(result);
});
```

### Sending parameters to the webtask

```js
var wt = require('webtask-require')('<your-webtask-container>');
wt('hello', {foo: 'bar'}).then(function(result) {
  console.log(result);
});
```

### Specifying an HTTP method

```js
wt.get('hello');
wt.post('hello', { foo: 'bar' });
wt.patch('hello', { foo: 'bar' });
wr.put('hello', { foo: 'bar' });
wt.del('hello');
```

### Calling secured webtasks
 
Create the webtask protected with Auth0 using JSON Web Tokens

```bash
$ echo "module.exports = function (cb) {cb(null, 'Hello');}" > hello.js
$ wt create hello.js --auth0 --clientId=<your-clientid> --clientSecret=<your-clientsecret> --auth0Domain=<yours.auth0.com>
```

Call it using a token obtained from Auth0

```js
var lock = new Auth0Lock('<your-clientid>', '<yours.auth0.com>');
var wt = require('webtask-require')('<your-webtask-container>');

lock.show({
  popup: true,
}, function (err, profile, token) {
    wt.withAuth(token)('hello').then(function(result) {
        console.log(result);
    });
});
```
