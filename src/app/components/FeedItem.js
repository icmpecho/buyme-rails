'use strict';

var React = require('react');
var ImageLoader = require('react-imageloader');
var mui = require('material-ui');
var Paper = mui.Paper;
var moment = require('moment');

var OrderActions = require('../actions/OrderActions');

var FeedItem = React.createClass({
    propTypes: {
        order: React.PropTypes.object.isRequired
    },
    render: function () {
        var order = this.props.order;
        var order_event = this._CheckOrderEvent();
        return (
            <li className="feed-item">
                <Paper zDepth={3} rounded={false}>
                    <div className="feed-item-details">
                        <div className="mui-right">
                            
                        </div>
                        {order_event}
                        <div>
                            <ul>
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
    },
    _CheckOrderEvent: function (){
        if (this.props.order.status === "active") {
            return <h2> {this.props.order.user_name} just ordered {this.props.order.item_name}<span className="mui-font-style-title"> - {moment(this.props.order.created_at).fromNow()}</span></h2>;    
        } 
        else if (this.props.order.status === "completed") {
            return <h2> {this.props.order.user_name} bought {this.props.order.item_name} for {this.props.order.buyer_name}<span className="mui-font-style-title"> - {moment(this.props.order.completed).fromNow()}</span></h2>
        }
        else if (this.props.order.status === "canceled") {
            return <h2> {this.props.order.user_name} just canceled {this.props.order.item_name} <span className="mui-font-style-title"> - {moment(this.props.order.canceled_at).fromNow()}</span></h2>
        }
    }
});

module.exports = FeedItem;