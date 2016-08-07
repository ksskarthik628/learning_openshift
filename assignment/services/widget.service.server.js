module.exports = function (app, models) {

    var widgetModel = models.widgetModel;

    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post("/api/page/:pid/widget", createWidget);
    app.get("/api/page/:pid/widget", findAllWidgetsForPage);
    app.put("/api/page/:pid/widget", reorderWidgetsForPage);
    app.get("/api/widget/:wgid", findWidgetById);
    app.put("/api/widget/:wgid", updateWidget);
    app.delete("/api/widget/:wgid", deleteWidget);
    app.post("/api/upload", upload.single('myFile'), uploadImage);

    function createWidget(req, res) {
        var pageId = req.params['pid'];
        var widget = req.body;
        widgetModel
            .createWidget(pageId, widget)
            .then(function (widget) {
                res.json(widget);
            }, function (error) {
                res.status(400).send(error);
            });
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params['pid'];
        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                res.json(widgets);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function reorderWidgetsForPage(req, res) {
        var pageId = req.params['pid'];
        var start = req.query['start'];
        var end = req.query['end'];

        widgetModel
            .reorderWidget(pageId, start, end)
            .then(function (stats) {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(400);
            });
    }

    function findWidgetById(req, res) {
        var widgetId = req.params['wgid'];
        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                res.json(widget);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function updateWidget(req, res) {
        var widgetId = req.params['wgid'];
        var widget = req.body;
        widgetModel
            .updateWidget(widgetId, widget)
            .then(function (stats) {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(400);
            });
    }

    function deleteWidget(req, res) {
        var widgetId = req.params['wgid'];
        widgetModel
            .deleteWidget(widgetId)
            .then(function (stats) {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(400);
            });
    }

    function uploadImage(req, res) {
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;
        var returnUrl     = req.body.returnurl;

        if (myFile == null) {
            res.redirect("/assignment/#" + returnUrl);
            return;
        }

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        var widget = {
            url: "/uploads/" + filename
        };
        widgetModel
            .updateWidget(widgetId, widget)
            .then(function (stats) {
                res.redirect("/assignment/#" + returnUrl);
            }, function (error) {
                res.sendStatus(400);
            });
    }

};