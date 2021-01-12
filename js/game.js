const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
let started = false;
let level = 0;

$(document).keydown(function () {
	if (!started) {
		nextSequence();
		started = true;
	}
});

$(".btn").click(function () {
	var userChosenColor = this.id;
	userPattern.push(userChosenColor);
	playSound(userChosenColor);
	animatePress(userChosenColor);
	checkAnswer(userPattern.length - 1);
});

function nextSequence() {
	level++;
	userPattern = [];
	$("h1").html(`Level ${level}`);
	var randomNumber = Math.floor(Math.random() * 4);
	var randomChosenColour = buttonColors[randomNumber];
	gamePattern.push(randomChosenColour);
	$(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
	playSound(randomChosenColour);
}

function playSound(name) {
	var sound = new Audio(`sounds/${name}.mp3`);
	sound.play();
}

function animatePress(currentColor) {
	$(`#${currentColor}`).addClass("pressed");
	setTimeout(() => {
		$(`#${currentColor}`).removeClass("pressed");
	}, 100);
}

function checkAnswer(currentLevel) {
	if (userPattern[currentLevel] == gamePattern[currentLevel]) {
		if (gamePattern.length == userPattern.length) {
			setTimeout(() => {
				nextSequence();
			}, 1000);
		}
	} else {
		playSound("wrong");
		$("body").addClass("game-over");
		setTimeout(() => {
			$("body").removeClass("game-over");
		}, 800);
		$("h1").html("Game Over<br />Press Any Key to Restart");
		startOver();
	}
}

function startOver() {
	level = 0;
	gamePattern = [];
	started = false;
}
