var Button = (function()
{
    var classFunction = function(options) {
        Entity.call(this);

        if(typeof options == "undefined") options = {};

        var finalOptions = {
            text: ""
        };

        _.extend(finalOptions, options);

        this.text = finalOptions.text;
    };

    _.extend(classFunction.prototype, Entity.prototype, {
        init: function()
        {
            this.id = 5;
            this.name = "Button";

            var x = 0;
            var y = 15;

            var w = "100%";
            var h = 60;

            var padding = {
                left: 15,
                right: 15,
                top: 15,
                bottom: 15
            };

            w = SkelzEngine.priv_const_maxWorldBounds - x - padding.left - padding.right;

            tri = Matter.Bodies.rectangle(x, y, w, h,{ density: 0.01});
            this.setBody(tri);
            //Matter.Body.rotate(tri,3.14/360*2*45*Math.random()*360);
        },
        render: function(room)
        {
            console.log("bouton");
            canvasContext2d.fillStyle = 'rgb(255,0,0)';
            canvasContext2d.fillText(this.text,100,100);
        }
    });

    return classFunction;
})();