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
var stateHistory = [copyState(currentState)]
var AI = true
var autoplay = false
var timeLimit = 300
var arrows = false
var moveOptions = []
var gameover = false
var lightColor = "#edb67b"
var darkColor  = "#c17939"
var moveColor  = "rgba(255,0,0,0.4)"

window.addEventListener("load", startUp)

function startUp(){
	fitToScreen()
	moves = availableMoves(currentState, currentState.toPlay)
	drawState(currentState)
	if (arrows) drawMovesArrows(moves)
	
	document.addEventListener("click", click)
	
	start = new Date() // required for move timing
	updateInfo(0)
}

function userMove(move){
	stateHistory.push(copyState(currentState))
	currentState = makeMove(currentState, move)
	currentState.toPlay = currentState.toPlay == "w" ? "b" : "w"
	moves = availableMoves(currentState, currentState.toPlay)
	
	updateInfo(0)
	
	drawState(currentState)
	if (arrows) drawMovesArrows(moves)
	drawMove(move)	
	
	checkmateOrStalemate(currentState, moves, currentState.toPlay)
	
	if (AI) setTimeout(AIMove, 20)
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
    
    updateInfo(depth)

    if (!compMove){
        displayText((currentState.toPlay == "w" ? "white" : "black") + " resigns")
        gameover = true
        return
    }
	
	stateHistory.push(copyState(currentState))
	currentState = makeMove(currentState, compMove)	
	currentState.toPlay = currentState.toPlay == "w" ? "b" : "w"
	moves = availableMoves(currentState, currentState.toPlay)
	
	drawState(currentState)
	if (arrows) drawMovesArrows(moves)
	drawMove(compMove)

	checkmateOrStalemate(currentState, moves, currentState.toPlay)
	
	start = new Date() // required for move timing
    if (autoplay) setTimeout(AIMove, 10); //bit of a delay as to not crash
}

function click(e){
	if (gameover || autoplay) return
	
	var r = Math.floor(e.offsetY / sqrSize)
	var c = Math.floor(e.offsetX / sqrSize)
	
	for (var m = 0; m < moveOptions.length; m++){
		if (moveOptions[m][1][0] == r && moveOptions[m][1][1] == c){
			userMove(moveOptions[m])
			moveOptions = []
			return
		}
	}
    
    moveOptions = moves.filter(m => m[0][0] == r && m[0][1] == c)
    drawState(currentState)
    drawMovesSqrs(moveOptions)
}
