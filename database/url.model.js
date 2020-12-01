const mongoose = require('mongoose');
const UrlSchema = require('./url.schema').UrlSchema;

const UrlModel = mongoose.model("UrlShortener", UrlSchema);

function insertUrl(url) {
    return UrlModel.create(url)
}

function getUrl(shortenedUrl) {
    url = UrlModel.findOne(
        { shortenedUrl: shortenedUrl }
    ).exec();
    return url
}

function checkBrandExists(brand) {
    return UrlModel.exists(
        {shortenedUrl: brand}
    );
}

function editUrl(shortenedUrl, newUrl) {
    return UrlModel.findOneAndUpdate(
        {
            shortenedUrl: shortenedUrl
        },
        {
           originalUrl: newUrl.originalUrl
        },
        { new: true }
    ).exec();
}

function deleteUrl(url) {
    return UrlModel.deleteOne(
        { shortenedUrl: url }
    ).exec();
}

module.exports = {
    insertUrl: insertUrl,
    getUrl: getUrl,
    checkBrandExists: checkBrandExists,
    editUrl: editUrl,
    deleteUrl: deleteUrl,
}