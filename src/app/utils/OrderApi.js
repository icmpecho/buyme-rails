'use strict';

var assign = require('object-assign');

var ApiUtils = require('./../../common/utils/ApiUtils');

var OrderApi = assign({}, ApiUtils, {
    getOrders: function () {
        return this.get('/orders');
    },
    getMyOrders: function (pending) {
        return this.get('/orders/me').query({
            pending: pending
        });
    },
    getShopOrders: function () {
        return this.get('/orders');
    },
    addOrder: function (itemId, itemName, storeIds) {
        var data = {
            item_id: itemId,
            name: itemName,
            store_ids: storeIds
        };
        console.log(data);
        return this.post('/orders').send(data);
    },
    removeOrder: function () {
    }
});

module.exports = OrderApi;