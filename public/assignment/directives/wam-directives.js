(function () {
    angular
        .module("WamDirectives", [])
        .directive("wamSortable", WamSortable);

    function WamSortable($http) {

        function link(scope, element, attributes) {

        }

        return {
            link: link
        }

    }
})();