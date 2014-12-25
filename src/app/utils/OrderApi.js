'use strict';

var assign = require('object-assign');

var ApiUtils = require('./../../common/utils/ApiUtils');

var OrderApi = assign({}, ApiUtils, {
    getOrders: function () {
        this.get('/orders').end(function (error, res) {
            if (!!error) {
                return console.log(error);
            }
            var OrderActions = require('../actions/OrderActions');
            OrderActions.receiveOrders(res.body);
        });
    }
});

module.exports = OrderApi;