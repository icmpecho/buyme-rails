'use strict';

var keyMirror = require('keymirror');

var ActionTypes = keyMirror({
    RECEIVE_ITEMS_SUCCESS: null,
    RECEIVE_ORDERS_SUCCESS: null,
    RECEIVE_STORE_SUCCESS: null
});

module.exports = ActionTypes;
