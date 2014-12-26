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
                window.location = '/';
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
                window.location = '/';
            });
    },
    logout: function () {
        var data = {
            _method: 'delete'
        };
        this.post('/users/sign_out')
            .send(data)
            .set('Accept', 'text/html')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .end(function (res) {
                if (res.status !== 200) {
                    alert('Failed to log out.');
                    return;
                }
                window.location = '/';
            });
    }
});

module.exports = UserApi;