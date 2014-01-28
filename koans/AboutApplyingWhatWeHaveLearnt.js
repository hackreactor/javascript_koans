var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */

      productsICanEat = products.filter(function(product){
        return !product.containsNuts && _(product.ingredients).all(function(ingredient){return ingredient != "mushrooms"});
      });


      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    
    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    var sum = _(_.range(1000)).chain()
                              .filter(function(el){
                                return el % 3 === 0 || el % 5 === 0;
                              })
                              .reduce(function(sum, el){
                                return sum + el;
                              }, 0).value();

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    _(products).chain()
                .map(function(product){
                return product.ingredients;
                })
                .flatten()
                .reduce(function(count, ingredient){
                 !!count[ingredient] ? count[ingredient] += 1 : count[ingredient] = 1;
                 return count;
                },ingredientCount);

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  it("should find the largest prime factor of a composite number", function () {
    
    function isPrime(num){
      var noOfFactors = 2;
      num = parseInt(num);
      for(var i = 2; i < num; i++){
        if(num % i == 0){
          noOfFactors++;
        }
      }

      return (noOfFactors === 2);
    }

    function largestPrimeFactorOf(x){
      var composite = parseInt(x);

      var largestPrime = 1;

      for(var i = 2; i < composite; i++){
        if(composite % i === 0 && isPrime(i)){
          largestPrime = i;
        }
      }

      return largestPrime;

    }

    expect(largestPrimeFactorOf(42)).toBe(7);
  });

  /*
  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    
  });
  */

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
      
      //a simple function to check if a number is Prime or not.
      function isPrime(num){
        num = Math.floor( Math.abs(num) );
        if(num < 2){
          return false;
        }

        var noOfFactors = 2;
        num = parseInt(num);
        for(var i = 2; i < num; i++){
          if(num % i == 0){
            noOfFactors++;
          }
        }

        return (noOfFactors === 2);
      }

      function largestPrimeFactorOf(x){
        var composite = parseInt(x);

        var largestPrime = 1;

        for(var i = 2; i < composite; i++){
          if(composite % i === 0 && isPrime(i)){
            largestPrime = i;
          }
        }

        return largestPrime;

      }

      //a function that should return an array of prime factors of a number
      
      function factorize(num){
        num = parseInt(num);

        if(isPrime(num) || num < 2){
          return [num];
        } else {

          return _([
            largestPrimeFactorOf(num),
            factorize(num/largestPrimeFactorOf(num))
          ]).flatten();

        }

      }

      var arr = _(_.range(20)).map(function(num){return factorize(num+1);});

      //var lcm = _(arr).reduce(function(product, ){})
      
      // This function leaves extra 1's in place as those don't really matter.
      function unionWithRepeats(arr1, arr2){
        var arr = [];

        arr1.forEach(function(num, index){
          arr1[index] = 1;
          if(arr2.indexOf(num) !== -1){
            arr2[arr2.indexOf(num)] = 1;
          }
          arr.push(num);
        });

        var result = _([
          arr,
          arr2
        ]).flatten();

        return _(result).filter(function(el){ return el !== 1; });
      }

      //array of the union of prime factors. The elements of this multiplied will give us the LCM.
      var prod = _.reduce(arr, unionWithRepeats, [1, 1]);

      var lcm = _.reduce(prod, function(a,b){ return a * b; }, 1);

      expect( lcm ).toBe(232792560);
    
  });

  
  it("should find the difference between the sum of the squares and the square of the sums", function () {
    
    function square(num){
      return num * num;
    }    

    function squareDifference(a, b){
      return Math.abs(
        ( square(a) + square(b) ) -
        square(a+b)
      );
    }

    expect(squareDifference(3, 2)).toBe(12);

  });

  //This works, but it's too slow to be of any use.
  it("should find the 10001st prime", function () {

    function isPrime(num){
      num = Math.floor( Math.abs(num) );
      if(num < 2){
        return false;
      }

      var noOfFactors = 2;
      num = parseInt(num);
      for(var i = 2; i < num; i++){
        if(num % i == 0){
          noOfFactors++;
        }
      }

      return (noOfFactors === 2);
    }

    var count = 0;
    var result;

    for(var i = 2; true; i++){
      if(isPrime(i)){
        count++;
      }
      if(count >= 10001){
        result = i;
        break;
      }
    }

    expect(result).toBe(104743);

  });
  
});
