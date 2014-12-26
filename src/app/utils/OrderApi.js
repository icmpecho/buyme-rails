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
    addMyOrders: function (itemName, count, storeIds) {
        var data = {
            item_name: itemName,
            count: count,
            store_ids: storeIds
        };
        return this.post('/orders').send(data);
    },
    cancelMyOrder: function (id) {
        return this.post('/orders/' + id + '/cancel');
    },
    removeMyOrder: function (id) {
        return this.del('/orders/' + id);
    },
    removeStoreOrder: function (id) {
        return this.post('/orders/' + id + '/buy');
    }
});

module.exports = OrderApi;