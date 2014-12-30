'use strict';

var React = require('react');
var InfiniteScroll = require('react-infinite-scroll')(React);
var mui = require('material-ui');
var FlatButton = mui.FlatButton;

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
            orders: [],
            hasOrdersRendered: true,
            hasMoreHistory: true
        };
    },
    componentWillMount: function () {
        if (this.props.orderType !== 'history') {
            this.refreshOrders(this.props.storeId);
        }
        else {
            OrderActions.resetMyOldOrders();
        }
    },
    componentDidMount: function () {
        switch (this.props.orderType) {
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
        if (this.props.orderType !== 'history') {
            var _refreshOrders = this.refreshOrders;
            var _storeId = this.props.storeId;
            this.interval = setInterval(function () {
                _refreshOrders(_storeId);
            }, 30000);
        }
    },
    componentWillUnmount: function () {
        switch (this.props.orderType) {
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
        if (this.props.orderType !== 'history') {
            clearInterval(this.interval);
        }
    },
    render: function () {
        var orderType = this.props.orderType;
        var buyable = this.props.orderType === 'store';
        var backButton = !!buyable ? <FlatButton label="Back" primary={true} onClick={this.props.onBackButtonClick}/> : undefined;
        var deletable = this.props.orderType === 'current' || this.props.orderType === 'history';
        var orders = this.state.orders.map(function (order) {
            return <OrderItem key={'order-' + order.id} order={order} orderType={orderType} deletable={deletable} buyable={buyable}></OrderItem>;
        });
        if (this.props.orderType === 'history') {
            orders = <InfiniteScroll loadMore={this._loadMoreHistory} hasMore={this.state.hasMoreHistory}>
                    {orders}
            </InfiniteScroll>;
        }
        return (
            <div className="order-list">
                <h3>{this.props.title} {backButton}</h3>
                <ul>
                    {orders}
                </ul>
            </div>
        );
    },
    _onChange: function () {
        switch (this.props.orderType) {
            case 'current':
                this.setState({
                    orders: MyOrderStore.getMyOrders()
                });
                break;
            case 'history':
                this.setState({
                    orders: MyOrderStore.getMyOldOrders(),
                    hasOrdersRendered: true,
                    hasMoreHistory: MyOrderStore.hasMoreHistory()
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
            case 'current':
                OrderActions.getMyOrders();
                break;
            case 'history':
                OrderActions.resetMyOldOrders();
                break;
            case 'store':
                StoreActions.getStoreOrders(storeId);
                break;
            default:
                return;
        }
    },
    _loadMoreHistory: function (page) {
        if (!!this.state.hasOrdersRendered) {
            this.setState({
                hasOrdersRendered: false
            });
            OrderActions.getMyOldOrders(MyOrderStore.getCurrentHistoryPage() + 1);
        }
    }
});

module.exports = OrderList;