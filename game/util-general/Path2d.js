/**
 * Arg 1: liste d'objet {x:0,y:0} ex: [{x:0,y:0} , {x:4,y:10} , {x:40,y:50}]
 */
function Path2d(vectices_tab) {
    this.priv_vectices = vectices_tab;
    this.priv_verticesIndex=0;
    this.priv_callback = undefined;

    if (Path2d.initialized === undefined) {

        /**
         * Déplace un body selont un chemain pré établie
         */
        Path2d.prototype.update = function(body, float_speed){
            var x = body.position.x;
            var y = body.position.y;
            var xDir=-1, yDir=-1;
            var dx=undefined, dy=undefined;

            if(this.priv_verticesIndex >= this.priv_vectices.length){
                this.priv_verticesIndex = 0;
            }

            dx = this.priv_vectices[this.priv_verticesIndex].x;
            dy = this.priv_vectices[this.priv_verticesIndex].y;

            var tempX = x-dx,tempY = y -dy;

            if(tempX < 0){
                xDir = 1;
                tempX *= -1;
            }

            if(tempY < 0){
                yDir = 1;
                tempY *= -1;
            }

            var totalPix = tempX + tempY;
            var frag = float_speed / totalPix;
            var xSpeed = frag*tempX , ySpeed = frag*tempY;

            xSpeed *= xDir;
            ySpeed *= yDir;

            Matter.Body.translate(body,{x:xSpeed, y:ySpeed });

            if(body.position.x <= dx+float_speed && body.position.x >= dx-float_speed){
                if(body.position.y <= dy+float_speed && body.position.y >= dy-float_speed){
                    this.priv_verticesIndex++;

                    if(this.priv_callback !== undefined){
                        this.priv_callback();
                    }
                }
            }

        };

        /**
         * Recommence le chemain depuit le début
         */
        Path2d.prototype.resetPath = function(){
            this.priv_verticesIndex=0;
        }

        /**
         * Permet de configurer une fonction qui seras apeller a chaque fois qu'une destination est atteinte.
         */
        Path2d.prototype.setDestinationCallback = function(callback){
            this.priv_callback = callback;
        }

        Path2d.initialized = true;
    }
}

Path2d.getLessFar = function(myEntity, others)
{
    _.sortBy(others, function(other)
    {
        var distance = Path2d.getDistance(myEntity, other);

        return distance.y + distance.x;
    });

    return _.first(others);
};

Path2d.getDistance = function(left, right)
{
    return {
        x: left.getPosition().x - right.getPosition().y,
        y: left.getPosition().y - right.getPosition().y
    };
};