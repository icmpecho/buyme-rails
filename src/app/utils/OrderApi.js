'use strict';

var assign = require('object-assign');

var ApiUtils = require('./../../common/utils/ApiUtils');

var OrderApi = assign({}, ApiUtils, {
    getOrders: function () {
        return this.get('/orders');
    },
    addOrder: function (itemId, itemName, storeIds) {
        var data = {
            id: itemId,
            name: itemName,
            stores: storeIds
        };
        console.log(data);
        return this.post('/orders').send(data);
    }
});

module.exports = OrderApi;