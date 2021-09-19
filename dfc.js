$(document).ready(startUp);

$(function() {
    var x = 0;
    setInterval(function(){
        x+=1;
        $(".background").css("background-position", x + "px 0px");
    }, 50);
})

var clicked = false;

function startUp() {
    $(".corndog").on({
        "click": function() {
            init();
            if (!clicked) {
                clicked = true;
                animate();
            }
        }
    });
}

var canvas = document.querySelector('#bb-canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
}

var colorArray = [
    '#FFFF33',
    '#FFE800',
];

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

function Circle(x, y, dx, dy, radius, friction) {
    this.dir = 1;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.acc = .6;

    if (this.dx > 0) {
        this.dir = -1;
    }

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

        if (this.dir < 0) {
            c.arc(this.x + 20, this.y - 32, this.radius * (3/5), 0, Math.PI * 2, false);
            c.fillStyle = this.color;
            c.fill();

            c.beginPath();
            c.arc(this.x - 25, this.y - 18, this.radius * (3/10), 0, Math.PI * 2, false);
            c.fill();

            c.beginPath();
            c.arc(this.x + 27, this.y - 36, this.radius * (1/10), 0, Math.PI * 2, false);
            c.fillStyle = "#000";
            c.fill();

            c.beginPath();
            c.moveTo(this.x + 55, this.y - 30);
            c.lineTo(this.x + 37, this.y - 40);
            c.lineTo(this.x + 37, this.y - 25);
            c.fillStyle = "#ff6600";
            c.fill();
        }
        else  {
            c.arc(this.x - 20, this.y - 32, this.radius * (3/5), 0, Math.PI * 2, false);
            c.fillStyle = this.color;
            c.fill();

            c.beginPath();
            c.arc(this.x + 25, this.y - 18, this.radius * (3/10), 0, Math.PI * 2, false);
            c.fill();

            c.beginPath();
            c.arc(this.x - 27, this.y - 36, this.radius * (1/10), 0, Math.PI * 2, false);
            c.fillStyle = "#000";
            c.fill();

            c.beginPath();
            c.moveTo(this.x - 55, this.y - 30);
            c.lineTo(this.x - 37, this.y - 40);
            c.lineTo(this.x - 37, this.y - 25);
            c.fillStyle = "#ff6600";
            c.fill();
        }

        c.beginPath();
        c.moveTo(this.x - 20, this.y - 2);
        c.lineTo(this.x, this.y + 12);
        c.lineTo(this.x + 20, this.y - 2);
        c.strokeStyle = "#000";
        c.lineWidth = 2;
        c.stroke();
    }

    this.update = function () {
        if (this.x >= innerWidth - this.radius) {
            this.dx = -this.dx;
            this.dir *= -1;
        }
        if (this.x <= this.radius) {
            this.dx = -this.dx;
            this.dir *= -1;
        }
        if (this.y >= (innerHeight - this.radius - this.dy) * .98 || this.y <= this.radius - this.dy) {
            this.dy = -this.dy * friction;
        }
        else {
            this.dy += this.acc;
        }
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

//-------Variables-------//
maxRadius = 32;
radiusFrom = 30;
radiusTo = 21;

xSpeedFrom = 4;
xSpeedTo = 6;

ySpeedFrom = 1;
ySpeedTo = 5;

numCircles = 100;
friction = .60;
//-----------------------//

var circleArray = [];

function init() {
    xSpeedFrom *= -1;

    var radius = radiusFrom//Math.random() * radiusTo + radiusFrom;
    var x = window.innerWidth / 2;
    var y = window.innerHeight / 1/3;
    var dx = (Math.random() - 0.5) * xSpeedTo + xSpeedFrom;
    var dy = (Math.random() - 0.5) * ySpeedTo + ySpeedFrom;

    circleArray.push(new Circle(x, y, dx, dy, radius, friction));
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);    

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}