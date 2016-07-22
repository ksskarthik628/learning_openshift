(function () {
    angular
        .module("WamDirectives", [])
        .directive("wamSortable", WamSortable);

    function WamSortable() {

        function link(scope, element, attributes) {

        }

        return {
            link: link
        }

    }
})();