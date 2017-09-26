angular.module("App").service('businessInformation', function() {
    this.decimalsToRoundTo = 2;
    this.currencieType = {
        TWO_STERLINS: "two sterlin",
        ONE_STERLIN: "one sterlin",
        FIFTY_PENCES: "fifty pences",
        TWENTY_PENCES: "twenty pences",
        TWO_PENCES: "two pences",
        ONE_PENCE: "one pence"
    };
    this.coinValues = [ {currencieType: this.currencieType.TWO_STERLINS, value: 200},
                        {currencieType: this.currencieType.ONE_STERLIN, value: 100},
                        {currencieType: this.currencieType.FIFTY_PENCES, value: 50},
                        {currencieType: this.currencieType.TWENTY_PENCES, value: 20},
                        {currencieType: this.currencieType.TWO_PENCES, value: 2},
                        {currencieType: this.currencieType.ONE_PENCE, value: 1}];
});