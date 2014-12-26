'use strict';

var React = require('react');

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
        MyOrderStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        MyOrderStore.removeChangeListener(this._onChange);
    },
    render: function () {
        return (
            <div className="order-list">
                <h3>{this.props.title}</h3>
                <ul>
                    {this.state.orders.map(function (order) {
                        return <OrderItem order={order}></OrderItem>;
                    })}
                </ul>
            </div>
        );
    },
    _onChange: function () {
        if (this.props.orderType === 'current') {
            this.setState({
                orders: MyOrderStore.getMyOrders()
            });
        }
        else if (this.props.orderType === 'history') {
            this.setState({
                orders: MyOrderStore.getMyOldOrders()
            });
        }

    },
    refreshOrders: function () {
        if (this.props.orderType === 'current') {
            OrderActions.getMyOrders()
        }
        else if (this.props.orderType === 'history') {
            OrderActions.getMyOldOrders()
        }
    }
});

module.exports = OrderList;