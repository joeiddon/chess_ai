function appendToLog(move, state){
	//piece = state.board[move[1][0]][move[1][1]].toUpperCase()
	document.getElementById("log").innerText += "\n" + notation(move[0][0], move[0][1]) + "-" + notation(move[1][0], move[1][1])
}

function updateInfo(depth){
	document.getElementById("info").innerText = 
	"WARNING:\nbuttons will lag if AI\n\n" +
	"to play:\n" + (currentState.toPlay == "w" ? "white" : "black") + 
	"\n\nthought for:\n" + (new Date() - start).toString() + 
	" ms\n\nthought to depth:\n" + depth + 
	"\n\nwhite eval.:\n" + (Math.round(evaluate(currentState, "w")*10)/10).toString() +
	"\n\nautoplay | AI\n" + (autoplay ? "true      | " : "false    | " ) + AI.toString() + "\n\n\n"
}

function time(exp, precision){
	start = new Date()
	for (var i = 0; i < precision; i++){
		eval(exp)
	}	
	return ((new Date() - start) / precision).toString() + "ms"	
}

function notation(r, c){
	return String.fromCharCode(97+c) + (8-r).toString()
}

function coordinate(notationString){
	return [8 - notationString[1], notationString[0].charCodeAt(0) - 97]
}

function isLowerCase(c){
	return c == c.toLowerCase()
}

function isUpperCase(c){
	return c == c.toUpperCase()
}

function drawArrow(x1, y1, x2, y2, theta, l){
	ctx.strokeStyle = "rgba(255,0,0,0.6)"
	ctx.fillStyle = ctx.strokeStyle
	ctx.lineWidth = 7

	alpha = theta - Math.atan2(x2-x1, y2-y1) * (180/Math.PI)
	beta = theta + Math.atan2(x2-x1, y2-y1) * (180/Math.PI)
	gamma = Math.atan2(x2-x1, y2-y1) * (180 / Math.PI)
	
	ctx.beginPath()
	ctx.moveTo(x1, y1)
	ctx.lineTo(x2 - l * Math.cos(theta*(Math.PI/180)) * Math.sin(gamma*(Math.PI/180)),
	y2 - l * Math.cos(theta*(Math.PI/180)) * Math.cos(gamma*(Math.PI/180)))
	ctx.stroke()
	ctx.moveTo(x2 + l * Math.sin(alpha*(Math.PI/180)), y2 - l * Math.cos(alpha*(Math.PI/180)))
	ctx.lineTo(x2, y2)
	ctx.lineTo(x2 - l * Math.sin(beta*(Math.PI/180)), y2 - l * Math.cos(beta*(Math.PI/180)))
	ctx.fill()
}

function drawState(state){
	ctx.clearRect(0,0,width,width)
	drawWoodBackground()
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

function checkmateOrStalemate(state, moves, side){
	if (!moves.length){
		ctx.font = (width/10).toString() + "px monospace"
		ctx.textAlign = "center"
		ctx.fillStyle = "red"
		if (inCheck(state, side)){		//checkmaters
			ctx.fillText("checkmate", width/2, width/2)
		} else {	//stalemate
			ctx.fillText("stalemate", width/2, width/2)
		}
		gameover = true
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