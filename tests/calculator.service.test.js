describe('calculatorService', function () {

    beforeEach(module('App'));

    var calculatorService;

    beforeEach(inject(function(_calculatorService_){
        calculatorService = _calculatorService_;
        input = '4';
    }));

    describe('getDistribution', function () {
        it('returns an object', function () {            
            expect(calculatorService.getDistribution(input)).not.toBeUndefined();
        });
    });
    describe('parseAmountIntoPences', function () {
        it('returns an object', function () {            
            expect(calculatorService.getDistribution(input)).not.toBeUndefined();
        });
    });
    describe('makeDistribution', function () {
        it('distributes a value in pences into several currencies', function () {            
            expect(calculatorService.makeDistribution(365)).toEqual(
            [{currencyType: "two sterlin", amountInPences: 1},
            {currencyType: "one sterlin", amountInPences: 1},
            {currencyType: "fifty pences", amountInPences: 1},
            {currencyType: "twenty pences", amountInPences: 0},
            {currencyType: "two pences", amountInPences: 7},
            {currencyType: "one pence", amountInPences: 1}]);
        });
    });
    describe('round', function () {
        it('rounds decimals to a given number of digits', function () {            
            expect(calculatorService.round(235, 2)).toEqual(24);
        });
    });
    describe('hasToRoundUp', function () {
        it('is true if the given number should be rount upwards', function () {            
            expect(calculatorService.hasToRoundUp(255)).toEqual(true);
        });
    });
    describe('decimalsMatchLength', function () {
        it('is true if the number\'s lenght is less or equals to the given lenght', function () {            
            expect(calculatorService.decimalsMatchLength(254, 3)).toEqual(true);
        });
    });
});