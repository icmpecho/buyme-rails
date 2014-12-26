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
    addOrder: function (itemName, storeIds) {
        var data = {
            item_name: itemName,
            store_ids: storeIds
        };
        return this.post('/orders').send(data);
    },
    cancelOrder: function () {
    },
    removeMyOrder: function (id) {
        return this.del('/orders/' + id);
    },
    removeStoreOrder: function (id) {
        return this.post('/orders/' + id + '/buy');
    }
});

module.exports = OrderApi;