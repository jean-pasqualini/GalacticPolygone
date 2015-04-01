define([], function()
{
    var ClassFunction = function() {
        if(typeof localStorage == "undefined")
        {
            throw "local storage required";
        }

        this.data = [];
    };

    _.extend(ClassFunction.prototype, {
        set: function(key, value, type)
        {
            this.data[key] = value;
        },
        get: function(key, type)
        {
            return this.data[key];
        },
        has: function(key)
        {
            return typeof this.data[key] != "undefined";
        },
        remove: function(key)
        {
            // Not supported
        },
        isSupport: function()
        {
            return true;
        },
        isSupportObject: function()
        {
            return true;
        },
        isPersistent: function()
        {
            return false;
        },
        store: function(data)
        {
            return this.data = data;
        },
        restore: function()
        {
            return this.data;
        }
    });

    return ClassFunction;
});