'use strict';

var assign = require('object-assign');

var ApiUtils = require('./../../common/utils/ApiUtils');

var StoreApi = assign({}, ApiUtils, {
    getStores: function () {
        return this.get('/stores');
    }
});

module.exports = StoreApi;