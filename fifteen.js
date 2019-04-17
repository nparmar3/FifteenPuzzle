var start = new Date();

// Records the total number of moves
var moves = 0;

// The available div elements
var ids = [
    "one",      "two",      "three",   "four",
    "five",     "six",      "seven",   "eight",
    "nine",     "ten",      "eleven",  "twelve",
    "thirteen", "fourteen", "fifteen", ""
];

// Since we're going to shuffle the divs, copy the ids into the shuffled array
var shuffled = ids.slice();

// Once shuffled, it's difficult to figure out which number is a digit, so just mapped numbers to digits
var ids_numeric = {
    "one":1,       "two":2,       "three":3,    "four":4,
    "five":5,      "six":6,       "seven":7,    "eight":8,
    "nine":9,      "ten":10,      "eleven":11,  "twelve":12,
    "thirteen":13, "fourteen":14, "fifteen":15, "sixteen":16
};

// Once the person changes the background, the current background is stored here
var selected_background;

var movement = [
    [0, 1, 1, 0], //0: one
    [0, 1, 1, 1], //1: two
    [0, 1, 1, 1], //2: three
    [0, 0, 1, 1], //3: four
    [1, 1, 1, 0], //4: five
    [1, 1, 1, 1], //5: six
    [1, 1, 1, 1], //6: seven
    [1, 0, 1, 1], //7: eight
    [1, 1, 1, 0], //8: nine
    [1, 1, 1, 1], //9: ten
    [1, 1, 1, 1], //10: eleven
    [1, 0, 1, 1], //11: twelve
    [1, 1, 0, 0], //12: thirteen
    [1, 1, 0, 1], //13: fourteen
    [1, 1, 0, 1], //14: fifteen
    [1, 0, 0, 1]  //15: sixteen
];


var background = ["spongebob", "jellyfish", "sandy", "squid"];

function initializeGame() {
    var background_id = Math.floor((Math.random() * 4));
    selected_background = background[background_id];

    document.getElementById(background[background_id]).selected = true; 
    for (var i = 0; i < ids.length - 1; i++) {
        document.getElementById(ids[i]).className = "tile " + background[background_id];
    }
}

function changeBackground() {
    var class_name = document.getElementById("characters").value;

    if (background.indexOf(class_name) < 0) {
        return;
    }

    selected_background = class_name;

    document.getElementById("main").innerHTML = "";

    for (var i = 0; i < ids.length; i++) {
        if (ids[i] == "") {
            document.getElementById("main").innerHTML += '<div id="sixteen" class="tile"></div>';
        } else {
            var id_name = ids[i];
            document.getElementById("main").innerHTML += '<div id="' + ids[i] + '" class="tile' + " " + selected_background + '">' + ids_numeric[id_name] + '</div>';
        }
    }
}

 var timerVar = setInterval(countTimer, 1000);
var totalSeconds = 0;
function countTimer() {
   ++totalSeconds;
   var hour = Math.floor(totalSeconds /3600);
   var minute = Math.floor((totalSeconds - hour*3600)/60);
   var seconds = totalSeconds - (hour*3600 + minute*60);

   document.getElementById("timer").innerHTML = hour + ":" + minute + ":" + seconds;
}
function shuffleBoard() {
    shuffled = ids.slice(); // Reinitialize the shuffled array
    var sixteen = 15;

    // Set a loop to go through 3 times
    for (var i = 0; i < 1; i++) {

        var movement_id = Math.floor((Math.random() * 4));

        while(movement[sixteen][movement_id] != 1) {
            movement_id = Math.floor((Math.random() * 4));
        }

        // The index id where the blank space will go to
        var move_to;

        switch(movement_id) {
            case 0:
                move_to = sixteen - 4;
                break;
                // subtract 4 to go to the top
            case 1:
                move_to = sixteen + 1;
                break;
                // add 1 to go to the right
            case 2:
                move_to = sixteen + 4;
                break;
                // subtract 4 to go to the bottom
            case 3:
                move_to = sixteen - 1;
                break;
                // subtract 1 to go to the left
        }

        // swap sixteen and move_to
        var temp = shuffled[sixteen];
        shuffled[sixteen] = shuffled[move_to];
        shuffled[move_to] = temp;

        sixteen = move_to;
    }

    displayBoard();
	
}

/**
 * Clears the inner html of the file and cycles through the shuffled array displaying the div's within main in the correct order.
 */
function displayBoard() {
    document.getElementById("main").innerHTML = "";

    for (var i = 0; i < shuffled.length; i++) {
        if (shuffled[i] == "") {
            document.getElementById("main").innerHTML += '<div id="sixteen" class="tile"></div>';
        } else {
            var id_name = shuffled[i];
            document.getElementById("main").innerHTML += '<div id="' + shuffled[i] + '" class="tile' + " " + selected_background + '">' + ids_numeric[id_name] + '</div>';
        }
    }

    var clickable_id;

    if (movement[shuffled.indexOf("")][0] == 1) {
        clickable_id = shuffled.indexOf("") - 4;
        document.getElementById(shuffled[clickable_id]).className += " clickable";
        document.getElementById(shuffled[clickable_id]).setAttribute("onclick", "swapPieces(" + clickable_id + ", " + shuffled.indexOf("") + ")");
    }

    if (movement[shuffled.indexOf("")][1] == 1) {
        clickable_id = shuffled.indexOf("") + 1;
        document.getElementById(shuffled[clickable_id]).className += " clickable";
        document.getElementById(shuffled[clickable_id]).setAttribute("onclick", "swapPieces(" + clickable_id + ", " + shuffled.indexOf("") + ")");
    }

    if (movement[shuffled.indexOf("")][2] == 1) {
        clickable_id = shuffled.indexOf("") + 4;
        document.getElementById(shuffled[clickable_id]).className += " clickable";
        document.getElementById(shuffled[clickable_id]).setAttribute("onclick", "swapPieces(" + clickable_id + ", " + shuffled.indexOf("") + ")");
    }

    if (movement[shuffled.indexOf("")][3] == 1) {
        clickable_id = shuffled.indexOf("") -1;
        document.getElementById(shuffled[clickable_id]).className += " clickable";
        document.getElementById(shuffled[clickable_id]).setAttribute("onclick", "swapPieces(" + clickable_id + ", " + shuffled.indexOf("") + ")");
    }
}

function swapPieces(clickable_id, empty_id) {
    animateMovement(clickable_id, empty_id);

    setTimeout(function() {
        var temp = shuffled[empty_id];
        shuffled[empty_id] = shuffled[clickable_id];
        shuffled[clickable_id] = temp;

        moves++;

        displayBoard();
        checkIfWon();
    }, 600);
}


function animateMovement(clickable_id, empty_id) {
    if (clickable_id - 4 == empty_id) {
        console.log(shuffled[clickable_id]);
        document.getElementById(shuffled[clickable_id]).className += " animate-up";
    } else if (clickable_id + 1 == empty_id) {
        document.getElementById(shuffled[clickable_id]).className += " animate-right";
    } else if (clickable_id + 4 == empty_id) {
        document.getElementById(shuffled[clickable_id]).className += " animate-down";
    } else if (clickable_id - 1 == empty_id) {
        document.getElementById(shuffled[clickable_id]).className += " animate-left";
    }
}

function checkIfWon() {
    if (ids.toString() == shuffled.toString()) {
        var end        = new Date();
        var elapsed_ms = end - start;
        var seconds    = Math.round(elapsed_ms / 1000);

        var html = "";
		html += "<p>Time(in seconds): " + seconds + "</p>";
        html += "<p>Moves: " + moves + "</p>";
        html += "<img src='spongeyes.gif' alt='You win' />";
		

        document.getElementById("win").innerHTML = html;
    }
}
