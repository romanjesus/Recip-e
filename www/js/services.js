angular.module("services", [])
.factory("checkedIngredients", [function() {
  return "CHECKED";
}])
.factory("listOfIngredients", [function() {
  var list = "LIST";

  this.getIngredients = function(obj) {
    list = obj;
  }

  return list;
}])


