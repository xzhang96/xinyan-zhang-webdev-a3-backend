const Schema = require('mongoose').Schema;

exports.UrlSchema = new Schema({
    originalUrl: String,
    shortenedUrl: String,
    branded: Boolean,
}, {
    collection: 'myUrl'
})