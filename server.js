var config = require('./config');
var express = require('express');
var bodyParser = require('body-parser');


var passport = require('passport');
var jwt = require('jsonwebtoken');
var LocalStrategy = require('passport-local').Strategy;

var Restaurant = require('./models/restaurant');
var restaurantController = require('./controllers/restaurants');


var userController = require('./controllers/users');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var mongoose = require('mongoose');
mongoose.connect(config.mongodb);

// LOCAL LOGIN

app.use(passport.initialize());
passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {
    var User = mongoose.model('User');

        User.findOne({'email': email}, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect email.' });
            }
            if (!user.validatePassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        })
    }
));

// JWT

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeader(),
        secretOrKey: 'secret'
    },
    function(jwt_payload, done) {
    console.log(jwt_payload);
    done(null, jwt_payload);
    
    //data is in jwt_payload
    /*
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
            // or you could create a new account 
        }
    });
    */
}));

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
    .post(passport.authenticate('jwt', {session:false}), restaurantController.postRatings);


// USERS
router.route('/users')
    .post(userController.postUsers)

    .get(passport.authenticate('jwt', {session:false}), userController.getUsers);

router.route('/user/:user_id')
    .get(userController.getUser)

    .put(userController.putUser)

    .delete(userController.deleteUser);

// LOGIN
router.route('/login')
    .post(passport.authenticate('local', {session: false}), function(req, res) {
        res.json(jwt.sign(req.user,"secret"));
    }
);

app.listen(config.port);

console.log('pizzarank running on ' + config.port);