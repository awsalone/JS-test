function getTop(i,j) {
	return i =20+i*120;
}
function getLeft(i,j){
	return j=20+j*120;
}
function getBackgroundColor(num){
	switch(num){
        case 2:return "#f2b179";break;
        case 4:return "#f59563";break;
        case 8:return "#f67c5f";break;
        case 16:return "#f65e3b";break;
        case 32:return "#edcf72";break;
        case 64:return "#edcc61";break;
        case 128:return "#9c0";break;
        case 256:return "#33b5e5";break;
        case 512:return "#09c";break;
        case 1024:return "#a6c";break;
        case 2048:return "#93c";break;
	}

}
function getColor(num){
	if( num <= 4 )
        return "#776e65";

    return "white";
}

function moveLeft(board){
	for (var i=0;i<4;i++){
		for (var j=1;j<4;j++){
			if(board[i][j]==0||board[i][j]==board[i][j-1]) return true
		
		}
	}
	return false
}
function moveRight(board){
	for (var i=0;i<4;i++){
		for (var j=0;j<3;j++){
			if(board[i][j]==0||board[i][j]==board[i][j+1]) return true
		
		}
	}
	return false
}
function moveTop(board){
	for(var i=1;i<4;i++){
		for (var j=0;j<4;j++){
			if(board[i][j]==0||board[i-1][j]==board[i][j])
			return true
		}
	}
	return false
}
function moveBottom(board){
	for(var i=0;i<3;i++){
		for (var j=0;j<4;j++){
			if(board[i][j]==0||board[i+1][j]==board[i][j])
			return true
		}
	}
	return false
}
function left(board){
	if (!moveLeft(board))
	return false;
	for( var i=0;i<4;i++){
		for (var j=0;j<4;j++){
			if(board[i][j]!=0){
				for(var k=0;k<j;k++){
				if(board[i][k] == 0&&noBlockHrozental(i,j,k,board)){
					board[i][k]=board[i][j];
					board[i][j]=0;
					showMoveAnimate(i,j,i,k)
				}else if(board[i][j]==board[i][k]&&noBlockHrozental(i,j,k,board)){
					board[i][k]+=board[i][j]
					board[i][j]=0
					showMoveAnimate(i,j,i,k)
				}
			}
			}
			
		}
	}
	return true
}
function toTop(board){
	if (!moveTop(board))
	return false;
	for (var j=0;j<4;j++){
		for (var i=1;i<4;i++){		
				if(board[i][j]!=0){
					for(var k=0;k<i;k++){
					if(board[k][j]==0&&noBlockVertical(i,j,k,board)){
						board[k][j]=board[i][j]
						board[i][j]=0
						showMoveAnimate(i,j,k,j)
					}else if(board[i][j]==board[k][j]&&noBlockVertical(i,j,k,board)){
					board[k][j]+=board[i][j]
					board[i][j]=0
					showMoveAnimate(i,j,k,j)
				}
				}
			}
		}
	}
	return true
}
function toRight(board){
	if (!moveRight(board))
	return false;
	for(var i=0;i<4;i++){
		for(var j=3;j>-1;j--){
			if(board[i][j]!=0){
				for(var k=3;k>j;k--){
					if(board[i][k]==0&&noBlockHrozental(i,k,j,board)){
						board[i][k]=board[i][j]
						board[i][j]=0
						showMoveAnimate(i,j,i,k)
					}
					else if(board[i][j]==board[i][k]&&noBlockHrozental(i,j,k,board)){
						board[i][k]+=board[i][j]
						board[i][j]=0
						showMoveAnimate(i,j,i,k)
					}
				}
			}
		}
	}
	return true
}
function toBottom(board){
	if (!moveBottom(board))
	return false;
	for (var j=0;j<4;j++){
		for (var i=3;i>-1;i--){
			if(board[i][j]!=0){
			for(var k=3;k>i;k--){
					if(board[k][j]==0&&noBlockVerticalB(i,j,k,board)){
						board[k][j]=board[i][j]
						board[i][j]=0
						showMoveAnimate(i,j,k,j)
					}else if(board[i][j]==board[k][j]&&noBlockVertical(i,j,k,board)){
						board[k][j]+=board[i][j]
						board[i][j]=0
						showMoveAnimate(i,j,k,j)
					}
	
				
			}
		}
		}
	}
	return true
}
function noBlockHrozental(numi,numj,numk,board){
	for (var i=numk+1;i<numj;i++){
			if(board[numi][i]!=0)
			return false;
	}
	return true;
}

function noBlockVertical(numi,numj,numk,board){
	for (var i=numk;i<numi;i++){
		if (board[i][numj]!=0)
		return false
	}
	return true
}
function noBlockVerticalB(numi,numj,numk,board){
	for (var i=numk;i>numi;i--){
		if (board[i][numj]!=0)
		return false
	}
	return true
}
function nospace(board){
	for( var i=0;i<4;i++){
		for (var j=0;j<4;j++){
			if (board[i][j]==0)
			return false
		}
	}
	return true
}
function nomove(board){
	if(left(board)||toRight(board)||toTop(board)||toBottom(board)){
		return false
	}
	return true
}
function showMoveAnimate(fromx,fromy,tox,toy){
	let num = $('#numcell-'+fromx+'-'+fromy)
	num.animate({top:getTop(tox,toy),left:getLeft(tox,toy)},200)
}
function showNumberWithAnimation(i, j, randNumber) {

    var numberCell = $('#number-cell-' + i + '-' + j);
    numberCell.css("background-color", getNumberBackgroundColor(randNumber));
    numberCell.css("color", getNumberColor(randNumber));
    numberCell.text(randNumber);
    
    numberCell.animate({
        width : "100px",
        height : "100px",
        top : getPosTop(i, j),
        left : getPosLeft(i, j)
    }, 50);
}