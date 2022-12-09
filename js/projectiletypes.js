class BombProjectile extends Projectile {
    constructor(lifespan, speed, damage, x, y, angle) {
        super(10, lifespan, speed, damage, x, y, angle);
        this.lifespan = lifespan;
    }
    move() {
        let xspeed = this.speed * cos(this.angle);
        let yspeed = this.speed * sin(this.angle);
        this.x += xspeed;
        this.y += yspeed;
        this.lifespan--;
        if (this.lifespan < 1) {
            dealAoeDamage(this.x, this.y, 100, this.damage);
            game.data.push(new BombEffect(this.x, this.y, 100 * playerStats.explosionrange));
            game.data.splice(game.data.indexOf(this), 1);
        }
        this.checkCollision();
    }
    checkCollision() {
        for (var enemy of enemies) {
            if (getDistance(this.x, this.y, enemy.x, enemy.y) < 20) {
                dealAoeDamage(this.x, this.y, 100 * playerStats.explosionrange, this.damage);
                game.data.push(new BombEffect(this.x, this.y, 100 * playerStats.explosionrange));
                game.data.splice(game.data.indexOf(this), 1);
                return;
            }
        }
    }
}

class MeleeWeaponProjectile extends Projectile{
    constructor(size,lifespan, speed, damage, x, y, angle) {
        super(size, lifespan, speed, damage, x, y, angle);
    }
    draw(){}
    checkCollision(){
    for (var enemy of enemies) {
        if (getDistance(this.x, this.y, enemy.x, enemy.y) < (this.w * 0.5+ enemy.w * 0.75)) {
            enemy.health -= this.damage;
            if (healthbar.currenthealth + this.damage * playerStats.lifesteal < healthbar.maxhealth) {
                healthbar.currenthealth += this.damage * playerStats.lifesteal;
            } else {
                healthbar.currenthealth = healthbar.maxhealth;
            }
            // particlesystems.push(new ParticleSystem(enemy));
            // particlesystems[particlesystems.length - 1].setup();
            if (enemy.health <= 0) {
                enemieskilled++;
                game.data.push(new Collectable(enemy.x, enemy.y, enemy.value))
                game.data.splice(game.data.indexOf(enemy), 1)
                enemies.splice(enemies.indexOf(enemy), 1)
            }
            game.data.splice(game.data.indexOf(this), 1);
            return;
        }
    }
}

}