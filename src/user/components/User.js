'use strict';

var React = require('react');
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
var Header = require('./../../common/components/Header');
var Footer = require('./../../common/components/Footer');
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
                <Header/>
                <div className="content clearfix">
                    <div className="user">{page}</div>
                </div>
                <Footer />
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