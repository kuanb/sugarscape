
function initiateCells() {
	for (var y = 0; y < opts.width; y++) {
		for (var x = 0; x < opts.height; x++) {
			cells.push({
				location: {
					x: x, 
					y: y
				},
				vacant: true,
				agent: null,
				sugar: {
					maxProduction: 0,
					production: 0,
					regenerationRate: 0,
				},
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
			var d = Math.round(getDistance(attr, cell.location));

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

function initiateAgents () {
	for (var i = 0; i < opts.agentCount; i++) {
		 var attr = {
			x: Math.round(opts.width * Math.random()),
			y: Math.round(opts.height * Math.random()),
		  vision: Math.round(opts.maxVision * Math.random()),
		  harvest: Math.round(opts.maxHarvest * Math.random()),
		  consume: Math.round(opts.maxConsume * Math.random()),
		  capacity: Math.round(opts.maxCapacity * Math.random()),
		  sugar: Math.round(opts.maxSugar * Math.random()),
		};

		var a = new Agent(attr);
		agents.push(a);

		cells.map(function (cell) {
			if (cell.location.x == attr.x && cell.location.y == attr.y) {
				cell.vacant = false;
				// agent = a;
			}
		});
	}
};