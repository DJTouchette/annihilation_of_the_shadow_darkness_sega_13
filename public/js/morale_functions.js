function createMoraleBars(){
  hpBarTop = new HealthBar(this.game, barConfigTop);
  hpBarTop.setFixedToCamera(true);
  // Set the push and pull morale bar in 50% (start from the middle)
  hpBarTop.setPercent(50);
}

function createTroopBar(sprite, width, height, positionx, positiony){
  graphics = this.game.add.graphics(positionx, positiony);
  graphics.beginFill(0X00FF00);
  graphics.drawRect(0, 0, width, height);
  sprite.addChild(graphics);
}

// accept group bottomside or topside
function damageMorale(group, enemyTroops){
  // group argument is the attacking group
  var moralValue = 50;
  // console.log("Troops destroyed:", 100 - enemyTroops);
  var totalUnit = group.children.length;
  var unitLife = moralValue / totalUnit; //each unit contributes 5 morale, so total 50 morale for each army
  // more enemyTroops means more morale change
  var moraleCalculation = ((100 - enemyTroops) / 100) * unitLife;
  // console.log("Enemy troops morale change:", moraleCalculation);
  if(group.name == "bottomside"){
    // bottomside attacks topside
    // change bar, bottom side should increase
    // console.log("Before attack, up morale is:", startingMoraleUp);
    // previousMoraleUp = moraleCalculation; // Previous morale after attacking up/red
    changeMoraleUp = troopMoraleCalc(enemyTroops, moraleCalculation, changeMoraleUp, "bottomside");
    startingMoraleUp -= changeMoraleUp;
    startingMoraleBottom += changeMoraleUp;
    if(startingMoraleBottom >= 100){
      startingMoraleBottom = 100;
      // console.log("Blue wins");
      // window.socket.emit("bottomWins");
      blueWins = true;
    }
    hpBarTop.setPercent(startingMoraleUp);
  }else if(group.name == "topside"){
    // topside attacks bottom
    // change bar, up side should increase
    // console.log("Before attack, bottom morale is:", startingMoraleBottom);
    // previousMoraleBottom = moraleCalculation; // Previous morale after attacking bottom/blue
    changeMoraleBottom = troopMoraleCalc(enemyTroops, moraleCalculation, changeMoraleBottom, "topside");
    startingMoraleBottom -= changeMoraleBottom;
    startingMoraleUp += changeMoraleBottom;
    if(startingMoraleUp >= 100){
      startingMoraleUp = 100;
      // console.log("Red wins");
      // window.socket.emit("topWins");
      redWins = true;
    }
    hpBarTop.setPercent(startingMoraleUp);
    // console.log("after up attacked, bottom morale now:", startingMoraleBottom);
  }
}

// Troop checker if troop is 0,
//   then change morale is 5 which is equal to 1 sprite
//   50 morale = 10 units
// If changeMorale is 5, then 1 sprite was previously killed
function troopMoraleCalc(enemyTroops, troopMoralDestroyed, changeMorale, group){
  // console.log("Change morale up before", changeMorale);
  // startingMoraleUp to change
  if(changeMorale === 0 || changeMorale >= 5){
    // make morale up equal to morale calculation
    changeMorale = troopMoralDestroyed * 1.5;
    if(group === "bottomside") {previousMoraleUp = troopMoralDestroyed;}
    if(group === "topside") {previousMoraleBottom = troopMoralDestroyed;}
  }else{
    // save the previous morale
    var before = troopMoralDestroyed;
    if(group === "bottomside"){
      // console.log("enter 3 bottomside");
      troopMoralDestroyed -= previousMoraleUp;
      previousMoraleUp = before;
    }
    if(group === "topside"){
      // console.log("enter 3 topside");
      troopMoralDestroyed -= previousMoraleBottom;
      previousMoraleBottom = before;
    }
    changeMorale = Math.abs(troopMoralDestroyed);
    changeMorale = 1.5 * changeMorale;
    // console.log("enter 3 ends");
  }
  // bonus morale if kill a unit????
  if(enemyTroops === 0) {
    changeMorale += 10; //10 for demo, regulary 5?
    // console.log("enter 2");
  }
  return changeMorale;
}
