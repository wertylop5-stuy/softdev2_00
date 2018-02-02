let cvs, ctx;
let clear, toggle;
let painter;

function init() {
	cvs = document.getElementById("boi");
	clear = document.getElementById("clear");
	toggle = document.getElementById("toggle");
	
	ctx = cvs.getContext("2d");
	
	painter = new Painter();
	console.log(painter);
	
	clear.addEventListener("click", painter.clear);
	toggle.addEventListener("click", painter.toggle);
	cvs.addEventListener("click", painter.paint);
}

function Painter(context) {
	Painter.shape = "Circle";
	Painter.ctx = context;
}

Painter.prototype.toggle = function() {
	//this.shape = 
};

Painter.prototype.clear = function() {
}

init();

