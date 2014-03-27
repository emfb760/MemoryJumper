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
player2_canvas = new Canvas();

function init() {
	// Activate the keyboard event listeners
	window.addEventListener("keydown", InputKeyDownListener, false);
	window.addEventListener("keyup", InputKeyUpListener, false);

	
	// ********************************** SETUP PLAYER 1 GAME *********************************************
	
	// Set up player theme 1
	var theme1 = new Theme(
		'http://memoryrunner.tk/themes/minecraft/brickwall_grey.jpg',
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAADAFBMVEUAAAAXOhQdTBYcTxQeThgfVBcfVRg4WDETqQ8pkyY7jjdBtzZHsjlIjEVMkUhNkEpRl05RmE1XmFZMs0FfvFBlt1dlvFVnoWZHxTZMyz1fxVle0Exnz1Voz1dn11Vw3F1uyWV4zmd9zG6C3nCF3HSJ0oKdx52T0oST14yU146lzZ+k0pqu0Ki/0rvC4rvD0sDS0tLc3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABpinrOAAAAjElEQVRIx+3TtxLCMBBF0TWYZHLOOUfD//8cM/epoKFwvT6ldq4KzcpuqKIvJ7xxwE7aMOdJDTPUZYMW1hiJbvGeTFBCRS7oIUYYfJAnmZMpNDFZoAGdRLKF9+SIIa5SRAEpmjKH9+SODsL22Y8yVvKE9+SFMeyfgXSRJ5kTvfge4Yuf8YD2OZElnCdf4IbFpQC7kEYAAAAASUVORK5CYII=',
		'data:image/jpg;base64,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'
	);
	
	// Initialize player 1 canvas
	player1_canvas.init(document.getElementsByClassName("myCanvas")[0], document.getElementsByClassName("stage")[0], theme1);
	
	// Set up the keybindings to be used in player 1 canvas and then initialize the input controller
	player1_canvas.addKeyBinding(KEYCODE.A,"left");
	player1_canvas.addKeyBinding(KEYCODE.D,"right");
	player1_canvas.addKeyBinding(KEYCODE.Q,"dashLeft");
	player1_canvas.addKeyBinding(KEYCODE.E,"dashRight");
	player1_canvas.addKeyBinding(KEYCODE.SPACE,"jump");
	player1_canvas.addKeyBinding(KEYCODE.SHIFT,"run");
	player1_canvas.addKeyBinding(KEYCODE.GAMEPAD14,"left");
	player1_canvas.addKeyBinding(KEYCODE.GAMEPAD15,"right");
	player1_canvas.addKeyBinding(KEYCODE.GAMEPAD0,"jump");
	player1_canvas.addKeyBinding(KEYCODE.GAMEPAD2,"run");
	player1_canvas.addKeyBinding(KEYCODE.GAMEPAD6,"dashLeft");
	player1_canvas.addKeyBinding(KEYCODE.GAMEPAD7,"dashRight");
	player1_canvas.startInputController();
	
	// Set up player in player 1 canvas
	player1_canvas.initializePlayer(100,100,25,25,"#ff0000");
	
	// ****************************************************************************************************
	
	// ********************************** SETUP PLAYER 2 GAME *********************************************
	
	// Set up player theme 2
	var theme2 = new Theme(
		'http://memoryrunner.tk/themes/minecraft/minecraft.jpg',
		'data:image/png;base64,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',
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACo0lEQVRo3u2Z2U5UQRCGeQtRARciFzDMsDPDLjgzIovIooKJF2zKJoILKBAfwaCCChIe9ZhD0n++OaESEi96TPriu+n0Uv9JVXV1nYpCri5yrEy3ivVnHeJ0b7SE3qZqsfG8Uxx9KIj7bXfE8pMm8XqqRbyabBb7832Ce3Kc9v3ZH7ugIgjwLaC/5VbkWJrIiM25nMg2VJbANb92h4Vl9O9PjwTFU8zJ5xEx2lsnKIDj7kMFAd4FdDXeiBwvRzJi8XFa0LAYHkzj+pprBP2bInsyVcKKgasIcGcGAd4FMGXls/fEwnijGGi9XQI3JRRAkZYAaw7jxKXLmMH2u8KdGQQEAf8qYHWmLXIwUFlKMNiSAUesNW9ms4JG8GzeAxTAcYoPAspGAA/lPcBxlgUx3JR+zDk0bu1pu6BxrC6/bg4IxhI/EOPQfZwgwLsAGmBd2xQT83PnoZgfSwnuRX893BoUl/lxzGwxJTrrrwkrTbuYCgK8C6B/0rc5mXNirPcx1zMls2Jl9Wt9MMYS5/AhFQSUjQCmMh7EyW9fdJXw431e0FDuxZTHcd7E3989EIwNxhs/HG3STRwElJMA1t7s2CWLOb4hKMYq1EgudV2wk8e1NNrq9gUBZSOAz0ircEoaQTHHH4uCKZJtGaZkFoznXyaEdR5T9lBHrVBnLgjwLcCqvZmykjHAxi9vX/oxx9kYpoCzg3HBG90qHJlqnaggwLuA7vTNyMFDme6ST0qrAKSh9GPrH4RlHNfyvcE4cU2wIMC7AN5uvGGtDkXMVZ6hbGZxX/ZcGVeMAQrgTc9KwaXrIMC7AN6e3JD+mWyvMwYsAUzP37aHhNVSZywyTrg/RaqxFQT4FkBft3ybxsSwUON7guutJ6XVgmczi+Nce5mw/17AX1/LHho0p5BPAAAAAElFTkSuQmCC'
	);
	
	// Initialize player 2 canvas
	player2_canvas.init(document.getElementsByClassName("myCanvas")[1], document.getElementsByClassName("stage")[1], theme2);
	
	// Set up the keybindings to be used in player 2 canvas and then initialize the input controller
	player2_canvas.addKeyBinding(KEYCODE.J,"left");
	player2_canvas.addKeyBinding(KEYCODE.L,"right");
	player2_canvas.addKeyBinding(KEYCODE.U,"dashLeft");
	player2_canvas.addKeyBinding(KEYCODE.O,"dashRight");
	player2_canvas.addKeyBinding(KEYCODE.I,"jump");
	player2_canvas.addKeyBinding(KEYCODE.ENTER,"run");
	player2_canvas.startInputController();
	
	// Set up player in player 2 canvas
	player2_canvas.initializePlayer(100,100,25,25,"#00ff00");

	// ****************************************************************************************************
}

function update() {
	// update canvas
	player1_canvas.update();
	player2_canvas.update();
	
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
	player2_canvas.draw();
	
	/*
	if( temp >= tempDelay ) {
		document.getElementById("hello").innerHTML = player1_canvas.debugHTML();
		//alert(player1_canvas.debugString());
		temp = 0;
	}
	else {
		temp++;
	}*/
}

// On window load, call init and then run the first frame
window.onload = function() {
    init();
    update();
}