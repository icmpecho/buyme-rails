'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Header = require('./../../common/components/Header');
var Menu = require('./../../common/components/Menu');
var Footer = require('./../../common/components/Footer');
var Home = require('./Home');

var ItemApi = require('../utils/ItemApi');

ItemApi.getItems();

var App = React.createClass({
    render: function () {
        return (
            <div>
                <Header onMenuIconButtonClick={this._onMenuIconButtonClick}/>
                <Menu ref="leftNav"/>
                <div className="content clearfix">
                    <RouteHandler />
                </div>
                <Footer />
            </div>
        );
    },
    _onMenuIconButtonClick: function () {
        this.refs.leftNav.toggle();
    }
});

module.exports = App;