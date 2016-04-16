// agent

function Agent (attr) {
  this.x = attr.x;
  this.y = attr.y;
  this.vision = attr.vision;
  this.harvest = attr.harvest;
  this.consume = attr.consume;
  this.capacity = attr.capacity;
  this.sugar = Math.min(attr.sugar, attr.capacity);
};

Agent.prototype.getLocation = function () {
  return {x: this.x, y: this.y};
};

Agent.prototype.migrate = function() {
  var bestPos = this.getPosition();
  var thisPos = this.getPosition();
  
  cells.forEach(function (cell) {
    var d = getDistance(cell.location, this);
    if (this.vision < d) continue;

    
  });

  for (var i = this.x - this.vision; i <= this.x+this.vision; i++) {
    if (i < 0 || i >= opts.width) continue;

    for (var j = this.y - this.vision; j <= this.y + this.vision; j++) {

      if (j < 0 || j >= opts.height) continue;

      var idx = i + j*cntX;

      if (!hasAgent[idx] && sugar[bestPos] <= sugar[idx])
        bestPos = idx;
    }
  }
  hasAgent[thisPos] = false;
  hasAgent[bestPos] = true;
  this.x = bestPos % cntX;
  this.y = Math.floor(bestPos/cntX);
};

Agent.prototype.consume = function() {
  this.sugar -= this.consume;
  if (this.sugar <= 0) return false;
  else return true;
};

Agent.prototype.harvest = function() {
  var thisPos = this.getPosition();
  var harvest = Math.min(this.capacity-this.sugar,
    Math.min(this.harvest, sugar[thisPos]));
  sugar[thisPos] -= harvest;
  this.sugar += harvest;
};


// sugar

function SugarMine (attr) {
  this.x = attr.x,
  this.y = attr.y,
  this.initSugar = attr.maxProduction,
  this.production = attr.maxProduction,
  this.fallOff = attr.fallOff
};

SugarMine.prototype.getLocation = function () {
  return {x: this.x, y: this.y};
};