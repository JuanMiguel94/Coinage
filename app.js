angular.module("App",['main']);

angular.module("main",[]);

angular.module("main").controller("mainController",function($scope, calculator){
$scope.pattern = new RegExp("£?\\d+.?\\d*p?");
    $scope.convertClicked = (amount) =>{      
        console.log(calculator.getDistribution(amount));
    }
});