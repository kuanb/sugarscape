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

function renderAgents () {
	agents.forEach(function (agent) {
		var loc = agent.getLocation();
    var color = "rgb(255,100,255)";
    var x = (loc.x * opts.size + opts.size/2);
    var y = (loc.y * opts.size + opts.size/2);
    drawCircle(x, y, opts.size/2 - 2, color);
	});
};
