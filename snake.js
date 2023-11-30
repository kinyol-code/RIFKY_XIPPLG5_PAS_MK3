/*
Create by Learn Web Developement
Youtube channel : https://www.youtube.com/channel/UC8n8ftV94ZU_DJLOLtrpORA
*/

const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create the unit
const box = 32;

// load images

const backround = new Image();
backround.src = "backround.png";

const exp = new Image();
exp.src = "exp.png";

const pacman = new Image();
pacman.src = "pacman.png";

const enemy = new Image();
enemy.src = "enemy.png";

// load audio files

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "dead.mp3";
eat.src = "eat.mp3";
up.src = "up.mp3";
right.src = "right.mp3";
left.src = "left.mp3";
down.src = "down.mp3";

// create the snake

let snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
};

// create the food

let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// create the score var

let score = 0;

//control the snake

let d;

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if ((key == 37 || key == 65) && d != "RIGHT") {
        left.play();
        d = "LEFT";
    } else if ((key == 38 || key == 87) && d != "DOWN") {
        d = "UP";
        up.play();
    } else if ((key == 39 || key == 68) && d != "LEFT") {
        d = "RIGHT";
        right.play();
    } else if ((key == 40 || key == 83) && d != "UP") {
        d = "DOWN";
        down.play();
    }
}

// cheack collision function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// draw everything to the canvas

function draw() {
    ctx.drawImage(backround, 0, 0);

    for (let i = 0; i < snake.length; i++) {
        ctx.save(); // Simpan konteks gambar saat ini

        // Set titik tengah gambar sebagai pusat rotasi
        ctx.translate(snake[i].x + box / 2, snake[i].y + box / 2);

        // Putar gambar berdasarkan arah kontrol
        if (i === 0) {
            // Gambar Pacman pada posisi kepala
            if (d === "LEFT") {
                ctx.rotate(Math.PI); // 180 derajat
            } else if (d === "UP") {
                ctx.rotate(-Math.PI / 2); // -90 derajat
            } else if (d === "DOWN") {
                ctx.rotate(Math.PI / 2); // 90 derajat
            }
            // Gambar Pacman
            ctx.drawImage(pacman, -box / 2, -box / 2, box, box);
        } else {
            // Gambar musuh pada posisi tubuh ular
            ctx.drawImage(enemy, -box / 2, -box / 2, box, box);
        }

        ctx.restore(); // Pulihkan konteks gambar sebelumnya
    }

    ctx.drawImage(exp, food.x, food.y);

    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // which direction
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    // if the snake eats the food
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        eat.play();
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        };
        // we don't remove the tail
    } else {
        // remove the tail
        snake.pop();
    }

    // add new Head
    let newHead = {
        x: snakeX,
        y: snakeY
    };

    // game over
    if (
        snakeX < 0 ||
        snakeY < 0 ||
        snakeX >= cvs.width ||
        snakeY >= cvs.height ||
        collision(newHead, snake)
    ) {
        clearInterval(game);
        dead.play();
        displayGameOver();
    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2 * box, 1.6 * box);
}

function displayGameOver() {
    // Tampilkan notifikasi game over
    const modal = document.getElementById("gameOverModal");
    modal.style.display = "flex";
}

function restartGame() {
    // Sembunyikan notifikasi game over
    const modal = document.getElementById("gameOverModal");
    modal.style.display = "none";

    // Reset game state
    snake = [];
    snake[0] = {
        x: 9 * box,
        y: 10 * box
    };
    food = {
        x: Math.floor(Math.random() * 17 + 1) * box,
        y: Math.floor(Math.random() * 15 + 3) * box
    };
    score = 0;
    d = undefined;
}
function tampilkanNotifikasi(pesan) {
    const elemenNotifikasi = document.getElementById("notifikasi");
    elemenNotifikasi.textContent = pesan;
    elemenNotifikasi.style.display = "block";

    // Sembunyikan notifikasi setelah durasi tertentu (misalnya, 3 detik)
    setTimeout(() => {
        elemenNotifikasi.style.display = "none";
    }, 3000); // 3000 milidetik = 3 detik
}

function tampilkanGameover() {
    // Tampilkan notifikasi game over
    tampilkanNotifikasi("Game Over! Skor Anda: " + skor);
    const modal = document.getElementById("modalGameover");
    modal.style.display = "flex";
}


// call draw function every 100 ms

let game = setInterval(draw,100);


















