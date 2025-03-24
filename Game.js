let board ;
let score = 0 ;
let row = 4;
let column = 4;


window.onload = ()=> {
  setGame()
}

function setGame(){
 board = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
 ]

 for(let r = 0;  r < row ; r++){
    for(let c = 0 ; c < column ; c++){
      let div = document.createElement("div")
      div.style.width = '100px'
      div.style.height = '100px'
      div.style.display = 'flex'
      div.style.fontSize = '30px'
      div.style.alignItems = 'center'
      div.style.justifyContent = 'center'
      div.id = r.toString() + '-' + c.toString()
      let num = board[r][c]
      updateTile(div , num)
      document.getElementById('Board').append(div)
    }
 }


 setTwo(); setTwo()
}
function updateTile(tile , num){
   tile.innerText = ''
   tile.classList.value = ''
   tile.classList.add('tile')

   if(num > 0){
    tile.innerText = num
    if(num <= 4096){
      tile.classList.add('tile-'+ num.toString())
    }
    else{
      tile.classList.add('tile-8192')
    }
   } else {
    tile.classList.add("tile-0"); 
  }
}

function hasEmptyTile(){
  for (let r = 0; r< row ; r++ ){
    for(let c = 0 ; c < column ; c++){
      if(board[r][c] == 0){
        return true;
      }
    }
  }
  return false
}

function setTwo(){
  if(!hasEmptyTile()){
    return;
  }
  
  

  let found = false;
while(!found){
    let r = Math.floor(Math.random() * row);
    let c = Math.floor(Math.random() * column);
   
    if(board[r][c] == 0) {
      board[r][c] = 2
      let tile = document.getElementById(r.toString() + '-' + c.toString())
      tile.innerText = '2';
      tile.classList.add('tile-2')
      found = true
    } 
  } }

document.addEventListener('keyup',(e)=>{
  if(e.code == 'ArrowLeft'){
    slideLeft();
    setTwo()
  }else if(e.code == 'ArrowRight'){
    slideRight();
    setTwo()
  }else if (e.code == 'ArrowUp'){
    slideUp()
    setTwo()
  }else if (e.code == 'ArrowDown'){
    slideDown()
    setTwo()
  }
  document.getElementById('score').innerHTML = score
})
function slideLeft(){
  for(let r = 0 ; r < row ; r++){
    let row = board[r]
    row = slide(row);
    board[r] = row

    for(let c = 0 ; c < column ; c++){
      let tile = document.getElementById(r.toString()+'-'+c.toString());
      let num = board[r][c];
      updateTile(tile,num)
    }
  }
}
function slideRight(){
  for(let r = 0 ; r < row ; r++){
    let row = board[r]
    row.reverse()
    row = slide(row);
    row.reverse()

    board[r] = row

    for(let c = 0 ; c < column ; c++){
      let tile = document.getElementById(r.toString()+'-'+c.toString());
      let num = board[r][c];
      updateTile(tile,num)
    }
  }
}
function slideUp() {
  for (let c = 0; c < column; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row = slide(row);
    for (let r = 0; r < row.length; r++) {
      board[r][c] = row[r];
    }
    for (let r = 0; r < row.length; r++) {
      let tile = document.getElementById(r.toString() + '-' + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}
function slideDown() {
  for (let c = 0; c < column; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row.reverse()
    row = slide(row);
    row.reverse()
    for (let r = 0; r < row.length; r++) {
      board[r][c] = row[r];
    }
    for (let r = 0; r < row.length; r++) {
      let tile = document.getElementById(r.toString() + '-' + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}




function slide(row) {
  row = filterZero(row)


  for(let i = 0 ; i < row.length-1 ; i++){
    if(row[i] == row[i+1]){
      row[i] *=2;
      row[i+1] = 0;
      score += row[i];
    }
  }

  row = filterZero(row)

  while (row.length < column){
    row.push(0)
  }
  return row;

}
function filterZero(row) {
  return row.filter(num => num != 0)
}

