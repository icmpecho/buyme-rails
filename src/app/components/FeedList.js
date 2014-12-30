'use strict';

var React = require('react');
var mui = require('material-ui');
var FlatButton = mui.FlatButton;

var OrderStore = require('../stores/OrderStore');
var OrderActions = require('../actions/OrderActions');
var FeedItem = require('./FeedItem');

var FeedList = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired
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
        OrderStore.addChangeListener(this._onChange);
        var _refreshOrders = this.refreshOrders;
        this.interval = setInterval(function () {
            _refreshOrders();
        }, 30000);
    },

    componentWillUnmount: function () {
        OrderStore.removeChangeListener(this._onChange);
        clearInterval(this.interval);
    },
    render: function () {
        return (
            <div className="feed-list">
                <h3>{this.props.title}</h3>
                <ul>
                    {this.state.orders.map(function (order) {
                        return <FeedItem key={'order-' + order.id} order={order}></FeedItem>;
                    })}
                </ul>
            </div>
        );
    },
    _onChange: function () {
        this.setState({
            orders: OrderStore.getOrders()
        });
    },
    refreshOrders: function () {
        OrderActions.getOrders();
    }
});

module.exports = FeedList;