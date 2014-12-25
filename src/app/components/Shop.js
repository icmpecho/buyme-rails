'use strict';

var React = require('react');

var Authentication = require('../mixins/Authentication');

var Shop = React.createClass({
    mixins: [
        Authentication
    ],
    render: function () {
        return (
            <div className="shop">
                Shop Page
            </div>
        );
    }
});

module.exports = Shop;