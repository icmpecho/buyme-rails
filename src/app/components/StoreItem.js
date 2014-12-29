'use strict';

var React = require('react');
var mui = require('material-ui');
var Paper = mui.Paper;
var FloatingActionButton = mui.FloatingActionButton;

var MenuActions = require('../actions/MenuActions');

var StoreItems = React.createClass({
    propTypes: {
        store: React.PropTypes.object.isRequired
    },
    render: function () {
        var store = this.props.store;
        return (
            <li className="store-item" onClick={this._onButtonClick}>
                <Paper zDepth={3} rounded={false}>
                    <div className="store-item-details">
                        <div className="mui-right">
                            <FloatingActionButton icon="action-shopping-cart" secondary={true}/>
                        </div>
                        <h2>{store.name}
                            <span className="mui-font-style-title">({store.pending} orders)</span>
                        </h2>
                    </div>
                </Paper>
            </li>
        );
    },
    _onButtonClick: function () {
        MenuActions.changeState({
            name: 'shopOrder',
            params: {storeId: this.props.store.id},
            title: this.props.store.name
        });
    }
});

module.exports = StoreItems;