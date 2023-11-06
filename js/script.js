const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gridSize = 20; // Adjust this for the desired grid size
const orbSize =4; // Adjust this for the desired orb size
const orbs = [];
color='#ec5729'
//color=`#fffafa`
function makeCircle(x, y, size, color, alpha) {
  canvas.beginPath();
  //canvas.globalAlpha = alpha
  canvas.arc(x, y, size, 0, 2 * Math.PI);
  canvas.fillStyle = color;
  canvas.fill();
  canvas.closePath();
}
//function makeCircle(x, y, size, color, alpha) {
  //canvas.globalAlpha = alpha
//  canvas.fillStyle = this.radgrad;
//  canvas.fillRect(x, y, orbSize, orbSize);
//}

class Orb {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.radgrad = ctx.createRadialGradient(this.x+(orbSize/2), this.y+(orbSize/2), orbSize/8, this.x+(orbSize/2), this.y+(orbSize/2), orbSize/2);
    this.radgrad.addColorStop(1, "rgb(14,17,17)");
    this.radgrad.addColorStop(0, "snow");
    this.color = color;
    this.isMoving = Math.random() < .8; // Randomly decide if the orb should move
    if (this.isMoving) {
      this.opacity=0.0; this.speed=Math.random(); this.direction=1;
      this.target=.4+(.5*Math.random());
    } else {this.opacity=.4+(.5*Math.random())};
    this.exists = Math.random() < .4;
    // this.moveStartTime = Date.now() + Math.random() * 2000; // Initial random movement duration
  }

  update() {
    if (this.isMoving && this.exists) {
      if ((this.opacity >this.target)) {
        this.direction= -1
      } 
      this.opacity+=(.015*this.speed*this.direction)
      if (this.opacity<=0.02){this.direction=1}
    }
  }

  draw() {
    if (this.exists) {
      ctx.beginPath();
      ctx.globalAlpha=this.opacity;
      ctx.arc(this.x, this.y, orbSize, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      //ctx.fillRect(this.x, this.y, orbSize, orbSize);
      ctx.fill();
      ctx.closePath();
    }
  }
}

// Create grid of orbs
for (let x = gridSize / 2; x < canvas.width; x += gridSize) {
  for (let y = gridSize / 2; y < canvas.height; y += gridSize) {
    orbs.push(new Orb(x, y, color));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const orb of orbs) {
    orb.update();
    orb.draw();
  }

  requestAnimationFrame(animate);
}
animate();
