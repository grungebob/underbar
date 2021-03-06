(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n === undefined){
      return array[array.length - 1];
    } else if (n > array.length) {
      return array;
    } else {
      
      var remain = array.length - n;
      return array.slice(remain, array.length);
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (collection.constructor === Object){
      for (var key in collection){
        collection[key] = iterator(collection[key], key, collection);
      }
    } else if (collection.constructor === Array) {
      var newArr  = [];
      for (var i = 0; i < collection.length; i ++){
        newArr.push(iterator(collection[i], i, collection)); 
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var newArr = [];
    for (var i = 0; i < collection.length; i++){
      if (test(collection[i])){
        newArr.push(collection[i]);
      } 
    }
    return newArr;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it

    var oppArray = _.filter(collection, test);
    var finalArray = [];
      for (var i = 0; i < collection.length; i++){
        var exists = false;
        for (var x = 0; x< oppArray.length; x++){
          if (oppArray[x] === collection[i]){
            exists = true;
          }
        }
        if (exists === false){
          finalArray.push(collection[i]);
        }
      }
    return finalArray;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {
    var newArray = [];
    newArray.push(array[0]);
    
    // Finding only unique values:
    for (var i = 1; i < array.length; i++){
      var noMatches = true;
      for (var z = 0; z < newArray.length; z++){
        if (array[i] === newArray[z]){
          noMatches = false;
        }
      }
    if (noMatches === true){
        newArray.push(array[i]);
      }
    }
  if (isSorted === true){
    // Array of just true false conditions
    var trueFalse = [];
    for (var a = 0; a < newArray.length; a++){
     trueFalse.push(iterator(newArray[a]));
    }
    
    //New initial arrays to test unique conditions
    var uniTF = [];
    var newerArray = [];
    newerArray.push(newArray[0]);
    
    uniTF.push(trueFalse[0]);
    
    //Testing return condition of unique cases:
    
    for (var x = 1; x < trueFalse.length; x++){
      var noMatchTwo = true;
      for (var s = 0; s < uniTF.length; s++){
        if (trueFalse[x] === uniTF[s]){
          noMatchTwo = false;
        }
      }
    if (noMatchTwo === true){
        uniTF.push(trueFalse[s]);
        newerArray.push(newArray[x]);
      }
    }
    return newerArray;
  } else{
    return newArray;
  }
};


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var newArray = [];
    for (var i = 0; i < collection.length; i++){
      newArray.push(iterator(collection[i]));
    }
    return newArray;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    if (accumulator === undefined){
      for (var i = 0; i < collection.length; i++){
          var result = iterator(accumulator, collection[i]);
          if (result !== undefined && !isNaN(result)){

          //Found a starting accumulator:
            for(var z = i + 1; z < collection.length; z++){
              var iteration = iterator(result, collection[z]);

              if (iteration !== undefined){
              result = iteration;
              }
            } 
            } else if (result === undefined || isNaN(result)){
              // console.log("Iterator not found: ")
              
              result = collection[i];
              for(var z = i + 1; z < collection.length; z++){
              var iteration = iterator(result, collection[z]);
              // console.log('Iteration: ');
              // console.log(iteration);
              if (iteration !== undefined){
              result = iteration;
              }
            } 
          }
           return result;
          }
    } else {
        var result = accumulator;
        // Each item in array:
          for(var i = 0; i < collection.length; i++){
            var iteration = iterator(result, collection[i]);
            if (iteration !== undefined){
            result = iteration;
            }
          }     
      return result;
      }
    };


  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    if (collection.constructor === Object){
      var newCol = [];
      for (var key in collection){
        newCol.push(collection[key]);
      }
      collection = newCol;
    }
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      for (var key in collection){
        if (collection[key] === target){
          return true;
        }
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    if (iterator === undefined){
      iterator = _.identity;
      }

    if (collection.constructor === Object){
      var newCol = [];
      for (var key in collection){
        newCol.push(collection[key]);
      }
      collection = newCol;
    }

    if (collection.length === 0){
       return true;
      } else{ 
         var boo = _.reduce(collection, function(accumulator, item) {
          //  console.log('Gets to reducer - iterator of item: ');
          //  console.log(iterator(item));
              if (Boolean(iterator(item)) === false){
          //      console.log(accumulator);
                return false;
              }

              if (Boolean(iterator(item)) === true){
                accumulator = true;
              }
            //  return accumulator;
      }, true);
         console.log(boo);
        return Boolean(boo);
    }
  };


  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
      if (iterator === undefined){
      iterator = _.identity;
      }
      if (collection.length === 0){
        return false;
      } else if (_.every(collection, iterator)){
        return true;
      } else if(Boolean(_.every(collection, iterator)) === false){        
        var newCol = _.filter(collection, iterator); 
//        console.log('Filtered: ');
//        console.log(newCol);
        if (newCol.length === 0){
          return false;
        } else { 
        return _.every(newCol, iterator);
        }
      } else {
        return true;
      }
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    for (var i = 1; i < arguments.length+1; i++){
      for (var key in arguments[i]){
        arguments[0][key] = arguments[i][key];
      }
    }
    return arguments[0];
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
      for (var i = 1; i < arguments.length+1; i++){
            for (var key in arguments[i]){
              if (!arguments[0].hasOwnProperty(key))
              arguments[0][key] = arguments[i][key];
            }
          }
          return arguments[0];

  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.

  // if function and same argument - should be returned but with no running of the function, but rather returning the stored result

  _.memoize = function(func) {
    


   var storage = {
   }
//   var currentArgs = arguments;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.

    

    // WHAT GOES IN OR WHAT GOES OUT OF HERE IS IMPORTANT
    // ...args -taking anything past here and put it into a array "args"
    // if args1, args2, ... args
    // all arguments after 1 & 2, would be in a single array "args"

    return function(...args) {
      // Object: 
      var stringArgs = JSON.stringify(args);
      console.log(stringArgs);
 
      if (storage.hasOwnProperty(stringArgs)){
          return storage[stringArgs];
        } else {
          storage[stringArgs] = func.apply(this, arguments);
          console.log(storage[stringArgs]);
          return storage[stringArgs];
        }
    };
  };
      
        

        // individual line: storage[JSON.stringify(args)] = result;


        // Running conditionals on storage
        // CHecking for if strigified arguments within the function match one of they keys in storage
        // if yes, return existing result
        // if no, run this.apply on the function and item/current arguments
        // update storage before returning





        //outer portion of the function - the function itself 

        //: [[1, 2], [3, 4], [[1,2], [7, 8]]],
        // result: [3, 7, 18]
        //Check for congruent arrays - Have to look at index of current arguments to see if they result
        // Array cannot be key, but getting closer
        // Getting arrays as object keys
        // how to get arguments to be reliable keys
        // normally strings
        // the function could return anything; results not bettern than using arguments

        // arguments: results

        

/*
      var eqArgs = false;
      
      var equalArguments = function(args){
            if (args.constructor === Object){
              for (var key in args){
                if (args[key] === arguments[key][key]){      
                  return true;
                }
              }
            } else if (args.length !== arguments.length){
             return false;
           } else {
             for (var i = 0; i < args.length; i++){
               if (args[i] !== arguments[i]){
                 return false;
               }
             } else{
             return true;
           }
           }
         };

      if (!alreadyCalled){
        currentArgs = arguments;
      } else {
        eqArgs = equalArguments(currentArgs);
      }        
         //var currentArgs = arguments;
          
          if (alreadyCalled && eqArgs){
             console.log('All congruent');
     //       result = func.apply(this, arguments);
             return result;
          } else if (alreadyCalled && !eqArgs){
              console.log('Its been called before');
              result = func.apply(this, arguments);
              return result;
            } else if (!alreadyCalled || !eqArgs) {
              // TIP: .apply(this, arguments) is the standard way to pass on all of the
              // infromation from one function call to another.
              result = func.apply(this, arguments);
              alreadyCalled = true;
              currentArgs = arguments;
              return result;
            }

      */   
  

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait, ...args) {
        
        // var fakeFunk = function(){};
      return setTimeout(function(){
                func(...args);
              }, wait);

/*
        return setTimeout(setTimeout(function(){
          func(...args);
        }, wait)), wait;
*/
    }; 



  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var newArr = [];
    var shuffledIndex = [];
    

    while (shuffledIndex.length !== array.length){
      var temp = Math.floor(Math.random() * (array.length + 1));
      if (!shuffledIndex.includes(temp)){
        shuffledIndex.push(temp);
      }
    }
    for (var i = 0; i < shuffledIndex.length; i++){
      newArr[shuffledIndex[i]] = array[i];
    }
    return newArr;
    /*
    My old code:
    function inArray(number, arr){
      for (var i = 0; i < arr.length; i ++){
          if (arr[i] === number){
            return true;
          }
        }
        return false;
    }
    for (var i = array.length; i > 0; i--){
      var index = Math.floor(Math.random() * i);
      console.log(index);
      var exist = inArray(array[index], newArr);
      if (exist === true){
        index = Math.floor(Math.random() * i);
        console.log(array[index]);
        console.log(exist);
        newArr.push(array[index]);
      }
      if (exist === false){
        newArr.push(array[index]);
      }
  };
  return newArr;
  */
}


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
