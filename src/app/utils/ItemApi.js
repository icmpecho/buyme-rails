'use strict';

var assign = require('object-assign');

var ApiUtils = require('./ApiUtils');
var ItemActions = require('../actions/ItemActions');

var ItemApi = assign({}, ApiUtils, {
    getItems: function () {
        this.get('/items').end(function (error, res) {
            if (!!error) {
                return console.log(error);
            }
            ItemActions.receiveItems(res.body);
        });
    }
});

module.exports = ItemApi;