const Detail = require('../models/detail');

exports.getIndex = (req, res, next) => {

    res.redirect("/details");
}

exports.getDetails = (req, res, next) => {
    Detail
        .find({ filled: false })
        .then(details => {
            return res.render("index", {
                pageTitle: "Available Details",
                details: details
            });
        })
        .catch(err => console.log(err));

}

exports.getNewDetailForm = (req, res, next) => {
    res.render("new", {
        pageTitle: "Create New Detail"
    });
}

exports.postNewDetail = (req, res, next) => {
    const detailDate = req.body.detailDate;
    const detailStartTime = req.body.detailStartTime;
    const detailDuration = req.body.detailDuration;
    const asapStart = req.body.asapStart;
    const detailEndTime = req.body.detailEndTime;

    const city = req.body.city;
    const zip = req.body.zip;

    const streetOneNumber = req.body.streetOneNumber;
    const streetOneName = req.body.streetOneName;
    const streetOneSuffix = req.body.streetOneSuffix;

    const streetTwoNumber = req.body.streetTwoNumber;
    const streetTwoName = req.body.streetTwoName;
    const streetTwoSuffix = req.body.streetTwoSuffix;

    const numberOfficers = req.body.numberOfficers;

    const billingCompany = req.body.billingCompany;
    const requestorName = req.body.requestorName;
    const requestorTelephone = req.body.requestorTelephone;

    const notes = req.body.notes;

    console.log("STREET ONE SUFFIX:  ", req.body.streetOneSuffix)

    const newDetail = {
        calltakerId: null,
        detailDate: detailDate,
        detailDuration: detailDuration,
        detailStartTime: detailStartTime,
        asapStart: asapStart,
        detailEndTime: detailEndTime,
        detailLocation: {
            city: city,
            zip: zip,
            streetOneNumber: streetOneNumber,
            streetOneName: streetOneName,
            streetOneSuffix: streetOneSuffix,
            streetTwoNumber: streetTwoNumber,
            streetTwoName: streetTwoName,
            streetTwoSuffix: streetTwoSuffix
        },
        numberOfficers: numberOfficers,
        requestor: {
            billingCompany: billingCompany,
            name: requestorName,
            telephone: requestorTelephone
        },
        officerId: null,
        filled: false,
        notes: notes
    };

    Detail
        .create(newDetail)
        .then(result => {
            console.log("NEW DETAIL ADDED", result)
            res.redirect('/details');
        })
        .catch(err => console.log(err));


}

// SHOW DB RESULTS
exports.show = (req, res, next) => {
    const search = req.query.sortBy;
    let q = {};

    switch (search) {
        case 'asap':
            q = { asapStart: true }
            break;

        case 'unfilled':
            q = { filled: false }
            break;
        case 'filled':
            q = { filled: true }
            break;
        case 'all':
            q = {}
            break;
    }

    Detail
        .find(q)
        .then(details => {
            // console.log(details)
            return res.render("index", {
                pageTitle: `Sorted Results | ${search.charAt(0).toUpperCase() + search.slice(1)}`,
                details: details
            });
        })
        .catch(err => console.log(err));

}