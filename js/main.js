var opts = {

	// world map
	height: 30,
	width: 30,
	size: 20,
	strokWeight: 1,

	// sugar
	sugarMineCount: 2,
	maxProduction: 80,
	fallOff: 20,
}

var sugarMines = [];
var cells = [];

function initiateCells() {
	for (var y = 0; y < opts.width; y++) {
		for (var x = 0; x < opts.height; x++) {
			cells.push({
				location: {
					x: x, 
					y: y
				},
				sugar: {
					maxProduction: 0,
					production: 0,
					regenerationRate: 0,
				}
			});
		}
	}
};

function initiateSugarMines() {
	for (var i = 0; i < opts.sugarMineCount; i++) {
		var attr = {
			x: Math.round(opts.width * Math.random()),
			y: Math.round(opts.height * Math.random()),
			maxProduction: Math.round(opts.maxProduction * ((Math.random() * 0.2) + 0.8)),
			fallOff: Math.round(opts.fallOff * ((Math.random() * 0.2) + 0.8)),
		};
		sugarMines.push(new SugarMine(attr))

		cells.map(function (cell) {
			var d = getDistance(attr, cell.location);

			var calcProd = Math.max(0, attr.maxProduction - (attr.fallOff * d));
			var calcRegen = Math.round(((calcProd/attr.maxProduction * 0.5) + 0.5) * 100)/100;

			if (calcProd > cell.sugar.production && calcProd > 0) {
				cell.sugar.maxProduction = attr.maxProduction;
				cell.sugar.production = calcProd;
				cell.sugar.regenerationRate = calcProd;
			}

			return cell;
		});
	}
};


// utils

function getDistance (loc1, loc2) {
	var xDiff = Math.abs(loc1.x - loc2.x);
	var yDiff = Math.abs(loc1.y - loc2.y);
	return Math.round(Math.sqrt(xDiff * xDiff + yDiff * yDiff));
};


// data draw part

function renderSugarMines () {
	var c = document.getElementById("sugarScape");
	var ctx = c.getContext("2d");

	cells.forEach(function (cell) {
		if (cell.sugar.production > 0) { 
			var ratio = cell.sugar.production/cell.sugar.maxProduction;
			var blue = 250 - Math.floor( Math.min(250, ratio * 250 ));
      var color = "rgb(255,255," + blue + ")";

			ctx.fillStyle = color;
			ctx.fillRect(cell.location.x * opts.size, cell.location.y * opts.size, opts.size, opts.size)
		}
	});
};


// drawing

function drawCircle (ctrX, ctrY, rad, color) {
	ctx.beginPath();
	ctx.arc(ctrX, ctrY, rad, 0, 2 * Math.PI, false);
	ctx.fillStyle = color;
	ctx.fill();
};

function clearCanvas () {
	try { document.getElementById("sugarScape"); }
	catch (e) { console.log(e); }
};

function createCanvas () {
	var con = document.getElementsByClassName("container")[0];
	var can = document.createElement("canvas");
	can.id = "sugarScape";
	can.width  = opts.height * opts.size;
	can.height = opts.width * opts.size;
	con.appendChild(can)
};

function createScape () {
	var h = opts.height;
	var w = opts.width;
	var size = opts.size;
	var stroke = opts.stroke;
	var strokWeight = opts.strokWeight;

	var c = document.getElementById("sugarScape");
	var ctx = c.getContext("2d");

	for (var x = 0; x < h; x++) {
		for (var y = 0; y < w; y++) {
			ctx.fillStyle = "#FFF";
			ctx.fillRect(x * size, y * size, size, size)
		}
	}

  for (var i = 0; i <= y; i++) {
    ctx.moveTo(0, i * size);
    ctx.lineTo(c.width, i * size);
    ctx.stroke();
  }

  for (var i = 0; i <= x; i++) {
    ctx.moveTo(i * size, 0);
    ctx.lineTo(i * size, c.height - strokWeight);
    ctx.stroke();
  }

};

