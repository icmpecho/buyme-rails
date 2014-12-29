'use strict';

var assign = require('object-assign');
var Q = require('q');
var _ = require('underscore');

var ApiUtils = require('./ApiUtils');

var UserApi = assign({}, ApiUtils, {
    login: function (email, password, remember) {
        var deferred = Q.defer();
        if (_.isEmpty(email) || _.isEmpty(password)) {
            setTimeout(function () {
                deferred.reject('Email and Password are required.');
            }, 100);
            return deferred.promise;
        }
        var data = {
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
                    deferred.reject(JSON.parse(res.text).error);
                    return;
                }
                window.location = '/';
                deferred.resolve();
            });
        return deferred.promise;
    },
    signup: function (email, password, confirmation) {
        var deferred = Q.defer();
        if (_.isEmpty(email) || _.isEmpty(password) || _.isEmpty(confirmation)) {
            setTimeout(function () {
                deferred.reject('Email, Password and Password confirmation are required.');
            }, 100);
            return deferred.promise;
        }
        if (password !== confirmation) {
            setTimeout(function () {
                deferred.reject('Password and confirmation password are not equal.');
            }, 100);
            return deferred.promise;
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
                if (!!error) {
                    return console.log(error);
                }
                if (res.status !== 201) {
                    if (res.status === 422) {
                        deferred.reject('The email address is already used.');
                    }
                    return;
                }
                window.location = '/';
                deferred.resolve();
            });
        return deferred.promise;
    },
    logout: function () {
        var deferred = Q.defer();
        var data = {
            _method: 'delete'
        };
        this.post('/users/sign_out')
            .send(data)
            .set('Accept', 'text/html')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .end(function (res) {
                if (res.status !== 200) {
                    deferred.reject('Failed to log out.');
                    return;
                }
                window.location = '/';
                deferred.resolve();
            });
        return deferred.promise;
    }
});

module.exports = UserApi;