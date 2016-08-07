module.exports = function (app, models) {

    var websiteModel = models.websiteModel;

    app.post("/api/user/:uid/website", createWebsite);
    app.get("/api/user/:uid/website", findAllWebsitesForUser);
    app.get("/api/website/:wid", findWebsiteById);
    app.put("/api/website/:wid", updateWebsite);
    app.delete("/api/website/:wid", deleteWebsite);

    function createWebsite(req, res) {
        var website = req.body;
        var userId = req.params['uid'];
        websiteModel
            .createWebsiteForUser(userId, website)
            .then(function (website) {
                res.json(website);
            }, function (error) {
                res.status(400).send(error);
            });
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params['uid'];
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(function (websites) {
                res.json(websites);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params['wid'];
        websiteModel
            .findWebsiteById(websiteId)
            .then(function (website) {
                res.json(website);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function updateWebsite(req, res) {
        var websiteId = req.params['wid'];
        var website = req.body;
        websiteModel
            .updateWebsite(websiteId, website)
            .then(function (stats) {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(400);
            });
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params['wid'];
        websiteModel
            .deleteWebsite(websiteId)
            .then(function (stats) {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(400);
            });
    }

};