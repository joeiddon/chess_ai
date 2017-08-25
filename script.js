cnvs = document.getElementById("cnvs")
ctx = cnvs.getContext("2d")

var width, height


window.addEventListener("resize", fitToScreen)

function fitToScreen() {
	cnvs.width = cnvs.height = width = Math.min(window.innerWidth, window.innerHeight)
	sqrSize = width / 8
	drawState(currentState)
}

var fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
//var fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/R3K2R w KQkq - 0 1"

var currentState = unpackFen(fen)

function unpackFen(fen){
	prts = fen.split(" ")
	rws = prts[0].split("/").map(r => r.split(""))
	for (var r = 0; r < rws.length; r++){
		for (var p = 0; p < rws[r].length; p++){
			if (!isNaN(rws[r][p])){
				noSpaces = parseInt(rws[r][p])
				//rws[r] = rws[r].slice(0, p).concat(" ".repeat(noSpaces).split("")).concat(rws[r].slice(p+1))
				//p += noSpaces
				rws[r].splice(p, 1)
				while (noSpaces--){
					rws[r].splice(p++, 0, " ")
				}
			}
		}
	}
	return {board: rws, toPlay: prts[1], castling: prts[2], enPassant: prts[3], halfmoves: parseInt(prts[4])}
		
}

document.addEventListener("DOMContentLoaded", begin, false)

function begin(){
	fitToScreen()
	drawState(currentState)
	moves = availableMoves(currentState, currentState.toPlay)
	//drawMovesArrows(moves)
	document.addEventListener("click", click)
	//document.addEventListener("mousemove", mouse)
}

noImgs = 0
function checkin(){
	noImgs++
	if (noImgs == 11){
		begin()
	}
}

var AI = true
var moveOptions = []
var checkmate = false
var lightColor = "#edb67b"
var darkColor  = "#c17939"
var moveColor  = "rgba(255,0,0,0.4)"

function appendToLog(move, state){
	//piece = state.board[move[1][0]][move[1][1]].toUpperCase()
	document.getElementById("log").innerText += "\n" + notation(move[0][0], move[0][1]) + "-" + notation(move[1][0], move[1][1])
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
	if (checkmate) return
	
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

function userMove(move){
	currentState = makeMove(currentState, move)
	currentState.toPlay = currentState.toPlay == "w" ? "b" : "w"

	appendToLog(move, currentState) //matters where this goes as if before state change then code vil change...
	drawState(currentState)

	moves = availableMoves(currentState, currentState.toPlay)
	
	if (!moves.length){	//chakemate if no moves
		ctx.font = (width/10).toString() + "px monospace"
		ctx.textAlign = "center"
		ctx.fillStyle = "red"
		ctx.fillText("checkmate", width/2, width/2)
		checkmate = true
		return
	}
	
	if (AI){
		console.log(currentState.toPlay, "is the computer's side, hopefully b for black")
		
		var start = new Date();
		
		var bestScore = -100000
		for (var m = 0; m < moves.length; m++){
			var score = evaluate(makeMove(currentState, moves[m]), currentState.toPlay)
			if (score > bestScore){
				bestScore = score
				compMove = moves[m]
				console.log("found better score of", Math.round(score*10)/10, "moving", currentState.board[moves[m][0][0]][moves[m][0][1]], "on", notation(moves[m][0][0], moves[m][0][1]), "cur at", (new Date()) - start, "ms")
			}
		}
		
		currentState = makeMove(currentState, compMove)
		currentState.toPlay = currentState.toPlay == "w" ? "b" : "w"
		appendToLog(compMove, currentState) //matters where this goes as if before state change then code vil change...
		moves = availableMoves(currentState, currentState.toPlay)
			
		if (!moves.length){	//chakemate if no moves
			ctx.font = (width/10).toString() + "px monospace"
			ctx.textAlign = "center"
			ctx.fillStyle = "red"
			ctx.fillText("checkmate", width/2, width/2)
			checkmate = true
			return
		}
		drawState(currentState)
	}
	
}

function drawMovesArrows(moves){
	for (var m = 0; m < moves.length; m++){
		drawArrow((moves[m][0][1] + 0.5) * sqrSize, (moves[m][0][0] + 0.5) * sqrSize,
		(moves[m][1][1] + 0.5) * sqrSize, (moves[m][1][0] + 0.5) * sqrSize,	35, 30)
	}
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
