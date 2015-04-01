define(["game/CssMatcher/ObjectCssInterface", "game/CssMatcher/CssParser"], function(ObjectCssInterface, CssParser)
{
   var StyleSheet = {
        theme: "Default",
        definitionsCss: {},
        folder: "theme/",
        setTheme: function(theme)
        {

        },
        getLinkFile: function(file)
        {

        },
        getParser : function()
        {
            return new CssParser();
        },
        addFile: function(file)
        {
            StyleSheet.definitionsCss[file] = StyleSheet.getParser().parse(CanvasCss);
        },
        removeFile: function(file)
        {

        },
        switchFile: function(oldFile, newFile)
        {

        },
        getRulesForObject : function(entity)
        {
            var render = {};

            var matched = {};

            var entityRepresent = entity;

            var validatedRepresent = InterfaceValidity.validatePrototype(Object.getPrototypeOf(entityRepresent), ObjectCssInterface);

            if(validatedRepresent !== true)
            {
                InterfaceValidity.throwError(validatedRepresent);
            }

            _.each(StyleSheet.definitionsCss, function(resource)
            {
                _.each(resource, function(cssObject)
                {
                    if(cssObject.hasName(entityRepresent.getName()))
                    {
                        _.extend(matched, cssObject.getPropertys());
                    }
                });
            });

            if(typeof matched.border != "undefined") render.strokeStyle = matched.border;
            if(typeof matched["background-color"] != "undefined") render.fillStyle = matched["background-color"];
            if(typeof matched["background-image"] != "undefined") render.sprite = { xScale: 1, yScale: 1, texture : matched["background-image"] };
            if(typeof matched["border-width"] != "undefined") render.lineWidth = { texture : matched["border-width"] };

            return render;
        }
   };

    return StyleSheet;
});