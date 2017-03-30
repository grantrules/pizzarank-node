var mongoose = require('mongoose');

var ratingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date_added: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Object
    },
    pizza_quality: Number,
    price: Number,
    restaurant_quality: Number,
    review: String,
    
});

module.exports = mongoose.model('Rating', ratingSchema);