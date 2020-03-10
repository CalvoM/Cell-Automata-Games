import Grid from './Grid.js';
import Cell from './Cell.js';
GOL();
function GOL(){
    const ROWS=20;
    const COLUMNS=20;
    let canvas = document.querySelector('canvas')
    if(canvas.getContext){
        let grid = new Grid(canvas,COLUMNS,ROWS);
        grid.gliderPattern()
       setInterval(function(){
           grid.updateGrid();
       },100)
    }
}
