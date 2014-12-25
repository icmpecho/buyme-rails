'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Header = require('./Header');
var Menu = require('./Menu');
var Footer = require('./Footer');
var Home = require('./Home');

var ItemApi = require('../utils/ItemApi');

ItemApi.getItems();

var App = React.createClass({
    render: function () {
        return (
            <div>
                <Header onMenuIconButtonClick={this._onMenuIconButtonClick}/>
                <Menu ref="leftNav"/>
                <RouteHandler />
                <Footer />
            </div>
        );
    },
    _onMenuIconButtonClick: function () {
        this.refs.leftNav.toggle();
    }
});

module.exports = App;