// Call the appropriate requestAnimationFrame function for the browser in use
window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000/60);
    };
})();

// Create game objects globally so that they can be access by any function
player1_canvas = new Canvas();

function init() {
	// Activate the keyboard event listeners
	window.addEventListener("keydown", InputKeyDownListener, false);
	window.addEventListener("keyup", InputKeyUpListener, false);
	
	// Initialize player 1 canvas
	player1_canvas.init("myCanvas");
	
	// Set up the keybindings to be used in player 1 canvas and then initialize the input controller
	player1_canvas.addKeyBinding(KEYCODE.A,"left");
	player1_canvas.addKeyBinding(KEYCODE.D,"right");
	player1_canvas.addKeyBinding(KEYCODE.W,"up");
	player1_canvas.addKeyBinding(KEYCODE.S,"down");
	player1_canvas.startInputController();
	
	// Set up player in player 1 canvas
	player1_canvas.initializePlayer(100,100,25,25,"#ff0000");

}

function update() {
	// update canvas
	player1_canvas.update();
	
	// Other objects to be updated go here.................
	
	
	// Call draw function and set update() to be called on next frame
	draw();
    requestAnimFrame(function() {
        update();
    });
}

temp = 60*5;
tempDelay = 60*5;

function draw() {
	player1_canvas.draw();

	if( temp >= tempDelay ) {
		document.getElementById("hello").innerHTML = player1_canvas.debugHTML();
		//alert(player1_canvas.debugString());
		temp = 0;
	}
	else {
		temp++;
	}
}

// On window load, call init and then run the first frame
window.onload = function() {
    init();
    update();
}