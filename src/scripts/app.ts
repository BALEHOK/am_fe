
var Layout = require('./components/common/layout');
var Session = require('./models/Session').SessionModel;

var UserModel = require('./models/User.ts').UserModel;
var user = new UserModel();
user.fetch();

Session.getAuth(function (response) {
    var router = new Router();
    Backbone.history.start();
});
