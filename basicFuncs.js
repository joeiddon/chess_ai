function noOfPiece(state, piece){
	var no = 0
	for (var r = 0; r < 8; r++){
		for (var c = 0; c < 8; c++){
			if (state.board[r][c] == piece){
				no++
			}
		}
	}
	return no
}

function evaluate(state, side){
	
	var materialScore =  1000 * (noOfPiece(state, 'K') - noOfPiece(state, 'k')) +
					    9 * (noOfPiece(state, 'Q') - noOfPiece(state, 'q')) +
					    5 * (noOfPiece(state, 'R') - noOfPiece(state, 'r')) +
					    3 * (noOfPiece(state, 'B') - noOfPiece(state, 'b')) +
					    3 * (noOfPiece(state, 'N') - noOfPiece(state, 'n')) +
					    1 * (noOfPiece(state, 'P') - noOfPiece(state, 'p'))
	
	var mobilityScore = 0.1 * (availableMoves(state, "w").length - availableMoves(state, "b").length)
	
	return (mobilityScore + materialScore) * (side == "w" ? 1 : -1)
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
