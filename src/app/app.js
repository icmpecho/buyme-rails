'use strict';

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var App = require('./components/App');
var Home = require('./components/Home');
var Me = require('./components/Me');
var Shop = require('./components/Shop');

var routes = (
    <Route name="app" handler={App} path="/">
        <Route name="home" handler={Home}/>
        <Route name="me" handler={Me}/>
        <Route name="shop" handler={Shop}/>
        <DefaultRoute handler={Home}/>
        <NotFoundRoute handler={Home}/>
    </Route>
);

//Router.run(routes, Router.HistoryLocation, function (Handler) {
Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('app'));
});