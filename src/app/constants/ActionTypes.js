'use strict';

var keyMirror = require('keymirror');

var ActionTypes = keyMirror({
    GET_ITEMS_SUCCESS: null,
    GET_ORDERS_SUCCESS: null,
    GET_MY_ORDERS_SUCCESS: null,
    GET_MY_OLD_ORDERS_SUCCESS: null,
    ADD_MY_ORDER_SUCCESS: null,
    READ_MY_ADDED_ORDER_SUCCESS: null,
    CANCEL_MY_ORDER_SUCCESS: null,
    REMOVE_MY_OLD_ORDER_SUCCESS: null,
    GET_STORES_SUCCESS: null,
    GET_STORE_ORDERS_SUCCESS: null,
    REMOVE_STORE_ORDER_SUCCESS: null,
    SHOW_TOAST_SUCCESS: null,
    HIDE_TOAST_SUCCESS: null,
    CHANGE_STATE_SUCCESS: null
});

module.exports = ActionTypes;
