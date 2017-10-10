angular.module("App").service('calculatorService', function(currencyInformation, currencyParser) {
    this.coinValues = currencyInformation.coinValues;
    this.decimalsToRoundTo = currencyInformation.decimalsToRoundTo;
    this.getDistribution = amount => {
        let amountInPences = currencyParser.parseAmountIntoPences(amount, currencyInformation.decimalsToRoundTo);        
        console.log('Amount un pences: ', amountInPences);
        return this.makeDistribution(amountInPences);
    };
    this.makeDistribution = amountInPences => {        
        let distribution = [];        
        let index = 0;
        while (amountInPences != 0 && index < this.coinValues.length) {            
            let tempCurrencyType = this.coinValues[index].currencyType;          
            let tempAmountInPences = parseInt(amountInPences/this.coinValues[index].value);
            distribution.push({"currencyType": tempCurrencyType,
                               "amountInPences": tempAmountInPences});
            amountInPences = amountInPences % this.coinValues[index].value;
            index++;
        }
        return distribution;
    };
    this.round = (decimals, decimalsToRoundTo) => {
        if (this.decimalsMatchLength(decimals, decimalsToRoundTo)) {
            return decimals;        
        } else {
            let increment = this.hasToRoundUp(decimals)? 1 : 0;
            return this.round(parseInt(decimals/10) + increment, decimalsToRoundTo);
        }
    };
    this.hasToRoundUp = decimals => decimals % 10 >= 5;
    this.decimalsMatchLength = (number, length) => number <= 10 ** length - 1;
});