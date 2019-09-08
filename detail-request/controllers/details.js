const Detail = require('../models/detail');
const mongoose = require('mongoose');

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

// EDIT/UPDATE
exports.getEditDetail = (req, res, next) => {
    Detail
        .findById(req.params.id)
        .then(detail => {
            console.log(detail);
            return res.render('edit', { pageTitle: "Edit Detail", details: detail })
        })
        .catch(err => console.log(err));
}


exports.postEditDetail = (req, res, next) => {
    const updatedDetailDate = req.body.detailDate;
    const updatedDetailStartTime = req.body.detailStartTime;
    const updatedDetailDuration = req.body.detailDuration;
    const updatedAsapStart = req.body.asapStart;
    const updatedDetailEndTime = req.body.detailEndTime;

    const updatedCity = req.body.city;
    const updatedZip = req.body.zip;

    const updatedStreetOneNumber = req.body.streetOneNumber;
    const updatedStreetOneName = req.body.streetOneName;
    const updatedStreetOneSuffix = req.body.streetOneSuffix;

    const updatedStreetTwoNumber = req.body.streetTwoNumber;
    const updatedStreetTwoName = req.body.streetTwoName;
    const updatedStreetTwoSuffix = req.body.streetTwoSuffix;

    const updatedNumberOfficers = req.body.numberOfficers;

    const updatedBillingCompany = req.body.billingCompany;
    const updatedRequestorName = req.body.requestorName;
    const updatedRequestorTelephone = req.body.requestorTelephone;

    const updatedNotes = req.body.notes;

    const updatedDetail = {
        calltakerId: null,
        detailDate: updatedDetailDate,
        detailDuration: updatedDetailDuration,
        detailStartTime: updatedDetailStartTime,
        asapStart: updatedAsapStart,
        detailEndTime: updatedDetailEndTime,
        detailLocation: {
            city: updatedCity,
            zip: updatedZip,
            streetOneNumber: updatedStreetOneNumber,
            streetOneName: updatedStreetOneName,
            streetOneSuffix: updatedStreetOneSuffix,
            streetTwoNumber: updatedStreetTwoNumber,
            streetTwoName: updatedStreetTwoName,
            streetTwoSuffix: updatedStreetTwoSuffix
        },
        numberOfficers: updatedNumberOfficers,
        requestor: {
            billingCompany: updatedBillingCompany,
            name: updatedRequestorName,
            telephone: updatedRequestorTelephone
        },
        officerId: null,
        filled: false,
        notes: updatedNotes
    };

    return Detail
        .findByIdAndUpdate(req.params.id, { updatedDetail })
        .then(result => {
            console.log("DETAIL UPDATED");
            console.log("CONTROLLER ACTION BROKEN! NOT UPDATING DETAILS")
            return res.redirect('/details');
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