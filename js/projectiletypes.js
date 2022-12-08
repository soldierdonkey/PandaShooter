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