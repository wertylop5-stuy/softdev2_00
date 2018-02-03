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
	//painter.init();
	//console.log(painter);
	//painter.toggleShape();
	painter.toggleShape = painter.wrap(painter.toggleShape);
	painter.clearCanvas = painter.wrap(painter.clearCanvas);
	painter.paint = painter.wrap(painter.paint);
	//painter.toggleShape();
	
	clear.addEventListener("click", painter.clearCanvas);
	toggle.addEventListener("click", painter.toggleShape);
	cvs.addEventListener("click", painter.paint);
	shape = 0;
}

/*
function wrap(func) {
	//let context = this;
	//console.log(context);
	
	return function(...args) {
		//console.log(this);
		func.apply(this, args);
	}
}
*/

function Painter(context) {
	this.shape = 0;
	this.ctx = context;
}

Painter.prototype.wrap = function(func) {
	let context = this;
	
	return function(...args) {
		//console.log(context);
		func.apply(context, args);
	}
}

/*
Painter.prototype.init = function() {
	let that = this;
	*/
	Painter.prototype.toggleShape = function() {
		console.log("toggle");
		//console.log(this);
		this.shape = (this.shape + 1) % 2;
	};
	//Painter.prototype.toggleShape = wrap(Painter.prototype.toggleShape);

	Painter.prototype.clearCanvas = function() {
		console.log("clear");
		//console.log(this);
		this.ctx.clearRect(0, 0, cvs.width, cvs.height);
	};

	Painter.prototype.paint = function (e) {
		//console.log(e);
		this.ctx.fillStyle = "BlanchedAlmond";
		this.ctx.beginPath();
		
		switch(this.shape) {
			case CIRCLE:
				this.ctx.arc(e.clientX, e.clientY, 10, 0, 2*Math.PI);
				this.ctx.fill();
				this.ctx.stroke();
			break;
			
			case SQUARE:
				this.ctx.fillRect(e.clientX, e.clientY, 20, 20);
			break;
		}
	};
//}


/*
function toggleShape() {
	shape = (shape + 1) % 2;
	console.log(shape);
}

function clearCanvas() {
	//ctx.fillStyle = "#FFFFFF";
	//ctx.beginPath();
	ctx.clearRect(0, 0, cvs.width, cvs.height);
}

function paint(e) {
	console.log(e);
	ctx.fillStyle = "BlanchedAlmond";
	ctx.beginPath();
	
	switch(shape) {
		case CIRCLE:
			ctx.arc(e.clientX, e.clientY, 10, 0, 2*Math.PI);
			ctx.fill();
			ctx.stroke();
		break;
		
		case SQUARE:
			ctx.fillRect(e.clientX, e.clientY, 20, 20);
		break;
	}
}
*/


init();

