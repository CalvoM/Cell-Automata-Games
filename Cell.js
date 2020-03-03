export default class Cell{
    constructor(canvas,xCoord,yCoord){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d')
        this.row =xCoord;
        this.column=yCoord;
        this.status = 'Dead';
    }
    make_dead(){
        this.status = 'Dead';
    }
    make_alive(){
        this.status = 'Alive';
    }
    is_alive(){
        return this.status=='Alive'?true:false;
    }
    render_characeter(){
        if(this.is_alive()){
            this.ctx.fillStyle="blue";
            this.ctx.fillRect(this.row, this.column, 50, 50)
        }else{
            this.ctx.clearRect(this.row,this.column,50,50)
        }
    }
}
