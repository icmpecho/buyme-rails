'use strict';

var React = require('react');
var Router = require('react-router');

var OrderList = require('./OrderList');

var StoreStore = require('../stores/StoreStore');
var StoreActions = require('../actions/StoreActions');
var MenuActions = require('../actions/MenuActions');

var ShopOrder = React.createClass({
    mixins: [
        Router.State
    ],
    getInitialState: function () {
        return {};
    },
    componentWillMount: function () {
        StoreActions.getStores();
    },
    componentDidMount: function () {
        StoreStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
        StoreStore.removeChangeListener(this._onChange);
    },
    render: function () {
        var orderList = !!this.state.store ? <OrderList title={'Orders for ' + this.state.store.name} orderType="store" onBackButtonClick={this.closeOrderList} storeId={this.state.store.id}/> : undefined;
        return (
            <div>
                {orderList}
            </div>
        );
    },
    _onChange: function () {
        var stores = StoreStore.getStores();
        var storeId = this.getParams().storeId;
        for (var index = 0; index < stores.length; index++) {
            if (stores[index].id === parseInt(storeId)) {
                this.setState({
                    store: stores[index]
                });
                break;
            }
        }
    },
    closeOrderList: function () {
        MenuActions.changeState({
            name: 'shop',
            title: 'Shop'
        });
    }
});

module.exports = ShopOrder;