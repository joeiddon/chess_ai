function negamaxItBuddy(state, depth, alpha, beta, side){
	if (depth == 0){
		return [evaluate(state, side)]
	}
	
	var moves = availableMoves(state, side)
	var bestScore = -Infinity
	var bestMove	
	
	for (var m = 0; m < moves.length; m++){
		var score = -negamaxItBuddy(makeMove(state, moves[m]), depth - 1, -beta, -alpha, side == "w" ? "b" : "w")[0]
		if (score > bestScore){		
			bestScore = score
			bestMove = moves[m]
		}
		alpha = Math.max(alpha, score)
		if (alpha >= beta){
			break	//pruuunne
		}
	}

	return [bestScore, bestMove]
}

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

function evaluate(state, side){		//evaluates for white then times by -1 if black wants evaluating (zero-sum game)
	var materialScore =  1000 * (noOfPiece(state, 'K') - noOfPiece(state, 'k')) +
					        9 * (noOfPiece(state, 'Q') - noOfPiece(state, 'q')) +
					        5 * (noOfPiece(state, 'R') - noOfPiece(state, 'r')) +
					        3 * (noOfPiece(state, 'B') - noOfPiece(state, 'b')) +
					        3 * (noOfPiece(state, 'N') - noOfPiece(state, 'n')) +
					        1 * (noOfPiece(state, 'P') - noOfPiece(state, 'p'))
	
	var mobilityScore = 0.01 * (availableMoves(state, "w").length - availableMoves(state, "b").length)
	
	return (mobilityScore + materialScore) * (side == "w" ? 1 : -1)
}