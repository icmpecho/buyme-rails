'use strict';

var request = require('superagent');
var API_URL = process.env.API || '';
var TIMEOUT = 10000;

var ApiUtils = {
    get: function (path) {
        return request
            .get(API_URL + path)
            .set('Accept', 'application/json')
            .timeout(TIMEOUT);
    },
    post: function (path) {
        return request
            .post(API_URL + path)
            .set('Accept', 'application/json')
            .timeout(TIMEOUT);
    },
    del: function (path) {
        return request
            .del(API_URL + path)
            .set('Accept', 'application/json')
            .timeout(TIMEOUT);
    }
};

module.exports = ApiUtils;