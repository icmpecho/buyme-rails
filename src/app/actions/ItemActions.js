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
            if (res.status === 200) {
                AppDispatcher.handleApiAction({
                    actionType: ActionTypes.GET_ITEMS_SUCCESS,
                    data: res.body
                })
            }
        });
    }
};

module.exports = ItemActions;
