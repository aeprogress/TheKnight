class Knight {

    constructor(row, col){
        this.row = row;
        this.col = col;
    }

    get row () {
        return this._row;
    }
    set row (rowVal) {
        this._row = rowVal;
    }

    get col () {
        return this._col;
    }
    set col (colVal) {
        this._col = colVal;
    }


}