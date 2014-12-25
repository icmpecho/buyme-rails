'use strict';

var User = require('../components/User');
var UserStore = require('../stores/UserStore')

var Authentication = {
    statics: {
        willTransitionTo: function (transition) {
            if (!UserStore.getUser()) {
                User.attemptedTransition = transition;
                transition.redirect('/user');
            }
        }
    }
};

module.exports = Authentication;