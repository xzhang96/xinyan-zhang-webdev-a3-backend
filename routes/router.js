const { response } = require('express');
const express = require('express');
const { getAllUrl, insertUrl, getUrl, editUrl, deleteUrl, checkBrandExists } = require('../database/url.model');
const utils = require('../utils');

const router = express.Router();

router.get('/', (req, res) => {
    return getAllUrl()
        .then((response) => {
            return res.status(200).send(response)
        }, (error) => {
            return res.status(500).send(error)
        })
})

router.get('/:brand', (req, res) => {
    let brand = req.params.brand
    getUrl(brand)
        .then((response) => {
            if (response != null) {
                originalUrl = response.originalUrl;
                return res.status(200).send(originalUrl);
            } else {
                return res.status(404).send("Url doesn't exists!");
            }
        }, (error) => {
            return res.status(500).send(error)
        })
})

router.get('/:brand/edit', (req, res) => {
    let brand = req.params.brand;
    checkBrandExists(brand)
        .then(response => {
            if (response) {
                return res.status(200).send('success');
            } else {
                return res.status(404).send('Page Not Found!');
            }
        }, error => {
            return res.status(error.response.status).send(error.response.statusText);
        })
})

router.post('/', (req, res) => {
    const urlData = req.body;
    if (!urlData.branded) {
        let id = utils.generateId(10);
        shortenedUrl = req.protocol + '://' + req.get('host') + req.originalUrl + id;
        urlData.shortenedUrl = id;
        insertUrl(urlData)
            .then((response) => {
                return res.status(200).send(response.shortenedUrl);
            }, (error) => {
                return res.status(500).send(error);
            })
            .then(() => {
                console.log("success!");
            })
    } else {
        checkBrandExists(urlData.shortenedUrl)
            .then(response => {
                console.log(response);
                if (response === true) {
                    return res.status(502).send("The custom url already exists!");
                } else {
                    insertUrl(urlData)
                        .then((response) => {
                            return res.status(200).send(response.shortenedUrl);
                        }, (error) => {
                            return res.status(500).send(error);
                        })
                        .then(() => {
                            console.log("success!");
                        })
                }
            }, error => {
                return res.status(500);
            })
    }
})

router.put('/:brand/edit/', (req, res) => {
    const urlData = req.body;
    const brand = req.params.brand;

    editUrl(brand, urlData)
        .then((response) => {
            if (response === null) {
                return res.status(500).send("Path ID not found!");
            } else {
                return res.status(200).send(response);
            }
        }, (error) => {
            return res.status(500);
        })
        .then(() => {
            console.log("success!");
        })
})

router.delete('/:brand/edit/', (req, res) => {
    const brand = req.params.brand;

    deleteUrl(brand)
        .then((response) => {
            return res.status(200).send(response);
        }, (error) => {
            return res.status(500);
        })
        .then(() => {
            console.log("success!");
        })
})

module.exports = router;