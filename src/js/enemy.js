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
    }
    
    /**
     * enemy attacks player <br>
     * damage reduction is calculated with the formula: <br>
     * y = -30 + 2 * \sqrt{x*25 +220 } <br>
     * where y is this.totalAttack and x is target.totalDefense <br>
     * @param {Enemy} target  
     */
    attack(target) {
        if (target.totalDefense > this.totalAttack)
            console.log("blocked");
        else
            target.hp = target.hp - (this.totalAttack - (-30 + 2 * Math.sqrt(target.totalDefense * 25 + 220)));
    }

    die() {
        console.log(this.name + ' is dead');

        let i;
        for (i = 0; i < enemies.length; i++) {
            if (enemies[i].id == this.id) {
                console.log('found him!')
                break;
            }
        }
        enemies.splice(i, 1);


        this.replaceWithCorpse();
    }

    update() {
        if (this.hp <= 0)
            this.die();

        if (this.hp > this.hpMax)
            this.hp = this.hpMax;
    }

    replaceWithCorpse() {
        console.log('this is a corpse');
        this.mesh.material.color.setHex( 0xff0000 );
    }

}