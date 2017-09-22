angular.module("App",['main']);

angular.module("main",[]);

angular.module("main").controller("mainController",function($scope){
    $scope.pattern = new RegExp("£?[0-9]+.?[0-9]*p?");
    
});