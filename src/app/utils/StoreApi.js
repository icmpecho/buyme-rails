'use strict';

var assign = require('object-assign');

var ApiUtils = require('./../../common/utils/ApiUtils');

var StoreApi = assign({}, ApiUtils, {
    getStores: function () {
        this.get('/stores').end(function (error, res) {
            if (!!error) {
                return console.log(error);
            }
            var StoreActions = require('../actions/StoreActions');
            StoreActions.receiveStores(res.body);
        });
    }
});

module.exports = StoreApi;