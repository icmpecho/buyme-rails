'use strict';

var React = require('react');
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var DropDownMenu = mui.DropDownMenu;
var Toggle = mui.Toggle;

var OrderList = require('./OrderList');
var OrderAdd = require('./OrderAdd');

var Me = React.createClass({
    getInitialState: function () {
        return {
            showCurrent: true
        };
    },
    render: function () {
        var currentOrderList = !!this.state.showCurrent ? <OrderList ref="orders" title="Current" orderType="current"/> : undefined;
        var historyOrderList = !this.state.showCurrent ? <OrderList ref="oldOrders" title="History" orderType="history"/> : undefined;
        return (
            <div className="me">
                <div className="mui-toolbar">
                    <div className="mui-toolbar-group mui-left">
                        <RaisedButton label="Refresh" primary={false} onClick={this._refreshOrders}/>
                    </div>
                    <div className="mui-togglebar mui-right">
                        <div className="mui-togglebar-wrap mui-font-style-caption">History</div>
                        <div className="mui-togglebar-wrap">
                            <Toggle toggled={this.state.showCurrent} onToggle={this._onCurrentToggleChange}/>
                        </div>
                        <div className="mui-togglebar-wrap mui-font-style-caption mui-togglebar-wrap-last">Current</div>
                    </div>
                </div>
                {currentOrderList}
                {historyOrderList}
            </div>
        );
    },
    _refreshOrders: function () {
        if (!!this.state.showCurrent) {
            this.refs.orders.refreshOrders();
        }
        if (!this.state.showCurrent) {
            this.refs.oldOrders.refreshOrders();
        }
    },
    _onCurrentToggleChange: function (e, toggled) {
        this.setState({
                showCurrent: toggled
            }
        )
    }
});

module.exports = Me;