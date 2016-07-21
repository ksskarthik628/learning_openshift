module.exports = function (app) {

    var users = [
        {"_id": "123", "username": "alice",    "password": "alice",    "firstName": "Alice",  "lastName": "Wonder"  },
        {"_id": "234", "username": "bob",      "password": "bob",      "firstName": "Bob",    "lastName": "Marley"  },
        {"_id": "345", "username": "charly",   "password": "charly",   "firstName": "Charly", "lastName": "Garcia"  },
        {"_id": "456", "username": "jannunzi", "password": "jannunzi", "firstName": "Jose",   "lastName": "Annunzi" }
    ];

    app.post("/api/user", createUser);
    app.get("/api/user", findUserByUsername);
    app.get("/api/user/:uid", findUserById);
    app.put("/api/user/:uid", updateUser);
    app.delete("/api/user/:uid", deleteUser);

    function createUser(req, res) {
        var user = req.body;
        var newUser = {
            "_id": (new Date()).getTime() + "",
            "username": user.username,
            "password": user.password,
            "firstName": user.firstName,
            "lastName": user.lastName
        };
        users.push(newUser);
        res.json(newUser);
    }

    function findUserByUsername(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if (password) {
            findUserByCredentials(username, password, res);
        } else {
            for (var i in users) {
                if (users[i].username === username) {
                    res.json(users[i]);
                    return;
                }
            }
            res.json({});
        }
    }

    function findUserByCredentials(username, password, res) {
        for (var i in users) {
            if (users[i].username === username && users[i].password === password) {
                res.json(users[i]);
                return;
            }
        }
        res.json({});
    }
    
    function findUserById(req, res) {
        var userId = req.params['uid'];
        for (var i in users) {
            if (users[i]._id === userId) {
                res.json(users[i]);
                return;
            }
        }
        res.json({});
    }

    function updateUser(req, res) {
        var userId = req.params['uid'];
        var user = req.body;
        for (var i in users) {
            if (users[i]._id === userId) {
                users[i].firstName = user.firstName;
                users[i].lastName = user.lastName;
                res.send(200);
                return;
            }
        }
        res.status(400);
    }
    
    function deleteUser(req, res) {
        var userId = req.params['uid'];
        for (var i in users) {
            if (users[i]._id === userId) {
                users.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.send(400);
    }

};