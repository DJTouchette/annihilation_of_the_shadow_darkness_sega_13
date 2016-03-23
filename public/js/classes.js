// This is just for my linter :)
/*jshint esversion: 6 */
/* globals console */

 // This lets us use new javascript features safely dont remove
'use strict';

// Driver code
let morale = 100;

// Making a unit class
class Unit {

  constructor (atk, spd, def, tile = 0) {

    this.atk = atk;
    this.spd = spd;
    this.def = def;
    this.troops = 100;
    this.tile = tile;

    // These stats are used to reset stats, we should clean this up some how.
    // But it works.
    this.ogAtk = atk;
    this.ogSpd = spd;
    this.ogDef = def;

  }

  // take damage method.
  takeDmg (dmg) {

    this.moraleBuff ();
    this.armyMorale(-5);
    this.troops -= dmg;

    if (this.troops <= 0) {
      this.troops = 0;
      //function that deletes sprite
      console.log('Im deaadd blaaahhh');
    }

  }

  // Takes in a positive or negative interger that effectivly lowers or highers
  // army morale.
  armyMorale (num) {

    if (arguments.length === 0) {

      return morale;

    }

    return morale += num;

  }

  // Takes in a enemy and does the battle logic, then calls take dmg on the enemy
  attack (enemy) {

    this.moraleBuff ();

    var atkRoll = this.atk * Math.random();
    var defRoll = enemy.def * Math.random();
    var dmg = (atkRoll - defRoll);

    if (dmg > 0) {

      this.armyMorale(3);
      enemy.takeDmg(Math.floor (dmg) );
      // setBarPercent(game, enemy, enemy.troops, 46);

      return 1;

    } else {

      console.log('Swing and a miss');

    }

  }

  // Resets stats to base and buffs them.
  moraleBuff () {

    this.statReset();

    if (morale === 120) {

      this.atk += 10;
      this.def += 10;
      // this.spd += this.tile;

    } else if (morale >= 100) {

      this.atk += 8;
      this.def += 3;
      // this.spd += this.tile;

    } else if (morale >= 80) {

      this.atk += 5;
      this.def += 3;
      // this.spd += this.tile;


    } else if (morale >= 40 || morale <= 40) {

      this.def += 8;
      this.atk -= 4;
      this.spd += 1;

    }
    this.spd += this.tile;
  }

  tileCheck() {
    if (unitSpecialTile(unit)) {
      this.tile = -2;
    } else {
      this.tile = 0;
    }
    // console.log(unit.unit.spd);
  }

  // Reset stats used by moraleBuff();
  statReset () {

    this.atk = this.ogAtk;
    this.def = this.ogDef;
    this.spd = this.ogSpd;

  }

}

//Creates a footman class that inherits from unit
class Footman extends Unit {

  constructor (atk, spd, def, tile) {

    super(50, 4, 10, tile);

  }

}

//Creates a archer class that inherits from unit
class Archer extends Unit {

  constructor (atk, spd, def, tile) {

    super(45, 3, 7, tile);

  }

}

//Creates a Horseman class that inherits from unit
class Horseman extends Unit {

  constructor (atk, spd, def, tile) {

    super(60, 6, 5, tile);

  }

}

//Creates a Armored class that inherits from unit
class Armored extends Unit {

  constructor (atk, spd, def, tile) {

    super(45, 2, 15, tile);

  }

}

// Some driver code
// let footman = new Footman();
// let archer = new Archer();
// let horseman = new Horseman();
// let armored = new Armored();
//
//
// for (let i = 0; i < 10; i ++) {
//
//   console.log(archer.troops);
//   console.log();
//   footman.attack(archer);
//   console.log();
//   console.log(archer.troops);
//
// }
