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
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
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
        
        function back() {
            $location.url("/user/" + vm.userId + "/website");
        }
        
        function createWebsite(website) {
            website = WebsiteService.createWebsite(vm.userId, website);
            if (website) {
                vm.success = "Website created";
                $location.url("/user/" + vm.userId + "/website");
            } else {
                vm.alert = "Unable to create website";
            }
        }

        function profile() {
            $location.url("/user/" + vm.userId);
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
        
        function init() {
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();
        
        function updateWebsite(website) {
            website = WebsiteService.updateWebsite(vm.websiteId, website);
            if (website) {
                vm.success = "Website Updated";
                $location.url("/user/" + vm.userId + "/website");
            } else {
                vm.alert = "Unable to update website";
            }
        }

        function deleteWebsite() {
            var response = WebsiteService.deleteWebsite(vm.websiteId);
            if (response) {
                vm.success = "Website deleted";
                $location.url("/user/" + vm.userId + "/website");
            } else {
                vm.alert = "Unable to delete website";
            }
        }

        function back() {
            $location.url("/user/" + vm.userId + "/website");
        }

        function profile() {
            $location.url("/user/" + vm.userId);
        }
    }
})();