'use strict';

var React = require('react');
var ImageLoader = require('react-imageloader');
var mui = require('material-ui');
var Paper = mui.Paper;
var moment = require('moment');

var OrderActions = require('../actions/OrderActions');

var FeedItem = React.createClass({
    propTypes: {
        order: React.PropTypes.object.isRequired,
        orderType: React.PropTypes.string.isRequired
    },
    getInitialState: function () {
        return {
            orders: []
        };
    },
    render: function () {
        var order = this.props.order;
        var buyer = !!this.props.order.buyer_name ? <div> Bought by {this.props.order.buyer_name}</div> : undefined;
        var createdAt = this.props.orderType === 'all' || this.props.orderType === 'current' || this.props.orderType === 'store' ? <div>Created - {moment(order.created_at).fromNow()}</div> : undefined;
        var completedAt = this.props.orderType === 'history' ? <div className={this._onOrderStatus()}>{this._onOrderStatus()} - {moment(this._setCancelTime()).fromNow()}</div> : undefined;
        return (
            <li className="order-item">
                <Paper zDepth={3} rounded={false}>
                    <div className="order-item-details">
                        <div className="mui-right">
                            
                        </div>
                        <h2>{order.user_name} just ordered {order.item_name}<span className="mui-font-style-title"> - {moment(order.created_at).fromNow()}</span></h2>
                        <div>
                            <ul className="order-store-list">
                                {order.stores.map(function (store) {
                                    return <li key={'store-' + store.id}>
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
    _onOrderStatus: function () {
        if (this.props.order.completed !== null){
            return "Completed";
        }
        else 
            return "Cancel";
    },
    _setCancelTime: function () {
        if (this.props.order.completed !== null){
            return this.props.order.completed;
        }
        else 
            return this.props.order.canceled_at;
    }
});

module.exports = FeedItem;