angular.module("main").controller("calculatorController",function($scope, calculatorService){
    $scope.pattern = new RegExp("^£?[0-9]+.?[0-9]*p?$");
    $scope.distributedAmount = [];
    $scope.convertClicked = amount => {        
        $scope.distributedAmount = calculatorService.getDistribution(amount);       
    }
});