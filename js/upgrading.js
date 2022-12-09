var playerStats = {
    "attackdelay": 1,
    "damage": 1,
    "expmagnet": 1,
    "movementspeed": 1,
    "bulletspeed": 1,
    "regeneration": 1,
    "exploding": false,
    "explosionrange": 1,
    "lifesteal": 0,
    "truevampire": false,
    "dodge": 0,
    "armor": 1,
    "explodinglifesteal": 0.5,
    "coinmulti": 1,
    "maxguns": 6,
}


var knightweapons = [
    new Upgrade("Sword", "Advanced Weapon", "green", "A sword of a true knight", "N/A", function(){
        guns.push(new KnightSword(guns.length));
    },10000,300)
]

var assassinweapons = [
    new Upgrade("Dagger", "Advanced Weapon", "green", "A dagger of an assassin", "N/A", function(){
        guns.push(new AssassinDagger(guns.length));
    },10000,300)
]

var gunoptions = [
    new Upgrade("Pistol", "Basic Gun", "lightgrey", "A Basic Pistol", "N/A", function() {
        guns.push(new Pistol(guns.length));
    }, 10000, 175),
    new Upgrade("Shotgun", "Basic Gun", "lightgrey", "A Basic Shotgun", "N/A", function() {
        guns.push(new Shotgun(guns.length));
    }, 10000, 250),
    new Upgrade("SMG", "Basic Gun", "lightgrey", "A Basic Machine Gun", "N/A", function() {
        guns.push(new SMG(guns.length));
    }, 10000, 250),
    new Upgrade("Flamethr- ower", "Advanced Gun", "green", "A Fire Shooting Device, fire cannot explode", "N/A", function() {
        guns.push(new Flamethrower(guns.length));
    }, 10000, 450),
]
var explodingupgrades = [
    new Upgrade("Better Explosions", "Advanced Upgrade", "green", "20% more explosion range", "N/A", function() {
        playerStats.explosionrange += 0.2;
    }, 10000, 150, 10),
]

var vampireupgrades = [

    new Upgrade("God of Vampires", "Legendary Upgrade", "orange", "+25% Lifesteal but exploding bullets have an tenth of the lifesteal, but -3 Health, -50% health regeneration and -20% damage", "N/A", function() {
        playerStats.lifesteal += 0.25;
        playerStats.maxhealth -= 3;
        playerStats.explodinglifesteal = 0.1;
        if (healthbar.maxhealth < 1) {
            healthbar.maxhealth = 1;
        }
        playerStats.damage -= 0.2;
        playerStats.regeneration -= 0.5;
    }, 1, 500, 2),
    new Upgrade("Armor of a True Vampire", "Legendary Set Upgrade", "orange", "+5% lifesteal, +75% armor, -20% dodge, -20% damage", "N/A", function() {
        playerStats.lifesteal += 0.05;
        playerStats.armor += 0.75;
        playerStats.dodge -= 0.2;
        playerStats.damage -= 0.2;
    }, 1, 1000, 1),
    new Upgrade("Heart of a True Vampire", "Legendary Set Upgrade", "orange", "+5% lifesteal, +50 max health, -20% damage, -10% dodge", "N/A", function() {
        healthbar.maxhealth += 50;
        playerStats.lifesteal += 0.05;
        playerStats.damage -= 0.2;
    }, 1, 1000, 1),
    new Upgrade("Weaponry of a True Vampire", "Legendary Set Upgrade", "orange", "+25% lifesteal, +5% armor, -40% damage, -15% dodge", "N/A", function() {
        playerStats.lifesteal += 0.25;
        playerStats.armor += 0.05;
        playerStats.damage -= 0.4;
        playerStats.dodge -= 0.15;
    }, 1, 1000, 1),
]
var upgradeoptions = [
    new Upgrade("Faster Shots", "Basic Upgrade", "lightgrey", "Upgrade's your gun's attack speed by 8%", "N/A", function() {
        playerStats.attackdelay += 0.08;
    }, 10000, 50, 20),
    new Upgrade("Rapid Fire", "Advanced Upgrade", "green", "Upgrade's your gun's attack speed by 13% but 10% less armor", "N/A", function() {
        playerStats.attackdelay += 0.13;
        playerStats.armor -= 0.1;
        if (playerStats.armor < 0.01) {
            playerStats.armor = 0.01;
        }
    }, 10000, 75, 14),
    new Upgrade("Light Armor", "Advanced Upgrade", "green", "20% more movement speed but 15% less armor", "N/A", function() {
        playerStats.movementspeed += 0.2;
        playerStats.armor -= 0.15;
        if (playerStats.armor < 0.01) {
            playerStats.armor = 0.01;
        }
    }, 3, 125, 14),
    new Upgrade("Heavy Armor", "Advanced Upgrade", "green", "15% less movement speed but +20% armor", "N/A", function() {
        playerStats.movementspeed -= 0.15;
        if (playerStats.movementspeed < 0.01) {
            playerStats.movementspeed = 0.01;
        }
        playerStats.armor += 0.2;
    }, 3, 125, 14),
    new Upgrade("Insane Reflexes", "Advanced Upgrade", "green", "Dodge 5% of incomming attacks", "N/A", function() {
        playerStats.dodge += 0.05;
    }, 10, 150, 14),
    new Upgrade("Agility", "Advanced Upgrade", "green", "Dodge 2% of incomming attacks and Increase Movement Speed by 10%", "N/A", function() {
        playerStats.dodge += 0.02;
        playerStats.movementSpeed += 0.1;
    }, 10, 150, 14),
    new Upgrade("Stronger Bullets", "Basic Upgrade", "lightgrey", "Upgrade's your gun's damage by 8%", "N/A", function() {
        playerStats.damage += 0.08;
    }, 10000, 65, 20),
    new Upgrade("EXP Magnet", "Advanced Upgrade", "green", "Increases Drop Pickup Range by 25%", "N/A", function() {
        playerStats.expmagnet += 0.25;
    }, 10000, 100, 12),
    new Upgrade("Speedy Boots", "Basic Upgrade", "lightgrey", "Increases Movement Speed by 8%", "N/A", function() {
        playerStats.movementspeed += 0.08;
    }, 10000, 60, 20),
    new Upgrade("Exploding Bullets", "Advanced Upgrade", "green", "Bullets have a 25% chance to explode, exploding bullets will only have half the lifesteal", "N/A", function() {
        playerStats.exploding = true;
    }, 1, 200, 10),
    new Upgrade("Vampiric Bullets", "Advanced Upgrade", "green", "+3% Lifesteal but -10% damage", "N/A", function() {
        playerStats.lifesteal += 0.03;
        playerStats.damage -= 0.1;
    }, 10000, 150, 11),
    new Upgrade("True Vampire", "Epic Upgrade", "lightblue", "+15% Lifesteal, but -3 Health and -150% health regen, exploding bullets have a quarter of the lifesteal", "N/A", function() {
        playerStats.lifesteal += 0.15;
        healthbar.maxhealth -= 3;
        playerStats.truevampire = true;
        playerStats.explodingvampire = 0.25;
        if (healthbar.maxhealth < 1) {
            healthbar.maxhealth = 1;
        }
        playerStats.regeneration -= 1.5;
        if (healthbar.currenthealth > healthbar.maxhealth) { healthbar.currenthealth = healthbar.maxhealth; }
    }, 1, 350, 5),
    new Upgrade("Obsidian Heart", "Epic Set Upgrade", "lightblue", "-5% lifesteal, but +20 Health and -50% health regen", "N/A", function() {
        playerStats.lifesteal -= 0.05;
        healthbar.maxhealth += 20;
        playerStats.regeneration -= 0.5;
    }, 10000, 450, 3),
    new Upgrade("Obsidian Armor", "Epic Set Upgrade", "lightblue", "-5% lifesteal, but +50% armor and -50% health regen", "N/A", function() {
        playerStats.lifesteal -= 0.05;
        playerStats.armor +=0.5;
        playerStats.regeneration -= 0.5;
    }, 10000, 450, 3),
    new Upgrade("Obsidian Weaponry", "Epic Set Upgrade", "lightblue", "-5% lifesteal, but +20% damage and -50% health regen", "N/A", function() {
        playerStats.lifesteal -= 0.05;
        playerStats.damage +=0.2;
        playerStats.regeneration -= 0.5;
    }, 10000, 450, 3),
    new Upgrade("Steel Heart", "Advanced Set Upgrade", "green", "-2% lifesteal, but +8 Health and -30% health regen", "N/A", function() {
        playerStats.lifesteal -= 0.02;
        healthbar.maxhealth += 8;
        playerStats.regeneration -= 0.3;
    }, 10000, 250, 10),
    new Upgrade("Steel Armor", "Advanced Set Upgrade", "green", "-2% lifesteal, but +20% armor and -30% health regen", "N/A", function() {
        playerStats.lifesteal -= 0.02;
        playerStats.armor +=0.2;
        playerStats.regeneration -= 0.3;
    }, 10000, 250, 10),
    new Upgrade("Steel Weaponry", "Advanced Set Upgrade", "green", "-2% lifesteal, but +15% damage and -30% health regen", "N/A", function() {
        playerStats.lifesteal -= 0.02;
        playerStats.damage +=0.15;
        playerStats.regeneration -= 0.3;
    }, 10000, 250, 10),
    new Upgrade("Armor of the Panda Hero", "Legendary Set Upgrade", "orange", "-10% lifesteal, but +80% armor, -10% dodge, and +25% damage", "N/A", function() {
        playerStats.lifesteal -= 0.1;
        playerStats.armor +=0.8;
        playerStats.dodge -= 0.1;
        playerStats.damage += 0.25;
    }, 1, 1000, 1),
    new Upgrade("Weapon of the Panda Hero", "Legendary Set Upgrade", "orange", "-10% lifesteal, but +5% armor, -5% dodge, and +60% damage", "N/A", function() {
        playerStats.lifesteal -= 0.1;
        playerStats.armor += 0.05;
        playerStats.dodge -= 0.05;
        playerStats.damage += 0.6;
    }, 1, 1000, 1),
    new Upgrade("Heart of the Panda Hero", "Legendary Set Upgrade", "orange", "-10% lifesteal, but +50 health and +8% damage", "N/A", function() {
        playerStats.lifesteal -= 0.1;
        healthbar.maxhealth += 50;
        playerStats.damage += 0.08;
    }, 1, 1000, 1),
    new Upgrade("Speedy Shots", "Basic Upgrade", "lightgrey", "Upgrades your gun's bullet speed by 15%", "N/A", function() {
        playerStats.bulletspeed += 0.15;
    }, 10000, 45, 20),
    new Upgrade("Strong Heart", "Basic Upgrade", "lightgrey", "+4 Health", "N/A", function() {
        healthbar.maxhealth += 4;
    }, 10000, 60, 20),
    new Upgrade("Faster Regeneration", "Basic Upgrade", "lightgrey", "Increases Health Regeneration by 25%", "N/A", function() {
        playerStats.regeneration += 0.25;
    }, 10000, 75, 20),
   
];
var currentupgradechoices = [];
var upgrading = false;

function upgrades() {
    paused = true;
    wave++;
    rerollupgrades();
}


function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

function rerollupgrades() {
    var possibleupgrades = [];

    for (var upgrade of upgradeoptions) {
        if (upgrade.stacksleft > 0) {
            for (var i = 0; i < upgrade.weight; i++) {
                possibleupgrades.push(upgrade);
            }
        }
    }
    if (playerStats.exploding) {
        for (var upgrade of explodingupgrades) {
            if (upgrade.stacksleft > 0) {
                for (var i = 0; i < upgrade.weight; i++) {
                    possibleupgrades.push(upgrade);
                }
            }
        }
    }
    if (playerStats.truevampire) {
        for (var upgrade of vampireupgrades) {
            if (upgrade.stacksleft > 0) {
                for (var i = 0; i < upgrade.weight; i++) {
                    possibleupgrades.push(upgrade);
                }
            }
        }
    }
    console.log(possibleupgrades);
    
    var temp = [];

    temp[1] = possibleupgrades[Math.round(random(0, possibleupgrades.length - 1))];
    temp[2] = possibleupgrades[Math.round(random(0, possibleupgrades.length - 1))];
    temp[3] = possibleupgrades[Math.round(random(0, possibleupgrades.length - 1))];
    if (guns.length < playerStats.maxguns) {
        if(charactertype == "knight"){
            if(Math.random() > 0.5){
                temp[0] = gunoptions[Math.round(random(0, gunoptions.length - 1))];
            }else{
                temp[0] = knightweapons[Math.round(random(0, knightweapons.length - 1))];
            }
        }else if(charactertype == "assassin"){
            if(Math.random() > 0.5){
                temp[0] = gunoptions[Math.round(random(0, gunoptions.length - 1))];
            }else{
                temp[0] = assassinweapons[Math.round(random(0, assassinweapons.length - 1))];
            }
        }
        else{
            temp[0] = knightweapons[Math.round(random(0, knightweapons.length - 1))];
        }
        
    } else {
        temp[0] = possibleupgrades[Math.round(random(0, possibleupgrades.length - 1))];
    }
    upgrading = true;
    upgradechoices = [];
    for (var t of temp) {
        upgradechoices.push(new Upgrade(t.name, t.type, t.typecolor, t.description, t.img, t.effect, t.stacksleft, t.cost));

    }
}