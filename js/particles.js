class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.position = createVector(x, y);
        this.lifespan = 255;
        this.acceleration = createVector(0, 0.05);
        this.velocity = createVector(random(-1, 1), random(-1, 0));
    }
    draw() {
        push();
        translate(this.x, this.y);
        rotate(this.lifespan / 80);
        fill(94, 86, 128, this.lifespan);
        stroke(30, 30, 30, this.lifespan);
        strokeWeight(1);
        rect(0, 0, 5, 5);
        pop();
    }
    move() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.x = this.position.x;
        this.y = this.position.y;
        this.lifespan -= 15;
    }
}

class ParticleSystem {
    constructor(enemy) {
        this.x = enemy.x;
        this.y = enemy.y;
        this.enemy = enemy;
        this.gameLastFrame = createVector(game.x, game.y);
        this.particles = [];
    }
    setup() {
        for (var i = 0; i < 20; i++) {
            this.particles.push(new Particle(this.x - game.x, this.y - game.y));
        }
    }
    update() {
        for (var particle of this.particles) {
            particle.x = this.enemy.x - game.x + random(-7, 8);
            particle.y = this.enemy.y - game.y + random(-8, 8);
        }
        this.gameLastFrame = createVector(game.x + player.x, game.y + player.y);
        this.draw();
        if (this.particles[0].lifespan < 1) {
            particlesystems.splice(particlesystems.indexOf(this), 1);
        }
    }
    draw() {
        for (var particle of this.particles) {
            particle.draw();
            particle.move();
        }
    }
}

class BombEffect {
    constructor(x, y, range) {
        this.x = x;
        this.y = y;
        this.range = range;
        this.lifespan = 10;
    }

    draw(x, y) {
        this.lifespan--;
        imageMode(CENTER);
        image(explosionimg, x, y, this.range, this.range);
        imageMode(CORNER);
        if (this.lifespan < 1) {
            game.data.splice(game.data.indexOf(this), 1);
        }
    }
}