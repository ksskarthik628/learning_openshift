module.exports = function (app, models) {

    var userModel = models.userModel;

    app.post("/api/user", createUser);
    app.get("/api/user", findUserByUsername);
    app.get("/api/user/:uid", findUserById);
    app.put("/api/user/:uid", updateUser);
    app.delete("/api/user/:uid", deleteUser);

    function createUser(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.status(400).send(error);
            });
    }

    function findUserByUsername(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if (password) {
            findUserByCredentials(username, password, res);
        } else {
            userModel
                .findUserByUsername(username)
                .then(function (user) {
                    res.json(user);
                }, function (error) {
                    res.status(404).send(error);
                });
        }
    }

    function findUserByCredentials(username, password, res) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.status(404).send(error);
            });
    }
    
    function findUserById(req, res) {
        var userId = req.params['uid'];
        userModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function updateUser(req, res) {
        var userId = req.params['uid'];
        var user = req.body;
        userModel
            .updateUser(userId, user)
            .then(function (stats) {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(400);
            });
    }
    
    function deleteUser(req, res) {
        var userId = req.params['uid'];
        userModel
            .deleteUser(userId)
            .then(function (stats) {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(400);
            });
    }

};