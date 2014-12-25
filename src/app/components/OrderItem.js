'use strict';

var React = require('react');
var mui = require('material-ui');
var Paper = mui.Paper;

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
                        <div>Completed - {order.completed}</div>
                    </div>
                </Paper>
            </li>
        );
    }
});

module.exports = OrderItems;