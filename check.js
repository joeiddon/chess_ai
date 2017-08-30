function inCheck(state, side){
	for (var r = 0; r < 8; r++){
		for (var c = 0; c < 8; c++){
			if (state.board[r][c] == (side == "w" ? "K" : "k")){
				var rowAhead = r + (side == "w" ? -1 : 1)
				if (rowAhead < 8 && rowAhead > 0){
					if (state.board[rowAhead][c+1] == (side == "w" ? "p" : "P")){
						return true
					}
					if (state.board[rowAhead][c-1] == (side == "w" ? "p" : "P")){
						return true
					}
				}
				var pnts = [[r+1,c+2], [r+1,c-2], [r-1,c+2], [r-1,c-2], [r+2,c+1], [r-2,c+1], [r+2,c-1], [r-2,c-1]].filter(p => p[0] >= 0 && p[1] >= 0 && p[0] < 8 && p[1] < 8)
				for (var p = 0; p < pnts.length; p ++){
					var dstnt = state.board[pnts[p][0]][pnts[p][1]]
					if (state.board[pnts[p][0]][pnts[p][1]] == (side == "w" ? "n" : "N")){
						return true
					}
				}
				pnts = [[r+1,c], [r+1,c+1], [r, c+1], [r-1,c+1], [r-1,c], [r-1,c-1], [r,c-1], [r+1,c-1]].filter(p => p[0] >= 0 && p[1] >= 0 && p[0] < 8 && p[1] < 8)
				for (var p = 0; p < pnts.length; p ++){
					var dstnt = state.board[pnts[p][0]][pnts[p][1]]
					if (state.board[pnts[p][0]][pnts[p][1]] == (side == "w" ? "k" : "K")){
						return true
					}
				}
				for (var file = c + 1; file < 8; file ++){
					var dstnt = state.board[r][file]
					if (dstnt == (side == "w" ? "r" : "R") || dstnt == (side == "w" ? "q" : "Q")){
						return true
					} else if (dstnt != " "){
						break
					}
				}
				for (var file = c - 1; file >= 0; file --){
					var dstnt = state.board[r][file]
					if (dstnt == (side == "w" ? "r" : "R") || dstnt == (side == "w" ? "q" : "Q")){
						return true
					} else if (dstnt != " "){
						break
					}
				}
				for (var row = r + 1; row < 8; row ++){
					var dstnt = state.board[row][c]
					if (dstnt == (side == "w" ? "r" : "R") || dstnt == (side == "w" ? "q" : "Q")){
						return true
					} else if (dstnt != " "){
						break
					}
				}
				for (var row = r - 1; row >= 0; row --){
					var dstnt = state.board[row][c]
					if (dstnt == (side == "w" ? "r" : "R") || dstnt == (side == "w" ? "q" : "Q")){
						return true
					} else if (dstnt != " "){
						break
					}
				}
				
				for (var d = 1; d <= Math.min(7-r, 7-c); d++){		//bottom right
					var dstnt = state.board[r+d][c+d]
					if (dstnt == (side == "w" ? "b" : "B") || dstnt == (side == "w" ? "q" : "Q")){
						return true
					} else if (dstnt != " "){
						break
					}
				}
				for (var d = 1; d <= Math.min(7-r, c); d++){		//bottom left
					var dstnt = state.board[r+d][c-d]
					if (dstnt == (side == "w" ? "b" : "B") || dstnt == (side == "w" ? "q" : "Q")){
						return true
					} else if (dstnt != " "){
						break
					}
				}
				for (var d = 1; d <= Math.min(r, 7-c); d++){		//top right
					var dstnt = state.board[r-d][c+d]
					if (dstnt == (side == "w" ? "b" : "B") || dstnt == (side == "w" ? "q" : "Q")){
						return true
					} else if (dstnt != " "){
						break
					}
				}
				for (var d = 1; d <= Math.min(r, c); d++){			//top left
					var dstnt = state.board[r-d][c-d]
					if (dstnt == (side == "w" ? "b" : "B") || dstnt == (side == "w" ? "q" : "Q")){
						return true
					} else if (dstnt != " "){
						break
					}
				}
			}
		}
	}
	return false
}