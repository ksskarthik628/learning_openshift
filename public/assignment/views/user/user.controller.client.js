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
        vm.dismiss = dismiss;

        function login(user) {
            UserService
                .findUserByCredentials(user.username, user.password)
                .then(function (response) {
                    var user = response.data;
                    if (user._id) {
                        $location.url("/user/" + user._id);
                    } else {
                        vm.alert = "Unable to login";
                    }
                });
        }

        function register() {
            $location.url("/register");
        }

        function dismiss() {
            vm.alert = "";
        }
    }
    
    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;
        vm.cancel = cancel;
        vm.dismiss = dismiss;

        function register(user) {
            if (user.password === user.verifyPassword) {
                UserService
                    .createUser(user)
                    .then(function (response) {
                        var user = response.data;
                        if (user) {
                            $location.url("/user/" + user._id);
                        } else {
                            vm.alert = "Unable to register";
                        }
                    });
            } else {
                vm.alert = "Mismatched passwords";
            }
        }

        function cancel() {
            $location.uri("/login");
        }

        function dismiss() {
            vm.alert = "";
        }
    }
    
    function ProfileController($location, $routeParams, UserService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.updateUser = updateUser;
        vm.website = website;
        vm.logout = logout;
        vm.profile = profile;
        vm.dismiss = dismiss;

        function init() {
            UserService
                .findUserById(vm.userId)
                .then(function (response) {
                    vm.user = response.data;
                });
        }
        init();

        function updateUser(user) {
            UserService
                .updateUser(vm.userId, user)
                .then(function (response) {
                    vm.success = "Data updated";
                }, function (response) {
                    vm.alert = "Unable to update data";
                });
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

        function dismiss() {
            vm.success = "";
            vm.alert = "";
        }
    }
})();