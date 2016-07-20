(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

        function createUser(user) {
            var url = "/api/user";
            return $http.post(url, user);
        }
        
        function findUserById(userId) {
            var url = "/api/user/" + userId;
            return $http.get(url);
        }
        
        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url);
        }

        function updateUser(userId, user) {
            for (var i in users) {
                if (users[i]._id === userId) {
                    users[i].firstName = user.firstName;
                    users[i].lastName = user.lastName;
                    return true;
                }
            }
            return false;
        }
        function deleteUser(userId) {
            for (var i in users) {
                if (users[i]._id === userId) {
                    users.splice(i, 1);
                    return true;
                }
            }
            return false;
        }
    }
})();