

function inCheck(state, side){
	for (var r = 0; r < 8; r++){
		for (var c = 0; c < 8; c++){
			if (state.board[r][c] != " " && (side == "w" ? isLowerCase(state.board[r][c]) : isUpperCase(state.board[r][c])) ){
				piece = state.board[r][c].toLowerCase()
				if (piece == "p"){						//PAWN////PAWN////PAWN////PAWN////PAWN////PAWN////PAWN////PAWN////PAWN////PAWN////PAWN////PAWN////PAWN////PAWN////PAWN////PAWN////PAWN////PAWN////PAWN////PAWN////PAWN////PAWN////PAWN////PAWN////PAWN//
					rowAhead = r + (side == "w" ? 1 : -1)
					
					if (c > 0){
						dl = state.board[rowAhead][c - 1]
						if (dl == (side == "w" ? "K" : "k")) return true
					}
					
					if (c < 7){ 
						dr = state.board[rowAhead][c + 1]
						if (dr == (side == "w" ? "K" : "k")) return true
					}
				} else if (piece == "r"){				//ROOK////ROOK////ROOK////ROOK////ROOK////ROOK////ROOK////ROOK////ROOK////ROOK////ROOK////ROOK////ROOK////ROOK////ROOK////ROOK////ROOK////ROOK////ROOK////ROOK////ROOK////ROOK////ROOK////ROOK////ROOK//
					for (var file = c + 1; file < 8; file ++){
						dstnt = state.board[r][file]
						if (dstnt == " ") continue
						if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
							break
						} else if (side == "w" ? isUpperCase(dstnt) : isLowerCase(dstnt)){
							if (dstnt == (side == "w" ? "K" : "k")) return true
							break
						}
					}
					for (var file = c - 1; file >= 0; file --){
						dstnt = state.board[r][file]
						if (dstnt == " ") continue
						if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
							break
						} else if (side == "w" ? isUpperCase(dstnt) : isLowerCase(dstnt)){
							if (dstnt == (side == "w" ? "K" : "k")) return true
							break
						}
					}
					for (var row = r + 1; row < 8; row ++){
						dstnt = state.board[row][c]
						if (dstnt == " ") continue
						if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
							break
						} else if (side == "w" ? isUpperCase(dstnt) : isLowerCase(dstnt)){
							if (dstnt == (side == "w" ? "K" : "k")) return true
							break
						}
					}
					for (var row = r - 1; row >= 0; row --){
						dstnt = state.board[row][c]
						if (dstnt == " ") continue
						if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
							break
						} else if (side == "w" ? isUpperCase(dstnt) : isLowerCase(dstnt)){
							if (dstnt == (side == "w" ? "K" : "k")) return true
							break
						}
					}
				} else if (piece == "n"){			//KNIGHT////KNIGHT////KNIGHT////KNIGHT////KNIGHT////KNIGHT////KNIGHT////KNIGHT////KNIGHT////KNIGHT////KNIGHT////KNIGHT////KNIGHT////KNIGHT////KNIGHT////KNIGHT////KNIGHT////KNIGHT////KNIGHT////KNIGHT//
					pnts = [[r+1,c+2], [r+1,c-2], [r-1,c+2], [r-1,c-2], [r+2,c+1], [r-2,c+1], [r+2,c-1], [r-2,c-1]].filter(p => p[0] >= 0 && p[1] >= 0 && p[0] < 8 && p[1] < 8)
					for (var p = 0; p < pnts.length; p ++){
						dstnt = state.board[pnts[p][0]][pnts[p][1]]
						if (dstnt == (side == "w" ? "K" : "k")) return true
					}
				} else if (piece == "b"){
					for (var d = 1; d <= Math.min(7-r, 7-c); d++){		//bottom right
						dstnt = state.board[r+d][c+d]
						if (dstnt == " ") continue
						if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
							break
						} else if (side == "w" ? isUpperCase(dstnt) : isLowerCase(dstnt)){
							if (dstnt == (side == "w" ? "K" : "k")) return true
							break
						}
					}
					for (var d = 1; d <= Math.min(7-r, c); d++){		//bottom left
						dstnt = state.board[r+d][c-d]
						if (dstnt == " ") continue
						if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
							break
						} else if (side == "w" ? isUpperCase(dstnt) : isLowerCase(dstnt)){
							if (dstnt == (side == "w" ? "K" : "k")) return true
							break
						}
					}
					for (var d = 1; d <= Math.min(r, 7-c); d++){		//top right
						dstnt = state.board[r-d][c+d]
						if (dstnt == " ") continue
						if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
							break
						} else if (side == "w" ? isUpperCase(dstnt) : isLowerCase(dstnt)){
							if (dstnt == (side == "w" ? "K" : "k")) return true
							break
						}
					}
					for (var d = 1; d <= Math.min(r, c); d++){			//top left
						dstnt = state.board[r-d][c-d]
						if (dstnt == " ") continue
						if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
							break
						} else if (side == "w" ? isUpperCase(dstnt) : isLowerCase(dstnt)){
							if (dstnt == (side == "w" ? "K" : "k")) return true
							break
						}
					}
				} else if (piece == "q"){			//QUEEN////QUEEN////QUEEN////QUEEN////QUEEN////QUEEN////QUEEN////QUEEN////QUEEN////QUEEN////QUEEN////QUEEN////QUEEN////QUEEN////QUEEN////QUEEN////QUEEN////QUEEN////QUEEN////QUEEN////QUEEN////QUEEN//
					for (var file = c + 1; file < 8; file ++){
						dstnt = state.board[r][file]
						if (dstnt == " ") continue
						if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
							break
						} else if (side == "w" ? isUpperCase(dstnt) : isLowerCase(dstnt)){
							if (dstnt == (side == "w" ? "K" : "k")) return true
							break
						}
					}
					
					for (var file = c - 1; file >= 0; file --){
						dstnt = state.board[r][file]
						if (dstnt == " ") continue
						if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
							break
						} else if (side == "w" ? isUpperCase(dstnt) : isLowerCase(dstnt)){
							if (dstnt == (side == "w" ? "K" : "k")) return true
							break
						}
					}
					
					for (var row = r + 1; row < 8; row ++){
						dstnt = state.board[row][c]
						if (dstnt == " ") continue
						if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
							break
						} else if (side == "w" ? isUpperCase(dstnt) : isLowerCase(dstnt)){
							if (dstnt == (side == "w" ? "K" : "k")) return true
							break
						}
					}
					for (var row = r - 1; row >= 0; row --){
						dstnt = state.board[row][c]
						if (dstnt == " ") continue
						if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
							break
						} else if (side == "w" ? isUpperCase(dstnt) : isLowerCase(dstnt)){
							if (dstnt == (side == "w" ? "K" : "k")) return true
							break
						}
					}
					
					for (var d = 1; d <= Math.min(7-r, 7-c); d++){		//bottom right
						dstnt = state.board[r+d][c+d]
						if (dstnt == " ") continue
						if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
							break
						} else if (side == "w" ? isUpperCase(dstnt) : isLowerCase(dstnt)){
							if (dstnt == (side == "w" ? "K" : "k")) return true
							break
						}
					}
					for (var d = 1; d <= Math.min(7-r, c); d++){		//bottom left
						dstnt = state.board[r+d][c-d]
						if (dstnt == " ") continue
						if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
							break
						} else if (side == "w" ? isUpperCase(dstnt) : isLowerCase(dstnt)){
							if (dstnt == (side == "w" ? "K" : "k")) return true
							break
						}
					}
					for (var d = 1; d <= Math.min(r, 7-c); d++){		//top right
						dstnt = state.board[r-d][c+d]
						if (dstnt == " ") continue
						if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
							break
						} else if (side == "w" ? isUpperCase(dstnt) : isLowerCase(dstnt)){
							if (dstnt == (side == "w" ? "K" : "k")) return true
							break
						}
					}
					
					for (var d = 1; d <= Math.min(r, c); d++){			//top left
						dstnt = state.board[r-d][c-d]
						if (dstnt == " ") continue
						if (side == "w" ? isLowerCase(dstnt) : isUpperCase(dstnt)){
							break
						} else if (side == "w" ? isUpperCase(dstnt) : isLowerCase(dstnt)){
							if (dstnt == (side == "w" ? "K" : "k")) return true
							break
						}
					}
					
				} else if (piece == "k"){			//KING/////KING/////KING/////KING/////KING/////KING/////KING/////KING/////KING/////KING/////KING/////KING/////KING/////KING/////KING/////KING/////KING/////KING/////KING/////KING/////KING///
					pnts = [[r+1,c], [r+1,c+1], [r, c+1], [r-1,c+1], [r-1,c], [r-1,c-1], [r,c-1], [r+1,c-1]].filter(p => p[0] >= 0 && p[1] >= 0 && p[0] < 8 && p[1] < 8)
					for (var p = 0; p < pnts.length; p ++){
						dstnt = state.board[pnts[p][0]][pnts[p][1]]
						if (dstnt == (side == "w" ? "K" : "k")) return true
					}
				}
				
			}
		}
	}
	return false	
}
