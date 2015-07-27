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


## Auth with Auth0 (coming soon)

Create the webtask protected with Auth0 using JSON Web Tokens

```bash
$ echo "module.exports = function (cb) {cb(null, 'Hello');}" > hello.js
$ wt create hello.js --auth0 --clientId=<your-clientid> --clientSecret=<your-clientsecret> --auth0Domain=<yours.auth0.com>
```

Call it

```js
var lock = new Auth0Lock('<your-clientid>', '<yours.auth0.com>');
var wt = require('webtask')('<your-webtask-account>');

lock.show({
  popup: true,
}, function (err, profile, token) {
    wt('hello').withAuth(token).then(function(result) {
        console.log(result);
    });
});
```
