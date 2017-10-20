   /**
  * for calculating dice rolls <br>
  * example: roll(2d3); <br>
  *  @param {string} diceTextInfo the dice information in text format,'3d2' where 3 is the amount of rolls and 2 is the max number 
  */
class Dice {

  constructor(diceTextInfo) {
    let diceInfo = diceTextInfo.split("d");
    this.amountOfRolls = diceInfo[0];
    this.maxRollPoints = diceInfo[1];
  }

   /**
  * for calculating dice rolls <br>
  * example: roll(2d3); <br>
  * the roll information but in text format,'3d2' where 3 is the amount of rolls and 2 is the max number 
  */
  roll() {
    let total = 0;

    for (var roll = 0; roll < this.amountOfRolls; roll++) {
      total += (Math.random() * this.maxRollPoints) + 1;
    }

    return total;
  }
}