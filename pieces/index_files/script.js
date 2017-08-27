cnvs = document.getElementById("cnvs")
ctx = cnvs.getContext("2d")

var width, height

window.addEventListener("resize", fitToScreen)
function fitToScreen() {
	cnvs.width = cnvs.height = width = Math.min(window.innerWidth, window.innerHeight)
	cnvs.style.cssFloat = width == window.innerWidth ? "none" : "left"
	sqrSize = width / 8
	drawState(currentState)
}

var fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
var currentState = unpackFen(fen)
var AI = false
var autoplay = false
var timeLimit = 2000
var arrows = false
var moveOptions = []
var gameover = false
var lightColor = "#edb67b"
var darkColor  = "#c17939"
var moveColor  = "rgba(255,0,0,0.4)"

document.addEventListener("DOMContentLoaded", startUp, false)

function startUp(){
	fitToScreen()
	moves = availableMoves(currentState, currentState.toPlay)
	drawState(currentState)
	if (arrows) drawMovesArrows(moves)
	
	ctx.font = (width/25).toString() + "px monospace"
	ctx.textAlign = "center"
	ctx.fillStyle = "red"
	ctx.fillText("click anywhere to load in the pieces", width/2, width/2)
	
	if (autoplay){
		setInterval(AIMove, 10)
		return
	}
	
	document.addEventListener("click", click)
	//document.addEventListener("mousemove", mouse)
}

function appendToLog(move, state){
	//piece = state.board[move[1][0]][move[1][1]].toUpperCase()
	document.getElementById("log").innerText += "\n" + notation(move[0][0], move[0][1]) + "-" + notation(move[1][0], move[1][1])
}

function userMove(move){
	currentState = makeMove(currentState, move)
	currentState.toPlay = currentState.toPlay == "w" ? "b" : "w"
	
	appendToLog(move, currentState) //matters where this goes as if before state change then code vil change...
	
	moves = availableMoves(currentState, currentState.toPlay)

	drawState(currentState)
	drawMove(move)
	
	if (arrows) drawMovesArrows(moves)
	
	//console.log("calculating available moves took", (new Date()) - start, "ms")
	
	checkmateOrStalemate(currentState, moves, currentState.toPlay)
	
	if (AI){
		setTimeout(AIMove, 1)
	}
	
}

function AIMove(){
	
	var start = new Date();
	
	var depth = 0
	while (new Date() - start < timeLimit){
		depth++
		compMove = negamaxItBuddy(currentState, depth, -Infinity, Infinity, currentState.toPlay)[1]
	}
	
	//console.log("Took me", new Date() - start, "ms to move just now")
	//console.log("Evaluations are: \nwhite:", Math.round(evaluate(currentState, "w")*10)/10, "\nblack:", Math.round(evaluate(currentState, "b")*10)/10)
	
	currentState = makeMove(currentState, compMove)
	
	currentState.toPlay = currentState.toPlay == "w" ? "b" : "w"
	moves = availableMoves(currentState, currentState.toPlay)

	appendToLog(compMove, currentState) //matters where this goes as if before state change then code vil change...
	document.getElementById("info").innerText = "info:\n\nto play:\n" + (currentState.toPlay == "w" ? "white" : "black") + "\n\nthought for:\n" + (new Date() - start).toString() + " ms\n\nthought to depth:\n" + depth + "\n\nwhite eval.:\n" + (Math.round(evaluate(currentState, "w")*10)/10).toString() + "\n\n\n"
	
	
	drawState(currentState)
	if (arrows) drawMovesArrows(moves)
	drawMove(compMove)

	checkmateOrStalemate(currentState, moves, currentState.toPlay)

}

function mouse(e){
	var r = Math.floor(e.offsetY / sqrSize)
	var c = Math.floor(e.offsetX / sqrSize)
	
	drawState(currentState)
	drawMovesSqrs(moveOptions)
	
	ctx.fillStyle = "rgba(20,255,160,0.6)"
	ctx.beginPath();
	ctx.arc((c+0.5) * sqrSize, (r+0.5) * sqrSize, sqrSize/2, 0, 2 * Math.PI)
	ctx.fill()
}

function click(e){
	if (gameover || autoplay) return
	
	var r = Math.floor(e.offsetY / sqrSize)
	var c = Math.floor(e.offsetX / sqrSize)
	
	var madeMove = false
	
	for (var m = 0; m < moveOptions.length; m++){
		if (moveOptions[m][1][0] == r && moveOptions[m][1][1] == c){
			userMove(moveOptions[m])
			moveOptions = []
			madeMove = true
		}
	}
	
	if (!madeMove){
		moveOptions = moves.filter(m => m[0][0] == r && m[0][1] == c)
		drawState(currentState)
		drawMovesSqrs(moveOptions)
	}
	
}


function drawMovesArrows(moves){
	for (var m = 0; m < moves.length; m++){
		drawArrow((moves[m][0][1] + 0.5) * sqrSize, (moves[m][0][0] + 0.5) * sqrSize,
		(moves[m][1][1] + 0.5) * sqrSize, (moves[m][1][0] + 0.5) * sqrSize,	35, 30)
	}
}

function drawMove(move){
	drawArrow((move[0][1] + 0.5) * sqrSize, (move[0][0] + 0.5) * sqrSize, (move[1][1] + 0.5) * sqrSize, (move[1][0] + 0.5) * sqrSize, 35, 30)
}



function drawMovesSqrs(moves){
	for (var m = 0; m < moves.length; m++){
		ctx.fillStyle = moveColor
		ctx.fillRect(moves[m][1][1] * sqrSize, moves[m][1][0] * sqrSize, sqrSize, sqrSize)
	}
}


function drawState(state){
	//cls
	ctx.clearRect(0,0,width,width)
	//drawing wood background
	drawWoodBackground()
	//drawing pieces
	for (var r = 0; r < 8; r++){
		for (var c = 0; c < 8; c++){
			if (state.board[r][c] != " "){
				ctx.drawImage(document.getElementById(state.board[r][c]), c * sqrSize, r * sqrSize, sqrSize, sqrSize)
			}
		}
	}
}

function drawWoodBackground(){
	ctx.font = (width/50).toString()+ "px monospace"
	ctx.textAlign = "start"
	ctx.fillStyle = "white"
	ctx.fillRect(0,0,width,width)
	for (var r = 0; r < 8; r++){
		for (var c = 0; c < 8; c++){
			ctx.fillStyle = (r+c) % 2 == 0 ? lightColor : darkColor
			ctx.fillRect(c*sqrSize, r*sqrSize, sqrSize, sqrSize)
			if (r == 7){
				ctx.fillStyle = "black"
				ctx.fillText(String.fromCharCode(97 + c), c * sqrSize + 5, width - 5)
			} if (c == 0){
				ctx.fillStyle = "black"
				ctx.fillText(8 - r, 5, r * sqrSize + sqrSize + (r == 7 ? -18 : -5))
			} if (r == 0){
				ctx.fillStyle = "black"
				ctx.fillText(String.fromCharCode(97 + c), c * sqrSize + 5, 18)
			} if (c == 7){
				ctx.fillStyle = "black"
				ctx.fillText(8 - r, width - 18, r * sqrSize + sqrSize -5)
			}
		}
	}
}
