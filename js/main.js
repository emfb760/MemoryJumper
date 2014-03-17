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
input = new Input();

function init() {
	// Activate the keyboard event listeners
	window.addEventListener("keydown", InputKeyDownListener, false);
	window.addEventListener("keyup", InputKeyUpListener, false);
	
	// Set up the keybindings to be used by input object(s)
	input.addKeyBinding(KEYCODE.A,"left");
	input.addKeyBinding(KEYCODE.D,"right");
	
	// Initialize input object(s)
	input.init();
}

function update() {
	// Get canvas and context information to be used to update the next frame
	canvas = document.getElementById("myCanvas");
	context = canvas.getContext("2d");
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	// Update input state
	input.update();
	
	
	// Other objects to be updated go here.................
	
	
	// Call draw function and set update() to be called on next frame
	draw(context);
    requestAnimFrame(function() {
        update();
    });
}

temp = 0;
tempDelay = 60*5;

function draw(context) {
	if( temp > tempDelay ) {
		document.getElementById("hello").innerHTML = input.debugHTML();
		//alert(input.debugString());
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