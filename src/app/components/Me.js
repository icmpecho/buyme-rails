'use strict';

var React = require('react');
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var DropDownMenu = mui.DropDownMenu;
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
        var menuItems = [
            {payload: '1', text: 'All'},
            {payload: '2', text: 'Current'},
            {payload: '3', text: 'History'}
        ];
        return (
            <div className="me">
                <div className="mui-toolbar">
                    <div className="mui-toolbar-group mui-left">
                        <DropDownMenu menuItems={menuItems} />
                    </div>
                    <div className="mui-toolbar-group mui-right">
                        <RaisedButton label="Add Order" primary={true} onClick={this._showOrderAdd}/>
                        <RaisedButton label="Refresh" primary={false} onClick={this._refreshOrders}/>
                    </div>
                </div>
                <OrderAdd ref="orderAdd"/>
                <OrderList ref="orders" title="Current" orderType="current"/>
                <OrderList ref="oldOrders" title="History" orderType="history"/>
            </div>
        );
    },
    _showOrderAdd: function () {
        this.refs.orderAdd.show();
    },
    _refreshOrders: function () {
        this.refs.orders.refreshOrders();
        this.refs.oldOrders.refreshOrders();
    }
});

module.exports = Me;