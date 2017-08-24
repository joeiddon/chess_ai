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
//var fen = "rnbqkbnr/pp1ppppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR b KQkq c6 0 2"
//var fen = "rnbqkbnr/pp1ppppp/8/8/2B1P1p1/5K2/PPPP1PPP/RN1Q1BNR b KQkq c6 0 2"
//var fen = "r1b2rk1/pppp2pp/2n1pp1n/b2P1q2/2PQ2P1/1P2PN1B/P1K3PP/RN3B1R w - - 0 1"

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

fitToScreen()

drawState(currentState)

moves = availableMoves(currentState)
//drawMovesArrows(moves)

document.addEventListener("mousedown", userPress)

moveOptions = []
checkmate = false

function appendToLog(move, state){
	//piece = state.board[move[1][0]][move[1][1]].toUpperCase()
	document.getElementById("log").innerText += "\n" + notation(move[0][0], move[0][1]) + "-" + notation(move[1][0], move[1][1])
}

function userPress(e){
	if (checkmate) return
	
	var r = Math.floor(e.offsetY / sqrSize)
	var c = Math.floor(e.offsetX / sqrSize)
	
	for (var m = 0; m < moveOptions.length; m++){
		if (moveOptions[m][1][0] == r && moveOptions[m][1][1] == c){
			currentState = makeMove(currentState, moveOptions[m])
			currentState.toPlay = currentState.toPlay == "w" ? "b" : "w"
			moves = availableMoves(currentState)
			drawState(currentState)
			appendToLog(moveOptions[m], currentState) //matters where this goes as if before state change then code vil change...
			if (!moves.length){
				ctx.font = (width/10).toString() + "px monospace"
				ctx.textAlign = "center"
				ctx.fillStyle = "red"
				ctx.fillText("checkmate", width/2, width/2)
				checkmate = true
				return
			}
		}
	}
	
	moveOptions = moves.filter(m => m[0][0] == r && m[0][1] == c)
	drawState(currentState)
	drawMovesSqrs(moveOptions)
	
}

function drawMovesArrows(moves){
	for (var m = 0; m < moves.length; m++){
		drawArrow((moves[m][0][1] + 0.5) * sqrSize, (moves[m][0][0] + 0.5) * sqrSize,
		(moves[m][1][1] + 0.5) * sqrSize, (moves[m][1][0] + 0.5) * sqrSize,	35, 30)
	}
}

function drawMovesSqrs(moves){
	for (var m = 0; m < moves.length; m++){
		ctx.fillStyle = "rgba(255,0,0,0.5)"
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
	for (var r = 0; r < 8; r++){
		for (var c = 0; c < 8; c++){
			ctx.fillStyle = (r+c) % 2 == 0 ? "#edb67b" : "#87531f"
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