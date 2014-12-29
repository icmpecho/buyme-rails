'use strict';

var React = require('react');
var ImageLoader = require('react-imageloader');
var mui = require('material-ui');
var Paper = mui.Paper;
var FloatingActionButton = mui.FloatingActionButton;
var moment = require('moment');

var OrderActions = require('../actions/OrderActions');
var MenuActions = require('../actions/MenuActions');

var OrderItems = React.createClass({
    propTypes: {
        order: React.PropTypes.object.isRequired,
        orderType: React.PropTypes.string.isRequired,
        deletable: React.PropTypes.bool.isRequired
    },
    getDefaultProps: function () {
        return {
            deletable: false,
            buyable: false
        };
    },
    render: function () {
        var order = this.props.order;
        var buyer = !!this.props.order.buyer_name ? <div> Bought by {this.props.order.buyer_name}</div> : undefined;
        var createdAt = this.props.orderType === 'all' || this.props.orderType === 'current' || this.props.orderType === 'store' ? <div>Created At - {moment(order.created_at).fromNow()}</div> : undefined;
        var createdBy = this.props.orderType === 'all' || this.props.orderType === 'store' ? <div>Ordered By - {order.user_name}</div> : undefined;
        var completedAt = this.props.orderType === 'history' ? <div className={this._onOrderStatus()}>{this._onOrderStatus()} - {moment(this._setCancelTime()).fromNow()}</div> : undefined;
        var deleteButton = !!this.props.deletable ? <FloatingActionButton icon={this._setLogoDeleteButton(this)} secondary={true} onClick={this._onDeleteButtonClick.bind(this, order.id)}/> : undefined;
        var buyButton = !!this.props.buyable ? <FloatingActionButton icon="action-done" secondary={true} onClick={this._onBuyButtonClick.bind(this, order.id)}/> : undefined;
        var self = this;
        return (
            <li className="order-item">
                <Paper zDepth={3} rounded={false}>
                    <div className="order-item-details">
                        <div className="mui-right">
                            {deleteButton}
                            {buyButton}
                            <div className="date mui-font-style-caption">
                                {createdAt}
                                {completedAt}
                                {createdBy}
                                {buyer}
                            </div>
                        </div>
                        <h2>{order.item_name}</h2>
                        <div>
                            <ul className="order-store-list">
                                {order.stores.map(function (store) {
                                    return <li key={'store-' + store.id} onClick={self._onStoreClick.bind(self, store)}>
                                        <ImageLoader src={"../images/" + store.name + ".png"}>
                                        {store.name}
                                        </ImageLoader>
                                    </li>;
                                })}
                                <li>
                                    <span className="mui-font-style-caption">Available stores</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Paper>
            </li>
        );
    },
    _setLogoDeleteButton: function () {
        if (this.props.orderType === 'current') {
            return "navigation-close";
        }
        else if (this.props.orderType === 'history') {
            return "action-delete";
        }
    },
    _onDeleteButtonClick: function (id) {
        if (this.props.orderType === 'current') {
            OrderActions.cancelMyOrder(id);
        }
        else if (this.props.orderType === 'history') {
            OrderActions.removeMyOldOrder(id);
        }
    },
    _onBuyButtonClick: function (id) {
        OrderActions.removeStoreOrder(id);
    },
    _onStoreClick: function (store) {
        MenuActions.changeState({
            name: 'shopOrder',
            params: {storeId: store.id},
            title: store.name
        });
    },
    _onOrderStatus: function () {
        if (this.props.orderType === 'history') {
            if (this.props.order.completed !== null) {
                return "Completed";
            }
            else
                return "Cancel";
        }
    },
    _setCancelTime: function () {
        if (this.props.order.completed !== null) {
            return this.props.order.completed;
        }
        else
            return this.props.order.canceled_at;
    }
});

module.exports = OrderItems;