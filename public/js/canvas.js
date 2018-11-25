var canvas = document.querySelector('canvas');
var header = document.querySelector('header');
canvas.width = header.offsetWidth;
canvas.height = header.offsetHeight;

var WIDTH = canvas.width;
var HEIGHT = canvas.height;


var ctx = canvas.getContext('2d');
var mouse = {
	x: undefined,
	y: undefined
}
var minRadius = 6;
var maxRadius = 15;
var circlesNumber = Math.round(WIDTH/15);
var circleArray = [];
var speed = 0.8;
/* Class Circle */
function Circle(x,y,radius,dx,dy) {
	this.x = x;
	this.y = y;
	this.baseRadius = radius;
	this.radius = radius;
	this.dx = dx;
	this.dy = dy;
	this.shape = Math.floor(Math.random()*3);
	// this.color = colors[Math.floor(Math.random()*colors.length)];
	this.alpha = Math.random()*360;
	this.draw = function() {
		ctx.beginPath();
		switch (this.shape) {
			case 0:
				ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
				break;
			case 1:
				ctx.rect(this.x,this.y,radius,radius);
				break;
			case 2:
				ctx.moveTo(this.x,this.y);
				ctx.lineTo(this.x+2*Math.cos(this.alpha)*this.radius,this.y+2*Math.sin(this.alpha)*this.radius);
    			ctx.lineTo(this.x+2*Math.cos(30+this.alpha)*this.radius,this.y+2*Math.sin(30+this.alpha)*this.radius);
				break;
		}
		
		ctx.strokeStyle = '#d3d3d3';
		// ctx.fillStyle = this.color;
		// ctx.fill();
		ctx.closePath();
		ctx.stroke();
		
	}

	this.update = function() {
		if (this.x+this.radius > WIDTH || this.x-this.radius < 0) {
			this.dx = -this.dx;
		}
		if (this.y+this.radius > HEIGHT || this.y-this.radius < 0) {
			this.dy = -this.dy;
		}
		this.x += this.dx;
		this.y += this.dy;

		// interactivity
		// if (Math.abs(mouse.x - this.x) < 30 && Math.abs(mouse.y - this.y)<30) {
		// 	this.radius +=1;
		// } else if (this.radius >this.baseRadius) {
		// 	this.radius -=1;
		// }

		this.draw();
	}
}



function animate() {
	ctx.clearRect(0,0,WIDTH,HEIGHT);
	requestAnimationFrame(animate);
	for (var i=0;i<circleArray.length;i++) {
		circleArray[i].update();
	}
	
}

window.addEventListener('mousemove', function(e){
	mouse.x = e.x;
	mouse.y = e.y;
});

window.addEventListener('resize', function(e){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	WIDTH = canvas.width;
	HEIGHT = canvas.height;
	init();
});

function init() {
	circleArray = [];
	for (var i=0;i<circlesNumber;i++) {
		var x = Math.random()*WIDTH;
		var y = Math.random()*HEIGHT;
		var radius = Math.random()*maxRadius + minRadius;
		var dx = (Math.random()-0.5)*speed;
		var dy = (Math.random()-0.5)*speed;
		circleArray.push(new Circle(x,y,radius,dx,dy));
	}
}

init();
animate();