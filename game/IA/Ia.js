define(["game/entity/Player"], function(Player) {

    'use strict';

    return function(environment, logger)
    {
        this.enemyInterfaces = [
           Player
        ];

        this.defenders = [];

        this.__constructor = function(environment, logger)
        {
            this.logger = logger;

            this.logger.log("DEBUG", "[IA] Initialized");

            this.environment = environment;
        };

        this.setEnvironment = function(environment)
        {
            this.environment = environment;
        };

        this.addEnemyInterface = function(enemyInterface)
        {
            this.enemyInterfaces.push(enemyInterface);
        };

        this.addDefender = function(defender)
        {
            this.defenders.push(defender);
        };

        this.getDefender = function()
        {
            return _.first(this.defenders);
        };

        this.update = function()
        {
            var entitys = this.environment.getEntitys();

            var enemys = _.filter(entitys, function(entity)
            {
                return entity instanceof Monster && entity.getPosition().y > 0 && entity.getPosition().y < 200 && entity.getPosition().x > 0;
            });

            if(_.isEmpty(enemys))
            {
                console.log("skip");
                return;
            }

            this.defenders = _.filter(entitys, function(entity) { return entity instanceof Player; });

            if(_.isEmpty(this.defenders)) return;

            var defender = this.getDefender();

            var myEnemy = Path2d.getLessFar(defender, enemys);

            var enemyPosition = myEnemy.getPosition();
            var defenderPosition = defender.getPosition();

            var path = new Path2d([enemyPosition]);

            path.update(defender.getBody(), 15);

            /**
            var direction = {
                horizontal: (enemyPosition.x == defenderPosition.x) ? 0 : (enemyPosition.x > defenderPosition.x ) ? 1 : -1,
                vertical: (defenderPosition.y < 450) ? 0 : -1
            };
            */

//            console.log(direction);

           // defender.move(direction, 5);

            if(typeof defender.fired != "undefined") defender.fired();

            this.logger.log("DEBUG", "[IA] " + _.size(enemys) + " enemys left");

            this.logger.log("DEBUG", "[IA] update");
        };

        this.__constructor(environment, logger);
    };
});