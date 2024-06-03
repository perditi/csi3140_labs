var gameSize = 10;

var pacman;
var fruit;
var ghost;

var high_score = 0;

var score;
var fruitTimer = 0;

var gameActive = false;
var game;
var pellets;

function createGame(n, cont){
    game = new Array(n);
    pellets = new Array(n+1);
    for (var i = 0; i < n+1; i++){
        if (i == n){
            pellets[i] = n-2;//stores total number
        } else {
            pellets[i] = 1;
        }
    }
    
    if (!cont){
        pacman = Math.floor(n/2);
        score = 0;
    }
    pellets[pacman] = 0;

    game[pacman] = "C"

    do {
        fruit = Math.floor(Math.random() * (n));
    } while (fruit == pacman);
    game[fruit] = "@";
    pellets[fruit] = 0;

    do {
        ghost = Math.floor(Math.random() * (n));
    } while (ghost == pacman || ghost == fruit);
    game[ghost] = "^";

    for (var i = 0, len = game.length; i < len; i++){
        if (game[i] == null){
            game[i] = ".";
        }
    }
    console.log(pellets);
    displayScore();
    fruitTimer = 0;
    gameActive = true;
}

function moveLeft(){
    game[pacman] = "_";
    if (pacman == 0){
        pacman = game.length-1;
    } else {
        pacman = pacman - 1;
    }
    if (game[pacman] == "_"){
        game[pacman] = "C";
    } else {
        game[pacman] = "C" + game[pacman];
    }
}

function moveRight(){
    game[pacman] = "_";
    if (pacman == game.length-1){
        pacman = 0;
    } else {
        pacman = pacman + 1;
    }
    if (game[pacman] == "_"){
        game[pacman] = "C";
    } else {
        game[pacman] = "C" + game[pacman];
    }
}

function processMove(){
    if (pacman == ghost){
        console.log("ghost detected");
        if (fruitTimer > 0){
            console.log("has fruit, monching ghost");
            game[pacman] = "C";
            addScore(300);
        } else {
            gameActive = false;
            game[pacman] = "^";
        }
    }

    if (gameActive){
        if (pellets[pacman] == 1){
            console.log("pellet monch");
            pellets[pacman] = 0;
            pellets[pellets.length-1] -= 1;
            console.log(pellets)
            game[pacman] = "C";
            addScore(100);
        } else if (pacman == fruit){
            console.log("fruit detected");
            fruit = null;
            game[pacman] = "C";
            addScore(200);
            fruitTimer = 7;
        }
    }

    updateGame();
}

function addScore(n){
    console.log("adding " + n + " score");
    score += n;
    displayScore();
}

function displayScore(){
    document.getElementById("score").innerHTML = "Score: " + score;
}

function updateGame(){
    console.log("updategame call");
    if (gameActive == false){
        var tempGame = game;
        display(tempGame);
        console.log("checkpoint");
        game = null;
        document.getElementById("gamelose").innerHTML = "You lost! Restarting in three seconds...";
        if (score > high_score){
            high_score = score;
            console.log("updating hiscore");
            document.getElementById("hiscore").innerHTML = "High Score: " + high_score;
        }
        setTimeout(() => {
            document.getElementById("gamelose").innerHTML = "";
            createGame(gameSize, false);
            displayScore();
            display(game);
        }, 3000);
        
    } else if (gameActive == true){
        if (pellets[pellets.length-1] == 0){
            console.log("no pellets left, new game starting");
            addScore(500);
            createGame(gameSize, true);
        }
        display(game);
    }
}

function display(g){
    var output = "[";
    for (var i = 0, len = g.length; i < len; i++){
        let cell = " " + g[i] + " ";
        output += cell;
        if (i == len-1){
            output += "]";
        }
    }
    if (fruitTimer > 0){
        output += " @";
    }
    document.getElementById("game_screen").innerHTML = output;

}

function sleep(milliseconds) {
    console.log("waiting " + milliseconds + " ms");
    let timeStart = new Date().getTime();
        while (true) {
            let elapsedTime = new Date().getTime() - timeStart;
            if (elapsedTime > milliseconds) {
                console.log("done waiting");
                break;
            }
    }
}

function ghostMove(n){//input is 0 or 1
    if (pellets[ghost] == 1){
        game[ghost] = "."
    } else if (fruit == ghost){
        game[ghost] = "@";
    } else {
        game[ghost] = "_";
    }
    if (n == 0){
        console.log("ghost move left");
        if (ghost == 0){
            ghost = game.length-1;
        } else {
            ghost = ghost - 1;
        }
    } else if (n == 1){
        console.log("ghost move right");
        if (ghost == game.length-1){
            ghost = 0;
        } else {
            ghost = ghost + 1;
        }
    } else {
        console.log("this literaly shouldn't happen");
    }

    game[ghost] = "^";

    processMove();
}

createGame(gameSize, false)
updateGame();

document.addEventListener('keydown', function (e) {
    if (gameActive){
        if (e.key == "ArrowRight"){
            console.log("right press");
            moveRight();
            processMove();
        } else if (e.key == "ArrowLeft"){
            console.log("left press");
            moveLeft();
            processMove();
        }
        console.log("pacman in " + pacman);
    }
  }, false);

setInterval(() => {
    if (gameActive){
        var dir = Math.floor(Math.random() * (2));
        ghostMove(dir);
    }
}, 2000);

setInterval(() => {
    if (gameActive && fruitTimer > 0){
        fruitTimer = fruitTimer - 1;
        display(game);
    }
}, 1000);