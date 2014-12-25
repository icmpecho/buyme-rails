'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/ActionTypes');

var ItemApi = require('../utils/ItemApi');

var ItemActions = {
    getItems: function () {
        ItemApi.getItems().end(function (error, res) {
            if (!!error) {
                return console.log(error);
            }
            AppDispatcher.handleApiAction({
                actionType: ActionTypes.RECEIVE_ITEMS_SUCCESS,
                data: res.body
            })
        });
    }
};

module.exports = ItemActions;
