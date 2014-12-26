'use strict';

var React = require('react');
var mui = require('material-ui');
var Paper = mui.Paper;
var FloatingActionButton = mui.FloatingActionButton;
var moment = require('moment');

var OrderActions = require('../actions/OrderActions');

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
        var createdAt = this.props.orderType === 'all' || this.props.orderType === 'current' ? <div>Created At - {moment(order.created_at).fromNow()}</div> : undefined;
        var createdBy = this.props.orderType === 'all' ? <div>Ordered By - {order.user_name}</div> : undefined;
        var completedAt = this.props.orderType === 'history' ? <div>Completed - {moment(order.completed).fromNow()}</div> : undefined;
        var deleteButton = !!this.props.deletable ? <FloatingActionButton icon="action-delete" secondary={true} onClick={this._onDeleteButtonClick.bind(this, order.id)}/> : undefined;
        var buyButton = !!this.props.buyable ? <FloatingActionButton icon="action-done" secondary={true} onClick={this._onBuyButtonClick.bind(this, order.id)}/> : undefined;
        return (
            <li className="order-item">
                <Paper zDepth={3} rounded={false}>
                    <div className="order-item-details">
                        <div>Item - {order.item_name}</div>
                        {createdAt}
                        {createdBy}
                        {completedAt}
                        <div>
                            Stores
                            <ul>
                                  {order.stores.map(function (store) {
                                      return <li key={'store-' + store.id}>{store.name}</li>;
                                  })}
                            </ul>
                        </div>
                        {deleteButton}
                        {buyButton}
                    </div>
                </Paper>
            </li>
        );
    },
    _onDeleteButtonClick: function (id) {
        if (this.props.orderType === 'current') {
            OrderActions.cancelMyOrder(id)
        }
        else if (this.props.orderType === 'history') {
            OrderActions.removeMyOldOrder(id)
        }
    },
    _onBuyButtonClick: function () {

    }
});

module.exports = OrderItems;