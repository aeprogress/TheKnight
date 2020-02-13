 class Chess {

     constructor(numOfPosi) {
         this.chess = new Array(8);
         this.numOfPosi = numOfPosi;
         this.colPosi = new Array(this.numOfPosi);
         this.rowPosi = new Array(this.numOfPosi);
         this.steps = 1;
         this.greenSpots = 0;
         this.lifeElements = new Array();
         this.lifeCapacity;
         this.deadElements;
         this.coins = 0;
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

                         for (let k = 0; k < this.rowPosi.length; k++) {
                             if (i == this.rowPosi[k] && j == this.colPosi[k]) {
                                 markup = "<div class='grid-item even' id='" +
                                     (offset) + "'><div class='possi'" +
                                     " id ='" + k + "'></div>";
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

                         for (let k = 0; k < this.rowPosi.length; k++) {
                             if (i == this.rowPosi[k] && j == this.colPosi[k]) {
                                 markup = "<div class='grid-item odd' id='" +
                                     (offset) + "'><div class='possi'" +
                                     "id = ' " + k + "'></div>";
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
         var posX = 0,
             posY = 0;

         this.numOfPosi = 0;
         this.rowPosi = [];
         this.colPosi = [];

         for (let i = 0; i < 8; i++) {
             posX = row + xPosiMoves[i];
             posY = col + yPosiMoves[i];

             if ((posX < 0 || posX > 7) ||
                 (posY < 0 || posY > 7)) {
                 continue;
             } else {
                 this.rowPosi[this.numOfPosi] = posX;
                 this.colPosi[this.numOfPosi] = posY;

                /* console.log("\n" + (this.numOfPosi + 1) +
                     ") Row: " + this.rowPosi[this.numOfPosi] +
                     " Column: " + this.colPosi[this.numOfPosi] + "\n");
                */
                 this.numOfPosi++;
             }
         }
     }

     startTimer() {
         let min = 0;
         let sec = 50;
         let id = setInterval(() => {
             if (min < 10 && sec < 10) {
                 $("#timer").html("<img src='./images/timer.png'> " +
                     "0" + min + " : 0" + sec);
             } else if (min < 10) {
                 $("#timer").html("<img src='./images/timer.png'> " +
                     "0" + min + " : " + sec);
             } else {
                 $("#timer").html("<img src='./images/timer.png'> " +
                     min + " : " + sec);
             }
             /*if (sec == 59) {
                 sec = 0;
                 min++;
             } else if (this.greenSpots == 64) {
                 //$(".possi").remove();
                 this.keepPlaying(id);
             } else {
                 sec++;
             } */
             if(this.greenSpots == 64) {
                 $(".possi").remove();
                 //alert("YOU WON!");
                 clearInterval(id);
             }
             if(sec == 0){
                this.keepPlaying(id);
             } else {
                 sec--;
             }

         }, 1000);

     }

     addLife() {
         let markup = "";
         this.lifeCapacity = 3;
         this.deadElements = -1;

         for (let i = 0; i < this.lifeCapacity; i++) {
             markup = "<img src='./images/knight1.png' " 
             + "class='life-elments' id='life" + i + "'>";
             this.lifeElements[i] = markup;
             $("#life").append(this.lifeElements[i]);
         }
     }

     keepPlaying(id){
         let offset = 0;

         clearInterval(id);
         this.greenSpots = 0;

         this.steps = 0;
         $("#steps").html("<img src='./images/horse.png'> " + this.steps);
         this.steps += 1;

         this.decreaseLife();

         let lifeLength = this.lifeElements.length;
         if(this.deadElements + 1 == this.lifeCapacity) {
            $(".possi").remove();
            $("#timer").html("<img src='./images/timer.png'> " +
            "00 : 00");
            alert("GAME OVER!");
         } else {
            for(let i = 0; i < 8; i++){
                for(let j = 0; j < 8; j++){
                    if(offset % 2 == 0) {
                        $("#" + offset).css("background-image",
                        "url('./images/walnut.png')");

                        $("#" + offset).css("background-color",
                        "rgb(133, 92, 64)");
                    } else {
                        $("#" + offset).css("background-image",
                        "url('./images/maple.png')");

                        $("#" + offset).css("background-color",
                        "rgb(255, 217, 174)");
                    }
                    offset++;
                }
                offset++;
            }
            this.startTimer();
         }

     }

     decreaseLife() {
         let markup = "";
         let lifeLength = this.lifeElements.length;

         $(".life-elments").remove();
        // this.lifeElements.pop();
        // console.log(this.lifeElements.length);

         lifeLength = this.lifeElements.length;
         this.deadElements++;
         //console.log(this.deadElements);

         for(let i = 0; i < lifeLength; i++) {
            if(i <= this.deadElements) {
                markup = "<img src='./images/knight-off.png' " 
            + "class='life-elments' id='life" + i + "'>";
            } else {
                markup = "<img src='./images/knight1.png' " 
            + "class='life-elments' id='life" + i + "'>";
        }
            this.lifeElements[i] = markup;
            $("#life").append(this.lifeElements[i]);

         }
     }

     reset(row, col) {

         let offset = 0;
         let markup = "";
         let possiMarkup = "";

         for (var i = 0; i < 8; i++) {
             for (var j = 0; j < 8; j++) {

                 if (i == row && j == col) {
                     markup = "<div id='knight'></div>";

                     //this part give me the ability to chages the rules of the game
                     //I could havd green parts or other stuff by walking over a cell.
                     /*if($("#" + offset).css("background-color") === "rgb(133, 92, 64)" 
                     || $("#" + offset).css("background-color") === "rgb(255, 217, 174)") {
                        $("#" + offset).css("background-color",
                        "rgba(128, 255, 0)");
                        this.greenSpots++;
                        //console.log(this.greenSpots);
                        }*/
                        
                     $("#" + offset).append(markup);
                     $("#steps").html("<img src='./images/horse.png'> " + this.steps);
                     this.steps++;
                 }
                 for (let k = 0; k < this.numOfPosi; k++) {
                     if (i == this.rowPosi[k] && j == this.colPosi[k]) {
                         possiMarkup = "<div class='possi' title='possi' " +
                             " id ='" + k + "'></div>";
                         $("#" + offset).append(possiMarkup);

                         if ($("#" + offset).css("background-color") === "rgb(133, 92, 64)" ||
                             $("#" + offset).css("background-color") === "rgb(255, 217, 174)") {

                             $("#" + offset).css("background-image",
                                 "none");
                             /*$("#" + offset).css("background-image",
                                 "url('./images/guardian.png')");*/
                             $("#" + offset).css("background-color",
                                 "rgb(60,179,113)");
                                 $("#" + offset).css("background-image",
                                 "radial-gradient(circle, rgb(60,179,113), rgb(93, 195, 139), rgb(76, 163, 115))");
                             this.greenSpots++;
                             this.coins += 2;

                             $("#coins").html("<img src='./images/coin.png'>" + this.coins);
                             //console.log(this.greenSpots);
                         }
                     }
                 }

                 offset++;
             }
             offset += 1;
         }

     }

 }
