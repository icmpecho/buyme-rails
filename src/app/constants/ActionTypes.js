'use strict';

var keyMirror = require('keymirror');

var ActionTypes = keyMirror({
    USER_LOGIN_SUCCESS: null,
    RECEIVE_ITEMS_SUCCESS: null
});

module.exports = ActionTypes;
