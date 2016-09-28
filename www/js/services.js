angular.module("services", [])

.factory("returnedRecipes", [function() {
  this.returnedRecipes;

  var setReturned = function(obj) {
    this.returnedRecipes = obj;
  }

  return { returnedRecipes: this.returnedRecipes, setReturned: setReturned };
}])
