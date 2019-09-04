exports.getIndex = (req, res, next) => {
    res.render("admin/index", {
        pageTitle: "Admin Dashboard"
    });
}

exports.getNewCalltaker = (req, res, next) => {
    res.send("new calltaker entry form");
}

exports.postNewCalltaker = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    
}