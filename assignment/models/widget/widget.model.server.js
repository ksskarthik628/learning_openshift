module.exports = function () {
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget
    };
    return api;
    
    function createWidget(pageId, widget) {
        widget._page = pageId;
        widget.width = "100%";
        return Widget
            .find({_page: pageId})
            .then(
                function (widgets) {
                    widget.order = widgets.length;
                    return Widget.create(widget);
                }
            );
    }
    
    function findAllWidgetsForPage(pageId) {
        return Widget.find({_page: pageId});
    }
    
    function findWidgetById(widgetId) {
        return Widget.findById(widgetId);
    }
    
    function updateWidget(widgetId, widget) {
        delete widget._id;
        return Widget.update({_id: widgetId},{$set: widget});
    }
    
    function deleteWidget(widgetId) {
        return Widget.findOne({_id: widgetId}, function(err, widget) {
            var order = widget.order;
            var pageId = widget._page;

            Widget
                .find({_page: pageId},
                    function (err, widgets) {
                        widgets.forEach(function (widget) {
                            if (widget.order > order) {
                                widget.order--;
                                widget.save(function() {});
                            } else if (widget.order === order) {
                                widget.remove();
                            }
                        })
                    });
        });
    }
    
    function reorderWidget(pageId, start, end) {
        var start = parseInt(start);
        var end = parseInt(end);

        return Widget
            .find({_page: pageId},
            function (err, widgets) {
                widgets.forEach(function (widget) {
                    if (start > end){
                        if (widget.order >= end && widget.order < start) {
                            widget.order++;
                            widget.save(function () {});
                        } else if (widget.order === start) {
                            widget.order = end;
                            widget.save(function() {});
                        }
                    } else {
                        if (widget.order === start) {
                            widget.order = end;
                            widget.save(function() {});
                        } else if (widget.order > start && widget.order <= end) {
                            widget.order--;
                            widget.save(function() {});
                        }
                    }
                });
            });
    }
};