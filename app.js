angular.module("App",['main']);

angular.module("main",[]);

angular.module("main").controller("mainController",function($scope, calculator){
    $scope.pattern = new RegExp("^£?[0-9]+.?[0-9]*p?$");
    $scope.convertClicked = (amount) =>{      
        console.log(calculator.getDistribution(amount));
    }
});