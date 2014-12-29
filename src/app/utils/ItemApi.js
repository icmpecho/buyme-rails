'use strict';

var assign = require('object-assign');

var ApiUtils = require('./../../common/utils/ApiUtils');

var ItemApi = assign({}, ApiUtils, {
    getItems: function (name) {
        if (!!name) {
            return this.get('/items').query({name: name});
        }
        return this.get('/items').query({count: 5});
    }
});

module.exports = ItemApi;