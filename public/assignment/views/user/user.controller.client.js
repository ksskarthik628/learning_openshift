(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, $rootScope, UserService) {
        var vm = this;
        vm.login = login;
        vm.register = register;
        vm.dismiss = dismiss;

        function login(user) {
            UserService
                .login(user)
                .then(function (response) {
                    var user = response.data;
                    if (user._id) {
                        $rootScope.currentUser = user;
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
    
    function RegisterController($location, $rootScope, UserService) {
        var vm = this;
        vm.register = register;
        vm.cancel = cancel;
        vm.dismiss = dismiss;

        function register(user) {
            if (user.password === user.verifyPassword) {
                UserService
                    .register(user)
                    .then(function (response) {
                        var user = response.data;
                        if (user) {
                            $rootScope.currentUser = user;
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
    
    function ProfileController($location, $routeParams, $rootScope, UserService) {
        var vm = this;
        vm.userId = $rootScope.currentUser._id;
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
            UserService
                .logout()
                .then(function (response) {
                    $rootScope.currentUser = null;
                    $location.url("/login");
                });
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