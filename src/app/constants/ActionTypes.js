'use strict';

var keyMirror = require('keymirror');

var ActionTypes = keyMirror({
    GET_ITEMS_SUCCESS: null,
    GET_MY_ORDERS_SUCCESS: null,
    GET_MY_OLD_ORDERS_SUCCESS: null,
    ADD_MY_ORDER_SUCCESS: null,
    REMOVE_MY_ORDER_SUCCESS: null,
    REMOVE_MY_OLD_ORDER_SUCCESS: null,
    GET_SHOP_ORDERS_SUCCESS: null,
    GET_STORE_SUCCESS: null
});

module.exports = ActionTypes;
