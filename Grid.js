/**
 * @brief Provide Interface/UI for the overall grid for rendering
 */
import Cell from './Cell.js';
export default class Grid{
    constructor(canvas,cols,rows){
        this.canvas = canvas
        this.cols = cols;
        this.rows = rows;
        this.cells =[];
        this.ctx = canvas.getContext('2d')
        this.ctx.fillStyle="blue"
    }
    beginrandomGrid(){
        for(let column=0;column<this.canvas.width;column+=this.cols){
            for(let row=0;row<this.canvas.height;row+=this.rows){
                let cell = new Cell(this.canvas,row,column)
                let randInt = Math.floor(Math.random()*500)
                if(randInt<100){
                    cell.make_alive();
                }
                cell.render_characeter();
                this.cells.push(cell)
            }
        }
    }
    updateGrid(){
        let index=0;
        for (let row = 0; row < this.canvas.height; row += this.rows) {
            for (let column = 0; column < this.canvas.width; column += this.cols) {
                if(row==0){
                    console.log(this.cells[index].status)
                }
                this.cells[index].render_characeter();
                index++;
            }
        }
    }
}
