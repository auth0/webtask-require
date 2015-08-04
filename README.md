# webtask-require

Use `webtask-require` to call your webtasks from the browser or native apps. Run node.js code without a backend. 

Create a webtask

```bash
$ npm install -g wt-cli
$ wt init
$ echo "module.exports = function (cb) {cb(null, 'Hello');}" > hello.js
$ wt create hello.js
```

Call it from JavaScript

```js
var wt = require('webtask-require')('<your-webtask-container>');
wt('hello').then(function(result) {
  console.log(result);
});
```

## Sending Parameters

```js
var wt = require('webtask-require')('<your-webtask-container>');
wt('hello', {foo: 'bar'}).then(function(result) {
  console.log(result);
});
```

## Specify HTTP Method

```js
wt.get('hello');
wt.post('hello', { foo: 'bar' });
wt.patch('hello', { foo: 'bar' });
wr.put('hello', { foo: 'bar' });
wt.del('hello');
```

## Secure Webtasks
 
Create the webtask protected with Auth0 using JSON Web Tokens

```bash
$ echo "module.exports = function (cb) {cb(null, 'Hello');}" > hello.js
$ wt create hello.js --auth0 --clientId=<your-clientid> --clientSecret=<your-clientsecret> --auth0Domain=<yours.auth0.com>
```

Call it

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
