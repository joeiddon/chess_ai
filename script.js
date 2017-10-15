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
//var fen = "rnbqkbnr/pppppppp/8/8/8/7Q/PPPPPPPP/RNB1KBNR w KQkq - 0 1"

//var fen = "8/8/8/4k4/4q4/8/8/4K4 w KQkq - 0 1"
//var fen = "4K3/8/8/8/R4Q2/8/8/4k3 b KQkq - 0 1"

var interstingState = { "board": [ [ " ", " ", " ", " ", " ", " ", " ", "r" ], [ " ", "b", " ", "k", " ", "p", "p", "p" ], [ "r", "b", "p", " ", "n", " ", " ", " " ], [ " ", "p", " ", "p", "P", " ", " ", " " ], [ "P", "P", " ", " ", " ", "P", " ", " " ], [ " ", " ", "N", "R", " ", " ", "P", " " ], [ " ", " ", " ", " ", " ", "N", "B", " " ], [ "R", " ", " ", " ", " ", " ", "K", " " ] ], "toPlay": "w", "castling": "undefinedundefined", "enPassant": "-", "halfmoves": 0 }

var currentState = unpackFen(fen)
var stateHistory = [copyState(currentState)]
var AI = true
var autoplay = false
var timeLimit = 1000
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
		id = setInterval(AIMove, 100)//button also needs updatining if changed
		return
	}
	
	document.addEventListener("click", click)
	
	start = new Date() // required for move timing
	updateInfo(0)
}

function userMove(move){
	stateHistory.push(copyState(currentState))
	currentState = makeMove(currentState, move)
	currentState.toPlay = currentState.toPlay == "w" ? "b" : "w"
	moves = availableMoves(currentState, currentState.toPlay)
	
	appendToLog(move, currentState) //matters where this goes as if before state change then code vil change...
	updateInfo(0)
	
	drawState(currentState)
	if (arrows) drawMovesArrows(moves)
	drawMove(move)	
	
	//console.log("calculating available moves took", (new Date()) - start, "ms")
	
	checkmateOrStalemate(currentState, moves, currentState.toPlay)
	
	if (AI){
		setTimeout(AIMove, 20)
	}
}

function AIMove(){
	if (gameover) return
	
	start = new Date() // required for move timing
	
	var depth = 0
	var compMove
	while (new Date() - start < timeLimit){
		depth++
		var score
		[score, compMove] = negamaxItBuddy(currentState, depth, -Infinity, Infinity, currentState.toPlay)
		if (score == Infinity) break
	}
	
	stateHistory.push(copyState(currentState))
	currentState = makeMove(currentState, compMove)	
	currentState.toPlay = currentState.toPlay == "w" ? "b" : "w"
	moves = availableMoves(currentState, currentState.toPlay)

	appendToLog(compMove, currentState) //matters where this goes as if before state change then code vil change...
	updateInfo(depth)
	
	drawState(currentState)
	if (arrows) drawMovesArrows(moves)
	drawMove(compMove)

	checkmateOrStalemate(currentState, moves, currentState.toPlay)
	
	start = new Date() // required for move timing
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
