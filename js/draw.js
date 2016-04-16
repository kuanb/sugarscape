
function drawCircle (ctrX, ctrY, rad, color) {
	var c = document.getElementById("sugarScape");
	var ctx = c.getContext("2d");

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
    ctx.strokeStyle = "#999";
    ctx.stroke();
  }

  for (var i = 0; i <= x; i++) {
    ctx.moveTo(i * size, 0);
    ctx.lineTo(i * size, c.height - strokWeight);
    ctx.stroke();
  }

};