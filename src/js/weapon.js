
class Weapon extends Item {

    constructor(name, value, power, defense, elemental) {
        super(name, value);
        
        this.power = power;
        this.defense = defense;
        this.elemental = elemental;
    }

}