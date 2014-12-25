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
                { payload: '1', text: 'All' },
                { payload: '2', text: 'Current' },
                { payload: '3', text: 'History' }
            ];
        return (
            <div className="me">
                <div className="mui-toolbar">
                <div className="mui-toolbar-group mui-left">
	                    <DropDownMenu menuItems={menuItems} />
	                </div>
	                <div className="mui-toolbar-group mui-right">
	                    <RaisedButton label="Add Order" primary={true} onClick={this._showOrderAdd}/>
	                </div>
	            </div>
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