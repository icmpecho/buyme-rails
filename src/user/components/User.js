'use strict';

var React = require('react');
var Login = require('./Login');
var Signup = require('./Signup');

var User = React.createClass({
    getInitialState: function () {
        return {
            page: 'login'
        };
    },
    render: function () {
        var page = this.state.page === 'login' ? <Login changePage={this.changePage}/> : <Signup changePage={this.changePage}/>;

        return (
            <div>
                {page}
            </div>
        );
    },
    changePage: function (page) {
        this.setState({
            page: page
        });
    }
});

module.exports = User;