/**
 * @deprecated Moved to vue
 */
class Table{
    constructor(rows, cols) {
        this.table = [];
        this.queens = [];
        this.clearTable(rows, cols);
        this.clearQueens(rows);
        console.log(this.queens);
    }


    /**
     * @description clear queens positions array by writing 0s
     * @param {Number} size table size 
     * @param {Number} cols table size 
     * @returns {Array} cleared queens array
     */
    clearQueens(size){
        let cleared = [];
        for (let i = 0; i < size; i++) {
            cleared.push(0);
        }
        return cleared;
    }

    /**
     * @description clears the matrix filling it with 0s
     * @param {Number} rows number of rows
     * @param {Number} cols number of cols
     * @returns {Boolean} cleared -> [true] / failed -> [false]
     */
    clearTable(rows, cols){
        try {
            for(let i = 0; i < rows;i++ ){
                let arr = [];
                for(let j = 0; j<cols; j++){
                    arr.push(0);
                }
                this.table.push(arr);
            }
            return this.table;
        } catch (error) {
            return false;
        }
    }

    /**
     * @description print given array or generated matrix as table on console
     * @param {Array} arr array/matrix to print as table
     */
    print(arr = false){
        !arr ? console.table(this.table) : console.table(arr);
    }

}
// console.log(Math.ceil(Math.random() * 4))


/**
 * @author Matsukii <matheuscesar@gmail.com>
 * @description N queens implementation based on Genetic Algorithm and using Vue.js
 */
let app = new Vue({
    el: '#app-container',
    data: {
        validSetButton: false,
        dark: true,
        update: false,
        table: [],
        arrayTable: [],
        queens: [],
        population: 4,
        best:{
            first:{},
            second: {},
        },
        tuning:{
            mutation: 0.5,
            crossover: 0.3,
            minFit: 4,
            maxIterations: 100
        },
        iteration: 0,
        running: false,
    },
    created: function(){
        this.table = this.blankTable(this.population);
        this.queens = this.clearArr(this.population );
        this.placeQueens();

        // try {
        //     this.dark = sessionStorage.getItem('dark');
        // } catch (error) {}
    },

    watch:{
        dark: function(){
            // sessionStorage.setItem('dark', this.dark);
            // console.log("object");
        },
        queens: function(){
            this.setQueens(this.queens);
        },
        table: function(){
        }
    },

    methods:{
        /**
         * [recursive/kinda]
         * @description generate a randum number from 0 to [max]
         * @param {Number} max biggest possible number
         */
        rand: (max) => {
            let gen = Math.ceil(Math.random() * max) - 1;
            if(gen < 0){
                rand(max);
            }
            else{
                return gen;
            }
        },
        /**
         * @description toggle themes
         * ! saving to sessionStorage not working
         */
        toggleTheme: function(){
            this.dark = !this.dark;
            sessionStorage.setItem('dark', this.dark);
        },
        /**
         * @description print array/matrix as console table
         * @param {Array} arr array to print
         */
        print: function(arr = false){
            !arr ? console.table(this.table) : console.table(arr);
        },
        /**
         * @description creates a new blank matrix using the pop(population) number as num of rows and columns
         * ! LINKED TO OBJECT ARRAY
         * @param {Number} pop number rows and cols
         * @param {Number} popValue number
         * @returns {Array<Array<Number>>} array of arrays
         */
        blankTable: function(pop, popValue = 0){
            let clear = [];
            try {
                for(let i = 0; i < pop;i++ ){
                    let arr = [];
                    for(let j = 0; j<pop; j++){
                        arr.push(popValue);
                    }
                    this.table.push(arr);
                    clear.push(arr);
                }
                return clear;
            } catch (error) {
                return false;
            }
        },
        /**
         * @description creates a new blank matrix using the pop(population) number as num of rows and columns
         * @param {Number} pop number rows and cols
         * @param {Number} popValue number
         * @returns {Array<Array<Number>>} array of arrays
         */
        blankUnlinkedTable: function(pop, popValue = 0){
            let clear = [];
            try {
                for(let i = 0; i < pop;i++ ){
                    let arr = [];
                    for(let j = 0; j<pop; j++){
                        arr.push(popValue);
                    }
                    clear.push(arr);
                }
                return clear;
            } catch (error) {
                return false;
            }
        },
        /**
         * @description create a array with given length filled with 0s
         * @param {Number} size array length
         * @returns {Array<Number>} Array filled with 0s
         */
        clearArr: function(size){
            let cleared = [];
            for (let i = 0; i < size; i++) {
                cleared.push(0);
            }
            return cleared;
        },
        /**
         * @description replace the queens array with another array filled of 0s
         */
        clearQueens: function(){
            this.queens = this.clearArr(this.queens.length);
        },
        /**
         * @description 
         * creates a new set of random positions, the index is the row and the num inside is the col
         * 
         * @returns {Array} array of N queens/random numbers
         */
        newQueenSet: function(){
            /**
             * [recursive/kinda]
             * @description generate a randum number from 0 to [max]
             * @param {Number} max biggest possible number
             */
            let rand = (max) => {
                let gen = Math.ceil(Math.random() * max) - 1;
                if(gen < 0){
                    rand(max);
                }
                else{
                    return gen;
                }
            }

            let set = [];
            this.queens.forEach(q => {
                set.push(rand(this.queens.length));
            });
            return set;
        },
        /**
         * @description clears table by replacing every element with 0
         * @param {Number} popValue value to replace
         * @returns {Array<Array<Numvber>>} table before beeing cleared
         */
        clearTable: function(popValue = 0){
            let back = this.table;
            this.update = true;
            for (let i = 0; i < back.length; i++) {
                for (let j = 0; j < back.length; j++) {
                    this.table[i][j] = popValue;
                }
            }
            this.update = false;
            return back;
        },
        /**
         * ! this is only for population iteration if you want to replace try use 'setQueens()' instead
         * @description place the queens in positions using the array index as row and the num as col
         */
        placeQueens: function(){
            // this.table = 
            // this.clearTable(this.pop);
            this.clearTable();
            // this.print();
            let set = this.newQueenSet();
            this.queens = set;
            this.update = true;
            // console.log(set);
            set.forEach((q, i) => {
                this.table[i][q] = 2;
            })
            this.update = false;
            // this.print();
            return set;
        },


        /**
         * @description execute mutation on array by swapping a random element with random value
         * @param {Array<Number>} queens array of queens to mutate
         * @param {Number} mutationRate mtation rate [0-1]
         * ! lower mutation rates means less mutations in the queens array
         * ? the mutation point is defined by rounding the multiplication of queens length by mutation rate
         */
        mutate: function(queens = this.queens, mutationRate = this.tuning.mutation){
            /**
             * [recursive/kinda]
             * @description generate a randum number from 0 to [max]
             * @param {Number} max biggest possible number
             */
            let rand = (max) => {
                let gen = Math.ceil(Math.random() * max) - 1;
                if(gen < 0){
                    rand(max);
                }
                else{
                    return gen;
                }
            }

            let randomPair = (l) => { return {pos: rand(l), mut: rand(l)} }
            
            let backQueens = queens;
            // console.log(`before mutation: ${backQueens}`);

            const toMutate = Math.round(queens.length * mutationRate);

            for(let i = 0; i < toMutate; i++){
                let pair = randomPair(queens.length);
                queens[pair.pos] = pair.mut;
            }
            
            // console.log(`after mutation: ${queens}`);

            // (re)set the queens positions on table
            this.setQueens(queens);

            return queens;
        },


        /**
         * @description execute crossover on arrays
         * @param {Object} parents Object of arrays with mother and father to excute crossover
         * @param {Number} co crossover rate [0-1]
         * @returns {Array<Array>} Array with generated childs
         * ! lower crossover rate means lower point of merge
         * ? the crossover point is defined by rounding the multiplication of parents length by crossover rate
         */
        crossOver: function(parents, co = this.tuning.crossover){
            let backParents = parents;
            let mother = parents.mother;
            let father = parents.father;

            // mother = [0,1,2,3];
            // father = [4,5,6,7];

            co = Math.round(mother.length * co);

            let child1 = [...mother.slice(0, co), ...father.slice(co, father.length)];
            let child2 = [...father.slice(0, co), ...mother.slice(co, mother.length)];
            

            return [child1, child2]
        },


        /**
         * @description converts a matrix to a array
         * @param {Array<Array>} matrix matrix to convert
         * @returns {Array} array from given matrix
         */
        matrixToArray: function(matrix = this.table){
            let arr = [];
            matrix.forEach(row => {
                arr.push(...row);
            });
            return arr;
        },

        /**
         * @description converts a array to matrix using the population as splitter/slicer limit
         * @param {Array} array array to convet
         * @param {Number} population used as split/slice limiter
         * @returns {Array<Array>} matrix from given array
         */
        arrayToMatrix: function(array, population = this.population){
            let mtx = [];
            let i = 0;
            while(i < array.length){
                mtx.push(array.slice(i, i+=population));
            }
            return mtx;
        },


        /**
         * @description find queens (number '2') positions in array  
         * @param {Array} table table in array format
         * @returns {Array<Number>} array of queens indexes
         */
        findQueens: function(table){
            let finded = [];
            table.filter((el, i) => {
                if(el == 2){
                    finded.push(i);
                }
            })
            return finded;
        },        


        /**
         * @description count the number of equal elements in diagonal from the 0 -> table length
         * @param {Array<Array>} table table to analyse
         * @param {Array} queens queens array
         * @param {Number} pop population size
         * @returns {Number} count of equal elements for ALL the queens under attack
         */
        diagPlus: function(table, queens, pop, popValue = 2){
            table = this.table;
            table = this.matrixToArray(table);
            queens = this.findQueens(table);
            attacking = 0;

            queens.forEach((el, j) => {
                let i = el;
                let atacc = 0;
                let c = 1;
                while(i < table.length){
                    
                    let nextEl = table[i+pop+c];
                    let lastEl = table[i-pop-c]; 

                    if(nextEl == 2){
                        if((table[i] == nextEl || lastEl == nextEl) || table[el] == nextEl){
                            atacc++;
                        }
                    }

                    nextEl = table[i+pop-c];
                    lastEl = table[i-pop+c];
                    if(nextEl == 2){
                        if((table[i] == nextEl || lastEl == nextEl) || table[el] == nextEl){
                            // atacc++;
                        }
                    }

                    nextEl = table[i+pop];
                    lastEl = table[i-pop]; 

                    if(nextEl == 2){
                        if((table[i] == nextEl || lastEl == nextEl) || table[el] == nextEl){
                            atacc++;
                        }
                    }

                    c++;
                    i+=pop;
                }
                c=0;
                attacking+=atacc;
            })
           
            return attacking;
        },

        /**
         * !backward
         * @description count the number of equal elements in diagonal from the table length -> 0
         * @param {Array<Array>} table table to analyse
         * @param {Array} queens queens array
         * @param {Number} pop population size
         * @returns {Number} count of equal elements for ALL the queens under attack
         */
        diagMin: function(table, queens, pop){
            table = this.table;
            table = this.matrixToArray(table);
            queens = this.findQueens(table);
            attacking = 0;

            queens = queens.reverse();

            queens.forEach((el, j) => {
                let i = el;
                let atacc = 0;
                let c = 1;
                while(i > 0){

                    let nextEl = table[i-pop-c];
                    let lastEl = table[i-pop-c]; 

                    if(nextEl == 2){
                        if((table[i] == nextEl || lastEl == nextEl) || table[el] == nextEl){
                            atacc++;
                        }
                    }

                    nextEl = table[i-pop];
                    lastEl = table[i+pop]; 

                    if(nextEl == 2){
                        if((table[i] == nextEl || lastEl == nextEl) || table[el] == nextEl){
                            atacc++;
                        }
                    }

                    c++;
                    i-=pop;
                }
                c=0;
                attacking+=atacc;
            })
            return attacking;
        },


        /**
         * @description search for equal element on hotizontal
         * @param {Array<Array>} table table to analyse
         * @returns count of equal elements for all the rows
         */
        hoorizon: function(table){
            let c = 0;
            table.forEach((row, i) => {
                row.filter(v => {
                    if(v == 2){
                        c++;
                    }
                });
                if(c <= 1){
                    c=0;
                }
            })
            return c;
        },

        /**
         * @description tranpose a matrix
         * @param {Array<Array>} table
         * @returns {Array<Array>} transposed table
         */
        traspose: function(table){
            let cols = [];

            for (let i = 0; i < table.length; i++) {
                table.forEach((row, j) => {
                    cols.push(table[j][i]);
                });
            }

            cols = this.arrayToMatrix(cols);
            return cols;
        },

        /**
         * @description search for equal values in same colum after transposing
         * @param {Array<Array>} table
         * @returns count of equal elements in same col for all columns 
         */
        spine: function(table){
            return this.hoorizon(this.traspose(table));
        },
       
        fitness: function(){
            let table = this.table;
            let pop = this.population;
            let queens = this.queens;
            let fitness = 0;
            fitness += this.diagPlus(table, queens, pop);
            fitness += this.diagMin(table, queens, pop);
            fitness += this.hoorizon(table);
            fitness += this.spine(table);

            return fitness/2;
        },
        
        init: function(it = this.tuning.maxIterations, minFit = this.tuning.minFit){
            this.running = true;
            if(it >= 1000){
                let conf = confirm('This action may cause high CPU usage');
                if(!conf){
                    return;
                }
            }
            let bests = {
                first: {
                    queens: [],
                    fitness: 0
                },
                second: {
                    queens: [],
                    fitness: 0
                }
            };
           

            let all = [];

            for(let i = 0; i < it; i++){
                let q = this.placeQueens();
                let fit = this.fitness();

                all.push({queens: q, fitness: fit});

                if(fit == 0){
                    break;
                }
            }

            let bestFitness = [];

            let setBests = (mn = minFit) => {
                all.filter((el, i) => {
                    if(el.fitness <= minFit){
                        bestFitness.push(el)
                        // console.log(el);
                    }
                })
            }
            setBests();

            let randomParent = (best) => {
                return best[this.rand(best.length)];
            }

            // bests.first = randomParent(bestFitness);
            // bests.second = randomParent(bestFitness);

            let crossed = this.crossOver( {
                mother: randomParent(bestFitness).queens, 
                father: randomParent(bestFitness).queens
            });

            // this.queens = this.mutate(crossed[0]);

            this.best.first = this.mutate(crossed[0]);
            this.best.second = this.mutate(crossed[1]);
            this.iteration++;
            this.setQueens(this.best.first);

            console.log("First gen done, now call 'app.iterate()'");

            this.running = false;
            return;
        },

        iterate: function(its = this.tuning.maxIterations, minFit = this.tuning.minFit){
            let fit;
            for(let i = 0; i<its; i++){
                this.running = true;
                let mother = this.best.first;
                let father = this.best.second;
                
                this.setQueens(this.best.first);
                fit = this.fitness();
                if(fit == 0 && (this.queens != [0,1,2,3] && this.queens != [3,2,1,0])){
                    break;
                }


                let crossed = this.crossOver({mother: mother, father: father});
    
                // this.queens = this.mutate(crossed[0]);
    
                this.best.first = this.mutate(crossed[0]);
                this.best.second = this.mutate(crossed[1]);
                this.iteration++;
            }
            this.running = false;
            return {iterations: this.iteration, fitness: fit};
        },

        /**
         * @description ser a given Array of queens to table
         * @param {Array<Number>} set array of queens to set
         * 
         * [2, 0, 3, 1] is a valid set!
         * [1, 3, 0, 2] is a valid set!
         */
        setQueens: function(set){
            this.update = true;
            this.clearTable();
            set.forEach((q, i) => {
                this.table[i][q] = 2;
            })
            this.update = false;
        }
    }



})


/**
 * @description load a valid set of queens in table
 * @param {Number} v set id to place
 */
validSet = (v = 0) => {
    let sets = [
        [2, 0, 3, 1],
        [1, 3, 0, 2]
    ];
    app.setQueens(sets[v]);
}



/**
 * !unused
 */
class verificators{
    constructor(queens) {
        this.queens = queens;
    }

    diagPlus(queens, population){
        queens.forEach((q, i) => {
            
        })
    }

}



// [0, 1, 2, 3]
// # 0 1 2 3
// 0 1 # # #
// 1 # 1 # #
// 2 # # 1 #
// 3 # # # 1

// [2, 0, 0, 0 | 0, 2, 0, 0 | 0, 0, 2, 0 | 0, 0, 0, 2]

/**
 * -> transform to array
 * if should not have any queen frm the current position +/- population+1 
 * 
 * like: Qp(0, 0) has a queen shoud not encounter other in the 'N' (e.g. in the Np(1,1) )
 * 
 * # 0 1 2 3
 * 0 Q # # #
 * 1 # N # #
 * 2 # # N #
 * 3 # # # N 
 */
