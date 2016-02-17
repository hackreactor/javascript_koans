describe("About Expects", function() {

  it("should expect true", function() {
    expect(true).toBeTruthy();
  });


  it("should expect equality", function () { 
	  var expectedValue = 2;
	  var actualValue = 1 + 1;
	
	  expect(actualValue === expectedValue).toBeTruthy();
  });  

  it("should assert equality a better way", function () { 
	  var expectedValue = 2;
	  var actualValue = 1 + 1;
	
	  expect(actualValue).toEqual(expectedValue);
  });

  it("should assert equality with ===", function () { 
	  var expectedValue = "2";
	  var actualValue = (1 + 1).toString();
	
	  expect(actualValue).toBe(expectedValue);
  });  

  it("should have filled in values", function () {
	  expect(1 + 1).toEqual(2);
  });
});
