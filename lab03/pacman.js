var nonpacman = [".", ""]

function createGame(n){
    var game = new Array(n);
    
    var pacman = Math.floor(n/2);
    game[pacman] = "C"
    var fruit = Math.floor(Math.random() * n);
    if (game[fruit] == "C"){fruit += 1;}
    game[fruit] = "@";
    var ghost = n;
    game[ghost] = "^";
    for (var i = 0, len = game.length; i < len; i++){
        if (game[i] == null){
            game[i] = ".";
        }
    }
    return game;
}




document.writeln(createGame(10));