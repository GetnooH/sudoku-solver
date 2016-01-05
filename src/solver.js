/**
 * Created by gHasbroucq on 04/01/2016.
 */
(function () {
    var fs = require('fs');
    var os = require('os');

    console.log("Start...");

    var file = fs.readFile('./input/sudoku-sample-hardest', 'UTF-8', function (err, input) {
        if (err) throw err;


        var lines = input.split(os.EOL);
        console.log(lines);

        lines.forEach(function (line, li) {
            lines[li] = line.split('');
        });

        lines = solveSudoku(lines, 1);

        console.log(os.EOL + os.EOL + "*****Réponse*****");
        log(lines);
    });

    function log(data) {
        console.log("_________________");
        var sudoku = data.slice();
        sudoku.forEach(function (line, li) {
            sudoku[li] = line.join('|');
        });
        console.log(sudoku.join(os.EOL) );
    }


    function solveSudoku(data, level) {
        var sudoku = data.slice();
        log(sudoku);

        do {
            var emptystart = emptyCells(sudoku);
            sudoku = iterate(sudoku);
            var emptyend = emptyCells(sudoku);
        }
        while (emptyend > 0 && emptystart != emptyend);

        // Sudoku terminé
        if (emptyend == 0) return sudoku;

        var hypotheses = [];
        // Hypothèse nécessaire sur la première cellule vide trouvée
        try {
            if (emptyCells(sudoku) > 0) {
                sudoku.forEach(function (line, li) {
                    line.forEach(function (cell, ci) {
                        if (cell == ' ') {
                            var possibles = getThePossibles(sudoku, ci, li);
                            for (var i = 0; i < possibles.length; i++) {
                                hypotheses.push({li: li, ci: ci, value: possibles[i]});
                            }
                            throw 'found';
                        }
                    });
                });
            }
        } catch (e) {
            console.log('Cellule vide trouvée, Niveau ' + level + ', Hypotheses : ' + hypotheses.length);

            for (var i = 0; i < hypotheses.length; i++) {
                var hypo = sudoku.slice();
                console.log('Niveau ' + level + ', hypothese n°' + (i + 1) + ' :[L' + (hypotheses[i].li+1) + '][C' + (hypotheses[i].ci+1) + ']=' + hypotheses[i].value);
                hypo[hypotheses[i].li][hypotheses[i].ci] = hypotheses[i].value;

                try {
                    return solveSudoku(hypo, level + 1);
                } catch (e) {
                    console.log(e);
                }
            }
        }

        throw 'branche impossible';
    }

    function getThePossibles(lines, ci, li) {
        var possibles = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        // Lignes
        for (var i = 0; i < 9; i++) {
            var index = possibles.indexOf(parseInt(lines[li][i]));
            if (index > -1) {
                possibles.splice(index, 1);
            }
        }
        if (possibles.length == 0) throw 'impossible';

        // Colonnes
        for (var i = 0; i < 9; i++) {
            var index = possibles.indexOf(parseInt(lines[i][ci]));
            if (index > -1) {
                possibles.splice(index, 1);
            }
        }
        if (possibles.length == 0) throw 'impossible';

        // Carrés
        for (var i = Math.floor(li / 3) * 3; i < (Math.floor(li / 3) * 3) + 3; i++) {
            for (var j = Math.floor(ci / 3) * 3; j < (Math.floor(ci / 3) * 3) + 3; j++) {
                var index = possibles.indexOf(parseInt(lines[i][j]));
                if (index > -1) {
                    possibles.splice(index, 1);
                }
            }
        }

        if (possibles.length == 0) throw 'impossible';

        return possibles;
    }

    function iterate(data) {
        var lines = data.slice();

        lines.forEach(function (line, li) {
            line.forEach(function (cell, ci) {
                if (cell == ' ') {
                    var possibles = getThePossibles(lines, ci, li);

                    if (possibles.length == 1) {
                        lines[li][ci] = possibles[0];
                    }
                }
            });
        });
        return lines;
    }

    function emptyCells(lines) {
        var count = 0;
        lines.forEach(function (line) {
            count = count + line.filter(function (item) {
                    return item == ' '
                }).length;
        });
        return count;
    }

})();
