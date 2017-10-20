angular.module("App").service('currencyInformation', function() {
    this.decimalsToRoundTo = 2;
    this.coinValues = [ {currencyType: "two sterlin", value: 200},
                        {currencyType: "one sterlin", value: 100},
                        {currencyType: "fifty pences", value: 50},
                        {currencyType: "twenty pences", value: 20},
                        {currencyType: "two pences", value: 2},
                        {currencyType: "one pence", value: 1}];
    this.sortCoinValues = () => {
        this.coinValues.sort((a, b) => {
            return b.value - a.value;
        });
    }
});