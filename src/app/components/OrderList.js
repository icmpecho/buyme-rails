'use strict';

var React = require('react');
var mui = require('material-ui');
var FlatButton = mui.FlatButton;

var OrderStore = require('../stores/OrderStore');
var MyOrderStore = require('../stores/MyOrderStore');
var StoreOrderStore = require('../stores/StoreOrderStore');
var OrderActions = require('../actions/OrderActions');
var StoreActions = require('../actions/StoreActions');
var OrderItem = require('./OrderItem');

var OrderList = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired,
        orderType: React.PropTypes.string.isRequired
    },
    getInitialState: function () {
        return {
            orders: []
        };
    },
    componentWillMount: function () {
        this.refreshOrders(this.props.storeId);
    },
    componentDidMount: function () {
        switch (this.props.orderType) {
            case 'all':
                OrderStore.addChangeListener(this._onChange);
                break;
            case 'current':
            case 'history':
                MyOrderStore.addChangeListener(this._onChange);
                break;
            case 'store':
                StoreOrderStore.addChangeListener(this._onChange);
                break;
            default:
                return;
        }
        var _refreshOrders = this.refreshOrders;
        var _storeId = this.props.storeId;
        this.interval = setInterval(function () {
            _refreshOrders(_storeId);
        }, 30000);
    },

    componentWillUnmount: function () {
        switch (this.props.orderType) {
            case 'all':
                OrderStore.removeChangeListener(this._onChange);
                break;
            case 'current':
            case 'history':
                MyOrderStore.removeChangeListener(this._onChange);
                break;
            case 'store':
                StoreOrderStore.removeChangeListener(this._onChange);
                break;
            default:
                return;
        }
        clearInterval(this.interval);
    },
    render: function () {
        var orderType = this.props.orderType;
        var buyable = this.props.orderType === 'store';
        var backButton = !!buyable ? <FlatButton label="Back" primary={true} onClick={this.props.onBackButtonClick}/> : undefined;
        var deletable = this.props.orderType === 'current' || this.props.orderType === 'history';
        return (
            <div className="order-list">
                <h3>{this.props.title} {backButton}</h3>
                <ul>
                    {this.state.orders.map(function (order) {
                        return <OrderItem key={'order-' + order.id} order={order} orderType={orderType} deletable={deletable} buyable={buyable}></OrderItem>;
                    })}
                </ul>
            </div>
        );
    },
    _onChange: function () {
        switch (this.props.orderType) {
            case 'all':
                this.setState({
                    orders: OrderStore.getOrders()
                });
                break;
            case 'current':
                this.setState({
                    orders: MyOrderStore.getMyOrders()
                });
                break;
            case 'history':
                this.setState({
                    orders: MyOrderStore.getMyOldOrders()
                });
                break;
            case 'store':
                this.setState({
                    orders: StoreOrderStore.getStoreOrders()
                });
                break;
            default:
                return;
        }
    },
    refreshOrders: function (storeId) {
        switch (this.props.orderType) {
            case 'all':
                OrderActions.getOrders();
                break;
            case 'current':
                OrderActions.getMyOrders();
                break;
            case 'history':
                OrderActions.getMyOldOrders();
                break;
            case 'store':
                StoreActions.getStoreOrders(storeId);
                break;
            default:
                return;
        }
    }
});

module.exports = OrderList;