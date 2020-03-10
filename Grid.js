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
        this.cells_details=[];
        this.ctx = canvas.getContext('2d')
        this.ctx.fillStyle="blue"
        this.col_max = this.canvas.width - this.cols;
        this.row_max = this.canvas.height - this.rows;
        this.rowCount = this.canvas.height / this.rows;
        this.colCount = this.canvas.width / this.cols;
    }
    /**
     * @brief Generate Random starting patterns
     */
    beginrandomGrid(){
        for(let column=0;column<this.canvas.width;column+=this.cols){
            for(let row=0;row<this.canvas.height;row+=this.rows){
                let cell = new Cell(this.canvas,row,column)
                let randInt = Math.floor(Math.random()*1000)
                if(randInt<500){
                    cell.make_alive();
                }
                cell.render_characeter();
                this.cells.push(cell)
            }
        }
    }
    /**
     * @brief Generate some funny patterns I had 
     */
    beginPattern(){
        let index=1
        for (let column = 0; column < this.canvas.width; column += this.cols) {
            for (let row = 0; row < this.canvas.height; row += this.rows) {
                let randInt = Math.floor(Math.random()*(this.row_max*this.col_max));
                let cell = new Cell(this.canvas,row,column);
                if (randInt>index) {
                    cell.make_alive();
                }
                cell.render_characeter();
                this.cells.push(cell)
                index++;
            }
        }
    }
    /**
     * @brief Generate glider starting pattern
     */
    gliderPattern(){
        let index=1;
        let startPoint = Math.floor((this.rowCount * this.colCount)/2)+(this.rowCount/2);

        for (let column = 0; column < this.canvas.width; column += this.cols) {
            for (let row = 0; row < this.canvas.height; row += this.rows) {
                let cell = new Cell(this.canvas, row, column);
                if(index==startPoint){
                    cell.make_alive()
                }
                if (index==(startPoint+this.rowCount+1)) {
                    cell.make_alive()
                }
                if (index >= (startPoint + 2 * (this.rowCount) - 1) && index <= (startPoint + 2 * (this.rowCount) + 1)){
                    cell.make_alive()
                }
                cell.render_characeter();
                this.cells.push(cell)
                index++;
            }
        }
    }
    /**
     * @brief Update Grid with each iteration
     */
    updateGrid(){
        let index=1;
        for (let row = 0; row < this.canvas.height; row += this.rows) {
            for (let column = 0; column < this.canvas.width; column += this.cols) {
                this.evaluateNeighbours(this.cells.status,index)
                this.cells[index-1].render_characeter();
                index++;
            }
        }
        let cellIndex=1;
        //Update after all evaluations have been done to avoid changing individual cells before all cells are evaluated
        for (let row = 0; row < this.canvas.height; row += this.rows) {
            for (let column = 0; column < this.canvas.width; column += this.cols) {
                if (this.cells[cellIndex - 1].is_alive()) {
                    if (this.cells_details[cellIndex - 1] < 2) {
                        //underpopulation
                        this.cells[cellIndex - 1].make_dead()
                    }
                    if (this.cells_details[cellIndex - 1] > 3) {
                        this.cells[cellIndex - 1].make_dead()
                    }
                } else {
                    if (this.cells_details[cellIndex - 1] == 3) {
                        this.cells[cellIndex - 1].make_alive()
                    }
                }
                cellIndex++;
            }
        }
    }
    /**
     * @brief Evaluate neighbouring cells
     */
    evaluateNeighbours(cellStatus,cellIndex){
        //Get the edges of the cols and rows
        let rowEdge = this.canvas.height/this.rows;
        let colEdge = this.canvas.width/this.cols;
        let differentCells,sameCells=0;
        let outer_min,inner_min=-1;
        let outer_max,inner_max=1;
        if(cellIndex<=rowEdge){
            ///////
            inner_min=0
        }
        if ((cellIndex - 1) % rowEdge== 0) {
            //
            //
            //
            //
            outer_min = 0;
        }
        if(cellIndex%rowEdge==0){
                      //
                      //
                      //
                      //
                      //
            outer_max=0;
        }
        if(cellIndex<=(rowEdge*colEdge) && cellIndex>(rowEdge*colEdge-colEdge)){
              


            //////
            inner_max=0;
        }
        for(let outer=outer_min;outer<=outer_max;outer++){
            let ownIndex=(cellIndex-1)+outer;
            for (let inner = inner_min; inner <= inner_max;inner++){
                if(inner==0 && outer==0){
                    continue;
                }
                if(this.cells[ownIndex+(inner*rowEdge)].get_status()!==this.cells[cellIndex-1].get_status()){
                    differentCells++;
                }
                if (this.cells[ownIndex + (inner * rowEdge)].get_status() === this.cells[cellIndex - 1].get_status()) {
                    sameCells++;
                }
            }
        }
        //update array of cell neighbour details accord to status of cell
        if(this.cells[cellIndex-1].is_alive()){
            this.cells_details[cellIndex-1]=sameCells;
        }
        else{
            this.cells_details[cellIndex - 1] = differentCells; 
        }
        
    }
}
