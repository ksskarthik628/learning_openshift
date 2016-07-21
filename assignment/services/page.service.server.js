module.exports = function (app) {

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];

    app.post("/api/website/:wid/page", createPage);
    app.get("/api/website/:wid/page", findAllPagesForWebsite);
    app.get("/api/page/:pid", findPageById);
    app.put("/api/page/:pid", updatePage);
    app.delete("/api/page/:pid", deletePage);

    function createPage(req, res) {
        var websiteId = req.params['wid'];
        var page = req.body;
        var newPage = {
            "_id": (new Date()).getTime() + "",
            "name": page.name,
            "title": page.title,
            "websiteId": websiteId
        };
        pages.push(newPage);
        res.json(newPage);
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params['wid'];
        var results = [];
        for (var i in pages) {
            if (pages[i].websiteId === websiteId) {
                results.push(pages[i]);
            }
        }
        res.json(results);
    }

    function findPageById(req, res) {
        var pageId = req.params['pid'];
        for (var i in pages) {
            if (pages[i]._id === pageId) {
                res.json(pages[i]);
                return;
            }
        }
        res.json({});
    }

    function updatePage(req, res) {
        var pageId = req.params['pid'];
        var page = req.body;
        for (var i in pages) {
            if (pages[i]._id === pageId) {
                pages[i].name = page.name;
                pages[i].title = page.title;
                res.send(200);
                return;
            }
        }
        res.send(400);
    }

    function deletePage(req, res) {
        var pageId = req.params['pid'];
        for (var i in pages) {
            if (pages[i]._id === pageId) {
                pages.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.send(400);
    }

};