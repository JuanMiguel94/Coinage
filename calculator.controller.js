angular.module("main").controller("calculatorController",function($scope, calculatorService){
    $scope.pattern = /^£?[0-9]+\.?[0-9]*p?$/;
    $scope.distributedAmount = [];
    $scope.convertClicked = amount => {
    
        $scope.distributedAmount = calculatorService.getDistribution(amount);
        //console.log($scope.recur($scope.str, 2))
    }
    $scope.str = '£00000123.452p';
    $scope.recur = (str, digitsToRoundTo, total = 0) => {
        let headIndex = str[0] == '£'? 1 : 0;
        let endIndex = str[str.length - 1] == 'p' ? str.length - 1 : str.length;
        let roundIncrement = 0;
        if (str[0] == '.') {
            headIndex = 1;
            if (str.length > digitsToRoundTo + 1) {
                endIndex = digitsToRoundTo  + 1;
                console.log("STR",str);
                console.log("INDEX",digitsToRoundTo  + 1)
                if (parseInt(str[digitsToRoundTo  + 1]) >= 5) roundIncrement = 1/(Math.pow(10, digitsToRoundTo-1));
            }
        }
        let isFinished = str == '' || str == 'p';
        if (isFinished) {
            return total;
        } else {
            let newTotal = total * 10 + parseInt(str[headIndex]) + roundIncrement;
            let inputLeft = str.slice(headIndex + 1, endIndex);     
            return $scope.recur(inputLeft, digitsToRoundTo, newTotal);
        }
    };
});