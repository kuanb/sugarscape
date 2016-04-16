function Agent (attr) {
  this.x = attr.x;
  this.y = attr.y;
  this.vision = attr.vision;
  this.harvest = attr.harvest;
  this.consume = attr.consume;
  this.capacity = attr.capacity;
  this.sugar = Math.min(sugar, capacity);
}

Agent.prototype.getPosition = function() {
  return this.x + this.y * cntX;
}

Agent.prototype.migrate = function() {
    var bestPos = this.getPosition();
    var thisPos = this.getPosition();
    
    for (var i=this.x-this.vision; i<=this.x+this.vision; i++) {
      if (i < 0 || i >= cntX) continue;
      for (var j=this.y-this.vision; j<=this.y+this.vision; j++) {
        if (j < 0 || j >= cntY) continue;
        var idx = i + j*cntX;
        if (!hasAgent[idx] && sugar[bestPos] <= sugar[idx])
          bestPos = idx;
      }
    }
    hasAgent[thisPos] = false;
    hasAgent[bestPos] = true;
    this.x = bestPos % cntX;
    this.y = Math.floor(bestPos/cntX);
}

Agent.prototype.consume = function() {
  this.sugar -= this.consume;
  if (this.sugar <= 0) return false;
  else return true;
}

Agent.prototype.harvest = function() {
  var thisPos = this.getPosition();
  var harvest = Math.min(this.capacity-this.sugar,
    Math.min(this.harvest, sugar[thisPos]));
  sugar[thisPos] -= harvest;
  this.sugar += harvest;
}