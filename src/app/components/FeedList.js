'use strict';

var React = require('react');
var mui = require('material-ui');
var FlatButton = mui.FlatButton;

var OrderStore = require('../stores/OrderStore');
var OrderActions = require('../actions/OrderActions');
var FeedItem = require('./FeedItem');

var FeedList = React.createClass({
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
        OrderStore.addChangeListener(this._onChange);
        var _refreshOrders = this.refreshOrders;
        var _storeId = this.props.storeId;
        this.interval = setInterval(function () {
            _refreshOrders(_storeId);
        }, 30000);
    },

    componentWillUnmount: function () {
        OrderStore.removeChangeListener(this._onChange);
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
                        return <FeedItem key={'order-' + order.id} order={order} orderType={orderType} deletable={deletable} buyable={buyable}></FeedItem>;
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
    refreshOrders: function (storeId) {
        OrderActions.getOrders();
    }
});

module.exports = FeedList;