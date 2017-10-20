describe('calculatorController', function () {
    
        beforeEach(module('App'));
    
        var $controller,  calculator;
    
        beforeEach(inject(function(_$controller_, _calculatorService_){
            calculatorService = _calculatorService_;
        $controller = _$controller_;
        }));
    
        describe('convertClicked', function () {
            it('sets "distributedAmount" value', function () {
                var $scope = {};                
                var controller = $controller('calculatorController', { $scope: $scope, calculatorService: calculatorService });
                $scope.distributedAmount = 'the same';
                $scope.convertClicked('123');
                expect($scope.distributedAmount).not.toBe('the same');
            });	
        });
    });