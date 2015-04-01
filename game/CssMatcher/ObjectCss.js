define("game/CssMatcher/ObjectCss", [], function()
{
   var ClassFunction = function()
   {
        this.classes = new Array();
        this.name = null;
        this.id = null;
        this.propertys = {
            visible: true
        };
        this.selector = null;
   };

   ClassFunction.factoryFromSelector = function(selector)
   {
       var selecteur = new ClassFunction();

       selecteur.selector = selector;

       var regexName = /^([A-Za-z]{1,})/;

       var match = null;

       if((match = regexName.exec(selector)) !== null)
       {
           selecteur.setName(match[1]);

           selector = selector.substr(match[1].length);
       }

       var regexId = /^[#]{1}([A-Z-a-z]{1,})/;

       var match = null;

       if((match = regexId.exec(selector)) !== null)
       {
           selecteur.setId(match[1]);
       }
       else
       {
           var regexClass = /[.]{1}([A-Za-z]{1,})/g;

           var match = null;

           while((match = regexClass.exec(selector)) !== null)
           {
               selecteur.addClass(match[1]);
           }
       }

       return selecteur;
   };

   ClassFunction.factoryFromArray = function(data)
   {
       var selecteur = new ClassFunction();

       selecteur.setId(data.id);

       selecteur.setName(data.name);

       selecteur.setPropertys(data.property);

       selecteur.setClasses(data.classes);

       return selecteur;
   };

    _.extend(ClassFunction.prototype, {
        addId: function(id)
        {

        },
        addName: function(name)
        {

        },
        getIdentifier : function()
        {
            return this.toStringSelector();
        },
        getSelector: function()
        {
            return this.toStringSelector();
        },
        setSelector: function()
        {

        },
        toStringSelector: function()
        {
             return (this.name + ((this.id !== null) ? "#" + this.id : "") + ((!_.isEmpty(this.classes)) ? "." + this.classes.join(".") : ""));
        },
        setName: function(name)
        {
            this.name = name;
        },
        addClass: function(name)
        {
            this.classes.push(name);
        },
        setClasses : function(classes)
        {
            this.classes = new Array(classes);
        },
        removeClass: function(name)
        {
            var index = this.classes.indexOf(name);

            if(index != -1)
            {
                this.classes.splice(index, 1);
            }
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
            return this.classes.indexOf(name) != -1;
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
            return this.classes;
        },
        getProperty: function(name)
        {
            return this.propertys[name];
        },
        setProperty: function(name, value)
        {
            this.propertys[name] = value;
        },
        setPropertys: function(data)
        {
            this.propertys = data;
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
