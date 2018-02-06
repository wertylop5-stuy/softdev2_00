"use strict";

let cvs, ctx;
let clear, toggle;
let painter, linePainter;

const CIRCLE = 0, SQUARE = 1;

function init() {
	cvs = document.getElementById("boi");
	clear = document.getElementById("clear");
	toggle = document.getElementById("toggle");
	
	ctx = cvs.getContext("2d");
	
	painter = new Painter(ctx);
	painter.toggleShape = painter.wrap(painter.toggleShape);
	painter.clearCanvas = painter.wrap(painter.clearCanvas);
	painter.paint = painter.wrap(painter.paint);
	
	linePainter = new LinePainter(ctx);
	linePainter.init();
	
	clear.addEventListener("click", clearAll);
	toggle.addEventListener("click", painter.toggleShape);
	cvs.addEventListener("click", paintAll);
}

function paintAll(e) {
	painter.paint(e);
	linePainter.paint(e);
}

function clearAll(e) {
	painter.clearCanvas();
	linePainter.clearPrev();
}

//A somewhat generic painter, kind of a parent class?
function Painter(context) {
	this.shape = 0;
	this.ctx = context;
}

//avoid the problem with "this" in event listeners
Painter.prototype.wrap = function(func) {
	let context = this;
	
	return function(...args) {
		func.apply(context, args);
	}
}

Painter.prototype.toggleShape = function() {
	console.log("toggle");
	this.shape = (this.shape + 1) % 2;
};

Painter.prototype.clearCanvas = function() {
	console.log("clear");
	this.ctx.clearRect(0, 0, cvs.width, cvs.height);
	this.ctx.beginPath();
};

Painter.prototype.paint = function (e) {
	this.ctx.fillStyle = "BlanchedAlmond";
	this.ctx.beginPath();
	
	switch(this.shape) {
		case CIRCLE:
			this.ctx.arc(e.offsetX, e.offsetY, 10, 0, 2*Math.PI);
			this.ctx.fill();
			this.ctx.stroke();
		break;
		
		case SQUARE:
			this.ctx.fillRect(e.offsetX, e.offsetY, 20, 20);
		break;
	}
};

//Draws the line connecting points
function LinePainter(context) {
	this.ctx = context;
	this.prev = [];
}

LinePainter.prototype.init = function() {
	this.ctx.beginPath();
}

LinePainter.prototype.setPrev = function(x, y) {
	this.prev = [x, y];
}

LinePainter.prototype.clearPrev = function() {
	this.clearCanvas();
	this.prev = [];
}

//Draws a line from the current point to the previous point
LinePainter.prototype.paint = function(e) {
	if (this.prev.length < 1) {
		this.setPrev(e.offsetX, e.offsetY);
	}
	else {
		this.ctx.moveTo(e.offsetX, e.offsetY);
		this.ctx.lineTo(this.prev[0], this.prev[1]);
		this.ctx.stroke();
		
		this.setPrev(e.offsetX, e.offsetY);
	}
}

//Inherit from Painter
LinePainter.prototype.__proto__ = Painter.prototype;

init();

