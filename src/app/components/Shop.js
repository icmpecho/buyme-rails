'use strict';

var React = require('react');

var StoreList = require('./StoreList');

var Shop = React.createClass({
    render: function () {
        return (
            <div>
                <StoreList/>
            </div>
        );
    }
});

module.exports = Shop;