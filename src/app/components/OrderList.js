'use strict';

var React = require('react');

var MeOrderStore = require('../stores/MeOrderStore');
var OrderActions = require('../actions/OrderActions');
var OrderItem = require('./OrderItem');

var OrderList = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired
    },
    getInitialState: function () {
        return {
            orders: []
        };
    },
    componentWillMount: function () {
        OrderActions.getOrders();
    },
    componentDidMount: function () {
        MeOrderStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        MeOrderStore.removeChangeListener(this._onChange);
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
            orders: MeOrderStore.getOrders()
        });
    }
});

module.exports = OrderList;