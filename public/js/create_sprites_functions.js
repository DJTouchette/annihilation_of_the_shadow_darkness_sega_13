function createSide(x, y, group, sprite, frame_pos) {
  for (var i = 0; i < 4; i ++) {
    soldier = group.create((144 + x) + (48 * i), y, sprite);
    soldier.unit = new Footman();
    soldier.unit.dead = false;
    soldier.animations.add('attack', [0, 1, 2, 0], 4);
    soldier.anchor.setTo(-0.3, 0);
    soldier.scale.setTo(0.8, 0.8);
    soldier.tint = 0xFC001D;
    if (group === bottomSide){
      soldier.tint = 0x7FA5FD;
    }
    soldier.inputEnabled = true;
    createTroopBar(soldier, 46, 10, 1, -11);
    allUnits.push(soldier);
  }
  for (var j = 0; j < 2; j++) {
    archer = group.create((x + 96) + (j * 240), y, sprite);
    archer.unit = new Archer();
    archer.unit.dead = false;
    archer.animations.add('attack', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 0], 3);
    archer.anchor.setTo(-0.3, -0.2);
    archer.scale.setTo(0.8, 0.8);
    archer.tint = 0xFC001D;
    archer.loadTexture('archer');
    if (group === bottomSide){
      archer.tint = 0x7FA5FD;
    }
    archer.inputEnabled = true;
    createTroopBar(archer, 46, 10, 1, -11);
    allUnits.push(archer);
  }
  for (var f = 0; f < 2; f++) {
    armored = group.create((48 + x) + (f * 336), y, sprite);
    armored.unit = new Armored();
    armored.unit.dead = false;
    armored.animations.add('attack', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0], 5);
    armored.anchor.setTo(-0.25, 0);
    armored.scale.setTo(0.5, 0.5);
    armored.tint = 0xFC001D;
    armored.loadTexture('armored');
    if (group === bottomSide){
      armored.tint = 0x7FA5FD;
    }
    armored.inputEnabled = true;
    createTroopBar(armored, 80, 15, 2, -18);
    allUnits.push(armored);
  }
  for (var e = 0; e < 2; e++) {
    horseman = group.create(x + (e * 432), y, sprite);
    horseman.unit = new Horseman();
    horseman.unit.dead = false;
    horseman.animations.add('attack', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0], 4);
    horseman.anchor.setTo(0, 0);
    horseman.scale.setTo(0.4, 0.4);
    horseman.tint = 0xFC001D;
    horseman.loadTexture('horseman');
    if (group === bottomSide){
      horseman.tint = 0x7FA5FD;
    }
    horseman.inputEnabled = true;
    createTroopBar(horseman, 100, 20, 2, -21);
    allUnits.push(horseman);
  }
}

function setSprite(sprite){
  sprite.anchor.setTo(-0.25, 0);
  sprite.inputEnabled = true;
  sprite.frame = frame_pos;
  createTroopBar(sprite);
}

function sortUnits(){
  allUnits.sort(function compare (a, b) {
    return b.unit.spd - a.unit.spd;
  });
  for (var i = 0; i < allUnits.length; i ++) {
    allUnits[i].unit.index = i;
  }
}
