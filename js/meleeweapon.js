class MeleeWeapon {
    
    constructor(name, attackdelay, damage, position, w, h) {
        this.name = name;
        this.attackdelay = attackdelay;
        this.damage = 100000000;
        this.position = position;
        this.canAttackIn = 0;
        this.angle = 0;
        this.w = w;
        this.h = h;
        this.x = 0;
        this.y = 0;
    }
    draw() {
        this.canAttackIn--;
        if (this.position == 0) {

            this.x = player.x + 40;
            this.y = player.y + 10;
        } else if (this.position == 1) {
            this.x = player.x - 40;
            this.y = player.y + 10;
        } else if (this.position == 2) {
            this.x = player.x + 39;
            this.y = player.y - 10;
        } else if (this.position == 3) {
            this.x = player.x - 39;
            this.y = player.y - 10;
        } else if (this.position == 4) {
            this.x = player.x;
            this.y = player.y + 50;
        } else if (this.position == 5) {
            this.x = player.x;
            this.y = player.y - 48;
        }
        //    enemytoShoot = findClosestEnemyToPlayer();
        //    if(enemytoShoot[0]  < 300){
        //    this.angle = atan2((enemytoShoot[1].y) - (this.y + game.y), (enemytoShoot[1].x)- (this.x + game.x));
        //    }
        this.angle = atan2((mouseY) - (this.y), (mouseX) - (this.x));
        push();
        translate(this.x, this.y)
        rotate(this.angle)
        rectMode(CORNER);
        fill("black");
        stroke("white");
        rect(0, 0, this.w, this.h);
        pop();
        this.dealDamage();
    }
    dealDamage() {
        for(var enemy of enemies){
            var temp1 = getDistance(enemy.x - game.x + enemy.w,enemy.y - game.y + enemy.h,this.x + this.w * cos(enemy.angle), this.y + this.w * sin(this.angle))
            var temp2 = getDistance(enemy.x - game.x + enemy.w,enemy.y - game.y + enemy.h,this.x + this.w * cos(enemy.angle) / 2, this.y + this.w * sin(this.angle) / 2) 
            var temp3 = getDistance(enemy.x - game.x + enemy.w,enemy.y - game.y + enemy.h,this.x + this.w * cos(enemy.angle) / 10, this.y + this.w * sin(this.angle)/ 10)
            if(temp3 < this.h * 2 || temp1 < this.h * 2 || temp2 < this.h * 2){
                console.log("fhwuifhewiu");
                enemy.health -= this.damage;
                if (healthbar.currenthealth + this.damage * playerStats.lifesteal < healthbar.maxhealth) {
                    healthbar.currenthealth += this.damage * playerStats.lifesteal;
                } else {
                    healthbar.currenthealth = healthbar.maxhealth;
                }
                particlesystems.push(new ParticleSystem(enemy));
                particlesystems[particlesystems.length - 1].setup();
                if (enemy.health <= 0) {
                    enemieskilled++;
                    game.data.push(new Collectable(enemy.x, enemy.y, enemy.value))
                    game.data.splice(game.data.indexOf(enemy), 1)
                    enemies.splice(enemies.indexOf(enemy), 1)
                }
            }
        }
    }

}