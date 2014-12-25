'use strict';

var assign = require('object-assign');

var ApiUtils = require('./ApiUtils');

var UserApi = assign({}, ApiUtils, {
    login: function (email, password, remember) {
        var data = {
            //utf8: '✓',
            user: {
                email: email,
                password: password,
                remember_me: !!remember ? 1 : 0
            },
            commit: 'Log in'
        };
        this.post('/users/sign_in')
            .send(data)
            .end(function (error, res) {
                if (!!error) {
                    return console.log(error);
                }
                if (res.status !== 201) {
                    alert(JSON.parse(res.text).error);
                    return;
                }
                window.location = '/app';
                //console.log(res);
                //alert('login ok');
            });
    },
    signup: function (email, password, confirmation) {
        if (password !== confirmation) {
            alert('Password and confirmation password are not equal.');
            return;
        }
        var data = {
            user: {
                email: email,
                password: password,
                password_confirmation: confirmation
            },
            commit: 'Sign up'
        };
        this.post('/users')
            .send(data)
            .end(function (error, res) {
                console.log(res);
                if (!!error) {
                    return console.log(error);
                }
                if (res.status !== 201) {
                    if (res.status === 422) {
                        alert('The email address is already used.');
                    }
                    return;
                }
                window.location = '/app';
                //console.log(res);
                //alert('signup ok');
            });
    },
    logout: function () {
        var data = {
            user: {
                id: 2
            }
        };
        this.del('/users/sign_out')
            .send(data)
            .end(function (res) {
                console.log(res.status);
            });
    }
});

module.exports = UserApi;