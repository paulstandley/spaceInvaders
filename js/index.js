// Spave Invaders

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Player {

    constructor() {

        this.velocity = {
            x: 0,
            y: 0
        }

        this.speed = 10;

        this.rotation = 0;

        const image = new Image();
        image.src = './img/spaceship.png';

        image.onload = () => {
            const scale = 0.13;
            this.image = image;
            this.width = image.width * scale;
            this.height = image.height * scale;
            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 40
            }
        }
    }

    draw() {
        //c.fillStyle = 'red';
        //c.fillRect(this.position.x, this.position.y, this.width, this.height);
        
        // take snapshot of canvas
        c.save();

        // move rotation to the center off the ship 
        c.translate(
            player.position.x + player.width /2, player.position.y + player.height / 2);

        c.rotate(this.rotation);

        c.translate(
            - player.position.x - player.width /2, 
            - player.position.y - player.height / 2);
        
        if (this.image) {
            c.drawImage(
                this.image,
                this.position.x, 
                this.position.y, 
                this.width, 
                this.height
            );
        }

        c.restore()
    }

    update() {
        if (this.image) {
            this.draw()
            this.position.x += this.velocity.x;
        }
    }
}

class Projectile {

    constructor( {position, velocity} ) {

        this.position = position;
        this.velocity = velocity;
        this.radius = 3;
    }

    draw() {

        c.beginPath();
        c.arc(
            this.position.x,
            this.position.y,
            this.radius,
            0,
            Math.PI * 2
        );
        c.fillStyle = 'red';
        c.fill();
        c.closePath();
    }

    update() {

        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y; 
    }
}

const player = new Player();
const projectiles = [];
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    space: {
        pressed: false
    }
}

function animate() {

    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
      
    projectiles.forEach((projectile, index) => {

        // remove projectiles from array when they left the screen
        if (projectile.position.y + projectile.radius <= 0) {
            setTimeout(() => {
                projectiles.splice(index, 1);
            },0)
        } else {
            projectile.update();
        }
    })

    // move player and border restictions
    if (keys.a.pressed && player.position.x >= 0) {
        player.velocity.x = - player.speed;
        player.rotation = -0.15;
    } else if (keys.d.pressed && player.position.x + player.width <= canvas.width) {
        player.velocity.x = + player.speed;
        player.rotation = 0.15;
    } else {
        player.velocity.x = 0;
        player.rotation = 0;
    }
}

animate();

window.addEventListener('keydown', ( {key} ) => {
    switch (key) {
        case 'a':  
        keys.a.pressed = true;
        //console.log('left');
        break;
        case 'd': 
        keys.d.pressed = true;
        //console.log('right');
        break;
        case ' ':
        //keys.space.pressed = true; 
        //console.log('space');
        projectiles.push(
            new Projectile({
                position: {
                    x: player.position.x + player.width / 2,
                    y: player.position.y
                },
                velocity: {
                    x: 0,
                    y: -10
                }
            })
        );
        //console.log(projectiles);
        break;
    }
})

window.addEventListener('keyup', ( {key} ) => {
    switch (key) {
        case 'a':  
        keys.a.pressed = false;
        //console.log('left');
        break;
        case 'd':
        keys.d.pressed = false;
        //console.log('right');
        break;
        case ' ':
        //keys.space.pressed = false; 
        console.log('space');
        break;
    }
})
