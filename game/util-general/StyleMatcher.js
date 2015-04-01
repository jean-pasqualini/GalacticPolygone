var StyleMatcher =
{
    getRules : function(entity) {
        var render = {};

        var matched = StyleMatcher.match(entity);

        if(typeof matched.border) render.strokeStyle = matched.border;
        if(typeof matched["background-color"]) render.fillStyle = matched["background-color"];
        if(typeof matched["background-image"]) render.sprite = { texture : matched["background-image"] };
        if(typeof matched["border-width"]) render.lineWidth = { texture : matched["border-width"] };

        return render;
    },
    match: function(entity)
    {
        return typeof CanvasCss[entity.name] != "undefined" ? CanvasCss[entity.name] : [];
    }
};