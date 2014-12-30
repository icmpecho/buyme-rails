'use strict';

var React = require('react');
var ImageLoader = require('react-imageloader');
var mui = require('material-ui');
var Paper = mui.Paper;
var FloatingActionButton = mui.FloatingActionButton;

var AppActions = require('../actions/AppActions');

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
                        <h2>
                            <ImageLoader src={"../images/" + store.name + ".png"}>
                            {store.name}
                            </ImageLoader>
                            <span>&nbsp;&nbsp;</span>
                            <span className="mui-font-style-title">({store.pending} orders)</span>
                        </h2>
                    </div>
                </Paper>
            </li>
        );
    },
    _onButtonClick: function () {
        AppActions.changeState({
            name: 'shopOrder',
            params: {storeId: this.props.store.id},
            title: this.props.store.name
        });
    }
});

module.exports = StoreItems;