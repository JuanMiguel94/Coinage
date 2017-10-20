angular.module("App").service('currencyParser', function() {        
   
    this.parseAmountIntoPences = (amountInput, digitsToRoundTo) =>(
        parseAmountIntoPencesAux = (total, currentMagnitude) => {
            if (amountInput == '') return total/10;
            let indexes = this.getIndexes(amountInput, digitsToRoundTo);        
            let roundIncrement = this.getRoundIncrement(amountInput, digitsToRoundTo);
            if (amountInput[0] == '.' && currentMagnitude == 100) total /= 100;            
            currentMagnitude = this.getUpdatedMagnitude(amountInput, currentMagnitude);
            let nexIncrement = (parseInt(amountInput[indexes.head]) + roundIncrement) * currentMagnitude;
            if (isNaN(nexIncrement)) return total * 10;
            total = (total + nexIncrement) * 10;                
            amountInput = amountInput.slice(indexes.head + 1, indexes.end);         
            return parseAmountIntoPencesAux(total, currentMagnitude);
        }
    )(0, 1, amountInput, digitsToRoundTo);                    

    this.getUpdatedMagnitude = (amountInput, currentMagnitude) => {
        if (amountInput[0] == '£') {
            return 100;
        }
        else if (amountInput[0] == '.') {
            return 1;            
        } else {
            return currentMagnitude;
        }
    }
    this.getRoundIncrement = (amountInput, digitsToRoundTo) => 
        this.hasToBeRound(amountInput, digitsToRoundTo) ? 1/(Math.pow(10, digitsToRoundTo-1)) : 0;
  
    this.hasToBeRound = (amountInput, digitsToRoundTo) => amountInput[0] == '.' &&
        amountInput.length -1 > digitsToRoundTo && parseInt(amountInput[digitsToRoundTo  + 1]) >= 5;

    this.getIndexes = (amountInput, digitsToRoundTo) => {
        let headIndex = amountInput[0] == '£' || amountInput[0] == '.'? 1 : 0;
        let endIndex;    
            if (amountInput[0] == '.' && amountInput.length > digitsToRoundTo + 1) {                      
                endIndex = digitsToRoundTo + 1;                
            } else {
                endIndex = amountInput[amountInput.length - 1] == 'p' ?
                    amountInput.length - 1 : amountInput.length;
            }
        return {head: headIndex, end: endIndex};
    }
});