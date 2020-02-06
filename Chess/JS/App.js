$(document).ready(function start() {
    let board = new Chess();
    let knight = new Knight(0, 0);

    board.possibilities(knight.row, knight.col);
    board.draw(knight.row, knight.col);
    $("#start").click(function () {

        $('.grid-item').click(function () {
            $('.possi').click(function update() {

                $("#knight").remove();
                $(".possi").remove();

                let index = $(this).attr("id");
                for (let i = 0; i < board.rowPosi.length; i++) {
                    if (i == index) {
                        knight.row = board.rowPosi[i];
                        knight.col = board.colPosi[i];
                    }
                }
                board.possibilities(knight.row, knight.col);
                board.reset(knight.row, knight.col);


                $("#knight").show();
                $(".possi").show();
                
            });
            
        });
        board.startTimer();
    });
    
    $("#replay").click(function() {
        document.location.reload();
    });
});