function Path2d(vectices_tab) {
    this.priv_vectices = vectices_tab;
    this.priv_verticesIndex=0;
    this.priv_callback = undefined;

    if (Path2d.initialized === undefined) {

        /**
         * Permet setter un tableau de vertices "{x:0,y:0}" pour le chemain a suivre si ce n'est pas fais au constructeur
         */
        Path2d.prototype.setPath = function(vectices_tab){
            this.priv_vectices = vertices_tab;
        };

        /**
         * vertices = {x:0,y:0};
         * Permet de déplacer automatiquement un body jusca la position donner selon une certainne vitesse
         * sans passer par la méthode update de Path2d.
         * "Méthode séquentiel" passer dans une boucle de jeux.
         * retourne true quand arriver a destination.
         */
        Path2d.prototype.moveTo = function(body,vertices,float_speed){
            var x = body.position.x;
            var y = body.position.y;
            var xDir=-1, yDir=-1;
            var dx=vertices.x, dy=vertices.y;

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

                    if(this.priv_callback !== undefined){
                        this.priv_callback();
                    }
                    return true;
                }
            }

            return false;
        };

        /**
         * Déplace un body selont un chemain pré établie
         * retourne true quand est arriver a l'une des destinations.
         */
        Path2d.prototype.update = function(body, float_speed){
            var boolPass = true;

            if(this.priv_vectices === undefined){
                alert("Path2d Class Error: Please Call setPath(vertices_tab) before update");
                console.error("Path2d Class Error: Please Call setPath(vertices_tab) before update");
                boolPass = false;
            }

            if(body === undefined || float_speed === undefined){
                alert("Class Path2d Methode: update(body,float_speed) need 2 arguments");
                console.error("Class Path2d Methode: update(body,float_speed) need 2 arguments");
                boolPass = false;
            }

            if(boolPass === true){
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

                        return true;
                    }
                }
            }

            return false;
        };

        /**
         * Recommence le chemain depuit le début
         */
        Path2d.prototype.resetPath = function(){
            this.priv_verticesIndex=0;
        };

        /**
         * Permet de configurer une fonction qui seras apeller a chaque fois qu'une destination est atteinte.
         */
        Path2d.prototype.setDestinationCallback = function(callback){
            this.priv_callback = callback;
        };

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