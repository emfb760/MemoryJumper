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
	player1_canvas.startInputController();

}

function update() {
	// update canvas
	player1_canvas.update();
	
	// Other objects to be updated go here.................
	
	
	// Call draw function and set update() to be called on next frame
	draw(player1_canvas.context);
    requestAnimFrame(function() {
        update();
    });
}

temp = 0;
tempDelay = 60*5;

function draw(context) {
	player1_canvas.draw();

	if( temp > tempDelay ) {
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