'use strict';

var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');

var AppDispatcher = assign(new Dispatcher(), {
    handleViewAction: function (action) {
        this.dispatch({
            source: 'VIEW_ACTION',
            action: action
        });
    },
    handleApiAction: function (action) {
        this.dispatch({
            source: 'API_ACTION',
            action: action
        });
    }
});

module.exports = AppDispatcher;