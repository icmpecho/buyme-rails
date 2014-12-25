'use strict';

var React = require('react');

var Authentication = require('../mixins/Authentication');

var Me = React.createClass({
    mixins: [
        Authentication
    ],
    render: function () {
        return (
            <div className="me">
                Me Page
            </div>
        );
    }
});

module.exports = Me;