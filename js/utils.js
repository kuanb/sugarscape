function getDistance (loc1, loc2) {
	var xDiff = Math.abs(loc1.x - loc2.x);
	var yDiff = Math.abs(loc1.y - loc2.y);
	return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
};