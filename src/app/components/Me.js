'use strict';

var React = require('react');
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;

var ItemStore = require('../stores/ItemStore');

var OrderList = require('./OrderList');
var OrderAdd = require('./OrderAdd');

var Me = React.createClass({
    getInitialState: function () {
        return {
            items: ItemStore.getItems()
        };
    },
    render: function () {
        return (
            <div className="me">
                <RaisedButton label="Add Order" onClick={this._showOrderAdd}/>
                <OrderAdd ref="orderAdd"/>
                <OrderList title="Current"/>
                <OrderList title="History"/>
            </div>
        );
    },
    _showOrderAdd: function () {
        this.refs.orderAdd.show();
    }
});

module.exports = Me;