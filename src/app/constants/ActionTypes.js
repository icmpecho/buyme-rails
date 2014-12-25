'use strict';

var keyMirror = require('keymirror');

var ActionTypes = keyMirror({
    GET_ITEMS_SUCCESS: null,
    GET_ORDERS_SUCCESS: null,
    ADD_ORDER_SUCCESS: null,
    GET_MY_ORDERS_SUCCESS: null,
    GET_MY_HISTORY_ORDERS_SUCCESS: null,
    GET_STORE_SUCCESS: null
});

module.exports = ActionTypes;
