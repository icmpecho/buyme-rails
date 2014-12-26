'use strict';

var React = require('react');

var StoreList = require('./StoreList');
var OrderList = require('./OrderList');

var Shop = React.createClass({
    getInitialState: function () {
        return {
            showOrderList: false
        };
    },
    render: function () {
        var storeList = !this.state.showOrderList ? <StoreList showOrderList={this.showOrderList}/> : undefined;
        var orderList = !!this.state.showOrderList ? <OrderList title={'Orders for ' + this.state.store.name} orderType="store" onBackButtonClick={this.closeOrderList} storeId={this.state.store.id}/> : undefined;
        return (
            <div>
                {storeList}
                {orderList}
            </div>
        );
    },
    showOrderList: function (store) {
        this.setState({
            showOrderList: true,
            store: store
        })
    },
    closeOrderList: function () {
        this.setState({
            showOrderList: false,
            store: undefined
        })
    }
});

module.exports = Shop;