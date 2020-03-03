import Grid from './Grid.js';
import Cell from './Cell.js';
GOL();
function GOL(){
    const ROWS=50;
    const COLUMNS=50;
    let canvas = document.querySelector('canvas')
    if(canvas.getContext){
        let grid = new Grid(canvas,COLUMNS,ROWS);
        grid.beginrandomGrid();
    //    setInterval(function(){
           grid.updateGrid();
    //    },1500)
    }
}
