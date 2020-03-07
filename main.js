var board =[];

$(document).ready(function(){
	newgame();
})
function newgame(){
	//初始化
	init();
}
$('#newgame').click(function(){
	for (var i=0;i<4;i++){
		for (var j=0;j<4;j++){
			board[i][j]=0
		}
	}
	init()
})
function init(){
	score = -4; 	
	//初始化cell
	for(var i=0;i<4;i++){
		for (var j=0;j<4;j++){
			$('#box-'+i+'-'+j).css('top',getTop(i,j));
			$('#box-'+i+'-'+j).css('left',getLeft(i,j))
		}
	}
	//初始化numcell
	for(var i=0;i<4;i++){
		board[i]=new Array();
		for (var j=0;j<4;j++){
			board[i][j]=0;
		}
	}
	//随机块
	randomBlock(board);
	randomBlock(board);
	//numcell改变样式
	update();
}
$(document).keydown(function(e){
	switch(e.keyCode){
		case 37:
		if(left(board))
			
			randomBlock()
			update();
			isgameover()
		break;
		
		case 38:
			if(toTop(board))
			
			randomBlock()
			update();
			isgameover()

		break;

		case 39:
			if(toRight(board))
			
			randomBlock()
			update()
			isgameover()

		break;

		case 40:
			if(	toBottom(board))
		
			randomBlock()
			update()
			isgameover()

		break;
	}
})
//numcell改变样式
function update(){
	$('.numcell').remove();
	//render
	for(var i=0;i<4;i++){
		for (var j=0;j<4;j++){
			$('#container').append($('<div class="numcell" id="numcell-'+i+'-'+j+'"></div>'));
			var numcell = $("#numcell-"+i+"-"+j)
			if(board[i][j]==0){
				numcell.css('width',0);
				numcell.css('height',0);
				numcell.css('top',getTop(i,j)+50);
				numcell.css('left',getLeft(i,j)+50);
			}else{
				numcell.css('width','100px');
				numcell.css('height','100px');
				numcell.css('top',getTop(i,j));
				numcell.css('left',getLeft(i,j));
				numcell.css('background-color',getBackgroundColor(board[i][j]));
				numcell.css('color',getColor(board[i][j]));
				numcell.text(board[i][j]);

		}
	}
	
	

	}

}
//生成随机块
function randomBlock(){
	var randomX = parseInt(Math.floor(Math.random()*4));
	var randomY = parseInt(Math.floor(Math.random()*4));
	var times=0;
	while(times<50){
		if(board[randomX][randomY]==0)
			break;
			randomX = parseInt(Math.floor(Math.random()*4));
			randomY = parseInt(Math.floor(Math.random()*4));
			times++;
	}
	if( times == 50 ){
        for( var i = 0 ; i < 4 ; i ++ )
            for( var j = 0 ; j < 4 ; j ++ ){
                if( board[i][j] ==0 ){
                    randomX = i;
                    randomY = j;
				}
				return false
            }
    }
    var randomNum = Math.random()<0.5?2:4;
	board[randomX][randomY] = randomNum ;
	score+=2
	document.getElementById($('#score').text(score))
}
function isgameover(){
	if(nospace(board)&&nomove(board)){
		gameover()
	}
	
}
function gameover(){
	alert('gameover')
}