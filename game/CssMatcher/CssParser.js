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
        parseObject : function(objectData)
        {
            var selecteurs =  {};

            _.each(objectData, function(properties, selector)
            {
                selecteurs[selector] = new ObjectCss();

                var regexName = /^([A-Za-z]{1,})/;

                var match = null;

                if((match = regexName.exec(selector)) !== null)
                {
                    selecteurs[selector].setName(match[0]);
                }

                _.each(properties, function(value, key)
                {
                   this.setProperty(key, value);
                }, selecteurs[selector]);
            });

            return selecteurs;
        },
        getLine: function()
        {

        },
        parse : function(represent)
        {
            if(typeof represent == "object")
            {
                return this.parseObject(represent);
            }
        }
    });

    return ClassFunction;
});