define(["game/CacheManager/MemoryStorageCacheManager"], function(MemoryStorage)
{
   var ClassFunction = function() {
       if(typeof localStorage == "undefined")
       {
           throw "local storage required";
       }

       this.memoryStorage = new MemoryStorage();
   };

    _.extend(ClassFunction.prototype, {
        normalizeData: function(data, type)
        {
            switch(type)
            {
                case "object":
                    return JSON.stringify(data);
                break;

                default:
                    return data;
                break;
            }
        },
        denormalizeData: function(data, type)
        {
            switch(type)
            {
                case "object":
                    return JSON.parse(data);
                break;

                default:
                    return data;
                break;
            }
        },
        set: function(key, value, type)
        {
            if(typeof type == "undefined") type = "auto";

            localStorage.setItem(key, this.normalizeData(value, type));
        },
        get: function(key, type)
        {
            if(typeof type == "undefined") type = "auto";

            return this.denormalizeData(localStorage.getItem(key, value), type);
        },
        has: function(key)
        {
            localStorage.getItem(key) !== null;
        },
        remove: function(key)
        {
            localStorage.removeItem(key);
        },
        isSupport: function()
        {
            return true;
        },
        isSupportObject: function()
        {
            return false;
        },
        isPersistent: function()
        {
            return true;
        },
        store: function()
        {
            // Not supported
        },
        restore: function()
        {
            // Not supported
        }
    });

    return ClassFunction;
});