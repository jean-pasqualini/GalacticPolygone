/**
 Notre but va être d'optimiser les différentes features du framework
 */

var fs = require("fs");
var vm = require('vm');
//var _ = require("underscore");
var requirejs = require("requirejs");

requirejs.config({
   nodeRequire : require
});

var code = fs.readFileSync("assets/canvascss/main.canvascss");

vm.runInThisContext(code, "./");

var code = fs.readFileSync("SkelzEngine/libs/underscore-min.js");

vm.runInThisContext(code, "./");

var cacheDir = "./cache/cssObject";

var cacheFile = cacheDir + "/" + "cache.js";

var cacheStream = fs.createWriteStream(cacheFile);

cacheStream.write("var cacheCssObjects = {};\n");

var serializeCssObject = function(cssObject)
{
    var data = {};

    data.name = cssObject.getName();

    data.id = cssObject.getId();

    data.property = cssObject.getPropertys();

    return JSON.stringify(data);
};

requirejs(['game/CssMatcher/CssParser'], function(CssParser)
{
    var cssParser = new CssParser();

    var cssObjects = cssParser.parseObject(CanvasCss);

    _.each(cssObjects, function(cssObject, selector)
    {
        cacheStream.write("cacheCssObjects['"+ selector +"'] = " + serializeCssObject(cssObject) + ";\n");
    });

    cacheStream.end();
});

