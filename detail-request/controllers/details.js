exports.getIndex = (req, res, next) => {
    res.redirect("/details");
}

exports.getDetails = (req, res, next) => {
    res.render("index");
}

exports.getNewDetailForm = (req, res, next) => {
    res.render("new");
}

exports.postNewDetail = (req, res, next) => {
    res.redirect('/details');
}