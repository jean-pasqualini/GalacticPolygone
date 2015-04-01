define(["game/CssMatcher/ObjectCss"], function(ObjectCss)
{
   'use strict';

    var ClassFunction = function()
    {

    };

    _.extend(ClassFunction.prototype, {
        css : [],
        file: null,
        ligne: 0,
        parseStr: function()
        {

        },
        parseCache: function(cacheData)
        {
            var selecteurs = {};

            _.each(cacheData, function(item, key)
            {
                selecteurs[key] = ObjectCss.factoryFromArray(item);
            });

            return selecteurs;
        },
        parseObject : function(objectData)
        {
            var selecteurs =  {};

            _.each(objectData, function(properties, selector)
            {
                selecteurs[selector] = ObjectCss.factoryFromSelector(selector);

                var selecteur = selecteurs[selector];

                _.each(properties, function(value, key)
                {
                   this.setProperty(key, value);
                }, selecteur);
            });

            console.log(selecteurs);

            return selecteurs;
        },
        getLine: function()
        {

        },
        parse : function(represent, type)
        {
            if(typeof type == "undefined") type = "object";

            if(type == "object")
            {
                return this.parseObject(represent);
            }
            else
            {
                return this.parseCache(represent);
            }
        }
    });

    return ClassFunction;
});