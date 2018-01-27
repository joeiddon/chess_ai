function availableMoves(state, side){
	var moves = []
	for (var r = 0; r < 8; r++){
		for (var c = 0; c < 8; c++){
            var piece = state.board[r][c]
			if (piece == " " || (side == "w" ? isLowerCase(piece) : isUpperCase(piece))) continue;
            piece = piece.toLowerCase()
            if (piece == "p"){
                rowAhead = r + (side == "w" ? -1 : 1)
                if (state.board[rowAhead][c] == " "){
                    moves.push([[r,c], [rowAhead, c]])
                }
                if (r == (side == "w" ? 6 : 1) && state.board[r + (side == "w" ? -1 : 1)][c] == " " && state.board[r + (side == "w" ? -2 : 2)][c] == " "){
                    moves.push([[r,c], [r + (side == "w" ? -2 : 2), c]])
                }
                if (c > 0){
                    dl = state.board[rowAhead][c - 1]
                    if (dl != " " && (side == "w" ? isLowerCase(dl) : isUpperCase(dl))){
                        moves.push([[r,c],[rowAhead, c-1]])
                    }
                }
                if (c < 7){ 
                    dr = state.board[rowAhead][c + 1]
                    if (dr != " " && (side == "w" ? isLowerCase(dr) : isUpperCase(dr))) {
                        moves.push([[r,c],[rowAhead, c+1]])
                    }
                }
                
            } else if (piece == "r" || piece == "q"){
                for (var file = c + 1; file < 8; file ++){
                    var dstnt = state.board[r][file]
                    if (dstnt == " "){
                        moves.push([[r,c],[r,file]])
                    } else if (side == "w" ? isUpperCase(dstnt) : isLowerCase(dstnt)){
                        break
                    } else if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
                        moves.push([[r,c],[r,file]])
                        break
                    }
                }
                for (var file = c - 1; file >= 0; file --){
                    var dstnt = state.board[r][file]
                    if (dstnt == " "){
                        moves.push([[r,c],[r,file]])
                    } else if (side == "w" ? isUpperCase(dstnt) : isLowerCase(dstnt)){
                        break
                    } else if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
                        moves.push([[r,c],[r,file]])
                        break
                    }
                }
                for (var row = r + 1; row < 8; row ++){
                    var dstnt = state.board[row][c]
                    if (dstnt == " "){
                        moves.push([[r,c],[row,c]])
                    } else if (side == "w" ? isUpperCase(dstnt) : isLowerCase(dstnt)){
                        break
                    } else if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
                        moves.push([[r,c],[row,c]])
                        break
                    }
                }
                for (var row = r - 1; row >= 0; row --){
                    var dstnt = state.board[row][c]
                    if (dstnt == " "){
                        moves.push([[r,c],[row,c]])
                    } else if (side == "w" ? isUpperCase(dstnt) : isLowerCase(dstnt)){
                        break
                    } else if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
                        moves.push([[r,c],[row,c]])
                        break
                    }
                }
            } if (piece == "b" || piece == "q"){
                for (var d = 1; d <= Math.min(7-r, 7-c); d++){		//bottom right
                    var dstnt = state.board[r+d][c+d]
                    if (dstnt == " "){
                        moves.push([[r,c],[r+d,c+d]])
                    } else if (side == "w" ? isUpperCase(dstnt) : isLowerCase(dstnt)){
                        break
                    } else if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
                        moves.push([[r,c],[r+d,c+d]])
                        break
                    }
                }
                for (var d = 1; d <= Math.min(7-r, c); d++){		//bottom left
                    var dstnt = state.board[r+d][c-d]
                    if (dstnt == " "){
                        moves.push([[r,c],[r+d,c-d]])
                    } else if (side == "w" ? isUpperCase(dstnt) : isLowerCase(dstnt)){
                        break
                    } else if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
                        moves.push([[r,c],[r+d,c-d]])
                        break
                    }
                }
                for (var d = 1; d <= Math.min(r, 7-c); d++){		//top right
                    var dstnt = state.board[r-d][c+d]
                    if (dstnt == " "){
                        moves.push([[r,c],[r-d,c+d]])
                    } else if (side == "w" ? isUpperCase(dstnt) : isLowerCase(dstnt)){
                        break
                    } else if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
                        moves.push([[r,c],[r-d,c+d]])
                        break
                    }
                }
                for (var d = 1; d <= Math.min(r, c); d++){			//top left
                    var dstnt = state.board[r-d][c-d]
                    if (dstnt == " "){
                        moves.push([[r,c],[r-d,c-d]])
                    } else if (side == "w" ? isUpperCase(dstnt) : isLowerCase(dstnt)){
                        break
                    } else if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
                        moves.push([[r,c],[r-d,c-d]])
                        break
                    }
                }
            } else if (piece == "n"){
                var pnts = [[r+1,c+2], [r+1,c-2], [r-1,c+2], [r-1,c-2], [r+2,c+1], [r-2,c+1], [r+2,c-1], [r-2,c-1]].filter(p => p[0] >= 0 && p[1] >= 0 && p[0] < 8 && p[1] < 8)
                for (var p = 0; p < pnts.length; p ++){
                    var dstnt = state.board[pnts[p][0]][pnts[p][1]]
                    if (dstnt == " "){
                        moves.push([[r,c],[pnts[p][0],pnts[p][1]]])
                    } else if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
                        moves.push([[r,c],[pnts[p][0],pnts[p][1]]])
                    }
                }
            } else if (piece == "k"){
                var pnts = [[r+1,c], [r+1,c+1], [r, c+1], [r-1,c+1], [r-1,c], [r-1,c-1], [r,c-1], [r+1,c-1]].filter(p => p[0] >= 0 && p[1] >= 0 && p[0] < 8 && p[1] < 8)
                for (var p = 0; p < pnts.length; p ++){
                    var dstnt = state.board[pnts[p][0]][pnts[p][1]]
                    if (dstnt == " "){
                        moves.push([[r,c],[pnts[p][0], pnts[p][1]]])
                    } else if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
                        moves.push([[r,c],[pnts[p][0], pnts[p][1]]])
                    }
                }
                //castling stuf
                if (state.board[r][c+1] == " " && state.board[r][c+2] == " " && state.castling.includes(side == "w" ? "K" : "k") && !inCheck(state, side) && !inCheck(makeMove(state, side == "w" ? [[7,4],[7,5]] : [[0,4],[0,5]]), side)){
                    moves.push([[r,c], side == "w" ? [7,6] : [0,6]])
                    
                }
                if (state.board[r][c-1] == " " && state.board[r][c-2] == " " && state.board[r][c-3] == " " && state.castling.includes(side == "w" ? "Q" : "q") && !inCheck(state, side) && !inCheck(makeMove(state, side == "w" ? [[7,4],[7,3]] : [[0,4],[0,3]]), side)){
                    moves.push([[r,c], side == "w" ? [7,2] : [0,2]])
                }
		    }
		}
	}
	
	moves = moves.filter(m => !inCheck(makeMove(state, m), side))

	return moves
}

function makeMove(state, move){
	var cp = copyState(state)
	
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
		cp.castling = cp.castling.replace("q", "")
	} else if (move[0][0] == 0 && move[0][1] == 7){	//black top right castle move
		cp.castling = cp.castling.replace("k", "")
	} else if (move[0][0] == 7 && move[0][1] == 0){	//white bottom left castle move
		cp.castling = cp.castling.replace("Q", "")
	} else if (move[0][0] == 7 && move[0][1] == 7){	//white bottom right castle move
		cp.castling = cp.castling.replace("K", "")
	} else if (move[0][0] == 0 && move[0][1] == 4){	//black king moved
		cp.castling = cp.castling.replace("k", "")
		cp.castling = cp.castling.replace("q", "")
	} else if (move[0][0] == 7 && move[0][1] == 4){	//white king moved
		cp.castling = cp.castling.replace("K", "")
		cp.castling = cp.castling.replace("Q", "")
	} else if (move[0][0] == 1 && cp.board[move[0][0]][move[0][1]] == "P"){	//white pawn at end
		cp.board[move[0][0]][move[0][1]] = "Q"
	} else if (move[0][0] == 6 && cp.board[move[0][0]][move[0][1]] == "p"){	//white pawn at end
		cp.board[move[0][0]][move[0][1]] = "q"
	}
	
	
	cp.board[move[1][0]][move[1][1]] = cp.board[move[0][0]][move[0][1]]
	cp.board[move[0][0]][move[0][1]] = " "
	
	return cp
}
