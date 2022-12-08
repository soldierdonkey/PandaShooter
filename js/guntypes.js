class Pistol extends Gun {
    constructor(position) {
        super("Pistol", 20, 1, position, 20, pistolimg, 40, 19);
    }
}
class SMG extends Gun {
    constructor(position) {
        super("SMG", 3, 0.35, position, 15, smgimg, 50, 21);
    }
}
class Shotgun extends Gun {
    constructor(position) {
        super("Shotgun", 30, 0.6, position, 30, shotgunimg, 50, 15);
    }
    shoot() {
        if (playerStats.exploding) {
            if (Math.random() < 0.25) {
                game.data.push(new BombProjectile(8, 25 * playerStats.bulletspeed, this.damage, this.x + game.x, this.y + game.y, simplifyAngle(this.angle + random(0.13, 0.17))));
            } else {
                game.data.push(new Projectile(10, 8, 25 * playerStats.bulletspeed, this.damage, this.x + game.x, this.y + game.y, simplifyAngle(this.angle + random(0.13, 0.17))));
            }
            if (Math.random() < 0.25) {
                game.data.push(new BombProjectile(8, 25 * playerStats.bulletspeed, this.damage, this.x + game.x, this.y + game.y, simplifyAngle(this.angle + random(0.7, 0.12))));
            } else {
                game.data.push(new Projectile(10, 8, 25 * playerStats.bulletspeed, this.damage, this.x + game.x, this.y + game.y, simplifyAngle(this.angle + random(0.7, 0.12))));
            }
            if (Math.random() < 0.25) {
                game.data.push(new BombProjectile(8, 25 * playerStats.bulletspeed, this.damage, this.x + game.x, this.y + game.y, simplifyAngle(this.angle + random(0.02, 0.05))));
            } else {
                game.data.push(new Projectile(10, 8, 25 * playerStats.bulletspeed, this.damage, this.x + game.x, this.y + game.y, simplifyAngle(this.angle + random(0.02, 0.05))));
            }
            if (Math.random() < 0.25) {
                game.data.push(new BombProjectile(8, 25 * playerStats.bulletspeed, this.damage, this.x + game.x, this.y + game.y, simplifyAngle(this.angle + random(-0.25, 0.25))));
            } else {
                game.data.push(new Projectile(10, 8, 25 * playerStats.bulletspeed, this.damage, this.x + game.x, this.y + game.y, simplifyAngle(this.angle + random(-0.25, 0.25))));
            }
            if (Math.random() < 0.25) {
                game.data.push(new BombProjectile(8, 25 * playerStats.bulletspeed, this.damage, this.x + game.x, this.y + game.y, simplifyAngle(this.angle - random(0.02, 0.05))));
            } else {
                game.data.push(new Projectile(10, 8, 25 * playerStats.bulletspeed, this.damage, this.x + game.x, this.y + game.y, simplifyAngle(this.angle - random(0.02, 0.05))));
            }
            if (Math.random() < 0.25) {
                game.data.push(new BombProjectile(8, 25 * playerStats.bulletspeed, this.damage, this.x + game.x, this.y + game.y, simplifyAngle(this.angle - random(0.7, 0.12))));
            } else {
                game.data.push(new Projectile(10, 8, 25 * playerStats.bulletspeed, this.damage, this.x + game.x, this.y + game.y, simplifyAngle(this.angle - random(0.7, 0.12))));
            }

            if (Math.random() < 0.25) {
                game.data.push(new BombProjectile(8, 25 * playerStats.bulletspeed, this.damage, this.x + game.x, this.y + game.y, simplifyAngle(this.angle - random(0.13, 0.17))));
            } else {
                game.data.push(new Projectile(10, 8, 25 * playerStats.bulletspeed, this.damage, this.x + game.x, this.y + game.y, simplifyAngle(this.angle - random(0.13, 0.17))));
            }
        }
        game.data.push(new Projectile(10, 8, 25 * playerStats.bulletspeed, this.damage, this.x + game.x, this.y + game.y, simplifyAngle(this.angle + random(0.13, 0.17))));
        game.data.push(new Projectile(10, 8, 25 * playerStats.bulletspeed, this.damage, this.x + game.x, this.y + game.y, simplifyAngle(this.angle + random(0.7, 0.12))));
        game.data.push(new Projectile(10, 8, 25 * playerStats.bulletspeed, this.damage, this.x + game.x, this.y + game.y, simplifyAngle(this.angle + random(0.02, 0.05))));
        game.data.push(new Projectile(10, 8, 25 * playerStats.bulletspeed, this.damage, this.x + game.x, this.y + game.y, simplifyAngle(this.angle + random(-0.25, 0.25))));
        game.data.push(new Projectile(10, 8, 25 * playerStats.bulletspeed, this.damage, this.x + game.x, this.y + game.y, simplifyAngle(this.angle - random(0.02, 0.05))));
        game.data.push(new Projectile(10, 8, 25 * playerStats.bulletspeed, this.damage, this.x + game.x, this.y + game.y, simplifyAngle(this.angle - random(0.7, 0.12))));
        game.data.push(new Projectile(10, 8, 25 * playerStats.bulletspeed, this.damage, this.x + game.x, this.y + game.y, simplifyAngle(this.angle - random(0.13, 0.17))));
    }
}
class God extends Gun {
    constructor(position) {
        super("God", 1, 1000, position, 30, shotgunimg, 50, 15);
    }
    shoot() {
        for (var i = 0; i < Math.PI * 2; i += 0.1) {
            game.data.push(new Projectile(100, 8000, 50, this.damage, this.x + game.x, this.y + game.y, i));
        }

    }
}

class Flamethrower extends Gun {
    constructor(position) {
        super("Flamethrower", 3, 0.1, position, 1, shotgunimg, 50, 15);
    }
    shoot() {
        console.log(game.x, game.y);
        game.data.push(new Projectile(30, 8, 6 * playerStats.bulletspeed, this.damage, this.x + game.x + (Math.cos(this.angle) * 60), this.y + game.y + (Math.sin(this.angle) * 60), this.angle - 0.45, flameimg));
        game.data.push(new Projectile(30, 8, 6 * playerStats.bulletspeed, this.damage, this.x + game.x + (Math.cos(this.angle) * 60), this.y + game.y + (Math.sin(this.angle) * 60), this.angle - 0.3, flameimg));
        game.data.push(new Projectile(30, 8, 6 * playerStats.bulletspeed, this.damage, this.x + game.x + (Math.cos(this.angle) * 60), this.y + game.y + (Math.sin(this.angle) * 60), this.angle, flameimg));
        game.data.push(new Projectile(30, 8, 6 * playerStats.bulletspeed, this.damage, this.x + game.x + (Math.cos(this.angle) * 60), this.y + game.y + (Math.sin(this.angle) * 60), this.angle + 0.3, flameimg));
        game.data.push(new Projectile(30, 8, 6 * playerStats.bulletspeed, this.damage, this.x + game.x + (Math.cos(this.angle) * 60), this.y + game.y + (Math.sin(this.angle) * 60), this.angle + 0.45, flameimg));
    }
}