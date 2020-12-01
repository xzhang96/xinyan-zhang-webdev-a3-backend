const mongoose = require('mongoose');
const UrlSchema = require('./url.schema').UrlSchema;

const UrlModel = mongoose.model("UrlShortener", UrlSchema);

function insertUrl(url) {
    return UrlModel.create(url)
}

function getAllUrl() {
    return UrlModel.find().exec();
}

function getUrl(shortenedUrl) {
    url = UrlModel.findOne(
        { shortenedUrl: shortenedUrl }
    ).exec();
    return url
}

function checkBrandExists(brand) {
    // UrlModel.exists({shortenedUrl: brand}, (error, result) => {
    //     if (error) {
    //         console.log(error);
    //         return true;
    //     } else {
    //         return result;
    //     }
    // })
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
    getAllUrl: getAllUrl,
    getUrl: getUrl,
    checkBrandExists: checkBrandExists,
    editUrl: editUrl,
    deleteUrl: deleteUrl,
}