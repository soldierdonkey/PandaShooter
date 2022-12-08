class Bat extends Enemy {
    constructor(x, y) {
        super(x, y, 2 * wavehealthmulti, 1 * wavedamagemulti, batImgs, 15, random(2, 3));
        if (wave < 4) {
            this.value = 2;
        } else if (wave < 6) {
            this.value = 1.7;
        } else if (wave < 11) {
            this.value = 1.3;
        } else if (wave < 16) {
            this.value = 1;
        } else if (wave < 21) {
            this.value = 0.8;
        } else {
            this.value = 0.7;
        }
        this.id = currentEnemyID;
        currentEnemyID++;
    }
}

class Tank extends Enemy {
    constructor(x, y) {
        super(x, y, 5 * wavehealthmulti, 0.5 * wavedamagemulti, tankImgs, 30, random(0.5, 1.5))
        this.h = 60;
        if (wave < 4) {
            this.value = 5;
        } else if (wave < 6) {
            this.value = 4.7;
        } else if (wave < 11) {
            this.value = 4.3;
        } else if (wave < 16) {
            this.value = 4;
        } else if (wave < 21) {
            this.value = 3.5;
        } else {
            this.value = 3;
        }
        this.id = currentEnemyID;
        currentEnemyID++;
    }
}
class AxeThrower extends Enemy {
    constructor(x, y) {
        super(x, y, 3 * wavehealthmulti, 1.5 * wavedamagemulti, axethrowerimgs, 20, random(1.5, 2.5))
        this.h = 60;
        if (wave < 4) {
            this.value = 7;
        } else if (wave < 6) {
            this.value = 7;
        } else if (wave < 11) {
            this.value = 6;
        } else if (wave < 16) {
            this.value = 5.5;
        } else if (wave < 21) {
            this.value = 5;
        } else {
            this.value = 4.5;
        }
        this.timetilshoot = 30;
        this.timebetweenshots = this.timetilshoot;
        this.id = currentEnemyID;
        currentEnemyID++;
    }
    draw(x, y) {
        this.timetilshoot--;
        this.timetilnextanimationchange--;
        if (this.timetilnextanimationchange < 1) {
            this.animationframe++;
            if (this.animationframe > this.animationimgs.length - 1) {
                this.animationframe = 0;
            }
            this.timetilnextanimationchange = this.timebetweenanimations;
        }
        imageMode(CENTER);
        image(this.animationimgs[this.animationframe], x, y, this.w, this.h);
        imageMode(CORNER);
        if (this.timetilshoot < 1) {
            this.timetilshoot = this.timebetweenshots;
            this.shoot();
        }
    }
    shoot() {
        var angle = atan2((player.y) - (this.y - game.y), (player.x) - (this.x - game.x));
        game.data.push(new EnemyProjectile(40, this.x, this.y, this.damage, 10, angle, axeimg));
    }
}
class Sprayer extends Enemy {
    constructor(x, y) {
        super(x, y, 3 * wavehealthmulti, 4 * wavedamagemulti, [sprayerimg], 20, random(1.5, 2.5));
        this.h = 60;
        if (wave < 4) {
            this.value = 10;
        } else if (wave < 6) {
            this.value = 9;
        } else if (wave < 11) {
            this.value = 8;
        } else if (wave < 16) {
            this.value = 7;
        } else if (wave < 21) {
            this.value = 6;
        } else {
            this.value = 5;
        }
        this.timetilshoot = 90;
        this.timebetweenshots = this.timetilshoot;
        this.id = currentEnemyID;
        currentEnemyID++;
    }
    draw(x, y) {
        this.timetilshoot--;
        this.timetilnextanimationchange--;
        if (this.timetilnextanimationchange < 1) {
            this.animationframe++;
            if (this.animationframe > this.animationimgs.length - 1) {
                this.animationframe = 0;
            }
            this.timetilnextanimationchange = this.timebetweenanimations;
        }
        imageMode(CENTER);
        image(this.animationimgs[this.animationframe], x, y, this.w, this.h);
        imageMode(CORNER);
        if (this.timetilshoot < 1) {
            this.timetilshoot = this.timebetweenshots;
            this.shoot();
        }
    }
    shoot() {
        for (var i = 0; i < Math.PI * 2; i += Math.PI / 3) {
            game.data.push(new EnemyProjectile(200, this.x, this.y, this.damage, 4, i, redballimg));
        }
    }
}

class W15Boss extends Enemy {
    constructor(x, y) {
        super(x, y, 3000, 20, [w15bossimg], 100000000000000000, random(2, 2.5))
        this.h = 150;
        this.w = 100;
        this.value = 250;
        this.id = currentEnemyID;
        currentEnemyID++;
        this.timetilspray = 150;
        this.timebetweensprays = this.timetilspray;
        this.timetilshot = 5;
        this.timebetweenshots = this.timetilshot;
    }
    draw(x, y) {
        this.timetilshot--;
        this.timetilspray--;
        this.timetilnextanimationchange--;
        if (this.timetilnextanimationchange < 1) {
            this.animationframe++;
            if (this.animationframe > this.animationimgs.length - 1) {
                this.animationframe = 0;
            }
            this.timetilnextanimationchange = this.timebetweenanimations;
        }
        imageMode(CENTER);
        image(this.animationimgs[this.animationframe], x, y, this.w, this.h);
        imageMode(CORNER);
        if (this.timetilspray < 1) {
            this.timetilspray = this.timebetweensprays;
            this.spray();
        }
        if (this.timetilshot < 1) {
            this.timetilshot = this.timebetweenshots;
            this.shoot();
        }
    }
    spray() {
        for (var i = 0; i < Math.PI * 2; i += Math.PI / 6) {
            game.data.push(new EnemyProjectile(200, this.x, this.y, this.damage, 7, i, redballimg));
        }
    }
    shoot() {
        game.data.push(new EnemyProjectile(200, this.x, this.y, 1, 7, atan2((game.y + player.y) - this.y, (player.x + game.x) - this.x), redballimg));
    }
}

class Tank2 extends Enemy {
    constructor(x, y) {
        super(x, y, 12 * wavehealthmulti, 1 * wavedamagemulti, [tank2img], 30, random(1, 1.75))
        this.h = 70;
        if (wave < 16) {
            this.value = 6;
        } else if (wave < 21) {
            this.value = 5;
        } else {
            this.value = 4;
        }
        this.id = currentEnemyID;
        currentEnemyID++;
    }
}