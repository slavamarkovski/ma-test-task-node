import _ from 'lodash';

export default class SeaBattle {
    /**
     * @constructor
     * @param rows - number of battlefield rows
     * @param columns - number of battlefield columns
     */
    constructor(rows, columns) {
        this._rows = rows;
        this._columns = columns;

        // set battlefield matrix
        this._field = new Array(this._rows);
        this._field.fill([]);
        for (let i = 0; i < this._rows; i++) {
            this._field[i] = new Array(this._columns);
            this._field[i].fill([]);
        }

        this._hits = [];

        // TODO: generate submarine coordinates randomly
        // this._coords = [4, 3, 2, 1].map(s => this._getRandomCoordinates(s));

        // TODO: remove hardcoded coordinates once _getRandomCoordinates is implemented
        this._coords = [
            [[1, 0]],
            [[3, 5], [4, 5]],
            [[2, 2], [3, 2], [4, 2]],
            [[1, 4], [1, 5], [1, 6], [1, 7]]
        ];
        this._coordsFlat = this._coords.flat();
    }

    /**
     * Preforms hit by random coordinates
     * @returns {array} of coordinates
     */
    hit() {
        const availableCoords = [];

        for (let i = 0; i < this._rows; i++) {
            for (let j = 0; j < this._columns; j++) {
                if (!this._hits.length || !(this._inArray(this._hits, [i, j]))) {
                    availableCoords.push([i, j]);
                }
            }
        }

        const randomCoords = _.sample(availableCoords);
        this._hits.push(randomCoords);

        return {
            coords: randomCoords,
            on_target: this._inArray(this._coordsFlat, randomCoords)
        };
    }

    /**
     * Get overall game statistics
     * @returns {{hits: {total: number, missed: number, on_target: number}, total: number}}
     */
    stat() {
        let hits_on_target = 0;
        this._hits.forEach(h => {
            if (this._inArray(this._coordsFlat, h)) {
                hits_on_target += 1;
            }
        });
        return {
            total: this._rows * this._columns,
            targets: {
                total: this._coordsFlat.length,
                left: this._coordsFlat.length - hits_on_target
            },
            hits: {
                on_target: hits_on_target,
                missed: this._hits.length - hits_on_target,
                total: this._hits.length
            }
        };
    }

    /**
     * Convert battlefield with submarine coordinates,
     * on_target and missed hits to printable string
     * @returns {string}
     */
    toString() {
        let fieldPrint = '';
        for (let i = 0; i < this._rows; i++) {
            for (let j = 0; j < this._columns; j++) {
                if (this._inArray(this._hits, [i, j])) {
                    if (this._inArray(this._coordsFlat, [i, j])) {
                        fieldPrint += ' X ';
                    } else {
                        fieldPrint += ' 0 ';
                    }
                } else if (this._inArray(this._coordsFlat, [i, j])) {
                    fieldPrint += ' $ ';
                } else {
                    fieldPrint += ' _ ';
                }
            }
            fieldPrint += '\n';
        }
        return fieldPrint;
    }

    _inArray(arr, el) {
        return arr.some((c) => JSON.stringify(c) === JSON.stringify(el));
    }


    // TODO: implement generating submarine coordinates randomly
    // _getRandomCoordinates(numOfDecks) { }
}