exports.get404 = (req, res, next) => {
    res.render("404", {
        pageTitle: "Page not found",
        employeeName: req.session.employee.firstName,
        isAdmin: req.session.isAdmin,
        isLoggedIn: req.session.isLoggedIn
    });
}