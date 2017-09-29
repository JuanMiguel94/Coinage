angular.module("main").controller("calculatorController",function($scope, calculator){
    $scope.pattern = new RegExp("^£?[0-9]+.?[0-9]*p?$");
    $scope.distributedAmount = [];
    $scope.convertClicked = amount => {        
        $scope.distributedAmount = calculator.getDistribution(amount);        
        console.log($scope.distributedAmount);        
    }
});