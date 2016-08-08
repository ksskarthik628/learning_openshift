(function () {
    angular
        .module("WamDirectives", [])
        .directive("wamSortable", WamSortable);

    function WamSortable() {

        function link(scope, element, attributes) {
            var start = -1;
            var end = -1;

            $(element)
                .find(".widget-class")
                .sortable({
                    axis: 'y',
                    start: function (event, ui) {
                        start = ui.item.index();
                    },
                    stop: function (event, ui) {
                        end = ui.item.index();
                        scope.callback({start: start, end: end});
                    }
                });
        }

        return {
            templateUrl: "views/widget/widget.view.client.html",
            scope: {
                model: "=data",
                callback: "&"
            },
            link: link
        }

    }
})();