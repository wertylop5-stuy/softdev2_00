"use strict";

let cvs, ctx;
let clear, toggle;
let painter;
let shape;

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
	
	clear.addEventListener("click", painter.clearCanvas);
	toggle.addEventListener("click", painter.toggleShape);
	cvs.addEventListener("click", painter.paint);
	shape = 0;
}

function Painter(context) {
	this.shape = 0;
	this.ctx = context;
	this.prev = [];
}

Painter.prototype.wrap = function(func) {
	let context = this;
	
	return function(...args) {
		func.apply(context, args);
	}
}

Painter.prototype.setPrev = function(x, y) {
	this.prev = [x, y];
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
	//this.ctx.beginPath();
	
	switch(this.shape) {
		case CIRCLE:
			if (this.prev.length > 0) {
				this.ctx.beginPath();
				this.ctx.lineTo(e.offsetX, e.offsetY);
				this.ctx.stroke();
			}
			this.ctx.beginPath();
			this.ctx.arc(e.offsetX, e.offsetY, 10, 0, 2*Math.PI);
			this.setPrev(e.offsetX, e.offsetY);
			this.ctx.fill();
			this.ctx.stroke();
		break;
		
		case SQUARE:
			this.ctx.fillRect(e.offsetX, e.offsetY, 20, 20);
		break;
	}
};


init();

