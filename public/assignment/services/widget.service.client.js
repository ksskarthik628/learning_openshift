(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {

        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        var api = {
            "createWidget": "createWidget",
            "findWidgetsByPageId": "findWidgetsByPageId",
            "findWidgetById": "findWidgetById",
            "updateWidget": "updateWidget",
            "deleteWidget": "deleteWidget"
        };
        return api;

        function createWidget(pageId, widget) {
            var newWidget = {
                "_id": (new Date()).getTime() + "",
                "widgetType": widget.widgetType,
                "pageId": pageId,
                "size": widget.size,
                "text": widget.text,
                "url": widget.url,
                "width": widget.width
            };
            widgets.push(newWidget);
            return newWidget;
        }

        function findWidgetsByPageId(pageId) {
            for (var i in widgets) {
                if (widgets[i].pageId === pageId) {
                    return widgets[i];
                }
            }
            return null;
        }

        function findWidgetById(widgetId) {
            for (var i in widgets) {
                if (widgets[i]._id === widgetId) {
                    return widgets[i];
                }
            }
            return null;
        }

        function updateWidget(widgetId, widget) {
            for (var i in widgets) {
                if (widgets[i]._id === widgetId) {
                    widgets[i].size = widget.size;
                    widgets[i].text = widget.text;
                    widgets[i].url = widget.url;
                    widgets[i].width = widget.width;
                    return true;
                }
            }
            return false;
        }
        function deleteWidget(widgetId) {
            for (var i in widgets) {
                if (widgets[i]._id === widgetId) {
                    widgets.splice(i, 1);
                    return true;
                }
            }
            return false;
        }
    }
})();