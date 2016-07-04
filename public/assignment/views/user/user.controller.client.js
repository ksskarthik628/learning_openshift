(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;
        vm.register = register;

        function login(user) {
            user = UserService.findUserByCredentials(user.username, user.password);
            if (user) {
                $location.url("/user/" + user._id);
            } else {
                vm.alert = "Unable to login";
            }
        }

        function register() {
            $location.url("/register");
        }
    }
    
    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;
        vm.cancel = cancel;

        function register(user) {
            user = UserService.createUser(user);
            if (user) {
                $location.url("/user/" + user._id);
            } else {
                vm.alert = "Unable to register";
            }
        }

        function cancel() {
            $location.uri("/login");
        }
    }
    
    function ProfileController($location, $routeParams, UserService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.updateUser = updateUser;
        vm.website = website;
        vm.logout = logout;
        vm.profile = profile;

        function init() {
            vm.user = UserService.findUserById(vm.userId);
        }
        init();

        function updateUser(user) {
            user = UserService.updateUser(vm.userId, user);
            if (user) {
                vm.success = "Data updated";
            } else {
                vm.alert = "Unable to update data";
            }
        }

        function website() {
            $location.url("/user/" + vm.userId + "/website");
        }

        function logout() {
            $location.url("/login");
        }
        function profile() {
            $location.url("/user/" + vm.userId);
        }
    }
})();