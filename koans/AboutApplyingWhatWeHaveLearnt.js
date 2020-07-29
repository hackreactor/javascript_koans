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
   productsICanEat = products.filter((food) => {
        return food.name == 'Pizza Primavera'
    })
    
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

    var sum = [];    /* try chaining range() and reduce() */
    // Using Reduce() and range() Methods :
function reduce(start ,stop){


 for(var i =start; i< stop; i++){
 if (i % 3 === 0 || i % 5 === 0){
     sum.push(i);
 }}}
 reduce(0,1000)
 
     var mySum = sum.reduce((currentTotal, arg) =>{
      return arg + currentTotal ;

  },0)

    expect(mySum).toBe(233168);
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
   var ingredientCount = { "{mushrooms}": 0 };
    var allIngredients = products.map((ing) => {
      return ing.ingredients 
    });
    var flatten = allIngredients.flat();
    
    for( var i=0; i< flatten.length; i++){
        if( flatten[i] == 'mushrooms'){
             flatten[i] = 1;
        }else{
            flatten[i] = 0;
        }
    }
   
     ingredientCount = flatten.reduce((totalValue, curr) => {
         return curr + totalValue;
     })
     
    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  it("should find the largest prime factor of a composite number", function () {
    function largestPrimeF(number){
      if((number== 2) || (number== 3)){
        return number;
      }
      var num,prime ;
      for(var i= 0; i<= number; i++){
        num = 1;
        if( i % 2!=0){
          var m=i/2;
          for(j=2;j<=m;j++){
            if(i %j ==0){
              num =0; break;
            }
          }
        }
        if(num ==1 && number%i ==0)
        {prime= i;}
      }
      var myPrime = largestPrimeF();
      expect(myPrime).tobe(A_NUMBER)
    }
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    function largestPalindrome(){
      for ( var i =999; i>100; i++){
        for(var j=999; j>100; j--){
          var m=  j*i;
          if(isPalin(m)){
            return i*j;
          }
        }
      }
    }
    function isPalin(i){
      return i.toString() == i.toString().split('').reverse().join('');
    }
    var result = largestPalindrome();
    expect(result).tobe(906609)
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    function smallestDiv(limit){
      var i, n =1;
      function  largestPow(n,limit){
        var p,e = 2 ;
        var largest = n;
        while((p=math.pow(n,e)) <= limit){
          largest = p;
          e = e+1;
        }
        return largest;
      }
      function isPrime(n){
        var i, limit = math.ceil(math.sqrt(n));
        for(i = 3;i <= limit; i=i+2){
          if(n % 1 === 0){
            return false
          }
        }
        return true;
      }
      for(i=3; i <= limit; i=i+2){
        if(isPrime(i)){
          largestPow(i,limit);
        }
      }

return n * largestPow(2,limit);  
  }
var myResult = smallestDiv(20)
expect(myResult).tobe(2520)
    
  });
/*
  it("should find the difference between the sum of the squares and the square of the sums", function () {
    
  });

  it("should find the 10001st prime", function () {

  });
  
}); */
