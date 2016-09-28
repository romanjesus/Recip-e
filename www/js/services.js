angular.module("services", [])

.factory("returnedRecipes", [function() {
  this.returnedRecipes;

  var setReturned = function(obj) {
    this.returnedRecipes = obj;
  }

  return { returnedRecipes: this.returnedRecipes, setReturned: setReturned };
}])

.factory("listOfIngredients", [function() {
  this.list;

  var setIngredients = function(obj) {
    this.list = obj;
  }

  return { list: this.list, setIngredients: setIngredients }
}])


