(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.newWebsite = newWebsite;
        vm.openWebsite = openWebsite;
        vm.editWebsite = editWebsite;
        vm.profile = profile;

        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(function (response) {
                    vm.websites = response.data;
                });
        }
        init();

        function newWebsite() {
            $location.url("/user/" + vm.userId + "/website/new");
        }
        
        function openWebsite(website) {
            $location.url("/user/" + vm.userId + "/website/" + website._id + "/page");
        }
        
        function editWebsite(website) {
            $location.url("/user/" + vm.userId + "/website/" + website._id);
        }

        function profile() {
            $location.url("/user/" + vm.userId);
        }
    }

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.back = back;
        vm.createWebsite = createWebsite;
        vm.profile = profile;
        vm.dismiss = dismiss;
        
        function back() {
            $location.url("/user/" + vm.userId + "/website");
        }
        
        function createWebsite(website) {
            WebsiteService
                .createWebsite(vm.userId, website)
                .then(function (response) {
                    website = response.data;
                    if (website._id) {
                        vm.success = "Website created";
                        $location.url("/user/" + vm.userId + "/website");
                    } else {
                        vm.alert = "Unable to create website";
                    }
                });
        }

        function profile() {
            $location.url("/user/" + vm.userId);
        }
        
        function dismiss() {
            vm.alert = "";
        }
    }

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        vm.back = back;
        vm.profile = profile;
        vm.dismiss = dismiss;
        
        function init() {
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(function (response) {
                    vm.website = response.data;
                });
        }
        init();
        
        function updateWebsite(website) {
            WebsiteService
                .updateWebsite(vm.websiteId, website)
                .then(function (response) {
                        vm.success = "Website Updated";
                        $location.url("/user/" + vm.userId + "/website");
                }, function (response) {
                    vm.alert = "Unable to update website";
                });
        }

        function deleteWebsite() {
            WebsiteService
                .deleteWebsite(vm.websiteId)
                .then(function (response) {
                    vm.success = "Website deleted";
                    $location.url("/user/" + vm.userId + "/website");
                }, function (response) {
                    vm.alert = "Unable to delete website";
                });
        }

        function back() {
            $location.url("/user/" + vm.userId + "/website");
        }

        function profile() {
            $location.url("/user/" + vm.userId);
        }

        function dismiss() {
            vm.alert = "";
        }
    }
})();