var player = new Player();
var healthregenticks = 360;
var healthregenticksoriginal = healthregenticks;
var particlesystems = [];
var paused = true;
var backgroundImg;
var start = true;
var time = 3600;
var dead = false;
var currentEnemyID = 1;
var dodgetextframes = 0;
var choosingcharacter = false;
var gamepaused = false;

function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
var game = new Game(1000, 700, 3000, 3000);
var guns;
var healthbar = new HealthBar(10);
var enemies = [];
var batImgs = [];
var tankImgs = [];
var heartimg;
var healthregenimg;
var damageimg;
var attackspeedimg;
var speedimg;
var bulletspeedimg;
var magnetimg;
var playerimgs = [];
var pistolimg;
var shotgunimg;
var smgimg;
var bulletimg;
var coins = 0;
var wave = 1;
var wavehealthmulti = 1;
var vigimg;
var coinsimg;
var axethrowerimgs = [];
var axeimg;
var startimg;
var explosionimg;
var lifestealimg;
var dodgeimg;
var armorimg;
var redballimg;
var sprayerimg;
var normalmusic;
var w15bossimg;
var tank2img;
var characters = [];
var characterLookingAt = "N/A";

function preload() {
    backgroundImg = loadImage("img/background.png");
    batImgs.push(loadImage("img/bat.png"));
    batImgs.push(loadImage("img/bat2.png"));
    batImgs.push(loadImage("img/bat3.png"));
    batImgs.push(loadImage("img/bat4.png"));
    batImgs.push(loadImage("img/bat5.png"));
    batImgs.push(loadImage("img/bat6.png"));
    tankImgs.push(loadImage("img/tank.png"));
    tankImgs.push(loadImage("img/tank2.png"));
    tankImgs.push(loadImage("img/tank3.png"));
    tankImgs.push(loadImage("img/tank4.png"));
    playerimgs.push(loadImage("img/playernodamage.png"))
    playerimgs.push(loadImage("img/player20damage.png"))
    playerimgs.push(loadImage("img/player40damage.png"))
    playerimgs.push(loadImage("img/player60damage.png"))
    playerimgs.push(loadImage("img/player80damage.png"))
    axethrowerimgs.push(loadImage("img/axethrower.png"));
    axethrowerimgs.push(loadImage("img/axethrower2.png"));
    axethrowerimgs.push(loadImage("img/axethrower3.png"));
    axethrowerimgs.push(loadImage("img/axethrower4.png"));
    heartimg = loadImage("img/heart.png");
    healthregenimg = loadImage("img/healthregen.png");
    damageimg = loadImage("img/damage.png");
    attackspeedimg = loadImage("img/attackspeed.png");
    speedimg = loadImage("img/speed.png");
    bulletspeedimg = loadImage("img/bulletspeed.png")
    magnetimg = loadImage("img/magnet.png");
    shotgunimg = loadImage("img/shotgun.png");
    smgimg = loadImage("img/smg.png");
    pistolimg = loadImage("img/pistol.png");
    bulletimg = loadImage("img/bullet.png");
    vigimg = loadImage("img/vig.png");
    coinsimg = loadImage("img/coins.png");
    axeimg = loadImage("img/axe.png");
    startimg = loadImage("img/start.png");
    explosionimg = loadImage("img/explosion.png");
    lifestealimg = loadImage("img/lifesteal.png");
    dodgeimg = loadImage("img/dodge.png");
    armorimg = loadImage("img/armor.png");
    redballimg = loadImage("img/redball.png");
    sprayerimg = loadImage("img/sprayer.png");
    normalmusic = loadSound("sound/PandaShooter.wav");
    flameimg = loadImage("img/flame.png");
    w15bossimg = loadImage("img/wave15boss.png");
    tank2img = loadImage("img/tankv2.png");
}
var damagetaken = 0;
var coinscollected = 0;
var enemieskilled = 0;
var upgradetimes = 0;

function setup() {
    guns = [new Pistol(0)];
    characters.push(new Character("Default","a normal egg", function(){}));
    characters.push(new Character("Speedy","a fast egg, +50% movement speed but -20% armor", function(){
        playerStats.movementspeed = 1.5;
        playerStats.armor = 0.8;
    }));
    characters.push(new Character("Bullet Rain","an egg that really like bullets, start with an SMG, +50% attack speed, -50% damage, -2 health", function(){
        guns = [new SMG(0)];
        playerStats.attackdelay = 1.5;
        playerStats.damage = 0.5;
      healthbar.currenthealth = 8;
        healthbar.maxhealth = 8;
    }));
    characters.push(new Character("Pyromancer","an egg that really likes fire, starts with a flame thrower, -50% attack speed, -40% armor, no base health regeneration", function(){
        guns = [new Flamethrower(0)];
        playerStats.attackdelay = 0.75;
        playerStats.armor = 0.6;
        playerStats.regeneration = 0;
    }));
    characters.push(new Character("Sniper","a high precision sniper egg, starts with a pistol, -100% attack speed, +150% damage, +100% bullet speed", function(){
        guns = [new Pistol(0)];
        playerStats.attackdelay = 0.5;
        playerStats.damage = 2.5;
        playerStats.bulletspeed = 2;
        }));
        characters.push(new Character("Rich Egg","rich and lazy, starts with 100 coins, 2x coin gain, starts with a pistol, 3 guns max, -20% attack speed", function(){
            gun = [new Pistol(0)];
            playerStats.coinmulti = 2;
            coins = 100;
            playerStats.attackdelay = 0.8;
            playerStats.maxguns  = 3;
            }));
        characters.push(new Character("God","Literally God for testing you can play around with it if you want, Starts on round 15, Starts with no a pistol that can't shoot, has 100% dodge chance, has -100000000 coins", function(){
            gun = [];
            coins -= 100000000
            wave = 15;
            time = 3600;
            playerStats.attackdelay = 0;
            playerStats.dodge = 1;
            }));
            

    createCanvas(1000, 700);

    for (var enemy of enemies) {
        game.data.push(enemy);
    }
}

function draw() {
    for (var p of game.data) {
        if (p instanceof Projectile || p instanceof BombProjectile || p instanceof EnemyProjectile) {
            if (p.x < game.x || p.y < game.y || p.x > game.x + game.sw || p.y > game.y + game.sh) {
                game.data.splice(game.data.indexOf(p), 1);
            }
        }
    }
    if (dead) {
        rectMode(CORNER);
        image(backgroundImg, -game.x, -game.y, 6000, 6000);
        fill(0, 0, 0, 100);
        rect(0, 0, 1000, 700);
        fill(30);
        rect(300, 100, 400, 500, 50, 50, 50, 50);
        fill("white");
        textAlign(CENTER);
        textSize(50);
        textStyle(BOLD);
        text("You Died...", 300, 120, 400);
        textStyle(NORMAL);
        textSize(20);
        textAlign(LEFT);
        text("You survived until", 340, 250);
        text("Wave " + wave, 580, 250);
        text("You survived for", 340, 280);
        text(timeToText(3600 - time + (wave - 1) * 3600), 580, 280);
        text("You took", 340, 310);
        text(damagetaken + " damage", 580, 310);
        text("You collected", 340, 340);
        text(Math.floor(coinscollected) + " coins", 580, 340);
        text("You killed", 340, 370);
        text(enemieskilled + " enemies", 580, 370);
        text("You bought", 340, 400);
        text(upgradetimes + " things", 580, 400);
        return;
    }
    dodgetextframes--;
    if (!paused) {

        if (healthbar.currenthealth < 1) {
            death();
        }
        time--;
        spawnEnemies();
        healthregenticks--;
        if (healthregenticks < 1) {
            if (playerStats.regeneration < 0) {
                healthbar.currenthealth -= 1;
            } else {
                if (healthbar.currenthealth + 1 <= healthbar.maxhealth) {
                    healthbar.currenthealth += 1;
                }
            }
            if (playerStats.regeneration < 0) {
                healthregenticks = -1 * (healthregenticksoriginal / playerStats.regeneration);
            } else {
                healthregenticks = healthregenticksoriginal / playerStats.regeneration;
            }
        }
        image(backgroundImg, -game.x, -game.y, 6000, 6000);
        player.update();
        game.draw();
        for (var enemy of enemies) {
            enemy.move();
            enemy.checkCollisions();
        }
        for (var gun of guns) {
            gun.draw();
        }
        for (var dp of game.data) {
            if (dp instanceof Collectable) {
                dp.move();
            }
            if (dp instanceof EnemyProjectile) {
                dp.update();
            }
        }
        if (upgrading) {
            for (var i = 0; i < 4; i++) {
                upgradechoices[i].draw(i);
            }
        }
        for (var system of particlesystems) {
            system.update();
        }

        image(vigimg, 0, 0, 1000, 700);
        healthbar.draw();
        if (dodgetextframes > 0) {
            fill("white");
            stroke("white");
            strokeWeight(1);
            textSize(26);
            textStyle(BOLD);
            text("DODGE", player.x + 30, player.y - 20);
        }
        fill(30);
        noStroke();
        rect(850,10,130,40,20,20,20,20);
        fill("white");
        textSize(25);
        textAlign(CENTER);
        text("PAUSE",850,15,130);
        
    } else {
        if (!start) {
            image(backgroundImg, -game.x, -game.y, 6000, 6000);
            player.draw();
            game.draw();
            for (var gun of guns) {
                gun.draw();
            }
            if (upgrading) {
                noStroke();
                rectMode(CORNER)
                fill(0, 0, 0, 100);
                rect(0, 0, 1000, 700);
                rectMode(CENTER);
            }
            if(!gamepaused){
            healthbar.draw();
            }
            else{
                fill(30,30,30,200);
                rect(0,0,1000,700);
                fill("white");
                textSize(60);
                textAlign(CENTER);
                text("GAME PAUSED", 50,150,900);
                textSize(50);
                text("ON WAVE " + wave, 50,250,900);
                text(timeToText(time) + " LEFT IN WAVE", 50,330,900);
                rectMode(CORNER);
                rect(400,400,200,50,20,20,20);
                fill("black")
                textSize(30);
                text("Resume",400,406,200)
                
                return;
            }
        }
        if (upgrading) {
            for (var i = 0; i < 4; i++) {
                upgradechoices[i].draw(i);
            }
            fill(30);
            noStroke();
            rect(100, 450, 800, 240);
            fill("white");
            image(heartimg, 140, 480, 30, 30);
            textStyle(NORMAL);
            textSize(15);
            textAlign(LEFT);
            text("Health: " + healthbar.currenthealth + " / " + healthbar.maxhealth, 200, 500);
            image(healthregenimg, 140, 520, 30, 30);
            if (playerStats.regeneration > 0) {
                text("Health Regeneration: 1 / " + 6 / playerStats.regeneration + "s", 200, 540);
            } else if (playerStats.regeneration == 0) {
                text("Health Regeneration: 0 / Infinity s", 200, 540);
            } else {
                text("Health Regeneration: -1 / " + -6 / playerStats.regeneration + "s", 200, 540);
            }
            image(damageimg, 140, 560, 20, 20);
            text("Damage Multiplier: " + Math.floor(((playerStats.damage) * 100)) + "%", 200, 575);
            image(attackspeedimg, 140, 590, 20, 20);
            text("Attack Speed Multiplier: " + Math.floor(((playerStats.attackdelay) * 100)) + "%", 200, 605);
            image(speedimg, 140, 620, 40, 20);
            text("Movement Speed Multiplier: " + Math.floor(((playerStats.movementspeed) * 100)) + "%", 200, 635);
            image(armorimg, 140, 648, 20, 20);
            text("Armor %: " + Math.floor(((playerStats.armor) * 100)) + "%", 200, 665);
            textSize(20);
            image(bulletspeedimg, 530, 480, 30, 30);
            text("Bullet Speed Multiplier: " + Math.floor(((playerStats.bulletspeed) * 100)) + "%", 580, 500);
            image(magnetimg, 530, 520, 30, 30);
            text("EXP Magnet Range Multiplier: " + Math.floor(((playerStats.expmagnet) * 100)) + "%", 580, 540);
            image(explosionimg, 530, 560, 30, 30);
            text("Explosion Range Multiplier: " + Math.floor(((playerStats.explosionrange) * 100)) + "%", 580, 580);
            image(lifestealimg, 530, 600, 30, 30);
            text("Lifesteal %: " + Math.floor(((playerStats.lifesteal) * 100)) + "%", 580, 620);
            image(dodgeimg, 530, 640, 30, 30);
            text("Dodge Chance: " + Math.floor(((playerStats.dodge) * 100)) + "%", 580, 660);
            fill(30);
            if (mouseX > 150 && mouseX < 300 && mouseY > 100 && mouseY < 160) {
                fill(220);
            }
            rect(150, 100, 150, 60, 20, 20, 20, 20);
            fill(30);
            if (mouseX > 750 && mouseX < 900 && mouseY > 100 && mouseY < 160) {
                fill(220);
            }
            rect(750, 100, 150, 60, 20, 20, 20, 20);
            textStyle(BOLD);
            textSize(25);
            textAlign(CENTER);
            fill("white");
            if (mouseX > 750 && mouseX < 900 && mouseY > 100 && mouseY < 160) {
                fill(30);
            }
            text("Start Wave", 750, 115, 150);
            fill("white");
            if (mouseX > 150 && mouseX < 300 && mouseY > 100 && mouseY < 160) {
                fill(30);
            }
            text("Reroll: 20", 150, 115, 150);
            healthbar.currenthealth = healthbar.maxhealth;
        }
        if (start) {
            imageMode(CORNER);
            image(startimg, 0, 0, 1000, 700);
            return;
        }
        if (choosingcharacter) {
            imageMode(CORNER);
            image(backgroundImg, 0, 0, 1000, 700);
            fill(30);
            rectMode(CORNER);
            rect(200,100,600,300);
            rect(100,450,800,214);
            for(var character of characters){
                character.draw();
            }
            if(characterLookingAt != "N/A"){
                characterLookingAt.drawFull();
            }  
            fill(30);
            rect(800,30,140,50);
            textSize(25);
            textAlign(CENTER);
            fill("white");
            textStyle(BOLD);
            text("Start", 800,40,140);
            return;
        }
    }
    textAlign(CENTER);
    fill("white");
    noStroke();
    textStyle(BOLD);
    textSize(45)
    text("Wave " + wave, 0, 10, 1000);
    textSize(60);
    text(timeToText(this.time), 0, 60, 1000);
    textSize(40);
    textAlign(LEFT);
    imageMode(CORNER);
    image(coinsimg, 20, 50, 40, 40);
    text(Math.floor(coins), 75, 48, 1000);
    if (time < 1) {
        paused = true;
        game.data = [];
        enemies = [];
        healthbar.currenthealth = healthbar.maxhealth;
        upgrades();
        time = 3600;
        upgrading = true;
    }
}


function timeToText(time) {
    seconds = time / 60;
    mins = seconds / 60;
    hours = mins / 60;
    mins = mins % 60;
    seconds = seconds % 60;
    if (Math.floor(mins) < 1) {
        return Math.floor(seconds) + "s";
    }
    if (Math.floor(hours) < 1) {
        return Math.floor(mins) + "m " + Math.floor(seconds) + "s";
    }
    return Math.floor(hours) + "h " + Math.floor(mins) + "m " + Math.floor(seconds) + "s";
}

function mousePressed() {
    if (upgrading) {
        for (var i = 0; i < 4; i++) {
            if (upgradechoices[i].checkClick(i)) {
                upgradechoices[i].choose();
            }
        }
        if (mouseX > 750 && mouseX < 900 && mouseY > 100 && mouseY < 160) {
            upgrading = false;
            paused = false;
            if (!normalmusic.isPlaying()) {
                normalmusic.play();
            }
        }
        if (mouseX > 150 && mouseX < 300 && mouseY > 100 && mouseY < 160) {
            if (coins >= 20) {
                coins -= 20;
                rerollupgrades();
            }

        }
    }
    if (start) {
        if (mouseX > 350 && mouseX < 650 && mouseY > 520 && mouseY < 620) {
            if (!normalmusic.isPlaying()) {
                normalmusic.play();
            }
            choosingcharacter = true;
            start = false;
        }
    }
    if(choosingcharacter){
        for(var character of characters){
            if(character.checkHover()){
                characterLookingAt = character;
            }
        }
        if(mouseX > 800 && mouseX < 940&& mouseY > 30 && mouseY < 80 && characterLookingAt != "N/A"){
            choosingcharacter = false;
            paused = false;
            characterLookingAt.choose();
        }
    }

    if(!choosingcharacter && !start && !upgrading && !paused){
        console.log("TEST")
    if(mouseX > 850 && mouseY > 10 && mouseX < 980 && mouseY < 50){
        paused = true;
        gamepaused = true;
    }
}
if(gamepaused){
    if(mouseX > 400 && mouseX< 600 && mouseY > 400 && mouseY < 450){
        paused = false;
        gamepaused = false;
    }
}
}

function death() {
    paused = true;
    dead = true;
    game.data = [];
}