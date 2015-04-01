define([
    "game/CssMatcher/ObjectCssInterface",
    "game/CssMatcher/CssParser",
    "game/CacheManager/CacheManagerInterface"
], function(
    ObjectCssInterface,
    CssParser,
    CacheManagerInterface
)
{
   var Stylesheet = {
        theme: "Default",
        definitionsCss: {},
        folder: "theme/",
       __stateCss : {},
       cacheStorage: null,
       setCacheStorage: function(cacheStorage)
       {
           var validate = InterfaceValidity.validatePrototype(Object.getPrototypeOf(cacheStorage), CacheManagerInterface);

           if(validate !== true)
           {
               InterfaceValidity.throwError(validate);
           }

           Stylesheet.cacheStorage = cacheStorage;
       },
       getCacheStorage: function()
       {
           return Stylesheet.cacheStorage;
       },
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
            Stylesheet.definitionsCss[name] = Stylesheet.getParser().parse(resource, type);
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

            var cacheStorage = Stylesheet.getCacheStorage();

            var entityRepresent = (typeof entity.objectCss != "undefined") ? entity.objectCss : entity;

            var identifier = entityRepresent.getIdentifier();

            var validatedRepresent = InterfaceValidity.validatePrototype(Object.getPrototypeOf(entityRepresent), ObjectCssInterface);

            if(validatedRepresent !== true)
            {
                InterfaceValidity.throwError(validatedRepresent);
            }

            if(cacheStorage.has(identifier))
            {
                return cacheStorage.get(identifier, "object");
            }

            _.each(Stylesheet.definitionsCss, function(resource)
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

            cacheStorage.set(identifier, render, "object");

            return render;
        }
   };

    return Stylesheet;
});