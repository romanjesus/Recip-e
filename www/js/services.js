angular.module("services", [])
.factory("checkedIngredients", [function() {
  return "CHECKED";
}])
.factory("listOfIngredients", [function() {
  this.list;

  var getIngredients = function(obj) {
    this.list = obj;
  }

  return { list: this.list, getIngredients: getIngredients }
}])


