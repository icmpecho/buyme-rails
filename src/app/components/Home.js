'use strict';

var React = require('react');

var FeedList = require('./FeedList');

var Home = React.createClass({
    render: function () {
        return (
            <div className="home">
                <FeedList ref="orders" title="All Orders"/>
            </div>
        );
    }
});

module.exports = Home;