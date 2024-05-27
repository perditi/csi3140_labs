var pacman;
var fruit;
var ghost;

function showArray(arr){
    var output = "[";
    for (var i=0, len = arr.length; i < len; i++) {
    output += arr[i] + ", ";
    }
    output += "]<br>";
}

function createGame(n){
    var game = new Array(n);
    
    pacman = Math.floor(n/2);
    game[pacman] = "C"
    fruit = Math.floor(Math.random() * n);
    if (game[fruit] == "C"){fruit += 1;}
    game[fruit] = "@";
    ghost = n;
    game[ghost] = "^";
    for (var i = 0, len = game.length; i < len; i++){
        if (game[i] == null){
            game[i] = ".";
        }
    }
    return game;
}

function moveLeft(game){
    game[pacman] = "";
    if (pacman == 0){
        pacman = game.length-1;
    } else {
        pacman = pacman - 1;
    }
    game[pacman] = "C" + game[pacman];
    document.getElementById("test").innerHTML = game;
}

function moveRight(game){
    game[pacman] = "";
    if (pacman == game.length-1){
        pacman = 0;
    } else {
        pacman = pacman + 1;
    }
    game[pacman] = "C" + game[pacman];
    document.getElementById("test").innerHTML = game;
}



var game = createGame(10);
document.getElementById("test").innerHTML = game;


document.onclick = function(){moveLeft(game)};


