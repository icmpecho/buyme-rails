'use strict';

var assign = require('object-assign');

var ApiUtils = require('./../../common/utils/ApiUtils');

var ItemApi = assign({}, ApiUtils, {
    getItems: function () {
        return this.get('/items');
    }
});

module.exports = ItemApi;