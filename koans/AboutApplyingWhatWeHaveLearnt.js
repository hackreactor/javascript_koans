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

      var productsICanEat = _(products).filter(function (product) {
        return _(product.ingredients).all(function (ingredient) {
          return ingredient !== "mushrooms";
        }) && !product.containsNuts;
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

    var sum = _.range(1, 1000)
      .filter(function (i) {
        return i % 3 === 0 || i % 5 === 0;
      })
      .reduce(function (memo, num) {
        return memo + num;
      }, 0);

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = {};

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = {};

    _(products)
      .chain()
      .map(function (product) {
        return product.ingredients;
      })
      .flatten()
      .reduce(function (memo, ingredient) {
        ingredientCount[ingredient] = (ingredientCount[ingredient] || 0) + 1;
        return memo += (ingredient === 'mushrooms' ? 1 : 0); // Not required, just gives exact mushroom count
      }, 0)
      .value();

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */

  it("should find the largest prime factor of a composite number", function () {
    var primeFactor = function (number) {
      var primeNumber = function (number) {
        for (var i = 2; i <= Math.floor(Math.pow(number, 0.5)); i++) {
          if (number % i === 0) {
            return false;
          }
        }

        return true;
      };

      var primeFactors = [];

      for (var i = 2; i <= Math.floor(Math.pow(number, 0.5)); i++) {
        if (number % i === 0) {
          if (primeNumber(number / i)) { primeFactors.push(number / i); }
          if (primeNumber(i))          { primeFactors.push(i); }
        }
      }

      return primeFactors.length ? _.max(primeFactors) : false;
    };

    expect(primeFactor(13)).toBe(false);
    expect(primeFactor(129)).toBe(43);
    expect(primeFactor(140)).toBe(7);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {

  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {


  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {

  });

  it("should find the 10001st prime", function () {

  });

});
