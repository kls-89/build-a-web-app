exports.getIndex = (req, res, next) => {
    res.render("employee/index", {
        pageTitle: "Employee Home",
        employeeName: "Employee"
    });
}


