 class Chess {

     constructor(chess, rowPosi, colPosi, numOfPosi) {
         this.chess = new Array(8);
         this.numOfPosi = numOfPosi;
         this.colPosi = new Array(this.numOfPosi);
         this.rowPosi = new Array(this.numOfPosi);
     }

     draw(row, col) {

         var table = $(".grid-container");
         var offset = 0;
         var markup = "";

         for (var i = 0; i < 8; i++) {
             this.chess[i] = new Array(8)
         }

         for (var i = 0; i < 8; i++) {
             for (var j = 0; j < 8; j++) {
                 if (offset % 2 == 0) {
                     if (i == row && j == col) {
                         markup = "<div class='grid-item even' id='" +
                             (offset) + "'>" +
                             "<div id='knight'></div></div>";
                     } else {
                         markup = "<div class='grid-item even' id='" +
                         (offset) + "'></div>";

                         for(let k = 0; k < this.rowPosi.length; k++){
                             if(i == this.rowPosi[k] && j == this.colPosi[k]){
                                 markup = "<div class='grid-item even' id='" +
                                 (offset) + "'><div class='possi'"
                                 + " id ='" + k + "'></div>";
                             }
                         }
                     }
                 } else {
                     if (i == row && j == col) {
                         markup = "<div class='grid-item odd' id='" +
                             (offset) + "'>" +
                             "<div id='knight'></div></div>";
                     } else {
                         markup = "<div class='grid-item odd' id='" +
                         (offset) + "'></div>";

                         for(let k = 0; k < this.rowPosi.length; k++){
                            if(i == this.rowPosi[k] && j == this.colPosi[k]){
                                markup = "<div class='grid-item odd' id='" +
                                (offset) + "'><div class='possi'"
                                + "id = ' "+ k + "'></div>";
                            }
                        }

                     }
                 }
                 this.chess[i][j] = markup;
                 table.append(this.chess[i][j]);
                 offset++;
             }
             offset += 1;
         }
         //console.log(this.chess);
     }

     possibilities(row, col) {

       var xPosiMoves = [-2, -2, -1, -1, 1, 1, 2, 2];
       var yPosiMoves = [-1, 1, -2, 2, -2, 2, -1, 1];
       var posX = 0, posY = 0;

       this.numOfPosi = 0;
       this.rowPosi = [];
       this.colPosi = [];

       for(let i = 0; i < 8; i ++){
           posX = row + xPosiMoves[i];
           posY = col + yPosiMoves[i];

           if((posX < 0 || posX > 7) || (posY < 0 || posY > 7)){
               continue;
           } else {
               this.rowPosi[this.numOfPosi] = posX;
               this.colPosi[this.numOfPosi] = posY;

               console.log("\n" + (this.numOfPosi + 1) 
               + ") Row: " + this.rowPosi[this.numOfPosi] 
               + " Column: " + this.colPosi[this.numOfPosi] + "\n");
               this.numOfPosi++;
           }
       }
     }

     reset(row, col) {

         var offset = 0;
         var markup = "";
         var possiMarkup = "";

         for (var i = 0; i < 8; i++) {
             this.chess[i] = new Array(8)
         }

         for (var i = 0; i < 8; i++) {
             for (var j = 0; j < 8; j++) {

                     if (i == row && j == col) {
                         markup = "<div id='knight'></div></div>";
                         $("div#" + offset).append(markup);
                     }
                     for(let k = 0; k < this.numOfPosi; k++){
                        if(i == this.rowPosi[k] && j == this.colPosi[k]){
                            possiMarkup = "<div class='possi'"
                            + " id ='" + k + "'></div>";
                            $("div#" + offset).append(possiMarkup);
                            //$(k).show();
                        }
                    }
                    
                 offset++;
             }
             offset += 1;
         }
         
     }

 }