'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Header = require('./../../common/components/Header');
var Menu = require('./../../common/components/Menu');
var Footer = require('./../../common/components/Footer');
var Home = require('./Home');

var App = React.createClass({
    getInitialState: function () {
        return {};
    },
    render: function () {
        var menuItems = [
            {route: 'me', text: 'Me'},
            {route: 'shop', text: 'Shop'}
        ];
        return (
            <div>
                <Header ref="header" onMenuIconButtonClick={this._onMenuIconButtonClick} title={this.state.title}/>
                <Menu ref="leftNav" menuItems={menuItems} changeTitle={this.changeTitle}/>
                <div className="content clearfix">
                    <RouteHandler />
                </div>
                <Footer />
            </div>
        );
    },
    _onMenuIconButtonClick: function () {
        this.refs.leftNav.toggle();
    },
    changeTitle: function (title) {
        this.setState({
            title: title
        });
    }
});

module.exports = App;