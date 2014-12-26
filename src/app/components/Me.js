'use strict';

var React = require('react');
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var DropDownMenu = mui.DropDownMenu;
var Toggle = mui.Toggle;
var ItemStore = require('../stores/ItemStore');

var OrderList = require('./OrderList');
var OrderAdd = require('./OrderAdd');

var Me = React.createClass({
    getInitialState: function () {
        return {
            items: ItemStore.getItems(),
            showAdd: false,
            showCurrent: true,
            showHistory: true
        };
    },
    render: function () {
        var menuItems = [
            {payload: '1', text: 'All'},
            {payload: '2', text: 'Current'},
            {payload: '3', text: 'History'}
        ];
        var orderAdd = !!this.state.showAdd ? <OrderAdd toggleOrderAdd={this.toggleOrderAdd}/> : undefined;
        var currentOrderList = !!this.state.showCurrent ? <OrderList ref="orders" title="Current" orderType="current"/> : undefined;
        var historyOrderList = !!this.state.showHistory ? <OrderList ref="oldOrders" title="History" orderType="history"/> : undefined;
        var addOrderLabel = !this.state.showAdd ? 'Add Order' : 'Cancel';
        return (
            <div className="me">
                Show Current
                <Toggle toggled={this.state.showCurrent} onToggle={this._onCurrentToggleChange}/>
                Show History
                <Toggle toggled={this.state.showHistory} onToggle={this._onHistoryToggleChange}/>
                <div className="mui-toolbar">
                    <div className="mui-toolbar-group mui-left">
                        <DropDownMenu menuItems={menuItems} />
                    </div>
                    <div className="mui-toolbar-group mui-right">
                        <RaisedButton label={addOrderLabel} primary={true} onClick={this.toggleOrderAdd}/>
                        <RaisedButton label="Refresh" primary={false} onClick={this._refreshOrders}/>
                    </div>
                </div>
                {orderAdd}
                {currentOrderList}
                {historyOrderList}
            </div>
        );
    },
    toggleOrderAdd: function () {
        this.setState({
            showAdd: !this.state.showAdd
        });
    },
    _refreshOrders: function () {
        if (this.refs.orders) {
            this.refs.orders.refreshOrders();
        }
        if (this.refs.oldOrders) {
            this.refs.oldOrders.refreshOrders();
        }
    },
    _onCurrentToggleChange: function (e, toggled) {
        this.setState({
                showCurrent: toggled
            }
        )
    },
    _onHistoryToggleChange: function (e, toggled) {
        this.setState({
                showHistory: toggled
            }
        )
    }
});

module.exports = Me;