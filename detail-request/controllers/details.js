exports.getIndex = (req, res, next) => {
    res.redirect("/details");
}

exports.getDetails = (req, res, next) => {
    res.render("index");
}