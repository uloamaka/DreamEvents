const mongoose = require('mongoose');

const gallery = new mongoose.Schema({
 image : String
});

const Gallery = mongoose.model('Gallery', gallery);

module.exports = Gallery;



