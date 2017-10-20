// an array in wich all the enemies will  be pushed.
var enemies = [];

/**
 * the enemy class derived from the 'Living' class
 * @class
 * @extends Living
 * @param {string} name name of enemy
 * @param {number} hp amount of healing points of the enemy
 * @param {number} mp amount of mana points of the enemy
 * @param {number} strength the strength of the enemy
 * @param {number} speed the speed of the enemy
 * @param {number} intelligence the intelligence of the enemy
 * @param {number} level the level of the enemy
 * @param {number} experiencePoints the amount of experience you get when you defeat the enemy
 * @param {Item[]} items the items the enemy has
 * @param {Weapon[]} weapons the weapons the enemy has.
 */
class Enemy extends Living {
    
    constructor (name, hp, mp, strength, defense, speed, intelligence, level, experiencePoints, items, weapons) {
        super(name, hp, mp, strength, defense, speed, intelligence, level, experiencePoints, items, weapons);

        this.id = name + enemies.length.toString();
        this.baseAttackSpeed = 2;

        // needed for very basic collision
        this.radius = 0;
    }
    
    /**
     * enemy attacks player <br>
     * damage reduction is calculated with the formula: <br>
     * y = -30 + 2 * \sqrt{x*25 +220 } <br>
     * where y is this.totalAttack and x is target.totalDefense <br>
     * @param {Living} target  
     */
    attack(target) {
        target.hp = target.hp - (this.totalAttack - (-30 + 2 * Math.sqrt(target.totalDefense * 25 + 220)));
    }

    /**
     * kills the enemy
     */
    die() {
        console.log(this.name + ' is dead');

        for (let i = 0; i < enemies.length; i++) {
            if (enemies[i].id == this.id) {
                enemies.splice(i, 1);
                break;
            }
        }

        this.replaceWithCorpse();
    }


    /**
     * update loop of enemy
     * @param {number} dt delta time
     */
    update(dt) {
        if (this.hp <= 0)
            this.die();

        if (this.hp > this.hpMax)
            this.hp = this.hpMax;
    }

    /**
     * replaces the enemy with a corpse
     */
    replaceWithCorpse() {
        console.log('this is a corpse');
    }

}