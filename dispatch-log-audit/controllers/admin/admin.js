
exports.getIndex = (req, res, next) => {
    res.render("admin/index", {
        pageTitle: "Administrator | Index"
    });
}