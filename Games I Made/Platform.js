// Function for generating rectangles
function rectangle(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    
    this.draw = function(){
        rect(this.x, this.y, this.w, this.h);
    };
}

// Variables to manage game state
let jumpPressed = false;
let rects = [];
let origin, center, dx, dy;

// The player object
let p = {
    x: 100,
    y: 100,
    w: 30, 
    h: 30,
    vx: 0,
    vy: 0,
    anticipate: "FLOOR",
    onGround: false,
    colliding: false,
    jump: false,
    draw: function() {
        rect(this.x, this.y, this.w, this.h);
    },
    update: function() {
        if (!this.onGround) {
            this.vy += 0.3;
            if (keyIsDown(LEFT_ARROW)) {
                this.vx -= 0.3;
            }
            if (keyIsDown(RIGHT_ARROW)) {
                this.vx += 0.3;
            }
            this.vx *= 0.95;
        } else {
            this.vy = 0;

            if (keyIsDown(LEFT_ARROW)) {
                this.vx -= 1.2;
            }
            if (keyIsDown(RIGHT_ARROW)) {
                this.vx += 1.2;
            }

            if (keyIsDown(UP_ARROW) && jumpPressed) this.jump = true;
            if (this.jump) {
                this.vy = -10;
                this.jump = false;
                this.onGround = false;
            }
            this.vx *= 0.8;
        }
        this.y += this.vy;
        this.x += this.vx;
    },
    reset: function() {
        this.x = 100;
        this.y = 100;
        this.vx = 0;
        this.vy = 0;
        this.anticipate = "FLOOR";
        this.onGround = false;
        this.colliding = false;
        this.jump = false;
    }
};

function setup() {
    createCanvas(800, 600).parent('canvas-container');
    initializeGameObjects();
    initializeCamera();
}

function draw() {
    background(220);
    
    updateCamera();
    translate(origin.x - center.x, origin.y - center.y);
    
    p.colliding = false;
    
    handleCollisions();
    
    if (!p.colliding) p.onGround = false;
    
    p.update();
    p.draw();
    drawRectangles();
    
    jumpPressed = false;
    
    drawDebugInfo();
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        jumpPressed = true;
        if (p.onGround) p.jump = true;
    } else if (key === 'r') {
        resetGame();
    }
}

function initializeGameObjects() {
    rects = [
        new rectangle(10, height - 40, 800, 40),
        new rectangle(200, height - 180, 200, 40),
        new rectangle(250, height - 300, 200, 50),
        new rectangle(400, 100, 50, 50),
        new rectangle(150, 150, 50, 50),
        new rectangle(-200, 2000, 500, 50),
        new rectangle(500, 10, 200, 10),
        // Additional platform blocks
        new rectangle(600, height - 100, 100, 40),
        new rectangle(700, height - 220, 150, 40),
        new rectangle(50, height - 360, 100, 40),
        new rectangle(400, height - 480, 150, 40),
        new rectangle(150, height - 540, 100, 40),
        new rectangle(550, height - 300, 100, 40),
        new rectangle(700, height - 400, 100, 40),
        new rectangle(50, height - 600, 100, 40)
    ];
}

function initializeCamera() {
    origin = { x: width / 2, y: height / 2 };
    center = { x: width / 2, y: height / 2 };
    dx = center.x - p.x;
    dy = center.y - p.y;
}

function updateCamera() {
    dx = center.x - p.x;
    dy = center.y - p.y;

    if (abs(dx) > 100) {
        center.x -= dx - 100 * dx / abs(dx);
    }

    if (abs(dy) > 100) {
        center.y -= dy - 100 * dy / abs(dy);
    }
}

function handleCollisions() {
    for (let i = 0; i < rects.length; i++) {
        let r = rects[i];
        let top = new rectangle(r.x, r.y - 10, r.w, 10);
        let btm = new rectangle(r.x, r.y + r.h, r.w, 10);
        let lt = new rectangle(r.x - 10, r.y, 10, r.h);
        let rt = new rectangle(r.x + r.w, r.y, 10, r.h);

        if (rectCollision(lt, p) && p.vx > 0 && p.y + p.h - 10 > top.y + top.h) {
            p.anticipate = "LEFT";
        }
        if (rectCollision(rt, p) && p.vx < 0 && p.y + p.h - 10 > top.y + top.h) {
            p.anticipate = "RIGHT";
        }
        if (rectCollision(btm, p)) {
            p.anticipate = "CEILING";
        }
        if (rectCollision(top, p) && p.y + p.h - 5 < top.y + top.h && p.vy > 0) {
            p.anticipate = "FLOOR";
        } 

        if (rectCollision(p, r)) {
            handleRectangleCollision(r);
        }
    }
}

function handleRectangleCollision(r) {
    if (p.anticipate === "FLOOR") {
        p.vy = 0;
        p.y = r.y - p.h;
        p.onGround = true;
        p.colliding = true;
    }
    if (p.anticipate === "CEILING") {
        if (p.vy < 0) {
            p.vy = 0;
            p.y = r.y + r.h;
        } 
        p.colliding = true;
    }
    if (p.anticipate === "RIGHT") {
        p.vx = 0;
        p.x = r.x + r.w;
        p.colliding = true;
    }
    if (p.anticipate === "LEFT") {
        p.vx = 0;
        p.x = r.x - p.w;
        p.colliding = true;
    }
}

function drawRectangles() {
    for (let i = 0; i < rects.length; i++) {
        rects[i].draw();
    }
}

function drawDebugInfo() {
    circle(origin.x, origin.y, 10);
    circle(center.x, center.y, 10);
    push();
        noFill();
        rect(center.x - 100, center.y - 100, 200, 200);
    pop();
}

function resetGame() {
    p.reset();
    initializeCamera();
}

function rectCollision(r1, r2) {
    return (
        r1.x < r2.x + r2.w &&
        r1.x + r1.w > r2.x &&
        r1.y < r2.y + r2.h &&
        r1.h + r1.y > r2.y
    );
}
