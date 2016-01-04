/**
 * Created by gHasbroucq on 04/01/2016.
 */
(function(){
    var fs = require('fs');
    var os = require('os');

    console.log("Start...");

    var file = fs.readFile('./input/sudoku-sample.txt', 'UTF-8', function (err, data) {
        if (err) throw err;


        var lines = data.split(os.EOL);
        console.log(lines);

        lines.forEach(function (line, li) {
            lines[li] = line.split('');
        });

	lines = iterate(lines);
console.log(emptyCells(lines));
	lines = iterate(lines);
console.log(emptyCells(lines));
	lines = iterate(lines);
console.log(emptyCells(lines));
	lines = iterate(lines);
console.log(emptyCells(lines));
	lines = iterate(lines);
console.log(emptyCells(lines));
	lines = iterate(lines);
console.log(emptyCells(lines));
	lines = iterate(lines);
console.log(emptyCells(lines));
	lines = iterate(lines);
console.log(emptyCells(lines));


        lines.forEach(function (line, li) {
            lines[li] = line.join('');
        });

	console.log(lines);
        console.log("End...");
    });


function iterate(lines){
        lines.forEach(function (line, li) {
            line.forEach(function (cell, ci) {
// Initialisation
  //              console.log('===== ' + li + ' - ' + ci);

                if (cell == ' '){
                    var possibles = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// Lignes
                    for (var i=0; i< 9; i++){
                        var index = possibles.indexOf(parseInt(line[i]));
                        if (index > -1) {
                            possibles.splice(index, 1);
                        }
                    }
//                    console.log('L : ' + possibles);

// Colonnes
                    for (var i=0; i< 9; i++){
                        var index = possibles.indexOf(parseInt(lines[i][ci]));
                        if (index > -1) {
                            possibles.splice(index, 1);
                        }
                    }
//                    console.log('C : ' + possibles);

// Carrés
//		    console.log(Math.floor(li/3) + " - " + Math.floor(ci/3));
		    for (var i=Math.floor(li/3)*3; i < Math.floor(li/3) + 3; i++){
                        for (var j=Math.floor(ci/3)*3; j < Math.floor(ci/3) + 3; j++){
                            var index = possibles.indexOf(parseInt(lines[i][j]));
                            if (index > -1) {
                                possibles.splice(index, 1);
                            }
                    	}
                    }

//                    console.log('X : ' + possibles);

		    if (possibles.length == 0) throw 'Erreur';

		    if (possibles.length == 1) {
			lines[li][ci] = possibles[0];
		    }

                }

            });
        });
return lines;
}

function emptyCells(lines){
	var count = 0;
        lines.forEach(function (line, li) {
            count = count + line.filter(function(item){return item == ' '}).length;
        });
	return count;
}

})();
