'use strict';

var assign = require('object-assign');

var ApiUtils = require('../../common/utils/ApiUtils');

var StoreApi = assign({}, ApiUtils, {
    getStores: function () {
        return this.get('/stores');
    },
    getStoreOrders: function (id) {
        return this.get('/stores/' + id);
    }
});

module.exports = StoreApi;