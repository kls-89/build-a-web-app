exports.getIndex = (req, res, next) => {
    res.redirect("/details");
}

exports.getDetails = (req, res, next) => {
    res.render("index", {
        pageTitle: "Available Details"
    });
}

exports.getNewDetailForm = (req, res, next) => {
    res.render("new", {
        pageTitle: "Create New Detail"
    });
}

exports.postNewDetail = (req, res, next) => {
    console.log(req.body);
    res.redirect('/details');
}