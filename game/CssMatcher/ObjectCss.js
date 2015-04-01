define("game/CssMatcher/ObjectCss", [], function()
{
   var ClassFunction = function()
   {

   };

    _.extend(ClassFunction.prototype, {
        name: null,
        id : null,
        classes: new Array(),
        propertys: {},
        addId: function(id)
        {

        },
        addName: function(name)
        {

        },
        setName: function(name)
        {
            this.name = name;
        },
        addClass: function(name)
        {

        },
        hasId: function(id)
        {

        },
        hasName: function(name)
        {
            return this.name == name;
        },
        hasClass: function(name)
        {

        },
        getId: function()
        {

        },
        setId: function(id)
        {

        },
        getName : function()
        {
            return this.name;
        },
        getClasses: function()
        {

        },
        getProperty: function(name)
        {
            return this.propertys[name];
        },
        setProperty: function(name, value)
        {
            this.propertys[name] = value;
        },
        getPropertys: function()
        {
            return this.propertys;
        },
        hasProperty: function(name)
        {
            return (typeof this.propertys[name] != "undefined");
        }
    });

    return ClassFunction;
});
