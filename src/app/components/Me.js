'use strict';

var React = require('react');

var ItemStore = require('../stores/ItemStore');

var OrderList = require('./OrderList');

var Me = React.createClass({
    getInitialState: function () {
        return {
            items: ItemStore.getItems()
        };
    },
    render: function () {
        return (
            <div className="me">
                <OrderList title="Current"/>
                <OrderList title="History"/>
            </div>
        );
    }
});

module.exports = Me;