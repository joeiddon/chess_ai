
function availableMoves(state, side){
	var notatedMoves = []
	var moves = []
	for (var r = 0; r < 8; r++){
		for (var c = 0; c < 8; c++){
			if (state.board[r][c] != " " && (side == "w" ? isUpperCase(state.board[r][c]) : isLowerCase(state.board[r][c])) ){
				piece = state.board[r][c].toLowerCase()
				if (piece == "p"){						//PAWN////PAWN////PAWN////PAWN////PAWN////PAWN////PAWN////PAWN////PAWN////PAWN////PAWN////PAWN////PAWN////PAWN////PAWN////PAWN////PAWN////PAWN////PAWN////PAWN////PAWN////PAWN////PAWN////PAWN////PAWN//
					
					rowAhead = r + (side == "w" ? -1 : 1)
					if (state.board[rowAhead][c] == " "){
						notatedMoves.push(notation(rowAhead, c))
						moves.push([[r,c], [rowAhead, c]])
					}
					
					if (r == (side == "w" ? 6 : 1) && state.board[r + (side == "w" ? -2 : 2)][c] == " "){
						notatedMoves.push(notation(r + (side == "w" ? -2 : 2), c))
						moves.push([[r,c], [r + (side == "w" ? -2 : 2), c]])
					}
					
					if (c > 0){
						dl = state.board[rowAhead][c - 1]
						if (dl != " " && (side == "w" ? isLowerCase(dl) : isUpperCase(dl))){
							notatedMoves.push(String.fromCharCode(97+c) + "x" + notation(rowAhead, c - 1))
							moves.push([[r,c],[rowAhead, c-1]])
						}
					}
					if (c < 7){ 
						dr = state.board[rowAhead][c + 1]
						if (dr != " " && (side == "w" ? isLowerCase(dr) : isUpperCase(dr))) {
							notatedMoves.push(notation(rowAhead, c + 1))
							moves.push([[r,c],[rowAhead, c+1]])
						}
					}
					
				} else if (piece == "r"){				//ROOK////ROOK////ROOK////ROOK////ROOK////ROOK////ROOK////ROOK////ROOK////ROOK////ROOK////ROOK////ROOK////ROOK////ROOK////ROOK////ROOK////ROOK////ROOK////ROOK////ROOK////ROOK////ROOK////ROOK////ROOK//
					
					for (var file = c + 1; file < 8; file ++){
						dstnt = state.board[r][file]
						if (dstnt == " "){
							notatedMoves.push("R" + notation(r, file))
							moves.push([[r,c],[r,file]])
						} else if (side == "w" ? isUpperCase(dstnt) : isLowerCase(dstnt)){
							break
						} else if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
							notatedMoves.push("Rx" + notation(r, file))
							moves.push([[r,c],[r,file]])
							break
						}
					}
					for (var file = c - 1; file >= 0; file --){
						dstnt = state.board[r][file]
						if (dstnt == " "){
							notatedMoves.push("R" + notation(r, file))
							moves.push([[r,c],[r,file]])
						} else if (side == "w" ? isUpperCase(dstnt) : isLowerCase(dstnt)){
							break
						} else if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
							notatedMoves.push("Rx" + notation(r, file))
							moves.push([[r,c],[r,file]])
							break
						}
					}
					for (var row = r + 1; row < 8; row ++){
						dstnt = state.board[row][c]
						if (dstnt == " "){
							notatedMoves.push("R" + notation(row, c))
							moves.push([[r,c],[row,c]])
						} else if (side == "w" ? isUpperCase(dstnt) : isLowerCase(dstnt)){
							break
						} else if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
							notatedMoves.push("Rx" + notation(row, c))
							moves.push([[r,c],[row,c]])
							break
						}
					}
					for (var row = r - 1; row >= 0; row --){
						dstnt = state.board[row][c]
						if (dstnt == " "){
							notatedMoves.push("R" + notation(row, c))
							moves.push([[r,c],[row,c]])
						} else if (side == "w" ? isUpperCase(dstnt) : isLowerCase(dstnt)){
							break
						} else if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
							notatedMoves.push("Rx" + notation(row, c))
							moves.push([[r,c],[row,c]])
							break
						}
					}
					
				} else if (piece == "n"){			//KNIGHT////KNIGHT////KNIGHT////KNIGHT////KNIGHT////KNIGHT////KNIGHT////KNIGHT////KNIGHT////KNIGHT////KNIGHT////KNIGHT////KNIGHT////KNIGHT////KNIGHT////KNIGHT////KNIGHT////KNIGHT////KNIGHT////KNIGHT//

					pnts = [[r+1,c+2], [r+1,c-2], [r-1,c+2], [r-1,c-2], [r+2,c+1], [r-2,c+1], [r+2,c-1], [r-2,c-1]].filter(p => p[0] >= 0 && p[1] >= 0 && p[0] < 8 && p[1] < 8)
					for (var p = 0; p < pnts.length; p ++){
						dstnt = state.board[pnts[p][0]][pnts[p][1]]
						if (dstnt == " "){
							notatedMoves.push("N" + notation(pnts[p][0], pnts[p][1]))
							moves.push([[r,c],[pnts[p][0],pnts[p][1]]])
						} else if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
							notatedMoves.push("Nx" + notation(pnts[p][0], pnts[p][1]))
							moves.push([[r,c],[pnts[p][0],pnts[p][1]]])
						}
					}
					
				} else if (piece == "b"){			//BISHOP////BISHOP////BISHOP////BISHOP////BISHOP////BISHOP////BISHOP////BISHOP////BISHOP////BISHOP////BISHOP////BISHOP////BISHOP////BISHOP////BISHOP////BISHOP////BISHOP////BISHOP////BISHOP////BISHOP//

					for (var d = 1; d <= Math.min(7-r, 7-c); d++){		//bottom right
						dstnt = state.board[r+d][c+d]
						if (dstnt == " "){
							notatedMoves.push("B" + notation(r+d, c+d))
							moves.push([[r,c],[r+d,c+d]])
						} else if (side == "w" ? isUpperCase(dstnt) : isLowerCase(dstnt)){
							break
						} else if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
							notatedMoves.push("Bx" + notation(r+d, c+d))
							moves.push([[r,c],[r+d,c+d]])
							break
						}
					}
					for (var d = 1; d <= Math.min(7-r, c); d++){		//bottom left
						dstnt = state.board[r+d][c-d]
						if (dstnt == " "){
							notatedMoves.push("B" + notation(r+d, c-d))
							moves.push([[r,c],[r+d,c-d]])
						} else if (side == "w" ? isUpperCase(dstnt) : isLowerCase(dstnt)){
							break
						} else if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
							notatedMoves.push("Bx" + notation(r+d, c-d))
							moves.push([[r,c],[r+d,c-d]])
							break
						}
					}
					for (var d = 1; d <= Math.min(r, 7-c); d++){		//top right
						dstnt = state.board[r-d][c+d]
						if (dstnt == " "){
							notatedMoves.push("B" + notation(r-d, c+d))
							moves.push([[r,c],[r-d,c+d]])
						} else if (side == "w" ? isUpperCase(dstnt) : isLowerCase(dstnt)){
							break
						} else if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
							notatedMoves.push("Bx" + notation(r-d, c+d))
							moves.push([[r,c],[r-d,c+d]])
							break
						}
					}
					for (var d = 1; d <= Math.min(r, c); d++){			//top left
						dstnt = state.board[r-d][c-d]
						if (dstnt == " "){
							notatedMoves.push("B" + notation(r-d, c-d))
							moves.push([[r,c],[r-d,c-d]])
						} else if (side == "w" ? isUpperCase(dstnt) : isLowerCase(dstnt)){
							break
						} else if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
							notatedMoves.push("Bx" + notation(r-d, c-d))
							moves.push([[r,c],[r-d,c-d]])
							break
						}
					}
				
				} else if (piece == "q"){			//QUEEN////QUEEN////QUEEN////QUEEN////QUEEN////QUEEN////QUEEN////QUEEN////QUEEN////QUEEN////QUEEN////QUEEN////QUEEN////QUEEN////QUEEN////QUEEN////QUEEN////QUEEN////QUEEN////QUEEN////QUEEN////QUEEN//
					
					for (var file = c + 1; file < 8; file ++){
						dstnt = state.board[r][file]
						if (dstnt == " "){
							notatedMoves.push("R" + notation(r, file))
							moves.push([[r,c],[r,file]])
						} else if (side == "w" ? isUpperCase(dstnt) : isLowerCase(dstnt)){
							break
						} else if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
							notatedMoves.push("Rx" + notation(r, file))
							moves.push([[r,c],[r,file]])
							break
						}
					}
					for (var file = c - 1; file >= 0; file --){
						dstnt = state.board[r][file]
						if (dstnt == " "){
							notatedMoves.push("R" + notation(r, file))
							moves.push([[r,c],[r,file]])
						} else if (side == "w" ? isUpperCase(dstnt) : isLowerCase(dstnt)){
							break
						} else if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
							notatedMoves.push("Rx" + notation(r, file))
							moves.push([[r,c],[r,file]])
							break
						}
					}
					for (var row = r + 1; row < 8; row ++){
						dstnt = state.board[row][c]
						if (dstnt == " "){
							notatedMoves.push("R" + notation(row, c))
							moves.push([[r,c],[row,c]])
						} else if (side == "w" ? isUpperCase(dstnt) : isLowerCase(dstnt)){
							break
						} else if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
							notatedMoves.push("Rx" + notation(row, c))
							moves.push([[r,c],[row,c]])
							break
						}
					}
					for (var row = r - 1; row >= 0; row --){
						dstnt = state.board[row][c]
						if (dstnt == " "){
							notatedMoves.push("R" + notation(row, c))
							moves.push([[r,c],[row,c]])
						} else if (side == "w" ? isUpperCase(dstnt) : isLowerCase(dstnt)){
							break
						} else if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
							notatedMoves.push("Rx" + notation(row, c))
							moves.push([[r,c],[row,c]])
							break
						}
					}
					
					for (var d = 1; d <= Math.min(7-r, 7-c); d++){		//bottom right
						dstnt = state.board[r+d][c+d]
						if (dstnt == " "){
							notatedMoves.push("B" + notation(r+d, c+d))
							moves.push([[r,c],[r+d,c+d]])
						} else if (side == "w" ? isUpperCase(dstnt) : isLowerCase(dstnt)){
							break
						} else if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
							notatedMoves.push("Bx" + notation(r+d, c+d))
							moves.push([[r,c],[r+d,c+d]])
							break
						}
					}
					for (var d = 1; d <= Math.min(7-r, c); d++){		//bottom left
						dstnt = state.board[r+d][c-d]
						if (dstnt == " "){
							notatedMoves.push("B" + notation(r+d, c-d))
							moves.push([[r,c],[r+d,c-d]])
						} else if (side == "w" ? isUpperCase(dstnt) : isLowerCase(dstnt)){
							break
						} else if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
							notatedMoves.push("Bx" + notation(r+d, c-d))
							moves.push([[r,c],[r+d,c-d]])
							break
						}
					}
					for (var d = 1; d <= Math.min(r, 7-c); d++){		//top right
						dstnt = state.board[r-d][c+d]
						if (dstnt == " "){
							notatedMoves.push("B" + notation(r-d, c+d))
							moves.push([[r,c],[r-d,c+d]])
						} else if (side == "w" ? isUpperCase(dstnt) : isLowerCase(dstnt)){
							break
						} else if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
							notatedMoves.push("Bx" + notation(r-d, c+d))
							moves.push([[r,c],[r-d,c+d]])
							break
						}
					}
					for (var d = 1; d <= Math.min(r, c); d++){			//top left
						dstnt = state.board[r-d][c-d]
						if (dstnt == " "){
							notatedMoves.push("B" + notation(r-d, c-d))
							moves.push([[r,c],[r-d,c-d]])
						} else if (side == "w" ? isUpperCase(dstnt) : isLowerCase(dstnt)){
							break
						} else if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
							notatedMoves.push("Bx" + notation(r-d, c-d))
							moves.push([[r,c],[r-d,c-d]])
							break
						}
					}
					
				} else if (piece == "k"){			//KING/////KING/////KING/////KING/////KING/////KING/////KING/////KING/////KING/////KING/////KING/////KING/////KING/////KING/////KING/////KING/////KING/////KING/////KING/////KING/////KING///
					
					pnts = [[r+1,c], [r+1,c+1], [r, c+1], [r-1,c+1], [r-1,c], [r-1,c-1], [r,c-1], [r+1,c-1]].filter(p => p[0] >= 0 && p[1] >= 0 && p[0] < 8 && p[1] < 8)
					for (var p = 0; p < pnts.length; p ++){
						dstnt = state.board[pnts[p][0]][pnts[p][1]]
						if (dstnt == " "){
							notatedMoves.push("K" + notation(pnts[p][0], pnts[p][1]))
							moves.push([[r,c],[pnts[p][0], pnts[p][1]]])
						} else if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
							notatedMoves.push("Kx" + notation(pnts[p][0], pnts[p][1]))
							moves.push([[r,c],[pnts[p][0], pnts[p][1]]])
						}
					}
					//castling stuf
					if (state.board[r][c+1] == " " && state.board[r][c+2] == " " && state.castling.includes(side == "w" ? "K" : "k") && !inCheck(makeMove(state, side == "w" ? [[7,4],[7,5]] : [[0,4],[0,5]]), side)){
						moves.push([[r,c], side == "w" ? [7,6] : [0,6]])
						notatedMoves.push("0-0")
						
					}
					if (state.board[r][c-1] == " " && state.board[r][c-2] == " " && state.board[r][c-3] == " " && state.castling.includes(side == "w" ? "Q" : "q") && !inCheck(makeMove(state, side == "w" ? [[7,4],[7,3]] : [[0,4],[0,3]]), side)){
						moves.push([[r,c], side == "w" ? [7,2] : [0,2]])
						notatedMoves.push("0-0-0")
					}
				}
			}
		}
	}	
	
	
	for (var m = 0; m < moves.length; m++){
		if (inCheck(makeMove(state, moves[m]), side)){
			//console.log("move from", moves[m][0], "to", moves[m][1], "not legal due to revealed check")
			moves.splice(m, 1)
			m--
		}
	}
	
	//console.log("the moves in standard notation:", notatedMoves)
	return moves
}

function makeMove(state, move){
	var cp = JSON.parse(JSON.stringify(state))
	if (move[0][0] == 7 && move[0][1] == 4 && move[1][0] == 7 && move[1][1] == 6 && state.castling.includes("K")){			//white kingside castle
		cp.castling = cp.castling.replace("K", "")
		cp.castling = cp.castling.replace("Q", "")
		cp = makeMove(cp, [[7,7],[7,5]])
	} else if (move[0][0] == 0 && move[0][1] == 4 && move[1][0] == 0 && move[1][1] == 6 && state.castling.includes("k")){	//black kingside castle
		cp.castling = cp.castling.replace("k", "")
		cp.castling = cp.castling.replace("q", "")
		cp = makeMove(cp, [[0,7],[0,5]])
	} else if (move[0][0] == 7 && move[0][1] == 4 && move[1][0] == 7 && move[1][1] == 2 && state.castling.includes("Q")){	//white queenside castle
		cp.castling = cp.castling.replace("Q", "")
		cp.castling = cp.castling.replace("K", "")
		cp = makeMove(cp, [[7,0],[7,3]])
	} else if (move[0][0] == 0 && move[0][1] == 4 && move[1][0] == 0 && move[1][1] == 2 && state.castling.includes("q")){	//black queenside castle
		cp.castling = cp.castling.replace("q", "")
		cp.castling = cp.castling.replace("k", "")
		cp = makeMove(cp, [[0,0],[0,3]])
	} else if (move[0][0] == 0 && move[0][1] == 0){	//black top left castle move
		cp.castling = cp.castling.replace("q")
	} else if (move[0][0] == 0 && move[0][1] == 7){	//black top right castle move
		cp.castling = cp.castling.replace("k")
	} else if (move[0][0] == 7 && move[0][1] == 0){	//white bottom left castle move
		cp.castling = cp.castling.replace("Q")
	} else if (move[0][0] == 7 && move[0][1] == 7){	//white bottom right castle move
		cp.castling = cp.castling.replace("K")
	} else if (move[0][0] == 0 && move[0][1] == 4){	//black king moved
		cp.castling = cp.castling.replace("k")
		cp.castling = cp.castling.replace("q")
	} else if (move[0][0] == 7 && move[0][1] == 4){	//white king moved
		cp.castling = cp.castling.replace("K")
		cp.castling = cp.castling.replace("Q")
	}
	
	
	cp.board[move[1][0]][move[1][1]] = cp.board[move[0][0]][move[0][1]]
	cp.board[move[0][0]][move[0][1]] = " "
	
	return cp
}
