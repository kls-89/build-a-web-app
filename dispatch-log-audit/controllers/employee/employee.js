exports.getIndex = (req, res, next) => {
    res.render("employee/index", {employeeName: "Employee"});
}


