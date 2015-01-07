'use strict';

var React = require('react');
var ImageLoader = require('react-imageloader');
var mui = require('material-ui');
var Paper = mui.Paper;
var FloatingActionButton = mui.FloatingActionButton;
var moment = require('moment');

var OrderActions = require('../actions/OrderActions');
var AppActions = require('../actions/AppActions');
var MyOrderStore = require('../stores/MyOrderStore');

var FeedItem = React.createClass({
    propTypes: {
        order: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
        return {
            isButtonsDisabled: false
        };
    },
    componentDidMount: function () {
        MyOrderStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
        MyOrderStore.removeChangeListener(this._onChange);
    },
    render: function () {
        var order = this.props.order;
        var order_event = this._CheckOrderEvent();
        var plusOne = this.props.order.status === 'active' ? <FloatingActionButton icon="social-plus-one" mini={true} secondary={true} onClick={this._onPlusOneButtonClick.bind(this, order.id)} disabled={this.state.isButtonsDisabled}/> : undefined;
        var self = this;
        return (
            <li className="feed-item">
                <Paper zDepth={3} rounded={false}>
                    <div className="feed-item-details">
                        <div className="mui-right">
                            {plusOne}
                        </div>
                        {order_event}
                        <div>
                            <ul className="order-store-list">
                                {order.stores.map(function (store) {
                                    return <li key={'store-' + store.id} onClick={self._onStoreClick.bind(self, store)}>
                                        <ImageLoader src={"../images/" + store.name + ".png"}>
                                        {store.name}
                                        </ImageLoader>
                                    </li>;
                                })}
                            </ul>
                            <span className="mui-font-style-caption">Available stores</span>
                        </div>
                    </div>
                </Paper>
            </li>
        );
    },
    _onOrderStatus: function () {
        if (this.props.order.completed !== null) {
            return 'Completed';
        }
        else {
            return 'Cancel';
        }

    },
    _setCancelTime: function () {
        if (this.props.order.completed !== null) {
            return this.props.order.completed;
        }
        else {
            return this.props.order.canceled_at;
        }
    },
    _CheckOrderEvent: function () {
        if (this.props.order.status === 'active') {
            return (
                <div>
                    <h2>{this.props.order.user_name} just ordered {this.props.order.item_name}</h2>
                    <p className="mui-font-style-subhead-1">{moment(this.props.order.created_at).fromNow()}</p>
                </div>
            )
        }
        else if (this.props.order.status === 'completed') {
            return (
                <div>
                    <h2>{this.props.order.buyer_name} bought {this.props.order.item_name} for {this.props.order.user_name}</h2>
                    <p className="mui-font-style-subhead-1">{moment(this.props.order.completed).fromNow()}</p>
                </div>
            )
        }
        else if (this.props.order.status === 'canceled') {
            return (
                <div>
                    <h2>{this.props.order.user_name} just canceled {this.props.order.item_name}</h2>
                    <p className="mui-font-style-subhead-1">{moment(this.props.order.canceled_at).fromNow()}</p>
                </div>
            )
        }
        else if (this.props.order.status === 'expired') {
            return (
                <div>
                    <h2>{this.props.order.user_name}'s order for {this.props.order.item_name} had been expired</h2>
                    <p className="mui-font-style-subhead-1">{moment(this.props.order.expire_at).fromNow()}</p>
                </div>
            )
        }
        else {
            return <h2> Unknown status</h2>
        }
    },
    _onStoreClick: function (store) {
        AppActions.changeState({
            name: 'shopOrder',
            params: {storeId: store.id},
            title: store.name
        });
    },
    _onPlusOneButtonClick: function (id) {
        this.setState({
            isButtonsDisabled: true
        });
        OrderActions.plusOneOrder(id);
    },
    _onChange: function () {
        this.setState({
            isButtonsDisabled: false
        });
    }
});

module.exports = FeedItem;