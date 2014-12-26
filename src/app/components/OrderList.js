'use strict';

var React = require('react');

var OrderStore = require('../stores/OrderStore');
var MyOrderStore = require('../stores/MyOrderStore');
var OrderActions = require('../actions/OrderActions');
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
        this.refreshOrders();
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
            default:
                return;
        }
        var _refreshOrders = this.refreshOrders;
        this.interval = setInterval(function () {
            _refreshOrders();
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
            default:
                return;
        }
        clearInterval(this.interval);
    },
    render: function () {
        var orderType = this.props.orderType;
        var deletable = this.props.orderType === 'current' || this.props.orderType === 'history';
        return (
            <div className="order-list">
                <h3>{this.props.title}</h3>
                <ul>
                    {this.state.orders.map(function (order) {
                        return <OrderItem key={'order-' + order.id} order={order} orderType={orderType} deletable={deletable}></OrderItem>;
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
            default:
                return;
        }
    },
    refreshOrders: function () {
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
            default:
                return;
        }
    }
});

module.exports = OrderList;