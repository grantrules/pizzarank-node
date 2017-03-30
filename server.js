var config = require('./config');
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');

var Restaurant = require('./models/restaurant');
var restaurantController = require('./controllers/restaurants');

var User = require('./models/user.js');
var userController = require('./controllers/users');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.use(passport.initialize());

var mongoose = require('mongoose');
mongoose.connect(config.mongodb);

/*
var GoogleStrategy = require('passport-google').Strategy;

passport.use(new GoogleStrategy({
        returnURL: 'http://localhost/auth/google/return',
        realm: 'http://localhost/'
    },
    function(identifier, profile, done) {
        process.nextTick(function () {
            profile.identifier = identifier;
            return done(null, profile);
        });
    }
));
*/

var router = express.Router();

// static files, switch this to a 
app.use(express.static('client'));
app.use('/node_modules', express.static('node_modules'));


app.use('/api', router);

// RESTAURANTS
router.route('/restaurants')
    .post(restaurantController.postRestaurants)

    .get(restaurantController.getRestaurants);

router.route('/restaurants/nearby')
    .get(restaurantController.getRestaurantsNearby);

router.route('/restaurants/:restaurant_id')
    .get(restaurantController.getRestaurant)

    .put(restaurantController.putRestaurant)

    .delete(restaurantController.deleteRestaurant);

router.route('/ratings/:restaurant_id')
    .post(restaurantController.postRatings);


// USERS
router.route('/users')
    .post(userController.postUsers)

    .get(userController.getUsers);

router.route('/user/:user_id')
    .get(userController.getUser)

    .put(userController.putUser)

    .delete(userController.deleteUser);

app.listen(config.port);

console.log('pizzarank running on ' + config.port);