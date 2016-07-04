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
            vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);
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

        function createNewPage(page) {
            page = PageService.createPage(vm.websiteId, page);
            if (page) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            } else {
                vm.alert = "Unable to create page";
            }
        }

        function back() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }

        function profile() {
            $location.url("/user/" + vm.userId);
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

        function init() {
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();

        function updatePage(page) {
            page = PageService.updatePage(vm.pageId, page);
            if (page) {
                vm.success = "Page updated";
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            } else {
                vm.alert = "Unable to update page";
            }
        }

        function deletePage() {
            var page = PageService.deletePage(vm.pageId);
            if (page) {
                vm.success = "Page deleted";
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            } else {
                vm.alert = "Unable to delete page";
            }
        }

        function back() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page")
        }

        function profile() {
            $location.url("/user/" + vm.userId);
        }
    }
})();