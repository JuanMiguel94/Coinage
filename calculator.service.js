angular.module("App").service('calculator', function() {
    this.CoinValue = {
        TWO_STERLINS: 200,
        ONE_STERLIN: 100,
        FIFTY_PENCES: 50,
        TWENTY_PENCES: 20,
        TWO_PENCES: 2,
        PENCE: 1
    }
    this.getDistribution = amount => {
        let amountInPences = this.getAmountInPences(amount);
        return this.makeDistribution(amountInPences);
    }
    this.getAmountInPences = (amount) => {
        if(this.onlyPences(amount)){
            let pences = this.getPences(amount);
            return pences;
        }
        else{
            let hundreds = this.getHundreds(amount);
            let pences = this.getPences(amount);            
            let roundPences = this.roundDecimals(pences, 2);                        
            return parseInt(hundreds) + parseInt(roundPences);
        }
    }
    this.getHundreds = (amount) => {
        let sterlinIndex = amount.indexOf('£');
        let dotIndex = amount.indexOf('.');        
        let startOfSlice = sterlinIndex != -1 ? sterlinIndex + 1 : 0;
        let endOfSlice = dotIndex != -1 ? dotIndex : amount.length;
        let slice = amount.slice(startOfSlice, endOfSlice);
        return parseInt(slice) * 100;
    }
    this.getPences = (amount) => {
        let dotIndex = amount.indexOf('.');
        let penceSymbolIndex = amount.indexOf('p');
        let startOfSlice = dotIndex != -1 ? dotIndex + 1 : 0;
        let endOfSlice = penceSymbolIndex != -1 ? amount.length - 1 : amount.length;
        let slice = amount.slice(startOfSlice, endOfSlice);
        return slice ? parseInt(slice) : 0;
        
    }
    this.onlyPences = (amount) => {
        return amount.indexOf('£') == -1 && amount.indexOf('.') == -1 ? true : false;
    }
    this.roundDecimals = (decimals, decimalsLength) => {
        if(this.numberMatchLength(decimals, decimalsLength)){
            return decimals;        
        }
        else{
            let increment = decimals % 10 >= 5 ? 1 : 0;
            return this.roundDecimals(parseInt(decimals/10) + increment, decimalsLength);
        }
    }
    this.numberMatchLength = (number, length) => {
        return number <= 10 ** length - 1;
    }
    this.makeDistribution = (amountInPences) => {
        let distribution = {
            twoSterlins: 0,
            oneSterlin: 0,
            fiftyPences: 0,
            twentyPences: 0,
            twoPences: 0,
            pence: 0
        };

        distribution.twoSterlins =  parseInt(amountInPences/this.CoinValue.TWO_STERLINS);
        amountInPences = amountInPences % this.CoinValue.TWO_STERLINS;

        distribution.oneSterlin = parseInt(amountInPences/this.CoinValue.ONE_STERLIN);
        amountInPences = amountInPences % this.CoinValue.ONE_STERLIN;

        distribution.fiftyPences = parseInt(amountInPences/this.CoinValue.FIFTY_PENCES);
        amountInPences = amountInPences % this.CoinValue.FIFTY_PENCES;

        distribution.twentyPences = parseInt(amountInPences/this.CoinValue.TWENTY_PENCES);
        amountInPences = amountInPences % this.CoinValue.TWENTY_PENCES;

        distribution.twoPences = parseInt(amountInPences/this.CoinValue.TWO_PENCES)
        amountInPences = amountInPences % this.CoinValue.TWO_PENCES;

        distribution.pence = parseInt(amountInPences/this.CoinValue.PENCE);
        amountInPences = amountInPences % this.CoinValue.PENCE;
        
        return distribution;
    }
});