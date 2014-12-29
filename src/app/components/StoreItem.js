'use strict';

var React = require('react');
var Router = require('react-router');
var mui = require('material-ui');
var Paper = mui.Paper;
var FloatingActionButton = mui.FloatingActionButton;

var StoreItems = React.createClass({
    mixins: [
        Router.Navigation,
        Router.State
    ],
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
                        <h2>{store.name}</h2>
                    </div>
                </Paper>
            </li>
        );
    },
    _onButtonClick: function () {
        this.transitionTo('shopOrder', {shopId: this.props.store.id});
    }
});

module.exports = StoreItems;