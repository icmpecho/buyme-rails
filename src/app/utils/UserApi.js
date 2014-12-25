'use strict';

var assign = require('object-assign');

var ApiUtils = require('./ApiUtils');

var UserApi = assign({}, ApiUtils, {
    login: function (data) {
        return true;
    }
});

module.exports = UserApi;