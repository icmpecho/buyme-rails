'use strict';

var assign = require('object-assign');

var ApiUtils = require('../../common/utils/ApiUtils');

var OrderApi = assign({}, ApiUtils, {
    getOrders: function () {
        return this.get('/orders');
    },
    getMyOrders: function (pending) {
        return this.get('/orders/me').query({
            pending: pending
        });
    },
    addMyOrders: function (orders) {
        var expireAt = new Date;
        expireAt.setDate(expireAt.getDate() + parseInt(orders.inDays));
        expireAt.setHours(expireAt.getHours() + parseInt(orders.inHours));
        var data = {
            item_name: orders.itemName,
            count: orders.count,
            store_ids: orders.storeIds,
            expire_at: expireAt.toString()
        };
        return this.post('/orders').send(data);
    },
    plusOneOrder: function (id) {

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