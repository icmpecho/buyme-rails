'use strict';

var React = require('react');
var mui = require('material-ui');
var Paper = mui.Paper;
var FloatingActionButton = mui.FloatingActionButton;

var StoreItems = React.createClass({
    propTypes: {
        store: React.PropTypes.object.isRequired,
        showOrderList: React.PropTypes.func.isRequired
    },
    render: function () {
        var store = this.props.store;
        return (
            <li className="store-item">
                <Paper zDepth={3} rounded={false}>
                    <div className="store-item-details">
                        <div>Name - {store.name}</div>
                        <FloatingActionButton icon="action-shopping-cart" secondary={true} onClick={this._onButtonClick}/>
                    </div>
                </Paper>
            </li>
        );
    },
    _onButtonClick: function () {
        this.props.showOrderList(this.props.store);
    }
});

module.exports = StoreItems;