const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    image: {type: String, required: true},
    title: { type: String, required: true },
    description: { type: String, required: true },
    post: { type: String, required: true },
    createdAt: {type: Date, default: Date.now}
});

module.exports =  mongoose.model('Post', postSchema);