(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {

        var websites = [
                { "_id": "123", "name": "Facebook",    "developerId": "456" },
                { "_id": "234", "name": "Tweeter",     "developerId": "456" },
                { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
                { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
                { "_id": "678", "name": "Checkers",    "developerId": "123" },
                { "_id": "789", "name": "Chess",       "developerId": "234" }
            ];

        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;

        function createWebsite(userId, website) {
            var newWebsite = {
                "_id": (new Date()).getTime() + "",
                "name": website.name,
                "description": website.description,
                "developerId": userId
            };
            websites.push(newWebsite);
            return newWebsite;
        }

        function findWebsitesByUser(userId) {
            var results = [];
            for (var i in websites) {
                if (websites[i].developerId === userId) {
                    results.push(websites[i]);
                }
            }
            return results;
        }

        function findWebsiteById(websiteId) {
            for (var i in websites) {
                if (websites[i]._id === websiteId) {
                    return websites[i];
                }
            }
            return null;
        }

        function updateWebsite(websiteId, website) {
            for (var i in websites) {
                if (websites[i]._id === websiteId) {
                    websites[i].name = website.name;
                    websites[i].description = website.description;
                    return true;
                }
            }
            return false;
        }
        function deleteWebsite(websiteId) {
            for (var i in websites) {
                if (websites[i]._id === websiteId) {
                    websites.splice(i, 1);
                    return true;
                }
            }
            return false;
        }
    }
})();