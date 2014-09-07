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
	  var isMushAndNutFree = function(pizza) {
		return pizza.ingredients.every(function(v, i, a) { return v != "mushrooms"; }) && !pizza.containsNuts;
	  };

	  productsICanEat = products.filter(isMushAndNutFree);	
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
    var sum = _.range(1000).reduce(function(pv, cv) { return (cv % 3 === 0 || cv % 5 === 0) ? pv + cv : pv ;} );

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

    /* chain() together map(), flatten() and reduce() */
	_(products).chain()
	.map(function(product) { return product.ingredients; })
	.flatten()
	.reduce(function(pv, cv) { 
		!!pv[cv] ? pv[cv]++ : pv[cv] = 1; 
		return pv; 
	}, ingredientCount);
	
	expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  it("should find the largest prime factor of a composite number", function () {
	function isPrime(num) { 
  
		if (num < 2) return false;
		for (var i = 2; i <= Math.sqrt(num); i++) {
			if ((num / i) % 1 == 0) return false;
		}
		return true;
         
	}
	
	function largestPrimeFactor(num) {
		var lPF = 0;
		for (var i = 2; i < num; i++) {
			if (isPrime(i) && ((num / i) % 1 === 0)) lPF = i;
		}
		return lPF;
	}
	
	expect(largestPrimeFactor(26)).toBe(13);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    var largestNumPal = -1;
	function isPalindrome(str) {
		if (str.split("").reverse().join("") === str) return true;
		return false;
	}
	for (var i = 100; i < 1000; i++) {
		for (var j = 100; j < 1000; j++) {
			var product = i * j;
			if (isPalindrome(product.toString()) && product > largestNumPal) largestNumPal = product;
		}
	}
	expect(906609).toBe(largestNumPal);
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
	function isPrime(num) { 
		if (num < 2) return false;
		for (var i = 2; i <= Math.sqrt(num); i++) {
			if ((num / i) % 1 == 0) return false;
		}
		return true;
	}
	function getMinProductOfRange(range) {
		var product = 1;
		var primes = _.range(21).filter(isPrime);
		var prime_powers = Array.apply(null, new Array(primes.length)).map(Number.prototype.valueOf, 0);
		for (var i = range; i > 0; i--) {
			for (var j = 0; j < primes.length; j++) {
				var count = 0, iVal = i;
				while ((iVal / primes[j]) % 1 === 0) {
					count++;
					iVal /= primes[j];
				}
				if (prime_powers[j] < count) prime_powers[j] = count;
			}
		}
		for (var i = 0; i < primes.length; i++) {
			product *= Math.pow(primes[i], prime_powers[i]);
			console.log(product);
		}

		return product;
	}
	
    expect(232792560).toBe(getMinProductOfRange(20));
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    function diffSS(num1, num2) {
		var sumOfS = Math.pow(num1, 2) + Math.pow(num2, 2), squareOfS = Math.pow(num1 + num2, 2);
		return sumOfS - squareOfS;
	}
	
	expect(diffSS(4, 5)).toBe(-40);
  });

  it("should find the 10001st prime", function () {
	function isPrime(num) { 
		if (num < 2) return false;
		for (var i = 2; i <= Math.sqrt(num); i++) {
			if ((num / i) % 1 == 0) return false;
		}
		return true;
	}
	var count = 0, curr = 0;
	while (count < 10001) if (isPrime(++curr)) count++;
	expect(curr).toBe(104743);
  });
  
});
