var path       = require('path');
var Bluebird   = require('bluebird');
var superagent = require('superagent');

module.exports = function (container, wt_domain) {
    var WebtaskUnspecified = new Error('Must specify webtask to call');
    var AccountUnspecified = new Error('Must specify account URL');
    
    var base_url = wt_domain || 'https://webtask.it.auth0.com';

    var auth_token = '';

    if(!container)
        throw AccountUnspecified;

    function build_wt_url(wt_name) {
        return base_url + '/' + path.join('api', 'run', container, wt_name);
    }

    function make_request(opts) {
        var wt_name = opts.wt_name;
        var method  = opts.method || 'GET';
        var body    = opts.body;
        var headers = opts.headers || {};

        if(auth_token) headers.authorization = 'Bearer ' + auth_token;

        var url = build_wt_url(wt_name);

        return new Bluebird(function (resolve, reject) {

            function onEnd(err, res) {
                if (err) return reject(err);

                resolve(res);
            }

            switch(method) {
                case 'GET':
                    superagent
                        .get(url)
                        .set(headers)
                        .end(onEnd);
                    break;
                case 'POST':
                    superagent
                        .post(url)
                        .set(headers)
                        .send(body)
                        .end(onEnd);
                    break;
                case 'PATCH':
                    superagent
                        .patch(url)
                        .set(headers)
                        .send(body)
                        .end(onEnd);
                    break;
                case 'PUT':
                    superagent
                        .put(url)
                        .set(headers)
                        .send(body)
                        .end(onEnd);
                    break;
                case 'DELETE':
                    superagent
                        .del(url)
                        .set(headers)
                        .end(onEnd);
                    break;
            }
        });
    }

    function call_wt(opts) {
        if(!opts.wt_name) throw WebtaskUnspecified;

        return make_request(opts);
    }

    function wt(name, body) {
        if(body)
            return call_wt({
                method:  'POST',
                wt_name: name,
                body:    body
            });

            return call_wt({
                method:  'GET',
                wt_name: name
            });
    }

    // Note this is the same as calling directly
    wt.get = function (name) {
        return wt(name);
    };

    wt.post = function (name, body) {
        return call_wt({
            method:  'POST',
            wt_name: name,
            body:    body
        });
    };

    wt.patch = function (name, body) {
        return call_wt({
            method:  'PATCH',
            wt_name: name,
            body:    body
        });
    };

    wt.put = function (name, body) {
        return call_wt({
            method:  'PUT',
            wt_name: name,
            body:    body
        });
    };

    wt.del = function (name, body) {
        return call_wt({
            method:  'DELETE',
            wt_name: name,
            body:    body
        });
    };

    wt.withAuth = function (token) {
        auth_token = token;

        return wt;
    };

    return wt;
};
