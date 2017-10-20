describe('currencyInformation', function () {
    
    beforeEach(module('App'));

    var currencyInformation;
   
    beforeEach(inject(function(_currencyInformation_){
        currencyInformation = _currencyInformation_;
    }));

    describe('sortCoinValues', function () {
        it('returns an object', function () {
            currencyInformation.coinValues = [ {currencyType: "two sterlin", value: 200},
            {currencyType: "fifty pences", value: 50},
            {currencyType: "one sterlin", value: 100},
            {currencyType: "two pences", value: 2},
            {currencyType: "one pence", value: 1},
            {currencyType: "twenty pences", value: 20}];

            sortedCoinValues = [ {currencyType: "two sterlin", value: 200},
            {currencyType: "one sterlin", value: 100},
            {currencyType: "fifty pences", value: 50},
            {currencyType: "twenty pences", value: 20},
            {currencyType: "two pences", value: 2},
            {currencyType: "one pence", value: 1}]

            currencyInformation.sortCoinValues();
            expect(currencyInformation.coinValues).toEqual(sortedCoinValues);
        });
    });
});