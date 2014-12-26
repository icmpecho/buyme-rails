'use strict';

var React = require('react');

var MyOrderStore = require('../stores/MyOrderStore');
var OrderActions = require('../actions/OrderActions');
var OrderItem = require('./OrderItem');

var OrderList = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired,
        pending: React.PropTypes.bool.isRequired
    },
    getInitialState: function () {
        return {
            orders: []
        };
    },
    componentWillMount: function () {
        OrderActions.getMyOrders(this.props.pending)
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
        this.setState({
            orders: !!this.props.pending ? MyOrderStore.getMyOrders() : MyOrderStore.getMyOldOrders()
        });
    }
});

module.exports = OrderList;