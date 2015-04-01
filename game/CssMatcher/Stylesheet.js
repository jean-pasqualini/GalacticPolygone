define(["game/CssMatcher/ObjectCssInterface", "game/CssMatcher/CssParser"], function(ObjectCssInterface, CssParser)
{
   var StyleSheet = {
        theme: "Default",
        definitionsCss: {},
        folder: "theme/",
       __stateCss : {},
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
        addResource: function(resource, type, name)
        {
            StyleSheet.definitionsCss[name] = StyleSheet.getParser().parse(resource, type);
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

            var entityRepresent = (typeof entity.objectCss != "undefined") ? entity.objectCss : entity;

            var identifier = entityRepresent.getIdentifier();

            var validatedRepresent = InterfaceValidity.validatePrototype(Object.getPrototypeOf(entityRepresent), ObjectCssInterface);

            if(validatedRepresent !== true)
            {
                InterfaceValidity.throwError(validatedRepresent);
            }

            if(typeof StyleSheet.__stateCss[identifier] != "undefined")
            {
                return StyleSheet.__stateCss[identifier];
            }

            _.each(StyleSheet.definitionsCss, function(resource)
            {
                _.each(resource, function(cssObject, selector)
                {
                    if(cssObject.hasName(entityRepresent.getName()))
                    {
                        var classesObject = cssObject.getClasses();
                        var classesEntity = entityRepresent.getClasses();

                        if(
                            _.isEmpty(classesObject)
                            ||
                            _.isEmpty(_.difference(classesObject, classesEntity))
                        )
                        {
                            _.extend(matched, cssObject.getPropertys());
                        }
                    }
                });
            });

            if(typeof matched.border != "undefined") render.strokeStyle = matched.border;
            if(typeof matched["background-color"] != "undefined") render.fillStyle = matched["background-color"];
            if(typeof matched["background-image"] != "undefined") render.sprite = { xScale: 1, yScale: 1, texture : matched["background-image"] };
            if(typeof matched["border-width"] != "undefined") render.lineWidth = { texture : matched["border-width"] };
            if(typeof matched["background-sound"] != "undefined") render.sound = matched["background-sound"];

            StyleSheet.__stateCss[identifier] = render;

            return render;
        }
   };

    return StyleSheet;
});