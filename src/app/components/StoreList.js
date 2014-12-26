'use strict';

var React = require('react');

var StoreStore = require('../stores/StoreStore');
var StoreActions = require('../actions/StoreActions');
var StoreItem = require('./StoreItem');

var StoreList = React.createClass({
    getInitialState: function () {
        return {
            stores: []
        };
    },
    componentWillMount: function () {
        StoreActions.getStores();
    },
    componentDidMount: function () {
        StoreStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        StoreStore.removeChangeListener(this._onChange);
    },
    render: function () {
        return (
            <div className="store-list">
                <ul>
                    {this.state.stores.map(function (store) {
                        return <StoreItem key={'store-' + store.id} store={store}></StoreItem>;
                    })}
                </ul>
            </div>
        );
    },
    _onChange: function () {
        this.setState({
            stores: StoreStore.getStores()
        });
    }
});

module.exports = StoreList;