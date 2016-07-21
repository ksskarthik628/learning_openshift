(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($location, $routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.back = back;
        vm.newPage = newPage;
        vm.openPage = openPage;
        vm.editPage = editPage;
        vm.profile = profile;

        function init() {
            PageService
                .findPagesByWebsiteId(vm.websiteId)
                .then(function (response) {
                    vm.pages = response.data;
                });
        }
        init();

        function back() {
            $location.url("/user/" + vm.userId + "/website");
        }

        function newPage() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/new");
        }
        
        function openPage(page) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + page._id + "/widget");
        }

        function editPage(page) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + page._id);
        }

        function profile() {
            $location.url("/user/" + vm.userId);
        }
    }

    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.createNewPage = createNewPage;
        vm.back = back;
        vm.profile = profile;
        vm.dismiss = dismiss;

        function createNewPage(page) {
            PageService
                .createPage(vm.websiteId, page)
                .then(function (response) {
                    var page = response.data;
                    if (page._id) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    } else {
                        vm.alert = "Unable to create page";
                    }
                });
        }

        function back() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }

        function profile() {
            $location.url("/user/" + vm.userId);
        }

        function dismiss() {
            vm.alert = "";
        }
    }

    function EditPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;
        vm.back = back;
        vm.profile = profile;
        vm.dismiss = dismiss;

        function init() {
            PageService
                .findPageById(vm.pageId)
                .then(function (response) {
                    vm.page = response.data;
                })
        }
        init();

        function updatePage(page) {
            PageService
                .updatePage(vm.pageId, page)
                .then(function (response) {
                    vm.success = "Page updated";
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                }, function (response) {
                    vm.alert = "Unable to update page";
                });
        }

        function deletePage() {
            PageService
                .deletePage(vm.pageId)
                .then(function (response) {
                    vm.success = "Page deleted";
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                }, function (response) {
                    vm.alert = "Unable to delete page";
                });
        }

        function back() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page")
        }

        function profile() {
            $location.url("/user/" + vm.userId);
        }

        function dismiss() {
            vm.alert = "";
        }
    }
})();