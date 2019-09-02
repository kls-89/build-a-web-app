const moment = require('moment');
const currentYear = moment().format('YY');

exports.getIndex = (req, res, next) => {
    res.render("admin/index", {
        pageTitle: "Administrator | Index",
        currentYear: currentYear,
        submittedValues: false
    });
}

exports.postIndex = (req, res, next) => {
    const starting = Number(req.body.starting);
    const ending = Number(req.body.ending);
    const totalCalls = Math.abs(ending - starting) + 1;
    const percentageOfCalls = Number(req.body.percentage) / 100;
    const numberOfCallsToAudit = Math.ceil(totalCalls * percentageOfCalls);
    console.log("TOTAL ", totalCalls);
    console.log("% CALLS ", percentageOfCalls);
    console.log("NUM TO AUDIT ", numberOfCallsToAudit);

    let randomCallNumbers = [];

    while (randomCallNumbers.length <= numberOfCallsToAudit) {
        let min = Math.ceil(starting);
        let max = Math.floor(ending);
        let randomCall = Math.floor(Math.random() * (max - min + 1)) + min;

        // Only add non-duplicate numbers to final list 
        if (!randomCallNumbers.includes(randomCall)) {
            randomCallNumbers.push(randomCall);
        }
        // Break out of loop once while condition is met
        if (randomCallNumbers.length === numberOfCallsToAudit) {
            break;
        }
    }

    const listOfRandomCallNumbers = randomCallNumbers.map(callNumber => {
        return ` ${currentYear}-${String(callNumber)}`;
    });

    res.render('admin/index', {
        starting: starting,
        ending: ending,
        totalCalls: totalCalls,
        percentageOfCalls: percentageOfCalls,
        numberOfCallsToAudit: numberOfCallsToAudit,
        listOfRandomCallNumbers: listOfRandomCallNumbers,
        submittedValues: true,
        pageTitle: "Administrator | Index",
        currentYear: currentYear,
    });
}

// **BUG: RANDOM NUMBER GENERATOR NOT INCLUDING MAX NUMBER Needs to be fixed!**

exports.getAddUser = (req, res, next) => {
    res.render('admin/add-user', {
        pageTitle: 'Add New User'
    })
}