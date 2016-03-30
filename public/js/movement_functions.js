function playerTurn (i) {
    unit = allUnits[i];
    currentGroup = unit.parent.name;
    surroundings(unit);
    // makeUnitBar(unit, startingMoraleUp, startingMoraleBottom);
    if (allUnits[turn].unit.dead === true){
      turnSwitch = true;
    }
    mover.x = unit.x;
    mover.y = unit.y;
    window.socket.emit('groupTurn', unit.parent.name );
    window.socket.emit('tileMoved', [mover.x, mover.y, i]);
    moveRange.x = unit.x;
    moveRange.y = unit.y;
    if (unit.unit.constructor.name === 'Horseman') {
      moveRange.loadTexture('horseman_range');
    }
    if (unit.unit.constructor.name === 'Footman') {
      moveRange.loadTexture('footman_range');
    }
    if (unit.unit.constructor.name === 'Archer') {
      moveRange.loadTexture('archer_range');
    }
    if (unit.unit.constructor.name === 'Armored') {
      moveRange.loadTexture('armored_range');
    }
    limitX = unit.x;
    limitY = unit.y;
}

function movePlayer(tile, sprite) {
  window.socket.emit('PlayerMoved', currentGroup);
  unitCollision(tile);
  unit.unit.rangeTileCheck();
  if ( (Math.abs(Math.floor(limitX / 48) - background.getTileX(tile.x)) + Math.abs(Math.floor(limitY / 48) - background.getTileY(tile.y)) <= unit.unit.spd ) && !tileCollision(tile) && (unitColliding === false) && !unitPathing(tile)) {
    unit.x = tile.x;
    unit.y = tile.y;
    unit.unit.x = unit.x;
    unit.unit.y = unit.y;
    window.socket.emit('spriteMoved', unit.unit);
    targetUnit = false;
  } else {
    if ((unitColliding === true) && (Math.abs(Math.floor(unit.x / 48) - background.getTileX(tile.x)) + Math.abs(Math.floor(unit.y / 48) - background.getTileY(tile.y)) <= unit.unit.rng )) {
      if (targetUnit.parent.name !== unit.parent.name) {
        canAttack = true;
        unit.animations.play('attack');
        unit.unit.attack(targetUnit.unit);
        if (!targetUnit.unit.dead) {
          setBarPercent(game, targetUnit, targetUnit.unit.troops);
        }
        damageMorale(unit.parent, targetUnit.unit.troops);
        window.socket.emit('moraleChange', [unit.unit.index, targetUnit.unit.troops]  );
        window.socket.emit('barChange', [targetUnit.unit.index, targetUnit.unit.troops]);
        tile.animations.play('redden');
        turnSwitch = true;
        window.socket.emit('flickTheSwitch');
      } else {
      tile.animations.play('redden');
      targetUnit = false;
      }
    } else {
      targetUnit = false;
      tile.animations.play('redden');
      tile.x = unit.x;
      tile.y = unit.y;
    }
  }
  // console.log(unitPathing);
}

function tileCollision(tile) {
  for (var i = 0; i < tileGroup.children.length; i++) {
    var a = tile.getBounds();
    var b = tileGroup.children[i].getBounds().inflate(-4, -4);
    if (Phaser.Rectangle.intersects(a, b)) {
      return true;
    }
  }
}

function unitCollision(tile) {
  for (var i = 0; i < allUnits.length; i++) {
    var a = tile.getBounds();
    var b = allUnits[i].getBounds().inflate(-4, -4);
    if (Phaser.Rectangle.intersects(a, b)) {
      unitColliding = true;
      targetUnit = allUnits[i];
      return allUnits[i];
    } else {
      unitColliding = false;
    }
  }
}

function unitSpecialTile(unit) {
  for (var j = 0; j < specialTile.children.length; j++) {
    var a = unit.getBounds();
    var b = specialTile.children[j].getBounds().inflate(-4, -4);
    if (Phaser.Rectangle.intersects(a, b)) {
      return true;
    }
  }
}

function unitPathing(tile) {
  for (var i = 0; i < rangeTile.children.length; i++) {
    var a = mover.getBounds();
    var b = rangeTile.children[i].getBounds();
    if (Phaser.Rectangle.intersects(a, b) && limitY <= rangeTile.children[i].y) {
      return true;
    }
  }
}

function unitRangeTile(unit) {
  if (unit.unit.constructor.name === 'Archer') {
    for (var i = 0; i < rangeTile.children.length; i++) {
      var a = unit.getBounds();
      var b = rangeTile.children[i].getBounds();
      if (Phaser.Rectangle.intersects(a, b)) {
        return true;
      }
    }
  } else {
    return false;
  }
}

function surroundings(unit) {

  unit.unit.moraleBuff();
  for (var i = 0; i < allUnits.length; i++) {
    if (((Math.abs(background.getTileX(unit.x) - background.getTileX(allUnits[i].x))) === 1) && (Math.abs(background.getTileY(unit.y) - background.getTileY(allUnits[i].y)) === 0) || ((Math.abs(background.getTileY(unit.y) - background.getTileY(allUnits[i].y))) === 1) && (Math.abs(background.getTileX(unit.x) - background.getTileX(allUnits[i].x) === 0))) {
      if (unit.parent.name === allUnits[i].parent.name) {
        unit.unit.atk += 5;
        unit.unit.def += 1;
        return true;
      } else if (unit.parent.name !== allUnits[i].parent.name) {
        unit.unit.atk -= 5;
        unit.unit.def -= 1;
        unit.unit.spd = 1;
        return true;
      }
    }
  }

}



