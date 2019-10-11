# n-queens problem

### N queens problem implementation using Genetic Algorithm (or something like it)

Working best on 4x4 tables

Also made using [Vue.js](<https://vuejs.org>)


## basic usage

* **_OPEN BROWSER CONSOLE_**
* first generation
* minimal fitness is used to select best generated queen sets
* call app.init(iterations, minimal_fitness)

```JavaScript
app.init(100, 4);
```

**A message to call iterate will be showed**

Making new generations

* call app.iterate(iterations, minimal_fitness)
* the iteration can be a larger number
* will be finished if a valid set is finded (fitness = 0)

```JavaScript
app.iterate(100000, 4)
```

## tunning and changes

The following parameters can be changed:

* validSetButton -> show button to place a valid set (also can call 'validSet(0 or 1)')
* dark           -> dark/light mode
* population     -> population size (how many queens, rows and cols will have)
* mutation       -> mutation rate  (0-1), change how many changes the queen array will have
* crossover      -> crossover rate (0-1), change where the parents arrays will be splitted/spliced
* minFit         -> (0-10) minimal fitness to selection after crossover
* maxIterations  -> (0-?)  max iterations to aply in algorithm

```JavaScript
data:{
    validSetButton: false,
    dark: true,
    population: 4,
    tuning:{
        mutation: 0.5,
        crossover: 0.3,
        minFit: 4,
        maxIterations: 100
    },
}

```

## Known issues

* sometimes the generations will be finished with a sequence on diagonal ( / )
* 8x8 or higher populations will take longer time to solve and has at least 1 queen matching

## license

* MIT

## Changelog

### 2019/10/09

* Added themes (dark/ligh)
* General functions
* generation, mutation and crossover

### 2019/10/10

* Verifyers and general things
* iterators and finish
* finished first version

### 2019/10/11

* added running flag
* added inputs in html
* changelog
* minor fixes
* fixed maxIterations and mininal fitness in wrong place
