function negamaxItBuddy(state, depth, alpha, beta, side){
	if (depth == 0){
		return [evaluate(state, side)]
	}
	
	var moves = availableMoves(state, side)
	var bestScore = -Infinity
	var bestMove

	if (!moves.length){
		return [Infinity]
	}
	
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
			if (state.board[r][c] == piece) no++
		}
	}
	return no
}

function noDevelopedPieces(state, side){
	var no = 0
	for (var c = 0; c < 7; c++){
		if (state.board[side == "w" ? 7 : 0][c] == " ")	no++
	}
	return no
}

function evaluate(state, side){		//evaluates for white then times by -1 if black wants evaluating (zero-sum game)
	var score = 0
	
	//material
	score += 	9 * (noOfPiece(state, 'Q') - noOfPiece(state, 'q')) +
				5 * (noOfPiece(state, 'R') - noOfPiece(state, 'r')) +
				3 * (noOfPiece(state, 'B') - noOfPiece(state, 'b')) +
				3 * (noOfPiece(state, 'N') - noOfPiece(state, 'n')) +
				1 * (noOfPiece(state, 'P') - noOfPiece(state, 'p'))
	//development in beggining
	if (noOfPiece(state, " ") < 44){	//32 spaces at beggining as get taken, increases
		score += 0.1 * (noDevelopedPieces(state, "w") - noDevelopedPieces(state, "b"))
	}
	
	//mobility
	var whitesMoves = availableMoves(state, "w").length
	var blacksMoves = availableMoves(state, "b").length
	
	var mobility = 0.005 * (whitesMoves - blacksMoves)
	score += mobility
	
	//if white is checkmated, score drops to -infinity if black checkmated, score goes to infinity
	if (whitesMoves == 0) {
		if (inCheck(state, "w")){	//white is checmated
			score -= Infinity
		} else {	//white is stalemated
			score += Infinity * (side == "w" ? 1 : -1)//make score crap for both sides
		}			
	} else if (blacksMoves == 0) {
		if (inCheck(state,"b")) {
			score += Infinity
		} else {
			score += Infinity * (side == "w" ? 1: -1)//make score crap for both sides
		}
	}
	
	return score * (side == "w" ? 1 : -1)
}