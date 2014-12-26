'use strict';

var React = require('react');
var mui = require('material-ui');
var Paper = mui.Paper;
var FloatingActionButton = mui.FloatingActionButton;
var moment = require('moment');

var OrderItems = React.createClass({
    propTypes: {
        order: React.PropTypes.object.isRequired
    },
    render: function () {
        var order = this.props.order;
        return (
            <li className="order-item">
                <Paper zDepth={3} rounded={false}>
                    <div className="order-item-details">
                        {JSON.stringify(order)}
                        <div>Item - {order.item_name}</div>
                        <div>Completed - {moment(order.completed).fromNow()}</div>
                        <div>
                            Stores
                            <ul>
                                  {order.stores.map(function (store) {
                                      return <li>{store.name}</li>;
                                  })}
                            </ul>
                        </div>
                        <FloatingActionButton icon="action-delete"/>
                    </div>
                </Paper>
            </li>
        );
    }
});

module.exports = OrderItems;