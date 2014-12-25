'use strict';

var React = require('react');
var mui = require('material-ui');
var Paper = mui.Paper;

var StoreItems = React.createClass({
    propTypes: {
        store: React.PropTypes.object.isRequired
    },
    render: function () {
        var store = this.props.store;
        return (
            <li className="store-item">
                <Paper zDepth={3} rounded={false}>
                    <div className="store-item-details">
                        {JSON.stringify(store)}
                        <div>Completed - {store.completed}</div>
                    </div>
                </Paper>
            </li>
        );
    }
});

module.exports = StoreItems;