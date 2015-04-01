define([], function()
{
   var ClassFunction = function() {
       if(typeof localStorage == "undefined")
       {
           throw "local storage required";
       }
   };

    _.extend(ClassFunction, {
        set: function(key, value)
        {
            localStorage.setItem(key, value);
        },
        get: function(key)
        {
            localStorage.getItem(key, value);
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
            return false;
        }
    });
});