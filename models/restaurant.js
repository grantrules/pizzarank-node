var mongoose = require('mongoose');
//var Rating = require('./rating');
var User = require('./user');
var ObjectId = mongoose.Schema.ObjectId;
var imageSchema = new mongoose.Schema({
    title: String,
    comment: String,
    date_added: { type: Date, default: Date.now },
    filename: String,
    user: { type: ObjectId, ref: 'User' },
});

//module.exports = mongoose.model('Image', imageSchema);

var ratingSchema = new mongoose.Schema({
    title: String,
    rating: Number,
    body: String,
    updates: [new mongoose.Schema({
        body: String,
        date_added: { type: Date, default: Date.now },
        response: { type: Boolean, default: false },

    })],
    date_added: { type: Date, default: Date.now },
    images: [imageSchema],
    user: { type: ObjectId, ref: 'User' },
});

//module.exports = mongoose.model('Rating', ratingSchema);

var restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: { type: ObjectId, ref: 'User' },
    
    // group together address, city, state and make sure they're unique.. street address alone isn't unique
    address: { 
        streetAddress: String,
        city: String,
        state: String,
        zipcode: String,
        neighborhood: String,
        borough: String,
    },
    date_added: {
        type: Date,
        default: Date.now
    },
    location: {
        type: [Number],
        index: '2d'
    },
    phoneNumber: String,
    plainSlicePrice: Number,
    closed: {
        type: Boolean,
        default: false
    },
    ratings: [ratingSchema],
    images: [imageSchema],
    
    
});

module.exports = mongoose.model('Restaurant', restaurantSchema);



var ownerClaimScheme = new mongoose.Schema({
    user: { type: ObjectId, ref: 'User' },
    restaurant: { type: ObjectId, ref: 'Restaurant' },
    date_added: {
        type: Date,
        default: Date.now
    },
});

//module.exports = mongoose.model('OwnerClaim', ownerClaimScheme);