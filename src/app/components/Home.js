'use strict';

var React = require('react');

var OrderList = require('./OrderList');

var Home = React.createClass({
    render: function () {
        return (
            <div className="home">
                <OrderList ref="orders" title="All Orders" orderType="all"/>
            </div>
        );
    }
});

module.exports = Home;