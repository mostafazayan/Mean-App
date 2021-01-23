const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: { type: String, require: true },
    description: { type: String, require: true },
    post: { type: String, require: true },
    createdAt: {type: Date, default: Date.now}
});

module.exports =  mongoose.model('Post', postSchema);